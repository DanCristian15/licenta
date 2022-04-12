<template>
    <div v-if="!preview" class="gst-ticket-venue-image d-flex flex-column u-height-100 align-center justify-center">
        <BaseImage
            :key="venueSeatMapSrc || venueMapSrc"
            v-bind="venueSeatMapSrc ? ticketImgProp : venueImgProp"
            :has-placeholder="venueSeatMapSrc ? false : true"
            :lazy-src="venueMapSrc"
            class="u-height-100">
            <template v-if="!loading" v-slot:fallback>
                <div class="v-flex align-center justify-center u-height-100 u-width-100">
                    <TicketNoSeatsAvailable :height="$vuetify.breakpoint.mdAndUp ? 75 : 46" width="100%" />
                </div>
            </template>
        </BaseImage>
    </div>
    <div v-else class="gst-ticket-venue-image d-flex flex-column u-height-100 align-center justify-center">
        <BaseImage
            v-bind="imageProps"
            :has-placeholder="true"
            class="gst-ticket-venue-image--preview">
            <template v-if="!loading" v-slot:fallback>
                <div class="d-flex flex-column align-center justify-center u-height-100 u-width-100">
                    <TicketNoSeatsAvailable :height="$vuetify.breakpoint.mdAndUp ? 75 : 46" width="100%" />
                </div>
            </template>
        </BaseImage>
    </div>
</template>

<script>
    import BaseImage from '@core/shared/components/misc/BaseImage';
    import TicketNoSeatsAvailable from '@core/shared/components/ticket/TicketNoSeatsAvailable.vue';

    export default {
        name: 'EventTicketVenueImage',
        components: {
            BaseImage,
            TicketNoSeatsAvailable
        },
        props: {
            imageProps: {
                type: Object,
                default: null
            },
            venueSeatMapSrc: {
                type: String,
                default: ''
            },
            venueMapSrc: {
                type: String,
                default: ''
            },
            preview: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            venueImgProp( ) {
                if ( this.venueMapSrc ) {
                    return {
                        ...this.imageProps,
                        src: this.venueMapSrc
                    };
                }
                return this.imageProps;
            },
            ticketImgProp( ) {
                if ( this.venueSeatMapSrc ) {
                    return {
                        ...this.imageProps,
                        src: this.venueSeatMapSrc
                    };
                }
                return this.imageProps;
            },
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $gstEventStartPosition: 60px;
    $gstEventBackgroundColor: theme-color( 'white' );

    .gst-ticket-venue-image {
        position: relative;
    }

    .gst-ticket-venue-image .v-image__image--preload {
        filter: none !important;
    }

    .gst-ticket-venue-image--preview {
        min-height: 140px;

        @include mobile-only {
            max-height: 200px;
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-ticket-venue-image {
        h5 {
            @include font-size('l');
            @include font-weight('large');

            letter-spacing: -0.47px;
        }

        p {
            @include font-size('s');
            @include font-weight('regular');

            letter-spacing: -0.41px;
        }
    }

    @include mobile-only {
        h5 {
            @include font-size('s');
        }

        p {
            @include font-size('xxs');
        }
    }
</style>
