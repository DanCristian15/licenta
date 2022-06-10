import storeConstants from '@core/utils/constants/store';
import { isStoreOutDated as storeUtilsIsStoreOutDated } from '@core/utils/storeUtils';
import LogService from '@services/LogService';

const REFRESH_TIME = storeConstants.REFRESH_TIME;

const STORE_NAME = 'categories';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list:                  [],
        timestamp:       0,
        loading:            false,
        refresh:            false,
    },
    mutations: {
        setLoading( state, loading ) {
            state.loading = loading;
        },
        clearList( state ) {
            state.list = [ ];
        },
        setList( state, data ) {
            state.timestamp = new Date( ).getTime( );
            state.list = data.list;
        },
        setRefresh( state, refresh ) {
            state.refresh = refresh;
        }
    },

    actions: {
        get: async ( { commit, state }, { refresh = false } = { } ) => {
            const needsRefresh = refresh || state.refresh || storeUtilsIsStoreOutDated ( state.timestamp, REFRESH_TIME );
            const needsLoadNextPage = needsRefresh;
            const api = await apiServiceCategories( '' );

            !needsRefresh || ( commit( 'clearList' ) );
            if ( needsLoadNextPage ) {
                commit( 'setLoading', true );
                const response = await api.categories.get( {} );
                commit( 'setLoading', false );

                if ( response.success ) {
                    commit( 'setList', response.data );

                    return state.list;
                } else {
                    LogService.debug( 'problem loading categories' );
                    return false;
                }
            }
        },
        getListForFavoriteAttractions: async () => {
            const api = await apiServiceCategories( '' );
            const response = await api.categories.getForFavoriteAttractions( { } );

            return response.success ? response.data.list : [ ];
        },
        needsRefresh( { commit } ) {
            commit( 'setRefresh', true );
        }
    },
    getPersistState: ( state ) => {
        return {
            list:state[ STORE_NAME ].list,
            timestamp: state[ STORE_NAME ].timestamp,
            refresh: state[ STORE_NAME].refresh
        };
    }
};
