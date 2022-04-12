<template>
    <div class="hotel-details-rooms-tab">
        <div class="hotel-details-rooms-tab__filters">
            <HotelDetailsRoomFilters :item="item" />
        </div>
        <DataLoading v-if="loading" />
        <HotelsNoData v-else-if="showNoData" @reset-filters="resetFilters" />
        <div v-else>
            <RoomCardVariant2
                v-for="room in item.rooms"
                :key="room.id"
                :item="room"
                :bundle-products="bundleProductsFinal"
                :selected="isSelected(room , selectedRoom)"
                :class="{
                    'gst-hotel-details-modal-rooms__card--selected': isSelected(room, selectedRoom)
                }"
                class="gst-room-dropdown__modal-card mb-2"
                @click="select( room )" />
        </div>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import isEqual from 'lodash/isEqual';
    import omit from 'lodash/omit';
    import HotelsNoData from '@tenant/app/modules/hotel/components/inputs/common/HotelsNoData';
    import HotelRoom from '@/tenants/ticketmaster/app/models/HotelReservationRoomModel';
    import BundleProductsHotelReservationModel from '@/tenants/ticketmaster/app/models/BundleProductsHotelReservationModel';
    import RoomCardVariant2 from '../../../cards/RoomCardVariant2';
    import HotelDetailsRoomFilters from './HotelDetailsRoomFilters';

    const STORE_NAME = 'addHotelReservationState';

    export default {
        name: 'HotelDetailsModalRoomsTab',
        components: {
            HotelsNoData,
            HotelDetailsRoomFilters,
            RoomCardVariant2,
            DataLoading
        },
        props: {
            item: {
                type: Object,
                default: function ( ) {
                    return new HotelRoom( );
                }
            },
            value: {
                type: Object,
                default: function ( ) {
                    return new HotelRoom( );
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            bundleProducts: {
                type: Object,
                default: null
            },
            busEventsParent: {
                type: Object,
                default: null
            },
            hasValue: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selectedRoom: this.item.selectedRoom,
                selecting: false,
            };
        },
        computed: {
            ...mapState( {
                filters: state => state[STORE_NAME].filters,
                modalFilters: state => state[STORE_NAME].modalFilters,
            } ),
            showNoData( ) {
                return !this.loading &&  !this.item.rooms.length;
            },
            bundleProductsFinal( ) {
                const ret = this.bundleProducts._clone( );

                ret.setHotelReservation(
                    new BundleProductsHotelReservationModel (
                        this.item
                    )
                );

                return ret;
            }
        },
        methods: {
            ...mapActions( {
                'resetFilters': `${STORE_NAME}/resetFilters`
            } ),
            select( room ) {
                if ( this.selecting ) {
                    return;
                }
                this.selecting = true;
                this.selectedRoom = room;

                this.busEventsParent.$emit( 'add-item', {
                    ...this.item,
                    selectedRoom: room
                }, {
                    startDateTime: this.filters.startDateTime,
                    endDateTime: this.filters.endDateTime,
                    guests: this.modalFilters.guests,
                    roomsCount: this.modalFilters.roomsCount
                } );

                setTimeout( () => this.$emit( 'close' ), 500 );
            },
            isSelected( room ) {
                return isEqual( omit( room, [ 'rate', 'id' ] ), omit( this.selectedRoom, [ 'rate', 'id' ] )  );
            }
        }
    };
</script>
