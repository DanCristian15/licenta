<template>
    <TicketCardVariant2
        :ticket="ticketSeatLocation"
        class="gst-event-ticket-detail-sidebar-ticket-image px-4" />
</template>

<script>
    import TicketCardVariant2 from '@tenant/app/components/cards/TicketCardVariant2';

    export default {
        name:  'EventTicketDetailSidebarTicketImage',
        components: {
            TicketCardVariant2
        },
        props: {
            ticket: {
                type: Object,
                required: true
            }
        },
        computed: {
            ticketSeatLocation( ) {
                const { seats, section, row, venueSeatMapUrl } = this.ticket;

                if ( !this.$vuetify.breakpoint.mdAndUp ) {
                    return { seats, section, row, venueSeatMapUrl };
                } else {
                    return { seats, venueSeatMapUrl };
                }
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-detail-sidebar-ticket-image {
        border-top: 1px solid theme-color-hex( 'senary-darken-2' );
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
    }
</style>