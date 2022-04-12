<template>
    <v-flex
        v-if="!preview"
        class="gst-event-ticket-venue-image d-flex flex-column align-center u-height-100">
        <v-flex class="gst-event-ticket-venue-image__wrapper u-height-100">
            <BaseImage
                :key="venueSeatMapSrc || venueMapSrc"
                v-bind="imagePropsFinal"
                :has-placeholder="venueSeatMapSrc ? false : true"
                :lazy-src="venueMapSrc"
                class="u-height-100"
                @load="onLoadImageDo">
                <template v-if="!loading" v-slot:fallback>
                    <TicketNoSeatsAvailable :width="$vuetify.breakpoint.mdAndUp ? 96 : 86" />
                </template>
                <template v-slot:content>
                    <ImageMagnifier
                        v-if="$vuetify.breakpoint.mdAndUp && isLoadedImage "
                        :src="venueSeatMapSrc || venueMapSrc" />
                </template>
            </BaseImage>
        </v-flex>
        <LogoTicketmaster v-if="!$vuetify.breakpoint.mdAndUp" class="gst-event-ticket-venue-image__icon ml-2 ml-md-4" />
    </v-flex>
    <v-card v-else class="mb-4 gst-event-ticket-venue-image--outlined" flat outlined>
        <BaseImage
            v-bind="imageProps"
            :has-placeholder="true"
            class="gst-event-ticket-venue-image--preview">
            <template v-if="!loading" v-slot:fallback>
                <TicketNoSeatsAvailable :width="$vuetify.breakpoint.mdAndUp ? 96 : 86" />
            </template>
        </BaseImage>
    </v-card>
</template>

<script>
    import BaseImage from '@core/shared/components/misc/BaseImage';
    import LogoTicketmaster from '@core/shared/assets/logo_ticketmaster.svg';
    import TicketNoSeatsAvailable from '@core/shared/components/ticket/TicketNoSeatsAvailable.vue';
    import ImageMagnifier from '@/core/shared/components/images/ImageMagnifier.vue';

    export default {
        name: 'EventTicketVenueImage',
        components: {
            BaseImage,
            LogoTicketmaster,
            TicketNoSeatsAvailable,
            ImageMagnifier
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
        data() {
            return {
                isLoadedImage: false
            };
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
            imagePropsFinal( ) {
                return this.venueSeatMapSrc ? this.ticketImgProp : this.venueImgProp;
            }
        },
        watch: {
            'imagePropsFinal.src': function() {
                this.isLoadedImage = false;
            }
        },
        methods: {
            onLoadImageDo( ) {
                this.isLoadedImage = true;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $gstEventStartPosition: 60px;
    $gstEventBackgroundColor: theme-color( 'white' );

    .gst-event-ticket-venue-image {
        position: relative;
    }

    .gst-event-ticket-venue-image svg {
        position: absolute;
        right: 8px;
        bottom: 6px;
    }

    .gst-event-ticket-venue-image ::v-deep .v-image__image--preload {
        filter: none !important;
    }

    .gst-event-ticket-venue-image__wrapper {
        width: 60%;
        min-height: 130px;
    }

    .gst-event-ticket-venue-image--preview {
        min-height: 140px;

        @include mobile-only {
            max-height: 200px;
        }
    }

    .gst-event-ticket-venue-image--outlined.v-card {
        @include border-radius("m");

        border-color: theme-color( 'quinary' );
    }

    .gst-event-ticket-venue-image__icon {
        @include mobile-only {
            height: 25%;
            width: 25%;
        }
    }
</style>
