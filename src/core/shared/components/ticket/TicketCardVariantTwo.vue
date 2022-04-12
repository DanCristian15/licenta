<template>
    <v-card :outlined="outlined" flat class="gst-ticket-offer-small-card gst-ticket-offer-small-card--variant-2">
        <v-layout align-center>
            <v-flex v-if="ticket.section" xs5 class="px-2">
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="hyphens clamp gst-ticket-offer-small-card__seat">
                    {{ ticket | seatLocation }}
                </VClamp>
                <h5 class="gst-ticket-offer-small-card__title pt-1">
                    {{ $t( '_common:entities.seat.section' ) }}
                </h5>
            </v-flex>
            <v-flex
                class="px-3"
                :class="{
                    'xs5': ticket.section,
                    'xs10': !ticket.section,
                }">
                <VClamp
                    autoresize
                    :max-lines="1"
                    class="hyphens clamp gst-ticket-offer-small-card__seat">
                    {{ { seats } | seat }}
                </VClamp>
                <h5 class="gst-ticket-offer-small-card__title pt-1">
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
        name: 'TicketCardVariantTwo',
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
            outlined: {
                type: Boolean,
                default: true
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-ticket-offer-small-card {
    position: relative;
    background-color: transparent;
    border-radius: border-radius( 'm' ) !important;
    max-width: 100%;
    border-color: theme-color( 'quinary' ) !important;

    .gst-ticket-offer-small-card__title {
        line-height: 14px;
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.25px;
        text-transform: capitalize;
    }

    .gst-ticket-offer-small-card__seat {
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxl' );
        font-weight: font-weight( 'medium' );
    }
}
</style>
