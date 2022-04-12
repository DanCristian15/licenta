<template>
    <div class="gst-event-ticket-detail-sidebar u-height-100 d-flex flex-column">
        <EventTicketDetailSidebarHeader :ticket="ticket" :quantity="quantity" @close="$emit( 'close-ticket' )" />
        <EventTicketDetailSidebarTicketImage :ticket="ticket" />
        <div
            class="mb-4 text-center"
            :class="{
                'overflow-auto': seeMore
            }"
            :style="{ maxHeight: '200px' }">
            <div
                v-for="item in firstOfferItems"
                :key="item.offer.id"
                class="d-flex flex-row align-center u-width-100 mt-4">
                <TicketDetailOfferItem
                    :item="item"
                    :ticket="ticket"
                    :max-quantity="getMaxQuantityForOfferModelItem( item )"
                    :is-multiple-offers="offers.length > 1" />
            </div>
            <v-expand-transition>
                <div v-if="seeMore && hasMoreOfferItems" class="u-width-100">
                    <div
                        v-for="item in moreOfferItems"
                        :key="item.offer.id"
                        class="d-flex flex-row align-center u-width-100 mt-4">
                        <TicketDetailOfferItem
                            :item="item"
                            :ticket="ticket"
                            :max-quantity="getMaxQuantityForOfferModelItem( item )"
                            :is-multiple-offers="offers.length > 1" />
                    </div>
                </div>
            </v-expand-transition>
            <v-btn
                v-if="hasMoreOfferItems"
                text
                small
                shrink
                color="primary"
                class="gst-event-ticket-detail-sidebar__see-more-btn text-lowercase mx-auto"
                @click="seeMore = !seeMore">
                {{ seeMoreButtonText }}
            </v-btn>
        </div>
        <EventTicketDetailSidebarHotels
            :style="{'flex': 1, display: 'flex', 'min-height':0}"
            :hotel-reservation="hotelReservation"
            :tickets-quantity="quantity"
            :bundle-products="bundleProducts"
            :currency="currency"
            :bus-event-parent="busEventParent"
            @date-filter-opened="onDateFilterOpenedDo" />
        <EventTicketDetailSidebarFooter
            :quantity-tickets="sumQuantityOffersModel"
            :total-base-price="totalBasePrice.basePrice"
            :quantity-hotel-nights="hotelReservationNights"
            :currency="currency"
            :enable-submit="isSubmitEnabled"
            @submit="checkout" />
    </div>
</template>

<script>
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BundleProductsEventTicketModel from '@tenant/app/models/BundleProductsEventTicketModel';
    import BundleProductsHotelReservationModel from '@tenant/app/models/BundleProductsHotelReservationModel';
    import EventTicketDetailMixin from './EventTicketDetailMixin';
    import EventTicketDetailSidebarHeader from './EventTicketDetailSidebar/EventTicketDetailSidebarHeader';
    import EventTicketDetailSidebarTicketImage from './EventTicketDetailSidebar/EventTicketDetailSidebarTicketImage';
    import EventTicketDetailSidebarFooter from './EventTicketDetailSidebar/EventTicketDetailSidebarFooter';
    import EventTicketDetailSidebarHotels from './EventTicketDetailSidebar/EventTicketDetailSidebarHotels';
    import TicketDetailOfferItem from './components/TicketDetailOfferItem';

    const OFFERS_VIEW_LENGTH = 2;

    export default {
        name: 'EventTicketDetailSidebar',
        components: {
            EventTicketDetailSidebarHeader,
            EventTicketDetailSidebarTicketImage,
            EventTicketDetailSidebarFooter,
            TicketDetailOfferItem,
            EventTicketDetailSidebarHotels
        },
        mixins: [
            EventTicketDetailMixin,
        ],
        data() {
            return {
                seeMore: false,
                dateFilterOpened: false
            };
        },
        computed: {
            firstOfferItems( ) {
                return this.offersModel.length ? this.offersModel.slice( 0, OFFERS_VIEW_LENGTH ) : [ ];
            },
            moreOfferItems( ) {
                return this.offersModel.length > 2 ? this.offersModel.slice( OFFERS_VIEW_LENGTH ) : [ ];
            },
            hasMoreOfferItems( ) {
                return this.offersModel.length && this.offersModel.length > OFFERS_VIEW_LENGTH;
            },
            seeMoreButtonText( ) {
                return this.seeMore ? this.$t( '_common:buttons.seeLess' ) : this.$t( '_common:buttons.seeMore' );
            },
            bundleProducts( ) {
                const model = new BundleProductsModel(
                    new BundleProductsEventTicketModel(
                        { ...this.event },
                        { ...this.ticket },
                        null,
                        this.ticketsQuantity,
                        this.ticketsTotalBasePrice,
                        this.ticketsTotalBasePrice
                    )
                );

                const { hotelReservation } = this;
                if ( hotelReservation ) {
                    model.setHotelReservation( new BundleProductsHotelReservationModel(
                        hotelReservation.item
                    ) );
                }

                return model;
            },
            hotelReservationNights( ) {
                return this.bundleProducts.hotelReservation.quantity.nights;
            },
            totalBasePrice( ) {
                return this.bundleProducts.getTotals( );
            },
            isSubmitEnabled( ) {
                if ( this.dateFilterOpened ) {
                    return !!this.hotelReservation;
                }

                return this.canSubmit;
            }
        },
        methods: {
            onDateFilterOpenedDo( value ) {
                this.dateFilterOpened = value;
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-detail-sidebar {
        background: theme-color( 'white' );

        .gst-event-ticket-detail-sidebar__see-more-btn {
            @include font-size('s');
            @include line-height('xl');
        }
    }

    @include mobile-xs-only {
        .gst-event-ticket-detail-sidebar {
            position: fixed;
            top: 50px;
            height: calc( 100vh - 50px );
        }
    }
</style>
