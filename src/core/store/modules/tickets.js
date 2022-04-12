
import apiServiceTickets from '@core/api/apiServiceTickets';
import { normalizeTicketsList } from '@core/data/response/normalizeTicketList';
import LogService from '@services/LogService';
import ApiCancelService from '@services/ApiCancelService';

const STORE_NAME = 'tickets';
const ITEMS_PER_PAGE = 20;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        loading:            false,
        list:               [ ],
        total:              0
    },
    mutations: {
        setLoading( state, loading ) {
            state.loading = loading;
        }
    },

    actions: {
        get: async ( { commit, state }, { eventId, search, userAnalytics = false } = {} ) => {
            commit( 'setLoading', true );
            const api = await apiServiceTickets( '' );

            ApiCancelService.clear( 'tickets.get' );
            const cancelToken = ApiCancelService.getToken( 'tickets.get' );

            const response = await api.tickets.get(
                eventId,
                {
                    offset: state.list.length,
                    limit:  ITEMS_PER_PAGE,
                    ...search
                },
                {
                    userAnalytics
                },
                {
                    cancelToken
                }
            );

            commit( 'setLoading', false );

            if ( response.success ) {
                return { success: true, data: normalizeTicketsList ( response.data ) };
            } else {
                LogService.debug( 'problem loading tickets' );
                return response;
            }
        },
        availability: async ( context, { eventId } ) => {
            const api = await apiServiceTickets( '' );
            const cancelToken = ApiCancelService.getToken( 'tickets.availability' );
            const response = await api.tickets.availability(
                eventId,
                {
                    cancelToken
                }
            );

            if ( response.success ) {
                return { success: true, data: response.data };
            } else {
                LogService.debug( 'problem loading tickets availability' );

                return response;
            }
        }
    }
};
