import apiConstants from '@core/utils/constants/api';
import entityConstants from '@core/utils/constants/entity';
import apiServiceVenues from '@core/api/apiServiceVenues';
import LogService from '@services/LogService';
import utils from './_utils';

const STORE_NAME = 'venues';
const ITEMS_PER_PAGE = 5;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list:               [],
        totalCount:         0,
        timestamp:          0,
        loading:            false,
        listFirstLoad:      true,
        refresh:            false,
        allItemsLoaded:     false,
        detail:             {},
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
        setListFirstLoad( state, listFirstLoad ) {
            state.listFirstLoad = listFirstLoad;
        },
        clearList( state ) {
            state.list = [ ];
        },
        setTotalCount ( state, totalCount ) {
            state.totalCount = totalCount;
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
        setDetail( state, data ) {
            state.detail = data;
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
        get: async ( { commit, state }, { refresh = false, loadNextPage = false, search, userAnalytics = false, firstLoad = true } ) => {
            const needsRefresh = refresh || state.refresh;
            const needsLoadNextPage = needsRefresh || loadNextPage;

            if ( needsRefresh ) {
                commit( 'clearList' );
                commit( 'setTotalCount', 0 );
                if ( firstLoad ) {
                    commit( 'setListFirstLoad', true );
                }
            }

            if ( needsLoadNextPage ) {
                commit( 'setLoading', true );
                const api = await apiServiceVenues( '' );
                const response = await utils.getItemsWithCityLocationFallback(
                    api.venues.get,
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
                    LogService.debug( 'problem loading venues ' );
                    commit( 'setListFirstLoad', false );
                    commit( 'setLoading', false );
                    return false;
                }
            }
        },
        searchList: async ( context, { search, requestConfig } ) => {
            const api = await apiServiceVenues( '' );
            const response = await api.venues.get( search, { }, requestConfig );
            if ( response.success ) {
                return response.data.list;
            }
            return false;
        },
        one: async ( { commit, state, dispatch }, id ) => {
            const api = await apiServiceVenues( '' );
            const response = await api.venues.one( id );

            if ( response.success ) {
                commit( 'setDetail', response.data );
                return state.detail;
            } else {
                if ( response.status === apiConstants.STATUS.NOT_FOUND ) {
                    dispatch( 'user/browsingHistory/deleteEntity', { entityType: entityConstants.TYPES.VENUE, entityId: id }, { root: true } );
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
