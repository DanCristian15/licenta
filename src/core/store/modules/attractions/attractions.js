import apiConstants from '@core/utils/constants/api';
import entityConstants from '@core/utils/constants/entity';
import apiServiceAttractions from '@core/api/apiServiceAttractions';
import LogService from '@services/LogService';
import utils from '../_utils';

const STORE_NAME = 'attractions';
const ITEMS_PER_PAGE = 5;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list:               [],
        detail:             {},
        totalCount:         0,
        timestamp:          0,
        loading:            false,
        listFirstLoad:      true,
        refresh:            false,
        allItemsLoaded:     false,
        filterLocationRange: 0,
        filter: {
            city: {},
            startDate: null,
            endDate: null,
        }
    },
    mutations: {
        setLoading( state, loading ) {
            state.loading = loading;
        },
        setTotalCount ( state, totalCount ) {
            state.totalCount = totalCount;
        },
        setListFirstLoad( state, listFirstLoad ) {
            state.listFirstLoad = listFirstLoad;
        },
        clearList( state ) {
            state.list = [ ];
        },
        appendPageToList( state, pageData ) {
            state.timestamp = new Date( ).getTime( );
            state.list = [
                ...state.list,
                ...pageData
            ];
        },
        setRefresh( state, refresh ) {
            state.refresh = refresh;
        },
        setDetail( state, detail ) {
            state.detail = detail;
        },
        setFilterLocationRange( state, value ) {
            state.filterLocationRange = value;
        },
        setFilter( state, filter ) {
            state.filter = {
                ...state.filter,
                ...filter
            };
        }
    },

    getters: {
        isAllItemsLoaded: state => {
            return state.list.length >= state.totalCount;
        }
    },

    actions: {
        get: async ( { commit, state }, { refresh = false, loadNextPage = false, search, userAnalytics = false, firstLoad = true } = { } ) => {
            const needsRefresh = refresh || state.refresh;
            const needsLoadNextPage = needsRefresh || loadNextPage;
            const api = await apiServiceAttractions( '' );

            if ( needsRefresh ) {
                commit( 'clearList' );
                commit( 'setTotalCount', 0 );
                if ( firstLoad ) {
                    commit( 'setListFirstLoad', false );
                }
            }

            if ( needsLoadNextPage ) {
                commit( 'setLoading', true );
                const response = await utils.getItemsWithCityLocationFallback(
                    api.attractions.get,
                    { state, commit },
                    {
                        offset: state.list.length,
                        limit:  ITEMS_PER_PAGE,
                        ...search,
                    },
                    { userAnalytics }
                );


                if ( response.success ) {
                    const { list, totalCount } = response.data;
                    !totalCount || commit( 'setTotalCount', totalCount );
                    commit( 'appendPageToList', list );
                    commit( 'setListFirstLoad', false );
                    commit( 'setLoading', false );

                    return state.list;
                } else {
                    LogService.debug( 'problem loading attractions ' );
                    commit( 'setListFirstLoad', false );
                    commit( 'setLoading', false );
                    return false;
                }
            }
        },
        search: async ( context, { search, requestConfig } ) => {
            const api = await apiServiceAttractions( '' );
            return await api.attractions.get( search, { }, requestConfig );
        },
        searchList: async( { dispatch }, { search, requestConfig } ) => {
            const response = await dispatch( 'search', { search, requestConfig } );
            if ( response.success ) {
                return response.data.list;
            }
            return false;
        },
        searchByEvent: async ( context, { eventId, search } ) => {
            const api = await apiServiceAttractions( '' );
            return await api.attractions.getByEvent( eventId, search );
        },
        one: async ( { commit, state, dispatch }, id ) => {
            const api = await apiServiceAttractions( '' );
            const response = await api.attractions.one( id );

            if ( response.success ) {
                commit( 'setDetail', response.data );
                return state.detail;
            } else {
                if ( response.status === apiConstants.STATUS.NOT_FOUND ) {
                    dispatch( 'user/browsingHistory/deleteEntity', { entityType: entityConstants.TYPES.ATTRACTION, entityId: id }, { root: true } );
                }
                LogService.debug( 'problems loading event ' + id );
                return false;
            }
        },
        updateFilter( { commit }, filter ) {
            commit( 'setFilter', filter );
        },
        needsRefresh( { commit } ) {
            commit( 'setRefresh', true );
        }
    }
};
