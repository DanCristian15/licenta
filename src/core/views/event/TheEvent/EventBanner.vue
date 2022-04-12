<template>
    <div class="gst-event-banner pl-4 pr-2">
        <v-flex d-flex flex-row class="u-height-100">
            <v-flex
                d-flex
                align-center
                shrink
                justify-center>
                <v-img
                    ref="image"
                    :src="imageSrc"
                    :height="$vuetify.breakpoint.mdAndUp ? 60 : 42"
                    :width="$vuetify.breakpoint.mdAndUp ? 60 : 42"
                    class="gst-event-banner__image"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    @error="errorLoadingImage = true"
                    @load="onImageLoadDo" />
            </v-flex>
            <v-flex
                d-flex
                flex-column
                flex-grow
                class="ml-2 mt-auto mb-auto">
                <v-flex d-flex flex-row align-center class="mb-1">
                    <VClamp
                        autoresize
                        :max-lines="1"
                        class="hyphens clamp gst-event-banner__name">
                        {{ item.name }}
                    </VClamp>
                    <v-btn
                        text
                        icon
                        x-small
                        class="gst-event-banner__info-button ml-2"
                        @click="openEventInfoModal">
                        <v-icon v-text="'$vuetify.icons.infoRound'" />
                    </v-btn>
                </v-flex>
                <v-flex d-flex flex-row align-center>
                    <VenueInfo
                        :max-lines="1"
                        class="hyphens clamp gst-event-banner__info"
                        :item="venueInfoLocation">
                        {{ eventDate }} •
                    </VenueInfo>
                    <FavoriteEntityButton
                        v-if="$vuetify.breakpoint.mdAndUp"
                        :entity-type="entityType"
                        :entity-id="eventId"
                        class="gst-event-banner__favorite-button ml-2" />
                </v-flex>
            </v-flex>
            <v-flex
                v-if="!$vuetify.breakpoint.mdAndUp"
                d-flex
                align-center
                shrink
                justify-center
                class="pl-2">
                <FavoriteEntityButton
                    :entity-type="entityType"
                    :entity-id="eventId" />
            </v-flex>
        </v-flex>
    </div>
</template>

<script>
    import VClamp from 'vue-clamp';
    import FavoriteEntityButton from '@shared/components/buttons/FavoriteEntityButton';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo';
    import entityConstants from '@core/utils/constants/entity';
    import imageConstants from '@core/utils/constants/imagePaths';
    import {
        hasIncorrectContentSize as imageUtilsHasIncorrectContentSize
    } from '@core/utils/imageUtils';

    export default {
        name: 'EventBanner',
        components: {
            VClamp,
            FavoriteEntityButton,
            VenueInfo
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                errorLoadingImage: false
            };
        },
        computed: {
            fallbackSrc() {
                return imageConstants.FALLBACKS.OTHER_EVENTS;
            },
            imageSrc() {
                const { errorLoadingImage, fallbackSrc } = this;
                const { imageUrl } = this.item;

                if ( errorLoadingImage ) {
                    return this.fallbackSrc;
                } else {
                    return imageUrl || fallbackSrc;
                }
            },
            eventId( ) {
                return this.item.id;
            },
            eventDate( ) {
                const event = this.item;

                return event && event.startDateTime ? this.$options.filters.datePeriod( event.startDateTime, event.endDateTime, { hasStartTime: event.hasStartTime } ) : this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            entityType() {
                return entityConstants.TYPES.EVENT;
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.item;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };
            }
        },
        methods: {
            onImageLoadDo( ) {
                if ( this.item.imageUrl && this.item.imageUrl === this.imageSrc ) {
                    this.errorLoadingImage = imageUtilsHasIncorrectContentSize( this.$refs.image.image );
                }
                this.$emit( 'load-image' );
            },
            openEventInfoModal( ) {
                this.$router.push( {
                    name: 'eventInfo',
                    params: {
                        id: this.eventId
                    }
                } );
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-banner {
        height: 92px;
        background: linear-gradient( 44.39deg, theme-color( 'gradient-primary-1' ) 0%, theme-color( 'gradient-primary-2' ) 98.96% );

        .gst-event-banner__image {
            border-radius: border-radius( 'm' ) !important;
        }

        .gst-event-banner__name {
            line-height: 25px;
            color: theme-color( 'white' );
            font-size: 22px;
            font-weight: font-weight( 'bold' );
        }

        .gst-event-banner__info {
            line-height: line-height( 'l' );
            color: theme-color( 'white' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'regular' );
        }

        @include mobile-only {
            height: 60px;

            .gst-event-banner__name {
                line-height: line-height( 'l' );
                font-size: font-size( 's' );
                font-weight: font-weight( 'medium' );
            }

            .gst-event-banner__info {
                line-height: line-height( 's' );
                font-size: font-size( 'xxs' );
                font-weight: font-weight( 'regular' );
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-banner {
        .gst-event-banner__info-button {
            height: 18px;
            width: 18px;

            .v-icon {
                height: auto;
                width: auto;
            }

            svg {
                height: 24px;
                width: 24px;
            }
        }

        .gst-event-banner__favorite-button {
            height: 24px;
            width: 24px;
        }
    }
</style>