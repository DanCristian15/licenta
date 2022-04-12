<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        class="gst-event-card gst-event-card-variant-4 mx-auto u-box-shadow">
        <v-img
            :src="imageSrc"
            :height="height"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @error="errorLoadingImage = true">
            <v-flex class="d-flex flex-column fill-height">
                <v-flex d-flex flex-column class="pa-4">
                    <v-flex
                        d-flex
                        wrap>
                        <v-flex align-self-start shrink>
                            <DateIcon :start-date="item.startDateTime" :end-date="item.endDateTime" />
                        </v-flex>
                        <v-flex grow align-self-start text-right class="">
                            <FavoriteEntityButton class="gst-event-card-variant-4__favorite-button" :entity-type="entityType" :entity-id="item.id" />
                        </v-flex>
                    </v-flex>
                    <v-card-text class="d-flex flex-grow-1 align-end pa-0">
                        <v-flex d-flex flex-column>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                :title="item.name"
                                tag="h2"
                                class="gst-event-card-variant-4__title hyphens clamp mb-1">
                                {{ item.name }}
                            </VClamp>
                            <VenueInfo
                                :max-lines="1"
                                class="gst-event-card-variant-4__time hyphens clamp"
                                :item="venueInfoLocation">
                                <template v-if="eventDateTime">
                                    {{ eventDateTime }} &#183;
                                </template>
                            </VenueInfo>
                        </v-flex>
                    </v-card-text>
                </v-flex>
            </v-flex>
        </v-img>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import categoriesConstants from '@core/utils/constants/categories';
    import entityConstants from '@core/utils/constants/entity';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';
    import FavoriteEntityButton from '@core/shared/components/buttons/FavoriteEntityButton.vue';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'EventCardVariant4',
        components: {
            FavoriteEntityButton,
            DateIcon,
            VClamp,
            VenueInfo
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            withTo: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '224px'
            },
            height: {
                type: String,
                default: '224px'
            }
        },
        data() {
            return {
                errorLoadingImage: false
            };
        },
        computed: {
            entityType( ) {
                return entityConstants.TYPES.EVENT;
            },
            imageSrc( ) {
                const { errorLoadingImage, fallbackSrc } = this;
                const { imageUrl } = this.item;

                if ( errorLoadingImage ) {
                    return this.fallbackSrc;
                } else {
                    return imageUrl || fallbackSrc;
                }
            },
            fallbackSrc( ) {
                let found = categoriesConstants.LIST.find( item => item.ID === this.item.classificationSegmentId );
                return found ? found.FALLBACK : categoriesConstants.DEFAULT_FALLBACK ;
            },
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'event', params: { id: item.id } } : null;
            },
            eventDateTime( ) {
                if ( this.item.startDateTime ) {
                    return this.item.hasStartTime ? this.$options.filters.time( this.item.startDateTime ) : '';
                }
                return this.$t( '_common:terms.dateAndTimeToBeDetermined' );
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
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-event-card-variant-4 {
        position: relative;
        max-width: 100%;

        .gst-event-card-variant-4__favorite-button {
            margin-top: -7px;
            margin-right: -7px;
        }

        .gst-event-card-variant-4__title {
            line-height: line-height( 'xxxxxxl' );
            font-weight: font-weight( 'bold' );

            .hyphens {
                letter-spacing: -0.25px;
                -webkit-hyphens: initial;
                -ms-hyphens: initial;
                hyphens: initial;
            }
        }

        .gst-event-card-variant-4__time {
            line-height: line-height( 'l' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.88px;
            -webkit-hyphens: initial;
            -ms-hyphens: initial;
            hyphens: initial;
        }
    }

    .gst-event-card-variant-4.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-event-card-variant-4:hover {
        box-shadow:
            0 0 0 1px rgba( theme-color-hex( 'black' ), 0.05 ),
            0 40px 34px -16px rgba( theme-color-hex( 'black' ), 0.08 ),
            0 6px 4px -4px rgba( theme-color-hex( 'black' ), 0.06 ),
            0 16px 16px -8px rgba( theme-color-hex( 'black' ), 0.12 );
    }
</style>
