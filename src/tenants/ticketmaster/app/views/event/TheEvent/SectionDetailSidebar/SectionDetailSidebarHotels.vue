<template>
    <AddHotelReservationPackageOffer
        :value="hotelReservation"
        :start-date-time="event.startDateTime"
        :end-date-time="endDateReservation"
        :quantity="ticketsQuantity"
        :in-location="venueLocation"
        :distance-unit-of-measure="distanceUnitOfMeasure"
        :bundle-products="bundleProducts"
        @input="onInputDo" />
</template>

<script>
    import AddHotelReservationPackageOffer
        from '@tenant/app/modules/hotel/components/inputs/AddHotelReservationPackageOffer';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import { getDistanceUnitOfMeasureForCountry } from '@core/utils/measureUtils';
    import { addDays } from '@core/utils/dateUtils';

    export default {
        name:  'SectionDetailSidebarHotels',
        components: {
            AddHotelReservationPackageOffer
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
            line-height: line-height( 'xl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-event-ticket-detail-sidebar-footer__price {
            line-height: line-height( 'xl' );
            color: theme-color( 'primary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'bold' );
        }

        .gst-event-ticket-detail-sidebar-footer__submit-btn {
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            text-transform: capitalize;
        }
    }
</style>
