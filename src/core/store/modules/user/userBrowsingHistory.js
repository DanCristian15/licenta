const STORE_NAME = 'browsingHistory';
import entityConstants from '@core/utils/constants/entity';
import {
    transformToTypeApi as entityUtilsTransformToTypeApi
} from '@core/utils/entityUtils';
import apiServiceUser from '@core/api/apiServiceUser';
import { normalizeEvent } from '@core/data/response/normalizeEvent';

const MAX_LAST_CITIES = 4;
const MAX_ENTITIES_PER_TYPE = 24;

const store = {
    name: STORE_NAME,
    namespaced: true,
    state: {
        cities: [ ],
        entities: [ ]
    },
    getters: {
        entitiesEventsAndAttraction: state => {
            return state.entities
                .filter( item => item.type === entityConstants.TYPES.EVENT || item.type === entityConstants.TYPES.ATTRACTION )
                .splice( 0, MAX_ENTITIES_PER_TYPE );
        }
    },
    mutations: {
        addCity ( state, city ) {
            state.cities = [
                city,
                ...( state.cities
                    .filter( item => item.name !== city.name && item.stateCode !== city.stateCode && item.countryCode !== city.countryCode )
                    .slice( 0, MAX_LAST_CITIES - 1 )
                )
            ];
        },
        addEntity ( state, { entityType, data } ) {
            const reducer = {
                totals: { },
                items: [ { type: entityType, data } ]
            };
            reducer.totals[ entityType ] = 1;
            state.entities.forEach( item => {
                if ( entityType !== item.type || data.id !== item.data.id && reducer.totals[ item.type ] < MAX_ENTITIES_PER_TYPE ) {
                    reducer.items.push( item );
                    reducer.totals[ item.type ] = reducer.totals[ entityType ] + 1;
                }
            } );

            state.entities = [ ...reducer.items ];

        },
        deleteEntity ( state, { entityType, entityId } ) {
            state.entities = state.entities
                .filter( item => entityType !== item.type || entityId !== item.data.id );
        }
    },
    actions: {
        addEntity( { commit }, { entityType, data } ) {
            commit( 'addEntity', { entityType, data } );
        },
        deleteEntity: async ( { commit }, { entityType, entityId } ) => {
            commit( 'deleteEntity', { entityType, entityId } );
            const api = await apiServiceUser( '' );
            api.user.deleteRecentlyViewed( [ { type: entityUtilsTransformToTypeApi( entityType ), id: entityId } ] );
        },
        addCity( { commit }, city ) {
            commit( 'addCity', city );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return state[ STORE_NAME ];
        },
        getDataToLoad: ( { cities = [ ], entities = [ ] } ) => {
            const now = new Date( );

            return {
                cities: cities,
                entities: entities
                    .map( item => {
                        if ( item.type === entityConstants.TYPES.EVENT ) {
                            return {
                                ...item,
                                data: normalizeEvent( item.data )
                            };
                        }
                        return item;
                    } )
                    .filter( item => {
                        if ( item.type === entityConstants.TYPES.EVENT ) {
                            const eventDate = item.data.startDateTimeAt || item.data.startDateTime;

                            return eventDate ? eventDate.getTime( ) > now.getTime( ) : false;
                        }

                        return true;
                    } )
            };
        }
    }
};


export default store;