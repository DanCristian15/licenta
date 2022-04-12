<template>
    <div class="gst-hotel-selected-card pr-4 pl-2 py-2">
        <div class="d-flex flex-row">
            <div class="flex-shrink-1" @click="openItemDetails()">
                <BaseImage :src="image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="56" width="100" />
            </div>
            <div class="d-flex flex-column justify-center pl-4">
                <div class="mb-2">
                    <StarRating :value="stars" class="gst-hotel-selected-card__rating" />
                    <VClamp v-if="$vuetify.breakpoint.mdAndUp" autoresize :max-lines="2" :title="distance" tag="span" class="gst-hotel-selected-card__distance pl-1">
                        • {{ distance }}
                    </VClamp>
                </div>
                <div @click="openItemDetails()">
                    <VClamp autoresize :max-lines="1" :title="item.name" tag="h6" class="gst-hotel-selected-card__room">
                        {{ item.name }}
                    </VClamp>
                </div>
                <VClamp v-if="!$vuetify.breakpoint.mdAndUp" autoresize :max-lines="2" :title="distance" tag="span" class="gst-hotel-selected-card__distance">
                    {{ distance }}
                </VClamp>
            </div>
        </div>
        <div class="d-flex flex-row mt-2">
            <div class="flex-grow-1">
                <RoomDropDown
                    :id="item.id"
                    :value="room"
                    :items="rooms"
                    :bundle-products="bundleProducts" />
                <VClamp autoresize :max-lines="1" :title="bundleProducts | bundleProductsQuantity" class="gst-hotel-selected-card__bundle-products">
                    {{ bundleProducts | bundleProductsQuantity }}
                </VClamp>
                <div>
                    <span v-if="showBasePriceWithoutDiscount" class="gst-hotel-selected-card__price-with-discount">
                        {{ bundleProductsTotals.basePriceWithoutDiscount | currency( currency ) }}
                    </span>
                    <span class="gst-hotel-selected-card__price">
                        {{ bundleProductsTotals.basePrice | currencyFull( currency) }}
                    </span>
                    <span class="gst-hotel-selected-card__price-info">
                        {{ $t( '_common:terms.plusTaxesAndFees' ) }}
                    </span>
                </div>
            </div>
            <div class="d-flex align-center">
                <BaseButton
                    :placeholder="$t( '_common:buttons.remove' )"
                    class="gst-hotel-selected-card__btn"
                    color="primary"
                    @click="removeItem( )" />
            </div>
        </div>
    </div>
</template>

<script>
    import VClamp from 'vue-clamp';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import StarRating from '@shared/components/misc/StarRating.vue';
    import BaseButton from '@shared/components/buttons/BaseButton.vue';
    import { getImageByWidth } from '@tenants/ticketmaster/app/utils/imageModelUtils';
    import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';
    import RoomDropDown from '../RoomDropDown.vue';

    export default {
        name: 'HotelSelectedCard',
        components: {
            VClamp,
            BaseImage,
            StarRating,
            BaseButton,
            RoomDropDown
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            distanceUnitOfMeasure: {
                type: String,
                required: true
            },
            inLocation: {
                type: Object,
                required: true
            },
            bundleProducts: {
                type: Object,
                default: function ( ) {
                    return new BundleProductsModel( );
                }
            },
            busEventsParent: {
                type: Object,
                required: true
            },

        },
        computed: {
            stars( ) {
                const { awards } = this.item;

                if ( awards.length && awards[ 0 ].rating ) {
                    return awards[ 0 ].rating;
                }

                return 0;
            },
            image( ) {
                return getImageByWidth( IMAGE_SIZE.THUMBNAIL, this.item.image );
            },
            distance( ) {
                return this.$options.filters.distanceFrom( this.item.distance, this.distanceUnitOfMeasure, this.inLocation.name );
            },
            room( ) {
                return this.item.selectedRoom;
            },
            rooms( ) {
                return [ this.item.selectedRoom ];
            },
            roomTotalBasePrice( ) {
                return this.room.rate.totals.basePrice;
            },
            bundleProductsTotals( ) {
                return this.bundleProducts.getTotals( );
            },
            showBasePriceWithoutDiscount( ) {
                return this.bundleProductsTotals.basePrice !== this.bundleProductsTotals.basePriceWithoutDiscount;
            },
            currency( ) {
                return this.room.rate.currency;
            }
        },
        methods: {
            openItemDetails( ) {
                this.busEventsParent.$emit( 'open-item-details', this.item );
            },
            removeItem( ) {
                this.busEventsParent.$emit( 'remove-item', this.item );
            }
        }
    };
</script>


<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-hotel-selected-card {
        background-color: theme-color( 'primary-lighten-1' );
        font-size: font-size( 'm' );
        font-weight: font-weight( 'regular' );
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );

        .v-image {
            border-radius: 2px;
        }

        .gst-hotel-selected-card__rating {
            height: font-size( 'xxs' );
            margin-top: 2px;
            float: left;
        }

        .gst-hotel-selected-card__distance {
            line-height: line-height( 'm' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
        }

        .gst-hotel-selected-card__name {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
        }

        .gst-hotel-selected-card__room-name {
            line-height: line-height( 'xl' );
            color: theme-color( 'primary' );
            font-size: font-size( 'l' );
        }

        .gst-hotel-selected-card__bundle-products {
            line-height: line-height( 'm' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
        }

        .gst-hotel-selected-card__price {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'primary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
        }

        .gst-hotel-selected-card__price-with-discount {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'primary-lighten-2' );
            font-size: font-size( 'l' );
            text-decoration: line-through;
        }

        .gst-hotel-selected-card__price-info {
            line-height: line-height( 'xxl' );
            color: theme-color( 'primary-lighten-2' );
            font-size: font-size( 's' );
        }

        .gst-hotel-selected-card__btn {
            border: 1px solid theme-color( 'primary' );
            background-color: theme-color( 'white' ) !important;
            color: theme-color( 'primary' ) !important;
            font-weight: font-weight( 'large' );
            letter-spacing: 0;
            text-transform: capitalize;
        }
    }
</style>
