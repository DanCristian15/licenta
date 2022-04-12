<template>
    <div class="gst-nearby-tab d-flex flex-column flex-md-row flex-md-wrap">
        <div v-if="item.attractions.length" class="gst-nearby-tab__attractions">
            <div class="headline">
                <AttractionIcon />
                <span>{{ $t('topAttractions') }}</span>
            </div>
            <div class="content">
                <div v-for="(attraction, index) in item.attractions" :key="index" class="d-flex justify-space-between item">
                    <span>{{ attraction.name }}</span>
                    <span class="distance">{{ formatDistance(attraction.distance) }}</span>
                </div>
            </div>
        </div>
        <div v-if="item.restaurants.length" class="gst-nearby-tab__restaurants">
            <div class="headline">
                <RestaurantIcon />
                <span>{{ $t('barsRestaurants') }}</span>
            </div>
            <div class="content">
                <div v-for="(restaurant, index) in item.restaurants" :key="index" class="d-flex justify-space-between item">
                    <span>{{ `${restaurant.cuisine} ${restaurant.type}` }}</span>
                    <span class="distance">{{ formatDistance(0) }}</span>
                </div>
            </div>
        </div>
        <div>
            <div v-if="item.publicTransportation.length" class="gst-nearby-tab__public-transit">
                <div class="headline">
                    <PublicTransitIcon />
                    <span>{{ $t('publicTransit') }}</span>
                </div>
                <div class="content">
                    <div v-for="(transportation, index) in item.publicTransportation" :key="index" class="d-flex justify-space-between item">
                        <span>{{ transportation.name }}</span>
                        <span class="distance">{{ formatDistance(transportation.distance) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="item.terminals.length" class="gst-nearby-tab__closest-airport">
                <div class="headline">
                    <ClosestAirportsIcon />
                    <span>{{ $t('closestAirport') }}</span>
                </div>
                <div class="content">
                    <div v-for="(terminal, index) in item.terminals" :key="index" class="d-flex justify-space-between item">
                        <span>{{ terminal.name }}</span>
                        <span class="distance">{{ formatDistance(terminal.distance) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getDistanceUnitOfMeasureForCountry } from '@core/utils/measureUtils';
    import RestaurantIcon  from '../../../../assets/svg/restaurant_variant2.svg';
    import AttractionIcon  from '../../../../assets/svg/landmark.svg';
    import PublicTransitIcon  from '../../../../assets/svg/metro.svg';
    import ClosestAirportsIcon  from '../../../../assets/svg/airport.svg';

    export default {
        name: 'HotelDetailsModalNearTab',
        components: {
            RestaurantIcon,
            AttractionIcon,
            PublicTransitIcon,
            ClosestAirportsIcon
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.modal._components._components.hotelDetailsModalBody._components.hotelDetailsModalNearTab'
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            bundleProducts: {
                type: Object,
                default: null
            }
        },
        computed: {
            topAttractions() {
                return this.item.attractions;
            },
            distanceUnitOfMeasure( ) {
                return getDistanceUnitOfMeasureForCountry ( this.bundleProducts.eventTicket.event.venueCountry );
            },
        },
        methods: {
            formatDistance( distance ) {
                return this.$options.filters.distance( distance, this.distanceUnitOfMeasure );
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-nearby-tab {
    > div {
        width: 33%;
        padding: theme-spacing( 4 );
        flex: 1;

        .headline {
            display: flex;
            margin-bottom: theme-spacing( 4 );
            align-items: center;

            span {
                line-height: line-height( 'xxxl' );
                padding-left: theme-spacing( 2 );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'regular' );
            }

            svg {
                height: 24px;
                width: 24px;
            }
        }

        .content {
            .item {
                margin-bottom: theme-spacing( 4 );

                span {
                    line-height: line-height( 'xl' );
                    font-size: font-size( 'm' );

                    &.distance {
                        color: theme-color( 'primary' );
                    }
                }
            }
        }
    }

    @include mobile-only {
        > div {
            width: 100%;
        }
    }
}
</style>
