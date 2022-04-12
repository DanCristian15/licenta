<template>
    <v-card flat outlined class="gst-price-list-container">
        <v-list flat class="gst-price-list pt-0 pb-0 px-4">
            <v-list-item class="px-0 py-4 py-md-5" d-flex flex-column>
                <v-flex xs6 class="u-text-transform-by-language">
                    {{ $t("_common:terms.quantity") }}
                </v-flex>
                <v-flex xs6 class="text-right gst-price-list-container__total-quantity">
                    {{ totalQuantity }}
                </v-flex>
            </v-list-item>
            <v-list-item
                v-for="(offer, index ) in offersWithFees"
                :key="index"
                class="px-0 pt-0 pb-4 pt-md-1 pb-md-6 flex flex-column">
                <v-list-item
                    v-for="(fee, index2 ) in offer.fees"
                    :key="index2"
                    class="u-width-100 px-0 pt-4"
                    d-flex
                    flex-column>
                    <v-flex
                        class="u-text-transform-by-language"
                        :class="{
                            'gst-price-list-container__label-1': fee.isBase,
                            'gst-price-list-container__label-2': !fee.isBase
                        }"
                        xs8>
                        {{ fee.label }}
                    </v-flex>
                    <v-flex xs4 d-flex flex-row align-self-start class="font-weight-medium">
                        <v-flex
                            shrink
                            class="text-left gst-price-list-container__label-2">
                            x{{ offer.quantity }}
                        </v-flex>
                        <v-flex
                            :class="{
                                'gst-price-list-container__label-3': fee.isBase,
                                'gst-price-list-container__label-2': !fee.isBase,
                            }"
                            grow
                            class="text-right">
                            {{ ( fee.price + fee.tax ) | currencyFull( currency ) }}
                        </v-flex>
                    </v-flex>
                </v-list-item>
            </v-list-item>
            <v-list-item
                v-for="(orderFee, index ) in orderWithFees"
                :key="'order' + index"
                class="px-0 py-4 py-md-5"
                d-flex
                flex-column>
                <v-flex
                    xs6
                    class="u-text-transform-by-language">
                    {{ orderFee.label }}
                </v-flex>
                <v-flex xs6 class="text-right gst-price-list-container__label-3">
                    {{ ( orderFee.price + orderFee.tax ) | currencyFull( currency ) }}
                </v-flex>
            </v-list-item>
            <v-list-item v-if="showShippingFeesSection" class="px-0 py-4 py-md-5 d-flex flex-wrap">
                <v-flex d-flex xs12>
                    <v-flex xs8 class="gst-price-list-container__label-1 u-text-transform-by-language">
                        {{ $t("labels.shipping") }}
                    </v-flex>
                    <v-flex xs4 d-flex justify-end class="font-weight-medium">
                        {{ shippingFee }}
                    </v-flex>
                </v-flex>
                <v-flex d-flex xs12 class="mt-4">
                    <v-flex xs8 class="gst-price-list-container__label-2 u-text-transform-by-language">
                        {{ $t("labels.shippingTaxes") }}
                    </v-flex>
                    <v-flex xs4 d-flex justify-end class="gst-price-list-container__label-2">
                        {{ shippingTax }}
                    </v-flex>
                </v-flex>
            </v-list-item>
            <v-list-item v-if="isLoyaltyTypeAllowRedeem" class="px-0 py-4 py-md-5" d-flex flex-column>
                <v-flex xs6>
                    <div class="gst-price-list-container__label-1 u-text-transform-by-language">
                        {{ $t("labels.bonusPointsRedeem") }}
                    </div>
                </v-flex>
                <v-flex xs6 class="text-right gst-price-list-container__total-price">
                    {{ paymentModel.points | bonusPoints }}
                </v-flex>
            </v-list-item>
            <v-list-item class="px-0 py-4 py-md-5 align-start align-md-center" d-flex flex-column>
                <v-flex xs6>
                    <div class="gst-price-list-container__label-1 u-text-transform-by-language">
                        {{ $t("labels.finalTotal") }}
                    </div>
                    <div class="gst-price-list-container__label-2">
                        {{ $t("labels.includingTaxes") }}
                    </div>
                </v-flex>
                <v-flex xs6 class="text-right gst-price-list-container__total-price">
                    {{ paymentModel.amount | currencyFull( currency ) }}
                </v-flex>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { cleanAndTranslate as feeUtilsCleanAndTranslate } from '@core/utils/feeUtils';
    import { sortCompare } from '@core/utils/sortCompareUtils';
    import {
        findOneNonElectronicTicketItem as shippingOptionsUtilsFindOneNonElectronicTicketItem,
        findOneItemWithFees as shippingOptionsUtilsFindOneItemWithFees
    } from '@/core/utils/shippingOptionsUtils';

    export default {
        name: 'ContainerItemPriceDetailCard',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.containerItemPriceDetailCard'
        },
        props: {
            cartCollection: {
                type: Object,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            paymentModel: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            showShippingFeesSectionEmpty: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowRedeem': 'isLoyaltyTypeAllowRedeem'
            } ),
            offersWithFees( ) {
                if ( !this.offers.length ) {
                    return [];
                }

                return this.offers
                    .map( ( { name, quantity, charges } ) => {
                        return {
                            name,
                            quantity,
                            fees: feeUtilsCleanAndTranslate( charges, name ).sort( ( a, b ) => sortCompare( a.order, b.order ) )
                        };
                    } );
            },
            offers( ) {
                return this.cartCollection.offers;
            },
            orderWithFees( ) {
                if ( !this.order || !this.order.charges ) {
                    return [];
                }

                return feeUtilsCleanAndTranslate( this.order.charges );
            },
            totalQuantity( ) {
                return this.offers.reduce( ( acc, { quantity } ) => {
                    return acc + quantity;
                },  0 );
            },
            currency( ) {
                const { order } = this;
                return order.currency;
            },
            showShippingFeesSection( ) {
                const { options } = this.shippingModel;

                return shippingOptionsUtilsFindOneNonElectronicTicketItem( options )
                    || shippingOptionsUtilsFindOneItemWithFees( options );
            },
            shippingFee() {
                return ( this.paymentModel.shippingFee && !this.showShippingFeesSectionEmpty ) ? this.$options.filters.currencyFull( this.paymentModel.shippingFee, this.currency ) : '-';
            },
            shippingTax() {
                return ( this.paymentModel.shippingTax && !this.showShippingFeesSectionEmpty ) ? this.$options.filters.currencyFull( this.paymentModel.shippingFee, this.currency ) : '-';
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-price-list-container {
        .gst-price-list-container__label-1 {
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.41px;
        }

        .gst-price-list-container__label-2 {
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.41px;
        }

        .gst-price-list-container__label-3 {
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.41px;
        }

        .gst-price-list-container__total-price {
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.41px;
        }
    }
</style>
<style lang="scss">
    @import "@scssVariables";

    .gst-price-list-container {
        &.v-card {
            border-radius: border-radius( 'm' ) !important;
            border-color: theme-color( 'quinary' ) !important;
        }

        .gst-price-list {
            > .v-list-item {
                border-top: 1px solid theme-color( 'quinary' );

                &:first-of-type {
                    border: none;
                }

                &::after {
                    height: 0 !important;
                    min-height: 0 !important;
                }

                > .v-list-item {
                    min-height: 20px;
                }
            }
        }
    }
</style>
