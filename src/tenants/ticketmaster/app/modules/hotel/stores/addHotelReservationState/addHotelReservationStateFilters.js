import GuestsModel from '@tenant/app/models/GuestsModel';
import searchHotelReservationConstants from '@core/utils/constants/searchHotelReservation';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';

const STORE_NAME = 'filters';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        startDateTime: null,
        endDateTime: null,
        guests: new GuestsModel(),
        roomsCount: 1,
        location: {
            latitude: null,
            longitude: null,
        },
        range: searchHotelReservationConstants.DEFAULT.range
    },
    mutations: {
        update( state, filters ) {
            if ( filters.hasOwnProperty( 'startDateTime' ) ) {
                state.startDateTime = filters.startDateTime;
            }
            if ( filters.hasOwnProperty( 'endDateTime' ) ) {
                state.endDateTime = filters.endDateTime;
            }
            if ( filters.hasOwnProperty( 'guests' ) ) {
                state.guests = filters.guests;
            }
            if ( filters.hasOwnProperty( 'roomsCount' ) ) {
                state.roomsCount = filters.roomsCount;
            }
            if ( filters.hasOwnProperty( 'location' ) ) {
                state.location = filters.location;
            }
            if ( filters.hasOwnProperty( 'range' ) ) {
                state.range = filters.range;
            }

        },
        [ mutationTypes.CLEAR ]( state ) {
            state.startDateTime = null;
            state.endDateTime = null;
            state.guests = new GuestsModel( );
            state.roomsCount = 1;
            state.location = {
                latitude: 0,
                longitude: 0,
            };
            state.range = searchHotelReservationConstants.DEFAULT.range;
        }
    },
    actions: {
        update( { commit }, filters ) {
            commit( 'update', filters );
        },
        clear( { commit } ) {
            commit( mutationTypes.CLEAR );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];

            return {
                startDateTime: storeState.startDateTime,
                endDateTime: storeState.endDateTime,
                guests: storeState.guests,
                roomsCount: storeState.roomsCount,
                location: {
                    latitude: storeState.location.latitude,
                    longitude: storeState.location.longitude,
                },
            };
        },
        getDataToLoad: ( data ) => {
            data = data || { };

            return {
                startDateTime: new Date( data.startDateTime ),
                endDateTime: new Date( data.endDateTime ),
                guests: new GuestsModel( data.guests.adultsCount, data.guests.childrenCount, data.guests.childAges ),
                roomsCount: data.roomsCount,
                location: {
                    latitude:  data.location.latitude,
                    longitude: data.location.longitude,
                }
            };

        }
    }
};

