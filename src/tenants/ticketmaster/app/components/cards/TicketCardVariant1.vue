<template>
    <div class="ticket-card-variant-1 d-flex flex-row px-4 py-2" @click="$emit('click')">
        <div class="flex-grow-1">
            <div class="d-flex align-center mt-1">
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="ticket-card-variant-1__seat">
                    {{ ticket | seatLocation }}
                </VClamp>
                <IconBed />
            </div>
            <TicketOfferTypeIconVariant1 :type="ticket.selection" :offer-name="firstOffer.name" class="ticket-card-variant-1__ticket-type" />
        </div>
        <div class="ticket-card-variant-1__price d-flex align-center">
            {{ firstPrice | currencyFull( currency) }} / {{ $t( '_common:terms.eachSeat_abv' ) }}
        </div>
    </div>
</template>


<script>
    import VClamp from 'vue-clamp';
    import IconBed from '@tenant/app/assets/icons/bed.svg';
    import TicketOfferTypeIconVariant1 from '@tenant/app/components/icons/TicketOfferTypeIconVariant1';

    export default {
        name: 'TicketCardVariant1',
        components: {
            VClamp,
            IconBed,
            TicketOfferTypeIconVariant1
        },
        props: {
            ticket: {
                type: Object,
                required: true
            },
            offers: {
                type: Array,
                required: true
            }
        },
        computed: {
            firstOffer( ) {
                return this.offers[ 0 ];
            },
            firstPrice( ) {
                return this.firstOffer.basePrice;
            },
            currency( ) {
                return this.firstOffer.currency;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '@scssVariables';
    @import '@scssMixins';

    .ticket-card-variant-1 {
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );

        .ticket-card-variant-1__seat {
            @include font-size('l');
            @include font-weight('large');

            color: theme-color( 'quaternary' );
        }

        .ticket-card-variant-1__price {
            @include font-size('s');
            @include font-weight('large');

            color: theme-color( 'primary' );
        }
    }

    .ticket-card-variant-1:hover {
        background-color: theme-color( 'primary-lighten-1' ) !important;
    }

</style>
