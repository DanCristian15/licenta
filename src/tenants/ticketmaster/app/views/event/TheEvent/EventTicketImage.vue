<template>
    <div
        class="gst-event-ticket-image u-height-100">
        <EventTicketVenueImage
            :venue-seat-map-src="venueSeatMapUrl"
            :venue-map-src="venueMapUrl"
            :image-props="{
                src: venueSeatMapUrl,
                'height': '100%',
                'width': '100%',
                contain: true,
                'aspect-ratio': 1
            }"
            class="u-height-100"
            :loading="loadingTickets" />
    </div>
</template>

<script>
    import EventTicketVenueImage from '@tenant/app/components/images/TicketVenueImage';

    export default {
        name: 'EventTicketImage',
        components: {
            EventTicketVenueImage,
        },
        props: {
            venueDetails: {
                type: Object,
                default: null
            },
            venueSeatMapUrl: {
                type: String,
                default: null
            },
            loadingTickets: {
                type: Boolean,
                default: false,
            },
            tickets: {
                type: Array,
                default: null
            },
            showTicketsFewAvailableWarning: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            venueMapUrl( ) {
                return this.venueDetails.mapUrl;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-image {
        position: relative;
        background-color: theme-color( 'quinary' );

        .gst-event-ticket-image__ticket-limited-availability-warning-chip {
            position: absolute;
            top: 16px;
            right: 16px;
        }
    }
</style>

<style lang="scss">
    .gst-event-ticket-image .gst-event-ticket-venue-image__wrapper {
        width: 90%;
    }
</style>