<template>
    <div class="gst-ticket-card-variant-3 d-flex flex-row">
        <div class="flex-grow-1">
            <TicketVenueImage
                :preview="true"
                class="gst-ticket-card-variant-3__image"
                :image-props="{
                    src: ticket.venueSeatMapUrl,
                    height: '120px',
                    width: '140px',
                    contain: true
                }" />
        </div>
        <div class="flex-shrink-1 d-flex flex-column justify-center">
            <h5 v-if="ticket.section" class="gst-ticket-card-variant-3__location">
                {{ ticket | seatLocation }}
            </h5>
            <h5 class="gst-ticket-card-variant-3__tickets">
                {{ quantity }}
                {{ $t( '_common:terms.ticket', { count: quantity } ) }}
            </h5>
        </div>
    </div>
</template>

<script>
    import TicketVenueImage from '@tenant/app/components/images/TicketVenueImage';

    export default {
        name:  'TicketCardVariant3',
        components: {
            TicketVenueImage
        },
        props: {
            ticket: {
                type: Object,
                required: true
            }
        },
        computed: {
            quantity( ) {
                return this.ticket.quantity;
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-ticket-card-variant-3 {
        .gst-ticket-card-variant-3__image {
            -webkit-box-align: start !important;
            -ms-flex-align: start !important;
            align-items: flex-start !important;
        }

        .gst-ticket-card-variant-3__location,
        .gst-ticket-card-variant-3__tickets {
            line-height: line-height( 'xl' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'regular' );
            text-align: right;
        }
    }
</style>
