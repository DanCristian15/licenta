import sortBy from 'lodash/sortBy';
import storeConstants from '@core/utils/constants/store';
import searchConstants from '@core/utils/constants/search';
import {
    hasCustomCityLocation as searchObjectUtilsHasCustomCityLocation,
    updateSearchWithCityLocationRange as searchObjectUtilsUpdateSearchWithCityLocationRange
} from '@core/utils/searchObjectUtils';
import { isStoreOutDated as storeUtilsIsStoreOutDated } from '@core/utils/storeUtils';
import { normalizeEvent } from '@core/data/response/normalizeEvent';
import LogService from '@services/LogService';

const REFRESH_TIME = storeConstants.REFRESH_TIME;


const STORE_NAME = 'topEvents';
const ITEMS_PER_PAGE = 6;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        listView:          [], // will contain only the items show in the list
        list:              [], // that will contain all 12 items
        timestamp:          0,
        loading:            0,
        listFirstLoad:      false,
        refresh:            false,
        allItemsLoaded:     false,
        filter:             { }
    },
    mutations: {
        setLoading( state, loading ) {
            state.loading = loading;
        },
        clearLists( state ) {
            state.list = [ ];
            state.listView = [ ];
        },
        appendPageToList( state, pageData ) {
            state.timestamp = new Date( ).getTime( );
            state.list = sortBy( [
                ...state.list,
                ...( pageData.map( normalizeEvent ) )
            ], ( item ) => item.startDateTime );
            state.listFirstLoad = true;
        },
        appendPageToListView( state, pageData ) {
            state.listView = [
                ...state.listView,
                ...( pageData.map( normalizeEvent ) )
            ];
        },
        setRefresh( state, refresh ) {
            state.refresh = refresh;
        },
        setFilter( state, filter ) {
            state.filter = {
                ...state.filter,
                ...filter
            };
        },
        setAllItemsLoaded( state, allItemsLoaded ) {
            state.allItemsLoaded = allItemsLoaded;
        }
    },

    actions: {
        get: async ( { commit, state }, { refresh = false, loadNextPage = false, filter = { }, userAnalytics = false } = { } ) => {
            const needsRefresh = !loadNextPage && ( refresh || state.refresh || storeUtilsIsStoreOutDated( state.timestamp, REFRESH_TIME ) );
            const getItemsFallback = async ( filter, options ) => {
                const api = await apiServiceTopEvents( '' );

                if ( searchObjectUtilsHasCustomCityLocation( filter ) ) {
                    const response = await api.topEvents.get( searchObjectUtilsUpdateSearchWithCityLocationRange( filter, searchConstants.DEFAULT.LOCATION.RANGE.DEFAULT ), options );
                    if ( response.success && response.data.list.length ) {
                        return response;
                    }
                    return api.topEvents.get( searchObjectUtilsUpdateSearchWithCityLocationRange( filter, searchConstants.DEFAULT.LOCATION.RANGE.FALLBACK ), options );
                }

                return api.topEvents.get( filter, options );
            };

            loadNextPage || commit( 'setFilter', filter );
            if ( !loadNextPage && needsRefresh ) {
                commit( 'clearLists' );
                commit( 'setAllItemsLoaded', false );
            }
            if ( needsRefresh ) {
                commit( 'setLoading', state.loading + 1 );
                const response = await getItemsFallback (
                    {
                        ...filter,
                        offset: state.list.length,
                        limit:  ITEMS_PER_PAGE * 2
                    },
                    {
                        userAnalytics
                    }
                );
                commit( 'setLoading', state.loading - 1 );
                if ( response.success ) {
                    if ( !state.loading ) {
                        const { list } = response.data;
                        commit( 'appendPageToList', list );
                        commit( 'appendPageToListView', state.list.slice( 0, ITEMS_PER_PAGE ) );
                        if ( state.listView.length < ITEMS_PER_PAGE ) {
                            commit( 'setAllItemsLoaded', true );
                        }
                    }

                    return state.list;
                } else {
                    LogService.debug( 'problem loading top events ' );
                    return false;
                }
            } else {
                if ( loadNextPage ) {
                    commit( 'appendPageToListView', state.list.slice( ITEMS_PER_PAGE, state.list.length ) );
                    commit( 'setAllItemsLoaded', true );
                }
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
