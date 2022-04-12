<template>
    <v-card flat class="gst-ticket-offer-small-card px-0" :title="offer.name" @click="$emit('click')">
        <v-layout align-center class="pb-2">
            <v-flex xs10 class="pr-2">
                <h5>
                    <TicketTypeIconVariantOne :type="ticket.selection" :offer-name="offer.name" />
                </h5>
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="hyphens clamp gst-ticket-offer-small-card__seat">
                    {{ ticket | seatLocation }}
                </VClamp>
                <VClamp
                    autoresize
                    :max-lines="2"
                    class="hyphens clamp gst-ticket-offer-small-card__price">
                    {{ offerPrice }}
                </VClamp>
            </v-flex>
            <v-flex shrink>
                <TenantPriceIcon
                    :price="offer.basePrice"
                    :points="offerPoints"
                    :currency="currency"
                    :loyalty-currency="loyaltyCurrency"
                    :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                    :is-starting-price="offers.length > 1" />
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import TicketTypeIconVariantOne from '@core/shared/components/ticket/TicketTypeIconVariantOne.vue';

    export default {
        name: 'TicketCardVariantOne',
        components: {
            TicketTypeIconVariantOne,
            VClamp
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
            offers: {
                type: Array,
                required: true
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                required: true
            },
        },
        computed: {
            offer( ) {
                return this.offers[ 0 ];
            },
            currency( ) {
                const { offer } = this;
                return offer.currency;
            },
            loyaltyCurrency( ) {
                const { offer } = this;
                return offer.loyaltyCurrency;
            },
            offerPrice( ) {
                let ret = '';
                const { basePrice, totalPrice } = this.offer;

                if ( basePrice !== totalPrice ) {
                    ret+=this.$options.filters.currencyFull( basePrice, this.currency ) ;
                    ret+=' + ' + this.$options.filters.currencyFull( totalPrice - basePrice, this.currency ) + this.$t( 'labels.extraFee' );
                } else {
                    ret = this.$options.filters.currencyFull( basePrice, this.currency ) ;
                }

                return `${ret} ${this.$t( 'labels.priceSuffix' )}`;
            },
            offerPoints( ) {
                return this.offer.bonusPoints;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-ticket-offer-small-card {
    position: relative;
    background-color: transparent;
    max-width: 100%;

    .gst-ticket-offer-small-card__seat {
        line-height: 19px;
        margin-bottom: 4px;
        font-size: font-size( 'l' );
        font-weight: font-weight( 'medium' );
    }

    .gst-ticket-offer-small-card__price {
        line-height: 14px;
        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'regular' );
    }
}
</style>
