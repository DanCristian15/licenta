import isEqual from 'lodash/isEqual';
import Schema from 'validate';
import searchHotelReservationConstants from '@core/utils/constants/searchHotelReservation';
import { parseString as dateUtilsParseString } from '@core/utils/dateUtils';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';
import Guests from '@/tenants/ticketmaster/app/models/GuestsModel';
import filtersStore from './addHotelReservationStateFilters';
import modalFiltersStore from './addHotelReservationStateModalFilters';
import hotelsStore from './addHotelReservationStateHotels';

const STORE_NAME = 'addHotelReservationState';
const DEFAULT_STATE = {
    context: {
        startDateTime: null,
        endDateTime: null,
        quantity: null,
        location: {
            latitude: null,
            longitude: null
        }
    }
};

export default {
    name: STORE_NAME,
    namespaced: true,
    modules: {
        filters: filtersStore,
        modalFilters: modalFiltersStore,
        hotels: hotelsStore
    },
    state: { ...DEFAULT_STATE },
    mutations: {
        [ mutationTypes.CLEAR ]( state ) {
            state.context = {
                startDateTime: null,
                endDateTime: null,
                quantity: null,
                location: {
                    latitude: null,
                    longitude: null,
                    range: searchHotelReservationConstants.DEFAULT.range
                },
            };
        },
        [ mutationTypes.UPDATE ]( state, value ) {
            state.context = {
                startDateTime: value.startDateTime,
                endDateTime: value.endDateTime,
                quantity: value.quantity,
                location: {
                    latitude: value.location.latitude,
                    longitude: value.location.longitude,
                },
                range: value.range
            };
        }
    },
    actions: {
        init( { state, commit, dispatch }, context = { } ) {
            const dispatchSubModuleAction = async ( name, arg ) => {
                await dispatch( `addHotelReservationState/${ name }`, arg, { root:true } );
            };
            const oldContext = state.context;
            const oldContextPeriodLocation = {
                startDateTime: oldContext.startDateTime ? oldContext.startDateTime.getTime( ) : null,
                endDateTime: oldContext.endDateTime ? oldContext.endDateTime.getTime( ) : null,
                location: oldContext.location,
            };
            const roomsCount = Math.max( Math.floor( context.quantity / 2 ), 1 );
            const contextPeriodLocation = {
                startDateTime: context.startDateTime ? context.startDateTime.getTime( ) : null,
                endDateTime: context.endDateTime ? context.endDateTime.getTime( ) : null,
                location: context.location
            };

            if ( !isEqual( oldContextPeriodLocation, contextPeriodLocation ) ) {
                dispatchSubModuleAction( 'filters/clear', null );
                dispatchSubModuleAction( 'filters/update', {
                    startDateTime: context.startDateTime,
                    endDateTime: context.endDateTime,
                    roomsCount,
                    guests: new Guests( context.quantity ),
                    location: context.location,
                    range: searchHotelReservationConstants.DEFAULT.range
                } );
                dispatchSubModuleAction( 'modalFilters/clear' );
                dispatchSubModuleAction( 'modalFilters/update', {
                    roomsCount,
                    guests: new Guests( context.quantity )
                } );
                dispatchSubModuleAction( 'hotels/clear' );
            } else if ( oldContext.quantity !== context.quantity ) {
                dispatchSubModuleAction( 'filters/update', {
                    guests: new Guests( context.quantity, 0, [ ] ),
                    roomsCount,
                } );
                dispatchSubModuleAction( 'modalFilters/clear' );
                dispatchSubModuleAction( 'modalFilters/update', {
                    guests: new Guests( context.quantity, 0, [ ] ),
                    roomsCount,
                } );
                dispatchSubModuleAction( 'hotels/clear' );
            }

            commit( mutationTypes.UPDATE, context );
        },
        resetFilters( { state, dispatch } ) {
            const dispatchSubModuleAction = async ( name, arg ) => {
                await dispatch( `addHotelReservationState/${ name }`, arg, { root:true } );
            };

            dispatchSubModuleAction( 'filters/clear', null );
            dispatchSubModuleAction( 'filters/update', {
                startDateTime: state.context.startDateTime,
                endDateTime: state.context.endDateTime,
                roomsCount: Math.max( Math.floor( state.context.quantity / 2 ), 1 ),
                guests: new Guests( state.context.quantity ),
                location: state.context.location,
                range: searchHotelReservationConstants.DEFAULT.range
            } );

            dispatchSubModuleAction( 'modalFilters/clear' );
            dispatchSubModuleAction( 'modalFilters/update', {
                roomsCount: Math.max( Math.floor( state.context.quantity / 2 ), 1 ),
                guests: new Guests( state.context.quantity )
            } );
        },
        resetModalFilters( { state, dispatch } ) {
            const dispatchSubModuleAction = async ( name, arg ) => {
                await dispatch( `addHotelReservationState/${ name }`, arg, { root:true } );
            };

            dispatchSubModuleAction( 'modalFilters/clear' );
            dispatchSubModuleAction( 'modalFilters/update', {
                roomsCount: 1,
                guests: new Guests( state.context.quantity )
            } );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];

            return {
                context: storeState.context,
                filters: filtersStore._persistent.getDataToSave( storeState ),
                modalFilters: modalFiltersStore._persistent.getDataToSave( storeState )
            };
        },
        getDataToLoad: ( data ) => {
            try {
                const schema = new Schema( {
                    context: {
                        startDateTime: {
                            type: String,
                            required: true,
                            use: {
                                dateString: ( val ) => !!dateUtilsParseString( val )
                            }
                        },
                        endDateTime: {
                            type: String,
                            required: true,
                            use: {
                                dateString: ( val ) => !!dateUtilsParseString( val )
                            }
                        },
                        quantity: {
                            type: Number,
                            size: { min: 1 }
                        },
                        location: {
                            latitude: {
                                type: String,
                                required: true
                            },
                            longitude: {
                                type: String,
                                required: true
                            }
                        },
                    },
                    filters: {
                        startDateTime: {
                            type: String,
                            required: true,
                            use: {
                                dateString: ( val ) => !!dateUtilsParseString( val )
                            }
                        },
                        endDateTime: {
                            type: String,
                            required: true,
                            use: {
                                dateString: ( val ) => !!dateUtilsParseString( val )
                            }
                        },
                        guests: {
                            adultsCount: {
                                type: Number,
                                size: { min: 1 }
                            },
                            childrenCount: {
                                type: Number,
                            },
                            childAges: {
                                type: Array,
                            }
                        },
                        roomsCount: {
                            type: Number,
                            required: true,
                            size: { min: 1 }
                        },
                        location: {
                            latitude: {
                                type: String,
                                required: true
                            },
                            longitude: {
                                type: String,
                                required: true
                            }
                        }
                    },
                    modalFilters: {
                        guests: {
                            adultsCount: {
                                type: Number,
                                size: { min: 1 }
                            },
                            childrenCount: {
                                type: Number,
                            },
                            childAges: {
                                type: Array,
                            }
                        },
                        roomsCount: {
                            type: Number,
                            size: { min: 1 }
                        }
                    }
                } );

                if ( !data || schema.validate( data ).length ) {
                    return null;
                }

                const { context, filters, modalFilters } = data;

                return {
                    context: {
                        startDateTime: new Date( context.startDateTime ),
                        endDateTime: new Date( context.endDateTime ),
                        quantity: context.quantity,
                        location: {
                            latitude: context.location.latitude,
                            longitude: context.location.longitude,
                        }
                    },
                    filters: filtersStore._persistent.getDataToLoad( filters ),
                    modalFilters: modalFiltersStore._persistent.getDataToLoad( modalFilters )
                };
            } catch ( e ) {
                LogService.error( `Vuex state cannot be loaded - AddReservationState Store: ${ e }` );
                return null;
            }
        }
    }
};