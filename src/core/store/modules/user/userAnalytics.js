const STORE_NAME = 'analytics';
import entityConstants from '@core/utils/constants/entity';
import storeConstants from '@core/utils/constants/store';
import {
    transformFromTypeApi as entityUtilsTransformFromTypeApi
} from '@core/utils/entityUtils';
import { isStoreOutDated as storeUtilsIsStoreOutDated } from '@core/utils/storeUtils';
import apiServiceUser from '@core/api/apiServiceUser';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import { normalizeEvent } from '@core/data/response/normalizeEvent';
import LogService from '@services/LogService';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        loading: false,
        suggestions: [ ],
        similarAttractions: [ ],
        hasSimilarAttractions: false,
        timestamp: null,
        refresh: false
    },
    mutations: {
        [mutationTypes.SET_LOADING]( state, loading ) {
            state.loading = loading;
        },
        setSuggestions( state, list ) {
            state.suggestions = list.map( ( { type, ...rest } ) => {
                const newType = entityUtilsTransformFromTypeApi( type );

                return {
                    type: newType,
                    data: newType === entityConstants.TYPES.EVENT ? normalizeEvent( rest ) : rest
                };
            } );
        },
        setSimilarAttractions( state, list ) {
            state.similarAttractions = list.filter( ( { type } ) => entityUtilsTransformFromTypeApi( type ) === entityConstants.TYPES.ATTRACTION );
            state.hasSimilarAttractions = !!state.similarAttractions.length;
        },
        [mutationTypes.UPDATE_TIMESTAMP]( state ) {
            state.timestamp = new Date( ).getTime( );
        },
        [mutationTypes.SET_REFRESH]( state, value ) {
            state.refresh = value;
        },
        [mutationTypes.CLEAR]( state ) {
            state.loading = false;
            state.suggestions = [ ];
            state.similarAttractions = [ ];
            state.hasSimilarAttractions = false;
            state.timestamp = null;
            state.refresh = false;
        }
    },
    actions: {
        async get( { commit, state } ) {
            let needRefresh = state.refresh || storeUtilsIsStoreOutDated( state.timestamp, storeConstants.REFRESH_TIME );

            if ( !state.loading && needRefresh ) {
                commit( mutationTypes.SET_LOADING, true );
                const api = await apiServiceUser( '' );
                const response = await api.user.getAnalytics( { limit: 54 } );

                if ( response.success ) {
                    commit( 'setSuggestions', response.data.suggestions.slice( 0, 20 ) );
                    commit( 'setSimilarAttractions', response.data.similar.slice( 0, 54 ) );
                    commit( mutationTypes.UPDATE_TIMESTAMP );
                } else {
                    LogService.debug( 'problem loading analytics data for the user' );
                    commit( mutationTypes.SET_LOADING, false );
                    return false;
                }
                commit( mutationTypes.SET_LOADING, false );
                commit( mutationTypes.SET_REFRESH, false );
            }
            return {
                suggestions: state.suggestions,
                similarAttractions: state.similarAttractions,
            };
        },
        setRefresh( { commit }, refresh ) {
            commit( mutationTypes.SET_REFRESH, refresh );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                hasSimilarAttractions: state[STORE_NAME].hasSimilarAttractions,
            };
        },
        getDataToLoad: ( data ) => {
            return {
                hasSimilarAttractions: data.hasSimilarAttractions,
            };
        }
    }
};
