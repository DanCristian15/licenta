import storeConstants from '@core/utils/constants/store';
import { isStoreOutDated as storeUtilsIsStoreOutDated } from '@core/utils/storeUtils';
import apiServiceCities from '@core/api/apiServiceCities';
import LogService from '@services/LogService';

const REFRESH_TIME = storeConstants.REFRESH_TIME;

const STORE_NAME = 'cities';
const ITEMS_PER_PAGE = 5;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list:               [],
        timestamp:          0,
        loading:            0,
        listFirstLoad:      false,
        refresh:            false,
    },
    mutations: {
        setLoading( state, loading ) {
            state.loading = loading ? loading : 0;
        },
        clearList( state ) {
            state.list = [ ];
        },
        setList( state, data ) {
            state.timestamp = new Date( ).getTime( );
            state.listFirstLoad = true;
            state.list = [ ...data ];
        },
        setRefresh( state, refresh ) {
            state.refresh = refresh;
        }
    },

    actions: {
        get: async ( { commit, state }, { refresh, search } = { } ) => {
            const needsRefresh = refresh || state.refresh || storeUtilsIsStoreOutDated( state.timestamp, REFRESH_TIME );
            const api = await apiServiceCities( '' );

            if ( needsRefresh ) {
                commit( 'clearList' );
                commit( 'setLoading', state.loading + 1 );
                const response = await api.cities.get( {
                    offset: 0,
                    limit:  ITEMS_PER_PAGE,
                    ...search
                } );
                commit( 'setLoading', state.loading - 1 );
                if ( response.success ) {
                    state.loading || commit( 'setList', response.data.list );

                    return state.list;
                } else {
                    LogService.debug( 'problem loading top cities' );
                    return false;
                }
            }
        },
        search: async ( context, { search } ) => {
            const api = await apiServiceCities( '' );
            return await api.cities.get( {
                ...search
            } );
        },
        exists: async ( context, { city } ) => {
            const api = await apiServiceCities( '' );
            const response = await api.cities.get( {
                offset: 0,
                limit: 10,
                keyword: city.name,
                countryCode: city.countryCode,
                stateCode: city.stateCode
            } );
            return response.success && response.data.list.length;
        },
        searchList: async( { dispatch }, { search } ) => {
            const response = await dispatch( 'search', { search } );

            return response.success ? response.data.list : null;
        },
        needsRefresh( { commit } ) {
            commit( 'setRefresh', true );
        }
    }
};
