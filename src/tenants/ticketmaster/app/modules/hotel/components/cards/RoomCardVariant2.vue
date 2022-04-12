<template>
    <div class="gst-room-card-variant-2 px-4">
        <v-carousel v-model="activeSlide"
            class="gst-room-card-variant-2__gallery"
            height="160"
            :show-arrows="false"
            :hide-delimiters="images.length <= 1"
            @mouseenter.native="onCarouselMouseEnterDo"
            @mouseleave.native="onCarouselMouseLeaveDo">
            <template>
                <v-btn v-if="showNavigationButtons"
                    class="gst-room-card-variant-2__gallery__control-prev"
                    :class="{'disabled': activeSlide === 0}"
                    color="white"
                    :width="24"
                    :height="24"
                    fab
                    @click="onCarouselClickPrev">
                    <IconChevronLeft />
                </v-btn>
                <v-btn v-if="showNavigationButtons"
                    class="gst-room-card-variant-2__gallery__control-next"
                    :class="{'disabled': activeSlide === images.length - 1}"
                    color="white"
                    :width="24"
                    :height="24"
                    fab
                    @click="onCarouselClickNext">
                    <IconChevronRight />
                </v-btn>
            </template>

            <v-carousel-item v-for="(image, index) in images"
                :key="index">
                <BaseImage :src="image" />
            </v-carousel-item>
            <v-carousel-item v-if="!images.length">
                <BaseImage class="gst-room-card-variant-2__gallery__fallback" />
            </v-carousel-item>
        </v-carousel>

        <div class="gst-room-card-variant-2__amenities-container">
            <h6 class="gst-room-card-variant-2__name">
                {{ item | roomName }}
            </h6>
            <ElementsClamp :items="amenitiesDisplay" class="gst-room-card-variant-2__amenities" tag-item="span" class-item="d-inline-block gst-room-card-variant-2__amenity">
                <template slot="item" slot-scope="slotProps">
                    {{ slotProps.item }}
                </template>
                <template slot="after" slot-scope="slotProps">
                    <div class="d-inline" @click.stop="" @mousedown.stop="" @touchstart.stop="">
                        <v-tooltip v-if="slotProps.remainingCount" :bottom="isDesktop" :left="!isDesktop" :open-on-click="!$vuetify.breakpoint.mdAndUp" :open-on-hover="$vuetify.breakpoint.mdAndUp">
                            <template v-slot:activator="{ on, attrs }">
                                <span v-if="isDesktop" class="gst-room-card-variant-2__amenity-remaining" v-bind="attrs" v-on="on">
                                    + {{ slotProps.remainingCount }} {{ $t( '_common:terms.more' ) }}
                                </span>
                                <span v-else class="gst-room-card-variant-2__amenity-remaining" v-bind="attrs" v-on="on">
                                    [...]
                                </span>
                            </template>
                            <span v-for="( amen, k ) in amenities.slice( amenities.length - slotProps.remainingCount, amenities.length )" :key="k">
                                {{ amen | roomAmenity }} <br />
                            </span>
                        </v-tooltip>
                    </div>
                </template>
            </ElementsClamp>
        </div>

        <div class="gst-room-card-variant-2__bundle-price-container ">
            <BaseButton v-if="!isDesktop"
                :placeholder="$t( '_common:buttons.select' )"
                class="gst-hotel-selected-card__btn"
                color="primary"
                @click="$emit('click')" />
            <div class="col col-5 col-md-12 d-flex flex-column justify-start justify-md-center pa-0">
                <VClamp autoresize :max-lines="2" :title="bundleProducts | bundleProductsQuantity" class="gst-add-hotel-reservation-hotel-list-card__bundle-products">
                    {{ bundleProductsFinal | bundleProductsQuantity }}
                </VClamp>
                <div class="gst-add-hotel-reservation-hotel-list-card__prices">
                    <span v-if="showBasePriceWithoutDiscount" class="gst-add-hotel-reservation-hotel-list-card__price-with-discount">
                        {{ bundleProductsTotals.basePriceWithoutDiscount | currency( currency ) }}
                    </span>
                    <span class="gst-add-hotel-reservation-hotel-list-card__price">
                        {{ bundleProductsTotals.basePrice | currencyFull( currency) }}
                    </span>
                </div>
            </div>
            <div class="col col-7 col-md-12 order-md-last d-flex align-center pa-0">
                <span v-if="feesExcluded.length" class="gst-add-hotel-reservation-hotel-list-card__fees">
                    {{ $t( '_common:terms.excluded' ) }}: {{ feesExcludedText }}
                </span>
            </div>
        </div>

        <BaseButton
            v-if="$vuetify.breakpoint.mdAndUp"
            :placeholder="$t( '_common:buttons.select' )"
            class="gst-hotel-selected-card__btn"
            color="primary"
            @click="$emit('click')" />
    </div>
