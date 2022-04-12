<template>
    <v-card :outlined="outlined" flat class="gst-ticket-card-variant-three">
        <v-layout align-center>
            <v-flex xs="8" class="pr-2">
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="clamp gst-ticket-card-variant-three__seat-location">
                    {{ ticket | seatLocation }}
                </VClamp>
                <h5 class="gst-ticket-card-variant-three__quantity pt-2">
                    {{ $t( '_common:terms.ticketAvailableWithCount', { count: quantity } ) }}
                </h5>
            </v-flex>
            <v-flex xs="4" class="pl-2">
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="hyphens clamp gst-ticket-card-variant-three__seats">
                    {{ { seats } | seat }}
                </VClamp>
                <h5 class="gst-ticket-card-variant-three__seats-label pt-2">
                    {{ $t( '_common:entities.seat.seat', { count: seats.length } ) }}
                </h5>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import TicketCardMixin from './TicketCardMixin';

    export default {
        name: 'TicketCardVariantThree',
        components: {
            VClamp
        },
        mixins: [ TicketCardMixin ],
        i18nOptions: {
            keyPrefix: 'components.ticket.ticketOfferCardSmall',
            namespaces: 'shared'
        },
        props: {
            ticket: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 0
            },
            outlined: {
                type: Boolean,
                default: false
            }
        },
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-ticket-card-variant-three {
    position: relative;
    background-color: transparent;
    border-radius: border-radius( 'm' ) !important;
    max-width: 100%;
    border-color: theme-color( 'quinary' ) !important;

    .gst-ticket-card-variant-three__seat-location,
    .gst-ticket-card-variant-three__seats {
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxl' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.59px;
    }

    .gst-ticket-card-variant-three__quantity,
    .gst-ticket-card-variant-three__seats-label {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.25px;
    }

    .gst-ticket-card-variant-three__quantity {
        text-transform: lowercase;
    }
}
</style>
