<template>
    <div class="gst-add-hotel-reservation-hotel-list-card pr-4 pl-2 py-2">
        <div class="d-flex flex-row">
            <div class="flex-shrink-1" @click="openItemDetails()">
                <BaseImage :src="image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="56" width="100" />
            </div>
            <div class="d-flex flex-column justify-center pl-4">
                <div>
                    <StarRating :value="stars" class="gst-add-hotel-reservation-hotel-list-card__rating" />
                    <VClamp v-if="$vuetify.breakpoint.mdAndUp" autoresize :max-lines="2" :title="distance" tag="span" class="gst-add-hotel-reservation-hotel-list-card__distance pl-1">
                        • {{ distance }}
                    </VClamp>
                </div>
                <div @click="openItemDetails()">
                    <VClamp autoresize :max-lines="1" :title="item.name" tag="h6" class="gst-add-hotel-reservation-hotel-list-card__room">
                        {{ item.name }}
                    </VClamp>
                </div>
                <VClamp v-if="!$vuetify.breakpoint.mdAndUp" autoresize :max-lines="2" :title="distance" tag="span" class="gst-add-hotel-reservation-hotel-list-card__distance">
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
                    :bundle-products="bundleProducts"
                    @input="onRoomDropDownInputDo" />
                <VClamp autoresize :max-lines="1" :title="bundleProducts | bundleProductsQuantity" class="gst-add-hotel-reservation-hotel-list-card__bundle-products">
                    {{ bundleProducts | bundleProductsQuantity }}
                </VClamp>
                <div class="pb-1">
                    <span v-if="showBasePriceWithoutDiscount" class="gst-add-hotel-reservation-hotel-list-card__price-with-discount">
                        {{ bundleProductsTotals.basePriceWithoutDiscount | currency( currency ) }}
                    </span>
                    <span class="gst-add-hotel-reservation-hotel-list-card__price">
                        {{ bundleProductsTotals.basePrice | currencyFull( currency) }}
                    </span>
                    <span class="gst-add-hotel-reservation-hotel-list-card__price-info">
                        {{ $t( '_common:terms.plusTaxesAndFees' ) }}
                    </span>
                </div>
            </div>
            <div class="d-flex align-center">
                <BaseButton
                    :placeholder="addButtonLabel"
                    class="gst-add-hotel-reservation-hotel-list-card__btn"
                    color="primary"
                    @click="addItem( )" />
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
        name: 'HotelsListCard',
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
            addButtonLabel: {
                type: String,
                required: true
            }
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
                return this.item.rooms;
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
            addItem( ) {
                this.busEventsParent.$emit( 'add-item', this.item );
            },
            onRoomDropDownInputDo( value ) {
                this.busEventsParent.$emit( 'change-room', { id: this.item.id, value } );
            }
        }
    };
</script>


<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-add-hotel-reservation-hotel-list-card {
        @include font-size( 'm' );
        @include font-weight( 'regular' );

        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );

        .v-image {
            border-radius: 2px;
        }

        .gst-add-hotel-reservation-hotel-list-card__rating {
            height: font-size( 'xxs' );
            margin-top: 2px;
            float: left;
        }

        .gst-add-hotel-reservation-hotel-list-card__distance {
            @include font-size( 'xxs' );
            @include line-height( 'm' );

            color: theme-color( 'tertiary' );
        }

        .gst-add-hotel-reservation-hotel-list-card__name {
            @include font-size( 'l' );
            @include font-weight( 'large' );
            @include line-height( 'xxxl' );

            color: theme-color( 'quaternary' );
        }

        .gst-add-hotel-reservation-hotel-list-card__room {
            @include font-size( 'l' );
            @include line-height( 'xxxl' );

            position: relative;
            top: theme-spacing( 1 );
        }

        .gst-add-hotel-reservation-hotel-list-card__bundle-products {
            @include font-size( 'xxs' );
            @include line-height( 'm' );

            margin: theme-spacing( 1 ) 0;
            color: theme-color( 'tertiary' );
        }

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

        .gst-add-hotel-reservation-hotel-list-card__price-info {
            @include font-size( 's' );
            @include line-height( 'xxl' );

            color: theme-color( 'primary-lighten-2' );
        }

        .gst-add-hotel-reservation-hotel-list-card__btn {
            @include font-weight( 'large' );

            letter-spacing: 0;
            text-transform: capitalize;
        }
    }
</style>
