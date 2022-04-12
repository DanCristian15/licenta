<template>
    <v-flex shrink>
        <v-flex class="gst-event__venue-img">
            <EventTicketVenueImage
                class="u-mouse-pointer"
                :image-props="{
                    src: venueImageUrl,
                    height: 247,
                    width: '100%',
                    contain: true,
                    'aspect-ratio': 1
                }"
                :loading="loading" />
        </v-flex>
    </v-flex>
</template>

<script>
    import EventTicketVenueImage from '@tenant/app/components/images/TicketVenueImage';

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
            loading: {
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
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event__venue-img {
        height: 260px;
        background-color: theme-color( 'quinary' );

        .gst-event-ticket-venue-image {
            padding-bottom: 15px;
        }
    }
</style>
