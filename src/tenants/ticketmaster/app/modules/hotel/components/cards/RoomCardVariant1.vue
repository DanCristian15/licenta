<template>
    <div class="gst-room-card-variant-1" @click="$emit('click')">
        <h6 class="gst-room-card-variant-1__name pb-4">
            {{ item | roomName }}
        </h6>
        <ElementsClamp :items="amenitiesDisplay" class="gst-room-card-variant-1__ameneties px-4" tag-item="span" class-item="d-inline-block gst-room-card-variant-1__amenety">
            <template slot="item" slot-scope="slotProps">
                {{ slotProps.item }}
            </template>
            <template slot="after" slot-scope="slotProps">
                <div class="d-inline" @click.stop="" @mousedown.stop="" @touchstart.stop="">
                    <v-tooltip v-if="slotProps.remainingCount" :bottom="isDesktop" :left="!isDesktop" :open-on-click="!$vuetify.breakpoint.mdAndUp" :open-on-hover="$vuetify.breakpoint.mdAndUp">
                        <template v-slot:activator="{ on, attrs }">
                            <span v-if="isDesktop" class="gst-room-card-variant-1__amenety-remaining" v-bind="attrs" v-on="on">
                                + {{ slotProps.remainingCount }} {{ $t( '_common:terms.more' ) }}
                            </span>
                            <span v-else class="gst-room-card-variant-1__amenety-remaining" v-bind="attrs" v-on="on">
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
        <div class="row no-gutters px-4 pt-4">
            <div class="col col-7 col-md-12 order-md-last d-flex align-center ">
                <span v-if="feesExcluded.length" class="gst-add-hotel-reservation-hotel-list-card__fees">
                    {{ $t( '_common:terms.excluded' ) }}: {{ feesExcludedText }}
                </span>
            </div>
            <div class="col col-5 col-md-12 d-flex flex-column justify-center mb-md-4">
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
        </div>
    </div>
</template>

<script>
    import VClamp from 'vue-clamp';
    import ElementsClamp from '@core/shared/components/misc/ElementsClamp';
    import HotelReservationRoomModel from '@tenant/app/models/HotelReservationRoomModel';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import roomRateFee from '@core/utils/constants/roomRateFee';

    export default {
        name: 'RoomCardVariant1',
        components: {
            VClamp,
            ElementsClamp
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
        },
        computed: {
            isDesktop( ) {
                return  this.$vuetify.breakpoint.mdAndUp;
            },
            amenities( ) {
                return this.item.amenities;
            },
            amenitiesDisplay( ) {
                return this.amenities.filter( item => item.quantity !== 0 ).map( item => this.$options.filters.roomAmenity( item ) );
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
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-room-card-variant-1 {
        border: 1px solid theme-color-hex( 'senary-darken-2' );
        border-radius: 4px;

        .gst-room-card-variant-1__name {
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            text-align: center;
        }

        .gst-room-card-variant-1__ameneties {
            height: 100px;
            line-height: 24px;
            font-size: font-size( 'xxxs' );
            border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
        }

        .gst-room-card-variant-1__amenety {
            line-height: 22px;
            padding: theme-spacing( 0, 1 );
            margin: theme-spacing( 1, 1, 0, 0 );
            background-color: theme-color( 'background-success' );
            color: theme-color( 'success' );
            border-radius: 4px;
        }

        .gst-room-card-variant-1__amenety-remaining {
            height: 30px;
            padding: 4px;
            margin-top: 8px;
            color: theme-color( 'success' );
        }

        .gst-add-hotel-reservation-hotel-list-card__fees,
        .gst-add-hotel-reservation-hotel-list-card__bundle-products {
            line-height: line-height( 's' );
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
    }
</style>
