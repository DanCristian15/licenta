<template>
    <v-card :outlined="outlined" flat class="gst-ticket-offer-card-variant-one" :title="offer.name">
        <v-layout d-flex flex-column align-center>
            <v-flex shrink class="text-center">
                <TicketTypeIconVariantThree
                    :type="ticket.selection"
                    :offer-name="offer.name"
                    :lines="$vuetify.breakpoint.mdAndUp ? 2 : 0"
                    class="d-inline-block gst-ticket-offer-card-variant-one__ticket-type" />
            </v-flex>
            <TenantPriceIcon
                :price="offer.basePrice"
                :points="offerPoints"
                :currency="currency"
                :loyalty-currency="loyaltyCurrency"
                :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                :outlined="false"
                class="gst-ticket-offer-card-variant-one__price-icon" />
        </v-layout>
    </v-card>
</template>
<script>
    import TicketTypeIconVariantThree from '@shared/components/ticket/TicketTypeIconVariantThree.vue';

    export default {
        name: 'TicketCardVariantOne',
        components: {
            TicketTypeIconVariantThree
        },
        i18nOptions: {
            keyPrefix: 'components.ticket.ticketOfferCardSmall',
            namespaces: 'shared'
        },
        props: {
            ticket: {
                type: Object,
                required: true
            },
            offer: {
                type: Object,
                required: true
            },
            withPriceIcon: {
                type: Boolean,
                default: () => true
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                required: true
            },
            outlined: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            offerPoints( ) {
                return this.offer.bonusPoints;
            },
            currency( ) {
                const { offer } = this;
                return offer.currency;
            },
            loyaltyCurrency( ) {
                const { offer } = this;
                return offer.loyaltyCurrency;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-ticket-offer-card-variant-one {
    position: relative;
    background-color: transparent;
    border-radius: border-radius( 'm' ) !important;
    border-color: theme-color( 'quinary' );

    .gst-ticket-offer-card-variant-one__title {
        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'bold' );
        text-transform: uppercase;
    }

    .gst-ticket-offer-card-variant-one__price-icon {
        width: 100%;
        line-height: 14px;
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'regular' );
    }
}
</style>

<style lang="scss">
    .gst-ticket-offer-card-variant-one {
        .gst-ticket-offer-card-variant-one__price-icon {
            width: 100% !important;
        }
    }
</style>
