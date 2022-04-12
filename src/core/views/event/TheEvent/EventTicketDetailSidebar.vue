<template>
    <v-card flat class="d-flex flex-column gst-event-ticket-detail-content gst-event-ticket-detail-content--sidebar u-height-100 px-4 u-overflow-auto-y">
        <v-toolbar
            flat
            dense
            class="flex-grow-0 gst-event-ticket-detail-content__toolbar">
            <v-btn
                text
                small
                class="text-capitalize gst-btn--cancel px-0"
                color="primary"
                @click="$emit('cancel')">
                <IconDropDownArrow class="u-rotate-90 gst-event-ticket-detail-content__back-icon" />
                {{ $t('_common:buttons.back') }}
            </v-btn>
        </v-toolbar>
        <v-divider />
        <v-card-text class="flex-grow-0 content-max-width px-0 pb-0">
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
                class="pt-0 pb-2 mx-0">
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
                class="gst-event-ticket-detail-content__bonus-points-banner mt-4" />
            <div class="gst-event-ticket-detail-content__subtotal mt-4">
                <span class="text-uppercase">{{ $t('_common:terms.subTotal') }}</span>:
                {{ totalPrice | currencyFull( currency ) }},{{ $t('_common:terms.includingTaxes' ) }}
            </div>
        </v-card-text>
        <v-card-actions class="pa-0 mt-4">
            <v-flex d-flex flex-column>
                <BaseButton
                    class="u-width-100"
                    :placeholder="
                        $t('_common:buttons.continueWith', { entity: $t('_common:entities.seat.seat', { count: 2 } ).toLowerCase() }
                        )"
                    :width="'100%'"
                    :disabled="sumQuantityOffersModel !== quantity"
                    @click="checkout" />
                <TicketTicketmasterGuaranteeCard :ticket="ticket" class="mt-1 mt-4" />
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
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import EventTicketDetailMixin from './EventTicketDetailMixin';
    import EventTicketDetailOfferItem from './components/EventTicketDetailOfferItem.vue';

    export default {
        name: 'EventTicketDetailSidebar',
        components: {
            BaseButton,
            IconDropDownArrow,
            TicketCardVariantThree,
            TicketDateIcon,
            TicketLocationIcon,
            TicketTicketmasterGuaranteeCard,
            EventTicketDetailOfferItem
        },
        mixins: [
            EventTicketDetailMixin
        ]
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-detail-content--sidebar {
        border-right: 1px solid theme-color( 'quinary' ) !important;
    }

    .gst-event-ticket-detail-content {
        .gst-event-ticket-detail-content__toolbar {
            div {
                padding: 0;
            }
        }

        .gst-event-ticket-detail-content__back-icon {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-detail-content {
        .gst-event-ticket-detail-content__ticket-date-icon,
        .gst-event-ticket-detail-content__ticket-location-icon {
            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-detail-content__offers-list-title {
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'regular' );
            font-weight: font-weight( 'bold' );
            text-transform: uppercase;
        }

        .gst-event-ticket-detail-content__offer-card {
            margin-top: 1px !important;
            border-width: 1px !important;
        }

        .gst-event-ticket-detail-content__offer-card--selected {
            margin-top: 0 !important;
            border-color: theme-color( 'success' ) !important;
            border-width: 2px !important;
        }

        .gst-event-ticket-detail-content__subtotal {
            color: theme-color( 'quaternary' );
            font-weight: font-weight( 'regular' );
            font-weight: font-weight( 'bold' );
        }

        .gst-event-ticket-detail-content__bonus-points-banner.gst-bonus-points-cart-checkout-summary {
            .gst-bp__headline {
                font-size: font-size( 's' );

                h4 {
                    font-size: font-size( 's' );
                }
            }
        }
    }
</style>