</template>

<script>
    import VClamp from 'vue-clamp';
    import debounce from 'lodash/debounce';
    import ElementsClamp from '@core/shared/components/misc/ElementsClamp';
    import HotelReservationRoomModel from '@tenant/app/models/HotelReservationRoomModel';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BaseButton from '@shared/components/buttons/BaseButton';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import roomRateFee from '@core/utils/constants/roomRateFee';
    import { getImageByWidth } from '@tenants/ticketmaster/app/utils/imageModelUtils';
    import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';
    import IconChevronRight from '@core/shared/components/icons/IconChevronRight.vue';
    import IconChevronLeft from '@core/shared/components/icons/IconChevronLeft.vue';

    export default {
        name: 'RoomCardVariant2',
        components: {
            VClamp,
            ElementsClamp,
            BaseButton,
            BaseImage,
            IconChevronLeft,
            IconChevronRight
        },
        props: {
            item: {
                type: Object,
                default: function ( ) {
                    return new HotelReservationRoomModel( );
                }
            },
            bundleProducts: {
                type: Object,
                default: function ( ) {
                    return new BundleProductsModel( );
                }
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeSlide: 0,
                displayNavigation: false
            };
        },
        computed: {
            isDesktop( ) {
                return  this.$vuetify.breakpoint.mdAndUp;
            },
            images ( ) {
                return this.item.images.map( ( image ) => getImageByWidth( IMAGE_SIZE.LARGE, image ) );
            },
            amenities( ) {
                return this.item.amenities;
            },
            amenitiesDisplay( ) {
                return this.item.amenities.filter( item => item.quantity !== 0 ).map( item => this.$options.filters.roomAmenity( item ) );
            },
            bundleProductsTotals( ) {
                return this.bundleProductsFinal.getTotals( );
            },
            showBasePriceWithoutDiscount( ) {
                return this.bundleProductsTotals.basePrice !== this.bundleProductsTotals.basePriceWithoutDiscount;
            },
            currency( ) {
                return this.item.rate.currency;
            },
            feesExcluded( ) {
                return this.item.rate.fees
                    .map( item => item.fee )
                    .filter( item => item.typeIncluded !== roomRateFee.TYPES_INCLUDED.INCLUDED );
            },
            feesExcludedText( ) {
                return this.feesExcluded
                    .map( item => this.$options.filters.roomRateFee( item, this.currency ) )
                    .join( ', ' );
            },
            bundleProductsFinal( ) {
                const ret = this.bundleProducts._clone( );

                ret.setHotelReservationSelectRoom( this.item );

                return ret;
            },
            showNavigationButtons() {
                if( this.images.length > 1 ) {
                    return this.$vuetify.breakpoint.smAndDown ? false : this.displayNavigation;
                }
                return false;
            }
        },
        methods: {
            onCarouselMouseEnterDo: debounce( function( ) {
                this.displayNavigation = true;
            }, 50 ),
            onCarouselMouseLeaveDo: debounce( function( ) {
                this.displayNavigation = false;
            }, 50 ),
            onCarouselClickPrev () {
                if( this.activeSlide > 0 ) {
                    this.activeSlide--;
                }

            },
            onCarouselClickNext () {
                if( this.activeSlide < this.images.length - 1 ) {
                    this.activeSlide++;
                }

            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-room-card-variant-2 {
    display: flex;
    padding: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    &.gst-hotel-details-modal-rooms__card--selected {
        background-color: theme-color( 'quinary' );
    }

    .gst-room-card-variant-2__gallery {
        position: relative;
        max-height: 160px;
        min-width: 260px;
        flex: 1;

        .gst-room-card-variant-2__gallery__control-prev,
        .gst-room-card-variant-2__gallery__control-next {
            position: absolute;
            top: calc( 50% - 12px );
            z-index: 1;
            box-shadow: 0 2px 6px rgba( theme-color-hex( 'black' ), 0.25 );

            svg {
                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }

            &.disabled {
                svg {
                    .gst-svg-icon { fill: theme-color( 'septenary' ); }
                }
            }
        }

        .gst-room-card-variant-2__gallery__control-prev {
            left: theme-spacing( 2 );

            svg {
                margin-left: -2px;
            }
        }

        .gst-room-card-variant-2__gallery__control-next {
            right: theme-spacing( 2 );

            svg {
                margin-right: -2px;
            }
        }

        .v-carousel__controls {
            height: 22px;
            background-color: unset;
        }

        .v-carousel__controls__item {
            height: 8px;
            width: 8px;
            margin: 6px;
            background-color: rgba( theme-color-hex( 'white' ), 0.4 );
        }

        .v-item--active {
            background: theme-color( 'white' );
            opacity: 1;
        }

        .gst-room-card-variant-2__gallery__fallback {
            height: 100%;
        }
    }

    .gst-room-card-variant-2__amenities-container {
        display: flex;
        padding: 24px 0;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        max-width: 270px;

        .gst-room-card-variant-2__name {
            padding: 0 16px 8px;
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
        }

        .gst-room-card-variant-2__amenities {
            height: 100px;
            line-height: 24px;
            padding: 0 16px;
            font-size: font-size( 'xxxs' );
        }

        .gst-room-card-variant-2__amenity {
            padding: theme-spacing( 0, 1 );
            margin: theme-spacing( 1, 1, 0, 0 );
            background-color: theme-color( 'background-success' );
            color: theme-color( 'success' );
            border-radius: 4px;
        }

        .gst-room-card-variant-2__amenity-remaining {
            height: 30px;
            padding: 4px;
            margin-top: 8px;
            color: theme-color( 'success' );
        }
    }

    .gst-room-card-variant-2__bundle-price-container {
        padding: 0 16px;
        max-width: 30%;
    }

    .gst-hotel-selected-card__btn {
        @include font-size('s');
        @include font-weight('bold');

        display: flex;
        text-transform: unset;
    }

    .gst-add-hotel-reservation-hotel-list-card__fees,
    .gst-add-hotel-reservation-hotel-list-card__bundle-products {
        @include line-height('s');

        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxs' );
        text-align: center;
    }

    .gst-add-hotel-reservation-hotel-list-card__prices {
        text-align: center;

        .gst-add-hotel-reservation-hotel-list-card__price {
            @include font-size( 'l' );
            @include font-weight( 'large' );
            @include line-height( 'xxxl' );

            color: theme-color( 'primary' );
        }

        .gst-add-hotel-reservation-hotel-list-card__price-with-discount {
            @include font-size( 'l' );
            @include line-height( 'xxxl' );

            color: theme-color( 'primary-lighten-2' );
            text-decoration: line-through;
        }
    }

    @include mobile-only {
        flex-direction: column;

        .gst-room-card-variant-2__amenities-container {
            width: 100%;
            padding: 12px 0;
            max-width: unset;

            .gst-room-card-variant-2__name {
                padding: 0;
            }

            .gst-room-card-variant-2__amenities {
                height: auto;
                padding: 0;
            }
        }

        .gst-room-card-variant-2__bundle-price-container {
            width: 100%;
            padding: 0;
            max-width: unset;

            .gst-hotel-selected-card__btn {
                padding: 8px;
                font-weight: 600;
                float: right;
            }
        }

        .gst-add-hotel-reservation-hotel-list-card__prices {
            text-align: left;
        }

        .gst-add-hotel-reservation-hotel-list-card__bundle-products,
        .gst-add-hotel-reservation-hotel-list-card__fees {
            text-align: left;
        }
    }
}
</style>
