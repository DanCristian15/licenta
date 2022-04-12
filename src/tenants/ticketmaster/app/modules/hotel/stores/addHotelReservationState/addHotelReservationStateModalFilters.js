import GuestsModel from '@tenant/app/models/GuestsModel';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';

const STORE_NAME = 'modalFilters';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        guests: new GuestsModel(),
        roomsCount: 1
    },
    mutations: {
        update( state, { guests, roomsCount } ) {
            state.guests = guests;
            state.roomsCount = roomsCount;
        },
        [ mutationTypes.CLEAR ]( state ) {
            state.guests = new GuestsModel( );
            state.roomsCount = 1;
        }
    },
    actions: {
        update( { commit }, { guests, roomsCount } ) {
            commit( 'update', { guests, roomsCount } );
        },
        clear( { commit } ) {
            commit( mutationTypes.CLEAR );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const storeState = state[ STORE_NAME ];

            return {
                guests: storeState.guests,
                roomsCount: storeState.roomsCount
            };
        },
        getDataToLoad: ( data ) => {
            data = data || { };

            return {
                guests: new GuestsModel( data.guests.adultsCount, data.guests.childrenCount, data.guests.childAges ),
                roomsCount: data.roomsCount,
            };

        }
    }
};

