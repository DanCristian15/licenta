
<template>
    <div :class="offerClass" class="gst-ticket-offer-type-icon-variant-1 d-flex flex-row align-center">
        <component :is="offerIcon" class="mr-1" />
        {{ offerLabel }}
    </div>
</template>
<script>
    import IconCheckCircle from '@tenant/app/assets/icons/check_round.svg';
    import IconTickets from '@tenant/app/assets/icons/tickets.svg';
    import { isResale as ticketUtilsIsResale } from '@core/utils/ticketUtils';

    export default {
        name: 'TicketOfferTypeIconVariant1',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconCheckCircle, 
            IconTickets
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            type: {
                type: String,
                default: 'standard'
            },
            offerName: {
                type: String,
                default: 'standard'
            }
        },
        computed: {
            offerIcon( ) {
                return ticketUtilsIsResale( this.type ) ? 'IconCheckCircle' : 'IconTickets';
            },
            offerLabel( ) {
                return this.offerName;
            },
            offerClass( ) {
                return ticketUtilsIsResale( this.type ) ? 'gst-ticket-offer-type-icon-variant-1--resale' : 'gst-ticket-offer-type-icon-variant-1--standard';
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-ticket-offer-type-icon-variant-1 {
        @include font-size('xxs');
        @include font-weight('regular');

        color: theme-color( 'tertiary' );
        text-transform: uppercase;
    }
</style>
