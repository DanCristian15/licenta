<template>
    <v-card class="d-flex flex-column gst-event-ticket-modal rounded-t-lg">
        <HeaderVariant2 class="mb-3" @close="$emit('close')">
            <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex align-center mr-5">
                <TenantLogo class="mr-2" />
            </div>
        </HeaderVariant2>
        <v-card-text class="flex-grow-0 content-max-width px-4 pb-0">
            <v-row class="d-flex flex-row">
                <v-col class="d-flex flex-column py-0" xs="12">
                    <EventTicketVenueImage
                        v-if="!$vuetify.breakpoint.mdAndUp"
                        :preview="true"
                        class="mb-4"
                        :image-props="{
                            src: ticket.venueSeatMapUrl,
                            height: '20vh',
                            width: '100%',
                            contain: true
                        }" />
                </v-col>
            </v-row>
            <v-flex class="d-flex flex-column py-0" xs="12">
                <TicketCardVariantThree
                    :ticket="ticket"
                    :quantity="quantity"
                    class="pa-0" />
            </v-flex>
            <v-flex class="d-flex flex-column py-4" xs="12">
                <TicketDateIcon class="mb-4 gst-event-ticket-detail-content__ticket-date-icon" :start-date-time="event.startDateTime" :end-date-time="event.endDateTime" :has-start-time="event.hasStartTime" />
                <TicketLocationIcon
                    :venue="venueInfoLocation"
                    class="gst-event-ticket-detail-content__ticket-location-icon" />
            </v-flex>
            <v-divider />
            <v-layout
                row
                wrap
                class="pt-4 pb-2 mx-0">
                <v-flex
                    v-for="item in offersModel"
                    :key="item.offer.id"
                    d-flex
                    flex-row
                    align-center
                    xs12>
                    <EventTicketDetailOfferItem
                        :item="item"
                        :ticket="ticket"
                        :max-quantity="getMaxQuantityForOfferModelItem( item )"
                        :is-multiple-offers="offers.length > 1"
                        :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                        class="mt-4" />
                </v-flex>
            </v-layout>
            <v-divider />
            <TenantBonusPointsCartCheckoutSummary
                :points="totalBonusPointsEarn"
                :currency="loyaltyCurrency || currency"
                :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                class="gst-event-ticket-modal__bonus-points-banner mt-4" />
            <div class="gst-event-ticket-modal__subtotal mt-4">
                <span class="text-uppercase">{{ $t('_common:terms.subTotal') }}</span>:
                {{ totalPrice | currencyFull( currency ) }},{{ $t('_common:terms.includingTaxes' ) }}
            </div>
            <TicketTicketmasterGuaranteeCard :ticket="ticket" class="mt-4 mb-1" />
        </v-card-text>
        <v-card-actions class="pa-2 mt-4">
            <v-flex d-flex flex-column>
                <BaseButton
                    class="u-width-100 gst-event-ticket-modal__cta-button"
                    :placeholder="
                        $t('_common:buttons.continueWith', { entity: $t('_common:entities.seat.seat', { count: 2 } ).toLowerCase() }
                        )"
                    :width="'100%'"
                    :disabled="sumQuantityOffersModel !== quantity"
                    @click="checkout" />
            </v-flex>
        </v-card-actions>
    </v-card>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import TicketCardVariantThree from '@core/shared/components/ticket/TicketCardVariantThree';
    import TicketDateIcon from '@core/shared/components/ticket/TicketDateIcon';
    import TicketLocationIcon from '@core/shared/components/ticket/TicketLocationIcon';
    import TicketTicketmasterGuaranteeCard from '@core/shared/components/ticket/TicketTicketmasterGuaranteeCard';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import EventTicketDetailOfferItem from './components/EventTicketDetailOfferItem.vue';
    import EventTicketDetailMixin from './EventTicketDetailMixin';
    import EventTicketVenueImage from './components/EventTicketVenueImage';

    export default {
        name: 'EventTicketDetailModal',
        components: {
            BaseButton,
            TicketCardVariantThree,
            EventTicketDetailOfferItem,
            EventTicketVenueImage,
            TicketDateIcon,
            TicketLocationIcon,
            TicketTicketmasterGuaranteeCard,
            HeaderVariant2
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin, EventTicketDetailMixin ],
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-modal {
        .gst-event-ticket-modal__ticket-date-icon,
        .gst-event-ticket-modal__ticket-location-icon {
            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-modal__offers-list-title {
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'regular' );
            font-weight: font-weight( 'bold' );
            text-transform: uppercase;
        }

        .gst-event-ticket-modal__offer-card {
            margin-top: 1px !important;
            border-width: 1px !important;
        }

        .gst-event-ticket-modal__offer-card--selected {
            margin-top: 0 !important;
            border-color: theme-color( 'success' ) !important;
            border-width: 2px !important;
        }

        .gst-event-ticket-modal__subtotal {
            color: theme-color( 'quaternary' );
            font-weight: font-weight( 'regular' );
            font-weight: font-weight( 'bold' );
        }

        .gst-event-ticket-modal__bonus-points-banner.gst-bonus-points-cart-checkout-summary {
            .gst-bp__headline {
                font-size: font-size( 's' );

                h4 {
                    font-size: font-size( 's' );
                }
            }
        }
    }
</style>
