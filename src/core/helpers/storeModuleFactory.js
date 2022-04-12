import storeConstants from '@core/utils/constants/store';
import { isStoreOutDated as storeUtilsIsStoreOutDated } from '@core/utils/storeUtils';
import LogService from '@core/services/LogService';
import mutationTypes from './storeFactories/helpers/mutationTypes';

const defaultApi = {
    api: {
        get: '', // function from api
    },
};

/**
 *
 * @param {string} storeName
 * @param {Object} api
 * @param {Object} config
 *  - actionGetOptionsDefault - options that will be put on the get action - default { refresh: true, cache: false }
 *  - mapListItemFn - function to remap the items
 * @param {Object} overrides
 *  - getOptions - default options for get Action
 *  - state - overrides default state
 *  - getters - overrides getters
 *  - mutations - overrides the mutations
 *  - actions - overrides the actions
 */
const createModuleView  = ( storeName, api = defaultApi, options = { }, overrides = { } ) => {
    const defaultState = {
        list:               [],
        totalCount:         0,
        timestamp:          0,
        loading:            0,
        allItemsLoaded: false,
        refresh:            false,
        detail:             {}
    };

    let actionGetOptionsDefault = options && options.actionGetOptionsDefault ? options.actionGetOptionsDefault : {
            refresh: true,
            offset: 0,
            limit: storeConstants.ITEMS_PER_PAGE
        },
        mapListItemFn = options && options.mapListItemFn ? options.mapListItemFn : false;

    const module = {
        name: storeName,
        namespaced: true,
        state: { ...defaultState, ...overrides.state },
        getters: {
            isLoading: state => !!state.loading,
        },
        mutations: {
            [ mutationTypes.APPEND_TO_LIST ] ( state, pageData ) {
                state.timestamp = new Date( ).getTime( );
                state.list = [
                    ...state.list,
                    ...( mapListItemFn ? pageData.map( mapListItemFn ) : pageData )
                ];
            },
            [ mutationTypes.CLEAR_LIST ] ( state ) {
                state.list = [ ];
            },
            [ mutationTypes.SET_LOADING ]( state, loading ) {
                state.loading = loading;
            },
            [ mutationTypes.SET_TOTAL_COUNT ] ( state, totalCount ) {
                state.totalCount = totalCount;
            },
            [ mutationTypes.SET_REFRESH ] ( state, refresh ) {
                state.refresh = refresh;
            },
            [ mutationTypes.SET_ALL_ITEMS_LOADED ] ( state, allItemsLoaded ) {
                state.allItemsLoaded = allItemsLoaded;
            },
            [ mutationTypes.SET_DETAIL ] ( state, detail ) {
                state.detail = detail;
            }
        },
        actions: {
            get: async ( { commit, state }, options = actionGetOptionsDefault ) => {

                const needsRefresh = options.refresh || state.refresh || storeUtilsIsStoreOutDated ( state.timestamp, storeConstants.REFRESH_TIME );

                if ( needsRefresh ) {
                    commit( mutationTypes.CLEAR_LIST );
                    commit( mutationTypes.SET_TOTAL_COUNT, 0 );
                    commit( mutationTypes.SET_ALL_ITEMS_LOADED, false );
                }

                commit( mutationTypes.SET_LOADING, state.loading + 1 );

                const response = await api.get ( {
                    offset: options.offset,
                    limit:  options.limit + 1,
                    filter: options.filter,
                    sort: options.sort
                } );

                if ( response.success ) {
                    let { list } = response.data;

                    if ( list.length <  options.limit + 1 ) {
                        commit( mutationTypes.SET_ALL_ITEMS_LOADED, true );
                    } else if ( list.length ===  options.limit + 1 ) {
                        list.pop();
                    }

                    if ( needsRefresh ) {
                        commit( mutationTypes.CLEAR_LIST );
                    }

                    commit( mutationTypes.SET_TOTAL_COUNT, list.length + state.totalCount );
                    commit( mutationTypes.APPEND_TO_LIST, list );
                    commit( mutationTypes.SET_LOADING, state.loading - 1 );

                    return response.data;
                } else {
                    commit( mutationTypes.SET_LOADING, state.loading - 1 );
                    commit( mutationTypes.SET_ALL_ITEMS_LOADED, true );
                    LogService.debug( `problem loading ${storeName}` );
                    return false;
                }
            },
            async getRaw( context, options = { } ) {
                const response = await api.get ( {
                    offset: options.offset,
                    limit:  options.limit + 1,
                    filter: options.filter,
                    sort: options.sort
                } );

                if ( response.success ) {
                    return {
                        ...response,
                        data: {
                            ...response.data,
                            list: response.data.list.map ( item => mapListItemFn ? mapListItemFn( item ) : item )
                        }
                    };
                } else {
                    return response;
                }
            },
            async one ( { commit }, id  ) {
                const response = await api.one( id );

                if ( response.success ) {
                    commit( mutationTypes.SET_DETAIL, response.data );
                    return response.data;
                } else {
                    LogService.debug( `problems loading detail on ${storeName}, id: ${id}` );
                    return false;
                }
            },
            setRefreshIfOutdated( { commit, state }, timestamp ) {
                if ( timestamp > state.timestamp ) {
                    commit( mutationTypes.SET_REFRESH, true );
                }
            },
            setRefresh( { commit }, refresh ) {
                commit( mutationTypes.SET_REFRESH, refresh );
            }
        }
    };

    !overrides.getters || Object.assign( module.getters, overrides.getters );
    !overrides.mutations || Object.assign( module.mutations, overrides.mutations );
    !overrides.actions || Object.assign( module.actions, overrides.actions );
    !overrides.modules || ( module.modules = overrides.modules );

    return module;
};

export default  {
    mutationTypes,
    createModuleView
};
