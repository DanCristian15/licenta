<template>
    <div class="gst-add-hotel-reservation u-height-100 u-width-100 d-flex flex-column">
        <AddHotelReservationHeader
            :start-date-time="startDateTime"
            :end-date-time="endDateTime"
            :value="value"
            :allow-update="false">
            <template v-slot:title>
                {{ `${$t( '_common:terms.hotel' )} + ${$t( '_common:terms.ticket_plural' )}` }}
            </template>
        </AddHotelReservationHeader>
        <HotelsList
            v-if="!value || ( value && loading )"
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
    import GuestsModel from '@tenants/ticketmaster/app/models/GuestsModel';
    import HotelsList from './AddHotelReservationPackageOffer/HotelsList';
    import HotelSelectedCard from './common/HotelSelectedCard';
    import AddHotelReservationHeader from './common/Header';

    const STORE_NAME = 'packageOffers';

    export default {
        name: 'AddHotelReservationPackageOffer',
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
                loading: state => state[ STORE_NAME].hotels.loading
            } ),
            hasValue( ) {
                return !!this.value;
            },
            showNoData ( ) {
                return !this.list.length;
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
                'getHotelsByEventId': `${STORE_NAME}/hotels/getByEventId`,
                'updateHotelsWithSelectedItemIfMatch': `${STORE_NAME}/hotels/updateWithSelectedItemIfMatch`
            } ),
            async initiate( ) {
                const { value } = this;

                await this.getHotelsByEventId( {
                    eventId: this.bundleProducts.eventTicket.event.id,
                    guestCount: this.quantity,
                    ids: this.bundleProducts.eventTicket.section.packageOffersIds,
                } );

                if ( value ) {
                    const newValue = await this.updateHotelsWithSelectedItemIfMatch( value.item );
                    if ( newValue ) {
                        this.addItem( newValue );
                    } else {
                        this.removeItem( );
                    }
                }

            },
            openItemDetails( item ) {
                const modal = import( '../modal/HotelDetailsModalBundle' );

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
                const componentProps = { item, bundleProducts: this.bundleProductsFinal, hasValue: this.hasValue, busEventsParent: !this.hasValue ? this.busEvents : this.busEventsSelected };

                if( this.$vuetify.breakpoint.mdAndUp ) {
                    this.$modal.show( modal, componentProps, props );
                } else {
                    this.$modal.showBottom( modal, componentProps, mobileProps );
                }
            },
            addItem( item ) {
                this.$emit( 'input', {
                    item: item,
                    startDateTime:  this.startDateTime,
                    endDateTime:    this.endDateTime,
                    guests:         new GuestsModel( this.quantity ),
                    roomsCount:     Math.floor( this.quantity / 2 )
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
