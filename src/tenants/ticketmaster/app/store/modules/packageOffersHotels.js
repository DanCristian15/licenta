import qs from 'qs';
import Vue from 'vue';
import apiServicePackageOffers from '@core/api/apiServicePackageOffers';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';
import HotelReservationModel from '@tenants/ticketmaster/app/models/HotelReservationModel';

const STORE_NAME = 'hotels';

const findRoomForSelectedHotelReservationRoom = ( list, hotelReservation ) => {
    let ret = null;

    list.forEach( item => {
        if ( item.id === hotelReservation.id ) {
            const room = item.rooms.find( room => {
                return room.rate.packageOffer.id === hotelReservation.selectedRoom.rate.packageOffer.id;
            } );

            if ( room ) {
                ret = room;
            }
        }
    } );

    return ret;
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list: [],
        loading: false,
        loadingCounter: 0
    },
    mutations: {
        setHotelList( state, data ) {
            state.list = [ ...data ];
        },
        selectRoom( state, { id, value } ) {
            const index = state.list.findIndex( item => item.id === id );

            if ( index !== -1 ) {
                Vue.set( state.list, index, {
                    ...state.list[ index ],
                    selectedRoom: value
                } );
            }
        },
        [ mutationTypes.START_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter + 1;
            state.loading = !!state.loadingCounter;
        },
        [ mutationTypes.STOP_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
            state.loading = !!state.loadingCounter;
        },
    },
    getters: {
        getLoading: state => {
            return state.loading;
        },
        findSameRoomForSelectedHotelReservationRoom: state => hotelReservation => {
            return findRoomForSelectedHotelReservationRoom( state.list, hotelReservation );
        },
        get: state => id => state.list.find( item => item.id === id ),
    },
    actions: {
        getByEventId: async ( { commit }, { eventId, ids, guestCount, sectionName } = { }, ) => {
            commit( mutationTypes.START_LOADING );
            commit( 'setHotelList', [ ] );

            const api = await apiServicePackageOffers( '' );
            const response = await api.packageOffers.hotelsByEventId( { eventId, ids, guestCount, sectionName }, {
                paramsSerializer: params => qs.stringify( params, { arrayFormat: 'repeat', indices: false } )
            } );

            if ( response.success ) {
                const hotels = response.data.list.map( item => {
                    const model = new HotelReservationModel( ).transform( item );
                    model.selectedRoom = model.rooms[ 0 ];

                    return model;
                } );
                commit( 'setHotelList', hotels );
                commit( mutationTypes.STOP_LOADING );
                return hotels;

            } else {
                LogService.debug( 'problem loading hotels by event ' + eventId );
                commit( mutationTypes.STOP_LOADING );
                return response;
            }
        },
        selectRoom( { commit }, { id, value } ) {
            commit( 'selectRoom', { id, value } );
        },
        updateWithSelectedItemIfMatch( { commit, getters }, hotelReservation ) {
            const room = getters.findSameRoomForSelectedHotelReservationRoom( hotelReservation );
            if ( room ) {
                const id = hotelReservation.id;

                commit ( 'selectRoom', { id, value: room } );
                return getters.get( id );
            }

            return false;
        }
    }
};
