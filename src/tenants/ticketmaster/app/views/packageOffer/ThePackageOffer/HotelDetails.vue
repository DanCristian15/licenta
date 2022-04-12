<template>
    <div class="package-offer__hotel-details d-flex flex-column">
        <div class="subtitle">
            {{ $t('hotelDetails.title') }}
        </div>
        <div class="details d-flex">
            <div class="flex-grow-1">
                <ImageMasonryVariant1
                    :images="hotel.images"
                    :images-on-mobile="5"
                    :can-open-full-screen="false"
                    class="image-masonry u-width-100 px-0" />
            </div>
            <div class="hotel-info flex-grow">
                <div class="hotel-title d-flex">
                    <p>
                        {{ hotel.name }}
                    </p>
                    <StarRating class="d-flex align-center flex-grow-1" :value="stars" />
                </div>
                <div class="venue-distance d-flex align-center">
                    <LocationIcon /> {{ hotel.venueDistance }}
                </div>
                <div class="amenities d-flex flex-wrap">
                    <div v-for="(item, key) in hotelAmenities" :key="key" class="amenity d-flex align-center">
                        <IconRoomAmenity :id="item.id" />
                        {{ item.name }}
                    </div>
                    <v-menu
                        content-class="extra-amenities-menu"
                        offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                v-if="hotel.services.length > 13"
                                v-bind="attrs"
                                class="amenity extra-amenities d-flex align-center"
                                v-on="on"
                                @mouseenter="extraAmenitiesOpened = true"
                                @mouseleave="extraAmenitiesOpened = false">
                                {{ $t('hotelDetails.extraAmenities', { count: hotel.services.length - 13}) }}
                            </div>
                        </template>
                        <div>
                            <p v-for="(item, key) in extraHotelAmenities" :key="key">
                                {{ item.name }}
                            </p>
                        </div>
                    </v-menu>
                </div>
            </div>
        </div>
        <div class="description">
            {{ hotel.description }}
        </div>
    </div>
</template>

<script>
    import ImageMasonryVariant1 from '@tenants/ticketmaster/app/components/images/ImageMasonryVariant1';
    import IconRoomAmenity from '@tenants/ticketmaster/app/modules/hotel/components/icons/IconRoomAmenity';
    import StarRating from '@/core/shared/components/misc/StarRating.vue';
    import LocationIcon from '@tenants/ticketmaster/app/assets/icons/location.svg';

    export default {
        name: 'HotelDetails',
        components: {
            LocationIcon,
            StarRating,
            IconRoomAmenity,
            ImageMasonryVariant1
        },
        props: {
            hotel: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                extraAmenitiesOpened: false
            };
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.thePackage._components'
        },
        computed: {
            hotelAmenities() {
                return this.hotel.services.slice( 0, 13 );
            },
            extraHotelAmenities() {
                return this.hotel.services.slice( 13 );
            },
            stars( ) {
                const { awards } = this.hotel;

                if ( awards.length && awards[ 0 ].rating ) {
                    return awards[ 0 ].rating;
                }

                return 0;
            },
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .package-offer__hotel-details {
        margin-bottom: theme-spacing( 10 );

        .subtitle {
            line-height: line-height( 'm' );
            margin-bottom: theme-spacing( 2 );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'large' );
            text-transform: uppercase;
        }

        .details {
            .image-masonry {
                min-height: 340px;
            }

            .hotel-info {
                position: relative;
                left: theme-spacing( 4 );
                margin-top: theme-spacing( 5 );
                flex: 1;

                .hotel-title {
                    p {
                        line-height: line-height( 'xxxl' );
                        margin-bottom: unset;
                        margin-right: theme-spacing( 1 );
                        color: theme-color( 'quaternary' );
                        font-size: font-size( 'xxl' );
                        font-weight: font-weight( 'large' );
                    }
                }

                .venue-distance {
                    line-height: line-height( 'xl' );
                    margin: theme-spacing( 4, 0, 3, 0 );
                    color: theme-color( 'tertiary' );
                    font-size: font-size( 's' );
                    text-transform: lowercase;

                    svg {
                        margin-bottom: 1px;
                        margin-right: theme-spacing( 1 );
                    }
                }

                .amenities {
                    .amenity {
                        width: 50%;
                        line-height: line-height( 'xl' );
                        margin: theme-spacing( 1 ) 0;
                        color: theme-color( 'success' );
                        font-size: font-size( 's' );

                        svg {
                            width: 18px;
                            margin-right: theme-spacing( 2 );
                        }
                    }

                    .extra-amenities {
                        width: max-content;
                        cursor: pointer;
                    }

                    .extra-amenities:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        .description {
            line-height: line-height( 'xxxl' );
            margin-top: theme-spacing( 6 );
            color: theme-color( 'black' );
            font-size: font-size( 's' );
        }
    }

    .extra-amenities-menu {
        padding: theme-spacing( 3 );
        background: theme-color( 'white' );
        box-shadow: 0 2px 6px rgba( 0, 0, 0, 0.25 );
        border-radius: border-radius( 'xs' );

        p:last-child {
            margin-bottom: theme-spacing( 0 );
        }
    }

    @include mobile-only {
        .package-offer__hotel-details {
            .details {
                flex-direction: column;

                .image-masonry {
                    min-height: 250px;
                }

                .hotel-info {
                    position: unset;
                }
            }

            margin-bottom: theme-spacing( 4 );
        }
    }
</style>