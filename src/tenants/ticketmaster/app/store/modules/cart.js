import { getFromApiResponse as notificationUtilsGetFromApiResponse } from '@core/utils/notificationUtils';
import apiServiceCart from '@core/api/apiServiceCart';
import { normalizeCart } from '@core/data/response/normalizeCart';
import { normalizeOrder } from '@core/data/response/normalizeOrder';
import { normalizeShippingOption } from '@/core/data/response/normalizeShippingOption';
import LogService from '@services/LogService';

const STORE_NAME = 'cart';
const DEFAULT_STATE = {
    list: [],
    current: {
        id: null,
        expireAt: null,
        submittedAt: null,
        collections: [],
        order: {},
        venueSeatMapUrl: null,
    },
    checkoutWizardData: { }
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: { ...DEFAULT_STATE },
    getters: {
        cartId: ( state ) => state.current.id,
        isCollectionIdIntoCart: ( state ) => id => state.current.collections.find ( item => item.id === id ),
        isExpired: ( state ) => ( ) => {
            const { expireAt } = state.current;

            return !expireAt || ( expireAt.getTime( ) < new Date( ).getTime( ) );
        },
        isSubmitted: ( state ) => !!state.current.submittedAt

    },
    mutations: {
        clear( state ) {
            state.current = {
                id: null,
                expireAt: null,
                submittedAt: null,
                collections: []
            };
        },
        setCart( state, { cart, collections, order } ) {
            state.current = {
                ...cart,
                collections,
                order
            };
        },
        setCartSubmittedAt( state, value ) {
            state.current.submittedAt = value;
        },
        addToList( state, data ) {
            state.list = [
                ...state.list,
                {
                    ...data
                }
            ];
        },
        removeFromList( state, id ) {
            state.list = state.list.filter( item => item.id !== id );
        },
        setCheckoutWizardData( state, data = { } ) {
            state.checkoutWizardData = data;
        }
    },
    actions: {
        get: async ( { commit, dispatch, state }, { id } ) => {
            const api = await apiServiceCart( '' );
            const response = await api.cart.get( id );

            if ( response.success ) {
                const { cart, collections, order } = normalizeCart( response.data );

                commit( 'setCart', {
                    cart: {
                        ...cart,
                        expireAt: state.current.expireAt,
                        submittedAt: state.current.submittedAt,
                        venueSeatMapUrl: state.current.venueSeatMapUrl
                    },
                    collections,
                    order
                } );
                return state.current.id;
            } else {
                LogService.debug( 'Problem loading cart with id' + id );
                dispatch( 'notification/error', notificationUtilsGetFromApiResponse( response ), { root: true } );
                return false;
            }
        },
        clear: async ( { commit } ) => {
            commit( 'clear' );
        },
        setCheckoutWizard: ( { commit }, data ) => {
            commit( 'setCheckoutWizardData', data );
        },
        addItem: async ( { commit, dispatch, state }, { ticket, hotelReservation, bundleProducts } ) => {
            if ( state.current && state.current.id ) {
                await dispatch( 'delete', { id: state.current.id } );
                commit( 'clear' );
            }

            const api = await apiServiceCart( '' );
            const response = await api.cart.addItem( ticket, hotelReservation, bundleProducts );

            if ( response.success ) {
                const { cart, collections, order } = normalizeCart ( response.data );
                commit( 'setCart', {
                    cart: {
                        ...cart,
                        expireAt: cart.expiredAt,
                        submittedAt: null,
                        venueSeatMapUrl: ticket.venueSeatMapUrl,
                    },
                    collections,
                    order
                } );
                commit( 'addToList', state.current );
                return {
                    success: true,
                    cartId: state.current.id
                };
            } else {
                return response;
            }
        },
        addShippingOption: async ( { dispatch }, { id, data } ) => {
            const api = await apiServiceCart( '' );
            const response = await api.cart.addShippingOption( id, data );

            if ( response.success ) {
                const { order } = normalizeCart ( response.data );

                return {
                    order
                };
            } else {
                LogService.debug( 'Problem adding shipping option' );
                dispatch( 'notification/error', notificationUtilsGetFromApiResponse( response ), { root: true } );
                return false;
            }
        },
        getShippingOptions: async ( { dispatch }, { id, data } ) => {
            const api = await apiServiceCart( '' );
            const response = await api.cart.getShippingOptions( id, data );

            if ( response.success ) {
                return response.data.map( normalizeShippingOption );
            } else {
                LogService.debug( 'Problem loading shipping options' );
                dispatch( 'notification/error', notificationUtilsGetFromApiResponse( response ), { root: true } );
                return false;
            }
        },
        checkout: async ( { commit }, { id, data } ) => {
            commit( 'setCartSubmittedAt', new Date() );
            const api = await apiServiceCart( '' );
            const response = await api.cart.checkout ( id, data );

            if ( response.success ) {
                commit( 'clear' );
                commit( 'removeFromList', id );
                return {
                    success: true,
                    ...normalizeOrder( response.data )
                };
            } else {
                return response;
            }
        },
        delete: async ( { commit, state }, { id } ) => {
            const api = await apiServiceCart( '' );
            const response = await api.cart.delete ( id );

            if ( response.success ) {
                state.id !== id || commit( 'clear' );
                commit( 'removeFromList', id );
                return id;
            } else {
                LogService.debug( 'Problem deleting cart with id ', id );
                return false;
            }
        },
        instantDelete: async( { commit, state }, { id } ) => {
            state.id || commit( 'clear' );
            commit( 'removeFromList', id );
            const api = await apiServiceCart( '' );
            const response = await api.cart.delete ( id );
            if ( response.success ) {
                return id;
            } else {
                LogService.debug( 'Problem deleting cart with id ', id );
                return false;
            }
        },
        instantDeleteCurrentCart: async( { state, commit, dispatch } ) => {
            const { id } = state.current;

            if ( id ) {
                commit( 'clear' );
                await dispatch( 'delete', { id } );
            }
            return true;
        },
        instantDeleteCurrentCartIfExpired: async( { getters, state, dispatch } ) => {
            const { id, expireAt } = state.current;

            if ( id && expireAt && getters[ 'isExpired' ]( ) ) {
                return await dispatch( 'instantDeleteCurrentCart' );
            }
            return true;
        },
        deleteAllIfExpired: async( { state, dispatch } ) => {
            const nowTimestamp = new Date( ).getTime( );

            state.list
                .filter( item => !item.expireAt || item.expireAt.getTime( ) < nowTimestamp )
                .forEach( item => {
                    dispatch( 'instantDelete', { id: item.id } );
                } );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];
            const { list, checkoutWizardData } = storeState;

            return {
                list: list.length ? list.map( item => {
                    return {
                        id: item.id,
                        expireAt: item.expireAt
                    };
                } ): [ ],
                checkoutWizardData
            };
        },
        getDataToLoad: ( data ) => {
            try {
                return {
                    list: data.list ? data.list.map( item => {
                        return {
                            ...item,
                            expireAt: new Date( item.expireAt )
                        };
                    } ): [ ],
                    checkoutWizardData: data.checkoutWizardData ? data.checkoutWizardData : { }
                };
            } catch ( e ) {
                LogService.error( `Vuex state cannot be loaded: Cart: ${ e }` );
                return null;
            }
        }
    },
    _sessionPersist: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];
            const { current } = storeState;

            return {
                current: {
                    id: current.id,
                    expireAt: current.expireAt,
                    venueSeatMapUrl: current.venueSeatMapUrl
                }
            };
        },
        getDataToLoad: ( data ) => {
            try {
                return {
                    current: data.current ? {
                        ...data.current,
                        expireAt: new Date( data.current.expireAt )
                    } : {
                        id: null,
                        expireAt: null,
                    }
                };
            } catch ( e ) {
                LogService.error( `Vuex session state cannot be loaded: Cart: ${ e }` );
                return null;
            }
        }
    }
};
