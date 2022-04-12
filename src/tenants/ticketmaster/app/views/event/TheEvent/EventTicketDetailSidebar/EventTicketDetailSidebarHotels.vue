<template>
    <AddHotelReservation
        :value="hotelReservation"
        :start-date-time="event.startDateTime"
        :end-date-time="endDateReservation"
        :quantity="ticketsQuantity"
        :in-location="venueLocation"
        :distance-unit-of-measure="distanceUnitOfMeasure"
        :bundle-products="bundleProducts"
        @date-filter-opened="$emit('date-filter-opened', $event)"
        @input="onInputDo" />
</template>

<script>
    import AddHotelReservation from '@tenant/app/modules/hotel/components/inputs/AddHotelReservation';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import { getDistanceUnitOfMeasureForCountry } from '@core/utils/measureUtils';
    import { addDays } from '@core/utils/dateUtils';

    export default {
        name:  'EventTicketDetailSidebarHotels',
        components: {
            AddHotelReservation
        },
        props: {
            hotelReservation: {
                type: Object,
                default: null
            },
            ticketsQuantity: {
                type: Number,
                default: 0
            },
            currency: {
                type: String,
                default: 'USD'
            },
            enableSubmit: {
                type: Boolean,
                default: false
            },
            busEventParent: {
                type: Object,
                required: true
            },
            bundleProducts: {
                type: Object,
                default: function ( ) {
                    return new BundleProductsModel( );
                }
            }
        },
        computed: {
            event( ) {
                return this.bundleProducts.eventTicket.event;
            },
            endDateReservation( ) {
                const { startDateTime, endDateTime } = this.event;


                return addDays( endDateTime || startDateTime, 1 );
            },
            venueLocation( ) {
                const { venueCity, venueCountry, venueName, venueState, venueStreet, venueLatitude, venueLongitude } = this.event;

                return {
                    name: venueName,
                    stateCode: venueState,
                    countryCode: venueCountry,
                    city: venueCity,
                    street: venueStreet,
                    latitude: venueLatitude,
                    longitude: venueLongitude
                };
            },
            distanceUnitOfMeasure( ) {
                return getDistanceUnitOfMeasureForCountry ( this.venueLocation.countryCode );
            },
        },
        methods: {
            onInputDo( item ) {
                this.busEventParent.$emit( 'set-hotel-reservation', item );
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-detail-sidebar-footer {
        background: theme-color( 'quinary' );
        border-top: 1px solid theme-color-hex( 'senary-darken-2' );

        .gst-event-ticket-detail-sidebar-footer__quantity {
            @include font-size('s');
            @include font-weight('regular');
            @include line-height('xl');

            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-detail-sidebar-footer__price {
            @include font-size('l');
            @include font-weight('bold');
            @include line-height('xl');

            color: theme-color( 'primary' );
        }

        .gst-event-ticket-detail-sidebar-footer__submit-btn {
            @include font-size('s');
            @include font-weight('large');

            text-transform: capitalize;
        }
    }
</style>
