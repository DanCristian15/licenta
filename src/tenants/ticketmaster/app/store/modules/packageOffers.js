import Schema from 'validate';
import apiServicePackageOffers from '@core/api/apiServicePackageOffers';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';
import { normalizeBundleSections } from '@core/data/response/normalizeBundleSections';
import { normalizeBundleDetails } from '@core/data/response/normalizeBundleDetails';
import ApiCancelService from '@services/ApiCancelService';
import { normalizePackageDetails } from '@core/data/response/normalizePackageDetails';
import packagesOffersFilters from './packagesOffersFilters';
import packageOffersHotels from './packageOffersHotels';

const STORE_NAME = 'packageOffers';
const DEFAULT_STATE = {
    details: {},
    packageDetails: {},
    list: [],
    loading: false,
    loadingCounter: 0
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: { ...DEFAULT_STATE },
    mutations: {
        setList( state, data ) {
            state.list = [ ...data ];
        },
        setDetails( state, details ) {
            state.details = details;
        },
        setPackageDetails( state, packageDetails ) {
            state.packageDetails = packageDetails;
        },
        [ mutationTypes.START_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter + 1;
            state.loading = !!state.loadingCounter;
        },
        [ mutationTypes.STOP_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
            state.loading = !!state.loadingCounter;
        },
    },
    getters: {
        hasByEventId: state => ( id ) => {
            return state.details.id === Number( id ) && !!state.list.length;
        },
        getDetailsByEventId: state => (  ) => {
            return state.packageDetails.description;
        },
        getAvailable: state => ( id ) => {
            return Number( state.details.id ) === Number( id ) && state.packageDetails.available;
        },
        getLoading: state => {
            return state.loading;
        }
    },
    actions: {
        init: async ( { state, dispatch }, { eventId } ) => {
            if ( eventId !== state.details.id ) {
                dispatch( 'packageOffers/filters/clear', null, { root: true } );
            }
        },
        oneByEventId: async ( { commit }, eventId  ) => {
            commit( mutationTypes.START_LOADING );
            const api = await apiServicePackageOffers( '' );
            const cancelToken = ApiCancelService.getToken( 'packageOffers.oneByEventId' );
            const response = await api.packageOffers.detailsByEventId(
                eventId,
                {
                    cancelToken
                }
            );

            if ( !response.success ) {
                LogService.debug( 'problem getting package details by event' + eventId );
                commit( 'setPackageDetails', {
                    available: false
                } );

                commit( mutationTypes.STOP_LOADING );
                return response;
            }

            const dataNormalized = normalizeBundleDetails( response.data );
            const { eventDetails, packageDetails } = dataNormalized;


            commit( 'setDetails', { id: eventId, ...eventDetails } );
            commit( 'setPackageDetails', packageDetails );
            commit( mutationTypes.STOP_LOADING );
            return { success: true, data: dataNormalized };
        },
        oneByExternalId: async ( { commit }, externalId ) => {
            commit( mutationTypes.START_LOADING );
            const api = await apiServicePackageOffers( '' );
            const cancelToken = ApiCancelService.getToken( 'packageOffers.oneByExternalId' );
            const response = await api.packageOffers.detailsByExternalId(
                externalId,
                {
                    cancelToken
                }
            );

            if ( response.success ) {
                commit( mutationTypes.STOP_LOADING );
                return { success: true, data: normalizePackageDetails( response.data ) };
            } else {
                LogService.debug( 'problem getting package details by external id' + externalId );
                return response;
            }
        },
        getSectionsByEventId: async ( { commit }, { eventId, guestCount } = { } ) => {
            commit( mutationTypes.START_LOADING );

            const api = await apiServicePackageOffers( '' );
            const cancelToken = ApiCancelService.getToken( 'packageOffers.getSectionsByEventId' );
            const response = await api.packageOffers.sectionsByEventId(
                { eventId, guestCount },
                {
                    cancelToken
                }
            );

            if ( response.success ) {
                const normalizedSections = normalizeBundleSections( response.data );
                commit( 'setList', normalizedSections );

                commit( mutationTypes.STOP_LOADING );
                return { success: true, data: {
                    sections: normalizedSections
                } };
            } else {
                LogService.debug( 'problem loading sections by event ' + eventId );
                commit( mutationTypes.STOP_LOADING );
                return response;
            }
        },
    },
    modules: {
        filters: packagesOffersFilters,
        hotels: packageOffersHotels,
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                filters: packagesOffersFilters._persistent.getDataToSave( state[STORE_NAME] ),
                details: state[STORE_NAME].details,
            };
        },
        getDataToLoad: ( data ) => {
            try {
                const schema = new Schema( {
                    details: {
                        required: true,
                    }
                } );
                if ( !data || schema.validate( { ...data } ).length ) {
                    throw( new Error( 'Invalid schema for package offers store' ) );
                }
                return {
                    data: data.details,
                    filters: packagesOffersFilters._persistent.getDataToLoad( data.filters )
                };
            } catch ( e ) {
                LogService.error( `Vuex session state cannot be loaded: PackageOffers: ${ e }` );
                return null;
            }
        }
    },
};
