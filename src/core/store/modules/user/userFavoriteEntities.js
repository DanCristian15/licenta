import Vue from 'vue';
import debounce from 'lodash/debounce';
import memoize from 'lodash/memoize';
import wrap from 'lodash/wrap';
import property from 'lodash/property';
import entityConstants from '@core/utils/constants/entity';
import apiServiceFavourites from '@core/api/apiServiceFavourites';
import { normalizeEvent } from '@core/data/response/normalizeEvent';
import LogService from '@services/LogService';


const toggleDebounced = wrap( memoize( function ( ) {
    return debounce( async ( { type, id, add, commit, getters } ) => {
        if ( add && !getters.isFavoriteBackend( type, id ) ) {
            commit( 'addIdBackend', { type, id } );
            const api = await apiServiceFavourites( '' );
            api.favorites.addEntity( type, id );
        }
        if ( !add && getters.isFavoriteBackend( type, id ) ) {
            commit( 'deleteIdBackend', { type, id } );
            const api = await apiServiceFavourites( '' );
            api.favorites.deleteEntity( type, id );
        }
    }, 500 );
}, property( [ 'entity' ] ) ), function ( func, payload ) {
    return func( payload )( payload );
} );


const STORE_NAME = 'favoriteEntities';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        ids: {
            [ entityConstants.TYPES.ATTRACTION ]: { },
            [ entityConstants.TYPES.EVENT ]: { }
        },
        idsBackend: {
            [ entityConstants.TYPES.ATTRACTION ]: { },
            [ entityConstants.TYPES.EVENT ]: { }
        },
        totalCount: {
            [ entityConstants.TYPES.ATTRACTION ]: 0,
            [ entityConstants.TYPES.EVENT ]: 0
        },
        totalCountList: {
            [ entityConstants.TYPES.ATTRACTION ]: 0,
            [ entityConstants.TYPES.EVENT ]: 0
        },
        list: {
            [entityConstants.TYPES.ATTRACTION]: [],
            [entityConstants.TYPES.EVENT]: []
        },
    },
    mutations: {
        addId( state, { type, id } ) {
            Vue.set( state.ids[type], id, { createdAt: new Date( ).getTime( ) } );
            state.totalCount[ type ] = state.totalCount[ type ] + 1;
            state.totalCountList[ type ] = state.totalCountList[ type ] + 1;
        },
        deleteId( state, { type, id } ) {
            Vue.delete( state.ids[type], id );
            state.totalCount[ type ] = state.totalCount[ type ] - 1;
            state.totalCountList[ type ] = state.totalCountList[ type ] - 1;
        },
        setIds( state, { type, list } ) {
            state.ids[ type ] = list.reduce( ( acc, id ) => {
                acc[ id ] = true;
                return acc;
            }, { } );
        },
        addIdBackend( state, { type, id } ) {
            Vue.set( state.idsBackend[type], id, { createdAt: new Date( ).getTime( ) } );
        },
        deleteIdBackend( state, { type, id } ) {
            Vue.delete( state.idsBackend[type], id );
        },
        setIdsBackend( state, { type, list } ) {
            state.idsBackend[ type ] = list.reduce( ( acc, id ) => {
                acc[ id ] = true;
                return acc;
            }, { } );
        },
        clearList( state, { type } ) {
            state.list[ type ] = [ ];
        },
        appendPageToList( state, { type, pageData } ) {
            const list = type === entityConstants.TYPES.EVENT ? pageData.map( normalizeEvent ) : pageData;

            state.list[ type ] = [
                ...state.list[ type ],
                ...list
            ];
        },
        setTotalCount( state, { type, totalCount } ) {
            state.totalCount[type] = totalCount;
        },
        setTotalCountList( state, { type, totalCount } ) {
            state.totalCountList[type] = totalCount;
        },
    },
    getters: {
        isFavorite: ( state ) => ( type, id ) => {
            if ( state.ids[ type ] ) {
                return !!state.ids[ type ][ id ];
            }
            return false;
        },
        isFavoriteBackend: ( state ) => ( type, id ) => {
            if ( state.idsBackend[ type ] ) {
                return !!state.idsBackend[ type ][ id ];
            }
            return false;
        },
        totalFavoriteFromList: state => ( type ) => {
            return state.list[ type ].filter( item => !!state.ids[ type ][ item.id ] ).length;
        },
        isAllItemsLoaded: ( state, getters ) => ( type ) => {
            return getters.totalFavoriteFromList( type ) >= state.totalCountList [ type ];
        }
    },
    actions: {
        toggle( { state, getters, commit, dispatch }, { type, id } ) {
            if ( state.ids[ type ] ) {
                dispatch( 'user/analytics/setRefresh', true, { root: true } );
                if ( state.ids[ type] [ id ] ) {
                    commit( 'deleteId', { type, id } );
                    toggleDebounced( { entity: `${type}|${id}`, type, id, add: false, commit, getters } );
                } else {
                    commit( 'addId', { type, id } );
                    toggleDebounced( { entity: `${type}|${id}`, type, id, add: true, commit, getters } );
                }
            }
            return getters.isFavorite( type, id );
        },
        get: async ( { commit, state, getters }, { refresh = false, loadNextPage = false, search } = {} ) => {
            const needsRefresh = refresh;
            const needsLoadNextPage = needsRefresh || loadNextPage;
            const { type, filter, ...restSearch } = search;

            if ( needsRefresh ) {
                commit( 'clearList', { type } );
            }

            if ( needsLoadNextPage ) {
                const api = await apiServiceFavourites( '' );
                const response = await api.favorites.get( {
                    type,
                    offset: getters.totalFavoriteFromList( type ),
                    ...filter,
                    ...restSearch
                } );

                if ( response.success ) {
                    const { list, totalCount } = response.data;
                    if ( needsRefresh ) {
                        commit( 'clearList', { type } );
                    }
                    if ( !filter ) {
                        commit( 'setTotalCount', { type, totalCount: totalCount } );
                    }
                    commit( 'setTotalCountList', { type, totalCount: totalCount } );
                    commit( 'appendPageToList', { type, pageData: list } );

                    return state.list[ type ];
                } else {
                    LogService.debug( 'problem loading favorite entities' );
                    return false;
                }
            }
        },
        getIds: async( { commit }, { type } ) => {
            let allLoaded = false;
            let list = [ ];
            const limit = 100;

            while ( !allLoaded ) {
                const api = await apiServiceFavourites( '' );
                const { success, data } = await api.favorites.getIds( { type, offset: list.length, limit } );
                if( !success ) {
                    allLoaded = true;
                } else {
                    list = [ ...list, ...data.items ];
                    allLoaded = data.items.length < limit;
                }
            }

            commit( 'setIds', { type, list } );
            commit( 'setIdsBackend', { type, list } );
        }
    }
};
