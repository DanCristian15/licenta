<template>
    <div class="gst-section-detail-sidebar u-height-100 d-flex flex-column">
        <SectionDetailSidebarHeader :section="section" :quantity="quantity" @close="$emit( 'close-ticket' )" />
        <SectionDetailsSidebarImage :section="section" :quantity="quantity" />
        <SectionDetailSidebarHotels
            :style="{'flex': 1, display: 'flex', 'min-height':0}"
            :hotel-reservation="hotelReservation"
            :tickets-quantity="quantity"
            :bundle-products="bundleProducts"
            :currency="currency"
            :bus-event-parent="busEventParent" />
        <SectionDetailSidebarFooter
            :quantity-tickets="quantityTickets"
            :quantity-rooms="quantityRooms"
            :currency="currency"
            :total-base-price="totalBasePrice.basePrice"
            :enable-submit="canSubmit"
            @submit="checkout" />
    </div>
</template>

<script>
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BundleProductsEventTicketModel from '@tenant/app/models/BundleProductsEventTicketModel';
    import BundleProductsHotelReservationModel from '@tenant/app/models/BundleProductsHotelReservationModel';
    import SectionDetailSidebarHeader from './SectionDetailSidebar/SectionDetailSidebarHeader';
    import SectionDetailsSidebarImage from './SectionDetailSidebar/SectionDetailSidebarImage';
    import SectionDetailSidebarFooter from './SectionDetailSidebar/SectionDetailSidebarFooter';
    import SectionDetailSidebarHotels from './SectionDetailSidebar/SectionDetailSidebarHotels';

    export default {
        name: 'SectionDetailSidebar',
        components: {
            SectionDetailSidebarHeader,
            SectionDetailsSidebarImage,
            SectionDetailSidebarFooter,
            SectionDetailSidebarHotels
        },
        mixins: [
        ],
        props: {
            section: {
                type: Object,
                required: true,
            },
            hotelReservation: {
                type: Object,
                default: null,
            },
            event: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            busEventParent: {
                type: Object,
                required: true
            },
            venueDetails: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                seeMore: false
            };
        },
        computed: {

            bundleProducts( ) {
                const eventTicketModelWithSection = new BundleProductsEventTicketModel(
                    { ...this.event },
                    null,
                    { ...this.section },
                    this.quantity,
                    0,
                    0
                );

                const model = new BundleProductsModel(
                    eventTicketModelWithSection
                );

                const { hotelReservation } = this;
                if ( hotelReservation ) {
                    model.setHotelReservation( new BundleProductsHotelReservationModel(
                        hotelReservation.item
                    ) );
                }

                return model;
            },
            currency( ) {
                return this.section.currency;
            },
            hotelReservationNights( ) {
                return this.bundleProducts.hotelReservation.quantity.nights;
            },
            totalBasePrice( ) {
                return this.bundleProducts.getTotals( );
            },
            quantityTickets( ) {
                return this.quantity;
            },
            quantityRooms( ) {
                if ( this.hotelReservation ) {
                    return this.hotelReservation.roomsCount;
                }
                return 0;
            },
            canSubmit( ) {
                return !!this.hotelReservation;
            },
        },
        methods:  {
            checkout() {
                const { section, hotelReservation, event, quantity, venueDetails } = this;
                const hotel = hotelReservation.item;
                const room = hotel.selectedRoom;
                const packageOffer = room.rate.packageOffer;

                let payload = {
                    ticket: {
                        eventId:                event.id,
                        offers:                 [ {
                            ticketTypeId:       packageOffer.ticketTypeId,
                            quantity
                        } ],
                        section:                section.section,
                        venueSeatMapUrl:        section.venueSeatMapUrl,
                        venueMapUrl:            venueDetails.mapUrl
                    },
                    hotelReservation: {
                        hotel,
                        room,
                        accommodation: {
                            startDateTime:  hotelReservation.startDateTime,
                            endDateTime:    hotelReservation.endDateTime,
                            roomsCount:     hotelReservation.roomsCount,
                            guests:         hotelReservation.guests,
                        },
                    },
                    bundleProducts: {
                        id: packageOffer.id
                    }
                };
                this.busEventParent.$emit( 'checkout', payload );
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-section-detail-sidebar {
        background: theme-color( 'white' );

        .gst-section-detail-sidebar__see-more-btn {
            line-height: line-height( 'xl' );
            font-size: font-size( 's' );
        }
    }

    @include mobile-xs-only {
        .gst-section-detail-sidebar {
            position: fixed;
            top: 50px;
            height: calc( 100vh - 50px );
        }
    }
</style>
