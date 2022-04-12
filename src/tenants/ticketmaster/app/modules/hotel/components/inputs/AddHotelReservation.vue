<template>
    <div class="gst-add-hotel-reservation u-height-100 u-width-100 d-flex flex-column">
        <AddHotelReservationHeader
            :start-date-time="startDateTimeFilters"
            :end-date-time="endDateTimeFilters"
            :value="value"
            :allow-update="!hasValue"
            @date-filter-opened="$emit('date-filter-opened', $event)" />
        <HotelsList
            v-if="!hasValue"
            :style="{'flex': 1, display: 'flex', 'min-height':0}"
            :distance-unit-of-measure="distanceUnitOfMeasure"
            :in-location="inLocation"
            :bundle-products="bundleProductsFinal"
            :bus-events-parent="busEvents" />
        <HotelSelectedCard
            v-else
            :distance-unit-of-measure="distanceUnitOfMeasure"
            :in-location="inLocation"
            :bundle-products="bundleProducts"
            :bus-events-parent="busEventsSelected"
            :item="value.item" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState } from 'vuex';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BundleProductsHotelReservationModel from '@/tenants/ticketmaster/app/models/BundleProductsHotelReservationModel';
    import DynamicStoreModule from '@core/mixins/DynamicStoreModule';
    import HotelsList from './AddHotelReservation/HotelsList';
    import HotelSelectedCard from './common/HotelSelectedCard';
    import AddHotelReservationHeader from './common/Header';

    const STORE_NAME = 'addHotelReservationState';

    export default {
        name: 'AddHotelReservation',
        components: {
            AddHotelReservationHeader,
            HotelsList,
            HotelSelectedCard
        },
        mixins: [
            DynamicStoreModule
        ],
        props: {
            value: {
                type: Object,
                default: null
            },
            startDateTime: {
                type: Date,
                required: true
            },
            endDateTime: {
                type: Date,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            distanceUnitOfMeasure: {
                type: String,
                required: true
            },
            inLocation: {
                type: Object,
                default: function( ) {
                    return {
                        latitude: 0,
                        longitude: 0,
                        name: ''
                    };
                }
            },
            bundleProducts: {
                type: Object,
                default: function( ) {
                    return new BundleProductsModel( );
                }
            },
        },
        data( ) {
            return {
                busEvents: new Vue( ),
                busEventsSelected: new Vue( )
            };
        },
        computed: {
            ...mapState( {
                list: state => state[ STORE_NAME ].hotels.list,
                loading: state => state[ STORE_NAME ].hotels.loading,
                listFilters: state => state[ STORE_NAME ].hotels.filters,
                startDateTimeFilters: state => state[STORE_NAME].filters.startDateTime,
                endDateTimeFilters: state => state[STORE_NAME].filters.endDateTime,
            } ),
            hasValue( ) {
                return !!this.value;
            },
            showNoData ( ) {
                return !this.loading && !this.list.length;
            },
            bundleProductsFinal( ) {
                const ret = this.bundleProducts._clone();

                ret.setHotelReservation(
                    new BundleProductsHotelReservationModel (
                        ret.hotelReservation.hotel
                    )
                );

                return ret;
            }
        },
        methods: {
            ...mapActions( {
                'init': `${STORE_NAME}/init`,
                'resetFilters': `${STORE_NAME}/resetFilters`
            } ),
            initiate( ) {
                const { startDateTime, endDateTime, quantity, inLocation } = this;

                this.init( {
                    startDateTime,
                    endDateTime,
                    quantity,
                    location: {
                        latitude: inLocation.latitude,
                        longitude: inLocation.longitude
                    }
                } );
            },
            openItemDetails( item ) {
                const modal = import( '../modal/HotelDetailsModal' );

                const mobileProps = {
                    'content-class': 'v-dialog__height-90 gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    transition: 'dialog-bottom-transition'
                };

                const props = {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    persistent: false,
                    'hide-overlay': false,
                    'max-width': 920,
                    'content-class': 'gst-v-dialog'
                };
                const componentProps = { item, bundleProducts: this.bundleProductsFinal, hasValue: this.hasValue,   busEventsParent: !this.hasValue ? this.busEvents : this.busEventsSelected };

                if( this.$vuetify.breakpoint.mdAndUp ) {
                    this.$modal.show( modal, componentProps, props );
                } else {
                    this.$modal.showBottom( modal, componentProps, mobileProps );
                }
            },
            addItem( item, accommodation ) {
                /**
                 * $emit input and that needs to be add to the bundle products
                 * parameter - hotel item -> and inside item.room is the selected room
                 */

                const { listFilters } = this;

                this.$emit( 'input', {
                    item: item,
                    startDateTime: accommodation ? accommodation.startDateTime : listFilters.startDateTime,
                    endDateTime: accommodation ? accommodation.endDateTime : listFilters.endDateTime,
                    guests: accommodation ? accommodation.guests : listFilters.guests,
                    roomsCount: accommodation ? accommodation.roomsCount : listFilters.roomsCount
                } );
            },
            removeItem( ) {
                this.$emit( 'input', null );
            },
            changeRoomItem( { value } ) {
                const { item, ...accommodation } = this.value;

                this.addItem(
                    {
                        ...item,
                        selectedRoom: value
                    },
                    accommodation
                );
            }
        },
        mounted( ) {
            this.busEvents.$on( 'open-item-details', this.openItemDetails );
            this.busEvents.$on( 'add-item', this.addItem );
            this.busEventsSelected.$on( 'add-item', this.addItem );
            this.busEventsSelected.$on( 'remove-item', this.removeItem );
            this.busEventsSelected.$on( 'change-room', this.changeRoomItem );
            this.busEventsSelected.$on( 'open-item-details', this.openItemDetails );
        },
        created( ) {
            this.initiate( );
        },
        destroyed( ) {
            this.busEvents.$off( 'open-item-details' );
            this.busEvents.$off( 'add-item' );
            this.busEventsSelected.$off( 'remove-item' );
            this.busEventsSelected.$off( 'change-room' );
            this.busEventsSelected.$off( 'open-item-details' );
        }
    };
</script>
