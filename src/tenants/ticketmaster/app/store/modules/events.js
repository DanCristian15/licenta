import apiServiceEvents from '@core/api/apiServiceEvents';
import { normalizeEventDetails } from '@core/data/response/normalizeEventDetails';
import { normalizeEventInformationDetails } from '@core/data/response/normalizeEventInformationDetails';
import LogService from '@services/LogService';
import ApiCancelService from '@services/ApiCancelService';


const STORE_NAME = 'events';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        detail:             {},
        informationDetails: {},
    },
    mutations: {
        setDetail( state, data ) {
            state.detail = normalizeEventDetails( data );
        },
        setInformationDetail( state, data ) {
            state.informationDetails = normalizeEventInformationDetails( data );
        },
    },
    actions: {
        one: async ( { commit, state }, id ) => {
            const api = await apiServiceEvents( '' );
            const cancelToken = ApiCancelService.getToken( 'events.one' );
            const response = await api.events.one(
                id,
                {
                    cancelToken
                }
            );
            if ( response.success ) {
                commit( 'setDetail', response.data );
                return state.detail;
            } else {
                LogService.debug( 'problems loading event ' + id );
                return false;
            }
        },
        oneByLegacy: async ( { commit, state }, { id } ) => {
            const api = await apiServiceEvents( '' );
            const response = await api.events.oneByLegacy( { id } );
            if ( response.success ) {
                commit( 'setDetail', response.data );
                return state.detail;
            } else {
                LogService.debug( 'problems loading event legacy ' + id );
                return false;
            }
        },
        informationDetails: async ( { commit }, id ) => {
            const api = await apiServiceEvents( '' );
            const response = await api.events.informationDetails( id );
            if ( response.success ) {
                commit( 'setInformationDetail', response.data );
            } else {
                LogService.debug( 'problems loading event information details ' + id );
                return false;
            }
        }
    }
};
