import { getFromApiResponse as notificationUtilsGetFromApiResponse } from '@core/utils/notificationUtils';
import { normalizeCart } from '@core/data/response/normalizeCart';
import { normalizeShippingOption } from '@/core/data/response/normalizeShippingOption';
import LogService from '@services/LogService';

const STORE_NAME = 'cart';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list: [],
        current: {
            id: null,
            expireAt: null,
            submittedAt: null,
            collections: [],
            order: {}
        },
        checkoutWizardData: { }
    },
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
                        submittedAt: state.current.submittedAt
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
            const response = await api.cart.addItem ( ticket, hotelReservation, bundleProducts );

            if ( response.success ) {
                const { cart, collections, order } = normalizeCart ( response.data );
                commit( 'setCart', {
                    cart: {
                        ...cart,
                        expireAt: cart.expiredAt,
                        submittedAt: null
                    },
                    collections,
                    order
                } );
                commit( 'addToList', state.current );
                return state.current.id;
            } else {
                dispatch( 'notification/error', notificationUtilsGetFromApiResponse( response ), { root: true } );
                return false;
            }
        },
        addShippingOption: async ( { commit, dispatch }, { id, data } ) => {
            const api = await apiServiceCart( '' );
            const response = await api.cart.addShippingOption( id, data );

            if ( response.success ) {
                const { cart, collections, order } = normalizeCart ( response.data );
                commit( 'setCart', {
                    cart: {
                        ...cart,
                        expireAt: cart.expiredAt,
                        submittedAt: null
                    },
                    collections,
                    order
                } );

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
        checkout: async ( { commit, dispatch }, { id, data } ) => {
            commit( 'setCartSubmittedAt', new Date() );
            const api = await apiServiceCart( '' );
            const response = await api.cart.checkout ( id, data );

            if ( response.success ) {
                commit( 'clear' );
                commit( 'removeFromList', id );
                return response.data;
            } else {
                dispatch( 'notification/error', notificationUtilsGetFromApiResponse( response ), { root: true } );
                return false;
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
            return {
                list: data.list ? data.list.map( item => {
                    return {
                        ...item,
                        expireAt: new Date( item.expireAt )
                    };
                } ): [ ],
                checkoutWizardData: data.checkoutWizardData ? data.checkoutWizardData : { }
            };
        }
    },
    _sessionPersist: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];
            const { current } = storeState;

            return {
                current: {
                    id: current.id,
                    expireAt: current.expireAt
                }
            };
        },
        getDataToLoad: ( data ) => {
            return {
                current: data.current ? {
                    ...data.current,
                    expireAt: new Date( data.current.expireAt )
                } : {
                    id: null,
                    expireAt: null,
                }
            };
        }
    }
};
