<template>
    <div
        :class="{
            'theme-bg-color-quinary': !loadingTickets && !tickets.length
        }"
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
        <div class="gst-event-ticket-image__ticket-limited-availability-warning-chip">
            <v-fade-transition>
                <EventTicketStatusFewAvailableWarningCard
                    v-if="showTicketsFewAvailableWarning"
                    @close="$emit('close-tickets-few-available-warning')" />
            </v-fade-transition>
        </div>
    </div>
</template>

<script>
    import EventTicketVenueImage from './components/EventTicketVenueImage';
    import EventTicketStatusFewAvailableWarningCard from './components/notifications/EventTicketStatusFewAvailableWarningCard';

    export default {
        name: 'EventTicketImage',
        components: {
            EventTicketVenueImage,
            EventTicketStatusFewAvailableWarningCard
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
    .gst-event-ticket-image {
        position: relative;

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