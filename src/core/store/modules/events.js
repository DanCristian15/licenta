import apiConstants from '@core/utils/constants/api';
import entityConstants from '@core/utils/constants/entity';
import searchConstants from '@core/utils/constants/search';
import { normalizeEvent } from '@core/data/response/normalizeEvent';
import { normalizeEventDetails } from '@core/data/response/normalizeEventDetails';
import { normalizeEventInformationDetails } from '@core/data/response/normalizeEventInformationDetails';
import LogService from '@services/LogService';
import ApiCancelService from '@services/ApiCancelService';
import utils from './_utils';


const STORE_NAME = 'events';
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
        informationDetails: {},
        filterLocationRange: searchConstants.DEFAULT.LOCATION.RANGE.DEFAULT,
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
                ...( pageData.map( normalizeEvent ) )
            ];
        },
        setRefresh( state, refresh ) {
            state.refresh = refresh;
        },
        setDetail( state, data ) {
            state.detail = normalizeEventDetails( data );
        },
        setInformationDetail( state, data ) {
            state.informationDetails = normalizeEventInformationDetails( data );
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

            if ( needsRefresh ) {
                commit( 'clearList' );
                commit( 'setTotalCount', 0 );
                if ( firstLoad ) {
                    commit( 'setListFirstLoad', true );
                }
            }
            if ( needsLoadNextPage ) {
                commit( 'setLoading', true );
                const api = await apiServiceEvents( '' );
                const response = await utils.getItemsWithCityLocationFallback(
                    api.events.get,
                    { state, commit },
                    {
                        offset: state.list.length,
                        limit:  ITEMS_PER_PAGE,
                        ...search,
                    },
                    { userAnalytics } );

                if ( response.success ) {
                    const { list, totalCount } = response.data;
                    if ( needsRefresh ) {
                        commit( 'clearList' );
                    }

                    !totalCount || commit( 'setTotalCount', totalCount );
                    commit( 'appendPageToList', list );
                    commit( 'setListFirstLoad', false );
                    commit( 'setLoading', false );
                    return state.list;
                } else {
                    LogService.debug( 'problem loading top events ' );
                    commit( 'setListFirstLoad', false );
                    commit( 'setLoading', false );
                    return false;
                }
            }
        },
        searchList: async ( context, { search, requestConfig } ) => {
            const api = await apiServiceEvents( '' );
            const response = await api.events.get( search, { userAnalytics: true }, requestConfig );
            if ( response.success ) {
                return response.data.list.map( normalizeEvent );
            }
            return false;
        },
        one: async ( { commit, state, dispatch }, id ) => {
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
                if ( response.status === apiConstants.STATUS.NOT_FOUND ) {
                    dispatch( 'user/browsingHistory/deleteEntity', { entityType: entityConstants.TYPES.EVENT, entityId: id }, { root: true } );
                }
                LogService.debug( 'problems loading event ' + id );
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
        },
        calculateBonusPointsEarn: async ( context, { id, amount } ) => {
            const api = await apiServiceEvents( '' );
            const response = await api.events.calculateBonusPointsEarn( id, { amount } );

            if ( response.success ) {
                return response.data;
            } else {
                LogService.debug( 'problems calculating earn bonus points for ', id );
                return false;
            }
        },
        cityEventDatesByAttraction: async ( context, { id, limit, offset } ) => {
            const api = await apiServiceEvents( '' );
            const response = await api.events.dates( id, limit, offset );
            if ( response.success ) {
                return response.data.items;
            }
            return false;
        },
        updateFilter( { commit }, filter ) {
            commit( 'setFilter', filter );
        },
        needsRefresh( { commit } ) {
            commit( 'setRefresh', true );
        }
    }
};
