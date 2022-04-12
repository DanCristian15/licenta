<template>
    <v-flex d-flex flex-column align center class="gst-event-ticket-detail-item-offer">
        <v-flex xs12 d-flex flex-row align-center>
            <v-flex
                v-if="$vuetify.breakpoint.lgAndUp && isMultipleOffers"
                d-flex
                align-center
                shrink
                class="gst-event-ticket-detail-item-offer__select-section"
                justify-center>
                <v-checkbox
                    v-model="item.selected"
                    off-icon="$vuetify.icons.checkboxRoundUnchecked"
                    on-icon="$vuetify.icons.checkboxRoundChecked"
                    class="d-inline-block u-align-vertical-middle mt-0 pt-2 gst-checkbox gst-input gst-input--secondary" />
            </v-flex>
            <TicketOfferCardVariantOne
                :ticket="ticket"
                :offer="item.offer"
                :style="{ width: '180px' }"
                :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                class="u-background-transparent gst-event-ticket-detail-content__offer-card u-mouse-pointer" />
            <v-spacer />
            <v-flex
                v-if="isMultipleOffers"
                d-flex
                align-center
                shrink
                justify-content-end>
                <NumericStep
                    v-model="item.quantity"
                    :min="0"
                    :max="maxQuantity"
                    :values="item.offer && item.offer.ticketType && item.offer.ticketType.sellableQuantities ? item.offer.ticketType.sellableQuantities : [ ]" />
            </v-flex>
        </v-flex>
        <v-flex xs-12 d-flex flex-row align-center class="mt-2">
            <v-flex
                v-if="$vuetify.breakpoint.lgAndUp && isMultipleOffers"
                d-flex
                align-center
                shrink
                justify-center
                class="gst-event-ticket-detail-item-offer__select-section" />
            <span class="gst-event-ticket-detail-item-offer__price">
                {{ price }}
            </span>
        </v-flex>
    </v-flex>
</template>

<script>
    import TicketOfferCardVariantOne from '@core/shared/components/ticket/TicketOfferCardVariantOne';
    import NumericStep from '@shared/components/input/NumericStep';

    export default {
        name: 'EventTicketDetailOfferItem',
        components: {
            TicketOfferCardVariantOne,
            NumericStep
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            ticket: {
                type: Object,
                required: true
            },
            maxQuantity: {
                type: Number,
                required: true
            },
            isMultipleOffers: {
                type: Boolean,
                default: false
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            price( ) {
                const { item } = this;
                const offer = item.offer;

                return this.$options.filters.priceFull( {
                    ...offer,
                    currency: offer.currency
                } );
            }
        },
        watch: {
            'item.selected': function ( newValue ) {
                if ( !newValue ) {
                    this.item.quantity = 0;
                }
            },
            'item.quantity': function ( newValue ) {
                this.item.selected = !!newValue;
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-detail-item-offer {
        .gst-event-ticket-detail-item-offer__select-section {
            width: 40px;
        }

        .gst-event-ticket-detail-item-offer__price {
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.21px;
        }
    }
</style>
