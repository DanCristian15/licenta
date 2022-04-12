<template>
    <div class="gst-ticket-card-variant-2 d-flex flex-row">
        <div class="flex-grow-1">
            <TicketVenueImage
                :preview="true"
                class="gst-ticket-card-variant-2__image"
                :image-props="{
                    src: ticket.venueSeatMapUrl,
                    height: '120px',
                    width: '140px',
                    contain: true
                }" />
        </div>
        <div class="flex-shrink-1 d-flex flex-column justify-center">
            <h5 class="gst-ticket-card-variant-2__location">
                {{ ticket | seatLocation }}
            </h5>
            <h5 class="gst-ticket-card-variant-2__seats">
                <template v-if="seats && seats.length">
                    {{ $t( '_common:entities.seat.seat', { count: seats.length } ) }}
                </template>
                {{ { seats: ticket.seats } | seat( { joinChar: ', '} ) }}
            </h5>
        </div>
    </div>
</template>

<script>
    import TicketVenueImage from '@tenant/app/components/images/TicketVenueImage';

    export default {
        name:  'EventTicketDetailSidebarTicketImage',
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
            seats( ) {
                return this.ticket.seats;
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-ticket-card-variant-2 {
        .gst-ticket-card-variant-2__image {
            -webkit-box-align: start !important;
            -ms-flex-align: start !important;
            align-items: flex-start !important;
        }

        .gst-ticket-card-variant-2__location,
        .gst-ticket-card-variant-2__seats {
            @include font-size('l');
            @include font-weight('regular');
            @include line-height('xl');

            color: theme-color( 'tertiary' );
            text-align: right;
        }
    }
</style>