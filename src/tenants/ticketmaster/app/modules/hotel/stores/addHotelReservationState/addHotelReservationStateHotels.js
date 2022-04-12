import Vue from 'vue';
import isEqual from 'lodash/isEqual';
import HotelReservationModel from '@tenant/app/models/HotelReservationModel';
import apiHotelService from '@tenant/app/api/apiHotelService';
import searchHotelReservationConstants from '@core/utils/constants/searchHotelReservation';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';

const STORE_NAME = 'hotels';
import Guests from '@/tenants/ticketmaster/app/models/GuestsModel';

let loadPageCancelRequest;

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        loading:                    false,
        loadingCounter              : 0,
        list:                       [ ],
        allItemsLoaded:             false,
        timestamp:                  0,
        pageSize:                   searchHotelReservationConstants.DEFAULT.pageSize,
        realOffset:                     0,
        filters: {
            location: {
                latitude:                   0,
                longitude:                  0,
            },
            range:                      searchHotelReservationConstants.DEFAULT.range,
            startDateTime:              null,
            endDateTime:                null,
            guests:                     new Guests( ),
            roomsCount:                 1
        }
    },
    mutations: {
        [ mutationTypes.START_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter + 1;
            state.loading = !!state.loadingCounter;
        },
        [ mutationTypes.STOP_LOADING ] ( state ) {
            state.loadingCounter = state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
            state.loading = !!state.loadingCounter;
        },
        [ mutationTypes.APPEND_TO_LIST ] ( state, { data } ) {
            state.timestamp = new Date( ).getTime( );
            state.list = [
                ...state.list,
                ...data.map( item => {
                    const model = new HotelReservationModel( ).transform( item );
                    model.selectedRoom = model.rooms[ 0 ];

                    return model;
                } )
            ];
        },
        setRealOffset ( state, value ) {
            state.realOffset = value;
        },
        [ mutationTypes.SET_ALL_ITEMS_LOADED ] ( state, value ) {
            state.allItemsLoaded = value;
        },
        [ mutationTypes.UPDATE_FILTERS ] ( state, filters ) {
            state.filters = { ...filters };
        },
        [ mutationTypes.CLEAR_LIST ] ( state ) {
            state.timestamp = null;
            state.list = [ ];
            state.allItemsLoaded = false;
        },
        [ mutationTypes.CLEAR ]( state ) {
            state.loading = false;
            state.loadingCounter = 0;
            state.list = [ ],
            state.allItemsLoaded = false,
            state.timestamp =          0,
            state.pageSize =           searchHotelReservationConstants.DEFAULT.pageSize,
            state.realOffset =          0,
            state.filters = {
                location: {
                    latitude:           0,
                    longitude:          0,
                },
                range:              searchHotelReservationConstants.DEFAULT.range,
                startDateTime:      null,
                endDateTime:        null,
                guests:             new Guests( ),
                roomsCount:         1
            };
        },
        selectRoom( state, { id, value } ) {
            const index = state.list.findIndex( item => item.id === id );

            if ( index !== -1 ) {
                Vue.set( state.list, index, {
                    ...state.list[ index ],
                    selectedRoom: value
                } );
            }
        }
    },
    actions: {
        loadPage: async ( { commit, state }, { refresh = false, filters = { } } ) => {
            commit( mutationTypes.START_LOADING );
            const api = await apiHotelService( '' );

            if ( refresh || !isEqual( { ...filters }, { ...state.filters } ) ) {
                !loadPageCancelRequest || loadPageCancelRequest.cancel( );
                commit( mutationTypes.CLEAR_LIST );
                commit( mutationTypes.UPDATE_FILTERS, filters );
                commit( 'setRealOffset', 0 );
            }
            loadPageCancelRequest = api.getCancelRequest( );

            const response = await api.hotels.get(
                {
                    offset:         state.realOffset || state.list.length,
                    limit:          state.pageSize + 1
                },
                {
                    startDate:      filters.startDateTime,
                    endDate:        filters.endDateTime,
                    longitude:      filters.location.longitude,
                    latitude:       filters.location.latitude,
                    guests:         filters.guests,
                    roomsCount:     filters.roomsCount,
                    range:          filters.range
                },
                {
                    cancelToken: loadPageCancelRequest.token
                }
            );

            if ( response.success ) {
                const list = response.data.items;
                if ( list.length < state.pageSize + 1 ) {
                    commit( mutationTypes.SET_ALL_ITEMS_LOADED, true );
                } else {
                    list.pop( );
                }
                commit( mutationTypes.APPEND_TO_LIST, { data: list } );
                commit( mutationTypes.STOP_LOADING );
                commit( 'setRealOffset', response.data.offset );
                return state.list;
            } else {
                LogService.debug( 'problem loading hotels' );
                commit( mutationTypes.STOP_LOADING );
                return response;
            }
        },
        loadOne: async ( { commit }, { filters = { }, id, dataProvider } ) => {
            commit( mutationTypes.START_LOADING );
            const api = await apiHotelService( '' );
            const response = await api.hotels.one(
                id,
                {
                    startDate:      filters.startDateTime,
                    endDate:        filters.endDateTime,
                    guests:         filters.guests,
                    roomsCount:     filters.roomsCount,
                },
                dataProvider
            );
            if ( response.success ) {
                commit( mutationTypes.STOP_LOADING );
                const model = new HotelReservationModel( ).transform( response.data );
                model.selectedRoom = model.rooms[ 0 ];

                return model;
            } else {
                LogService.debug( 'problem loading hotels' );
                commit( mutationTypes.STOP_LOADING );
                return null;
            }
        },
        selectRoom( { commit }, { id, value } ) {
            commit( 'selectRoom', { id, value } );
        },
        clear( { commit } ) {
            commit( mutationTypes.CLEAR );
        }
    }
};
