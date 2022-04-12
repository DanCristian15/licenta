<template>
    <TicketCardVariant3
        :ticket="ticketSeatLocation"
        class="gst-event-ticket-detail-sidebar-ticket-image px-4" />
</template>

<script>
    import TicketCardVariant3 from '@tenant/app/components/cards/TicketCardVariant3';

    export default {
        name:  'SectionDetailSidebarImage',
        components: {
            TicketCardVariant3
        },

        props: {
            section: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        computed: {
            ticketSeatLocation( ) {
                const { section, venueSeatMapUrl } = this.section;

                if ( this.$vuetify.breakpoint.mdAndUp ) {
                    return { quantity: this.quantity, venueSeatMapUrl };
                }

                return { section, quantity: this.quantity, venueSeatMapUrl };
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
