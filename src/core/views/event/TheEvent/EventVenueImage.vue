<template>
    <v-flex v-if="!$vuetify.breakpoint.mdAndUp"
        shrink
        :class="{
            'theme-bg-color-quinary': !loadingTickets && !tickets.length
        }">
        <v-flex class="gst-event__venue-img">
            <EventTicketVenueImage
                class="u-mouse-pointer"
                :image-props="{
                    src: venueImageUrl,
                    height: 130,
                    width: '100%',
                    contain: true,
                    'aspect-ratio': 1
                }"
                :loading="loadingTickets" />
        </v-flex>
        <v-divider />
    </v-flex>
</template>

<script>
    import EventTicketVenueImage from './components/EventTicketVenueImage';

    export default {
        name: 'EventVenueImage',
        components: {
            EventTicketVenueImage
        },
        props: {
            venueDetails: {
                type: Object,
                default: null
            },
            loadingTickets: {
                type: Boolean,
                default: false,
            },
            tickets: {
                type: Array,
                default: null
            }
        },
        computed: {
            venueImageUrl( ) {
                return this.venueDetails.mapUrl;
            }
        }
    };
</script>

<style scoped lang="scss">
    .gst-event__venue-img {
        height: 145px;
    }
</style>