<template>
    <div class="gst-order-confirmation-modal-payment d-flex">
        <div class="gst-order-confirmation-modal-payment__summary d-flex">
            <span>{{ $t('paymentSummary') }}</span>
            <span @click="showMoreDetails = !showMoreDetails">{{ $t(!showMoreDetails ? 'viewDetails' : 'closeDetails') }}</span>
        </div>
        <div class="gst-order-confirmation-modal-payment__method d-flex">
            <div class="payment-info d-flex">
                <span>{{ $t('paymentMethod') }}</span>
                <span class="payment-info__total">{{ $t('total') }}: {{ totalPrice | currencyFull( currency ) }} </span>
            </div>
            <div class="card-info"
                :class="{
                    'd-flex justify-space-between': isPackageOffer
                }">
                <div class="d-flex align-center">
                    {{ paymentInfo.card.type }} <div class="card-info__separator"></div> {{ paymentInfo.card.last4 }}
                </div>
                <span v-if="isPackageOffer" class="card-info__sales_final">
                    {{ $t('allSalesFinal') }}
                </span>
            </div>
        </div>
        <v-expand-transition>
            <div v-if="showMoreDetails" class="gst-order-confirmation-modal-payment__details">
                <h5 class="mt-4 mb-2">
                    {{ titlePaymentItems }}
                </h5>
                <div class="detail__item d-flex flex-row align-end">
                    <div class="detail__item-name flex-grow-1 u-text-transform-by-language">
                        <div v-for="(item, key) in paymentItems" :key="key" class="mb-0">
                            <span class="mr-1">{{ item.name }}</span>
                            <span>x {{ item.quantity }}</span>
                        </div>
                    </div>
                    <div class="detail__price flex-shrink-0">
                        {{ totalBasePrice | currencyFull( currency ) }}
                    </div>
                </div>
                <h5 class="mt-4 mb-2">
                    {{ $t('fees') }}
                </h5>
                <div v-if="fees.length" class="detail__item d-flex flex-wrap align-end">
                    <div v-for="(item, key) in fees" :key="key" class="d-flex flex-grow-1 align-center justify-between u-width-100">
                        <div class="detail__item-name flex-grow-1 u-text-transform-by-language">
                            <div v-if="!item.isOrderFee || item.isOrderFee && item.quantity > 1">
                                <span class="mr-1">{{ item.name }}:</span>
                                <span class="mr-1">{{ item.price | currencyFull( currency ) }}</span>
                                <span>x {{ item.quantity }}</span>
                            </div>
                            <div v-else>
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="detail__price flex-shrink-0">
                            {{ item.amount | currencyFull( item.currency ) }}
                        </div>
                    </div>
                </div>
                <div v-else class="detail__item d-flex flex-row align-end">
                    ---
                </div>
                <h5 class="mt-4 mb-2">
                    {{ $t('delivery') }}
                </h5>
                <div class="d-flex flex-row align-end">
                    <div class="detail__item-name flex-grow-1 ">
                        {{ shippingInformation.name }}
                    </div>
                    <div class="detail__price flex-shrink-0">
                        {{ shippingInformation.price | currencyFull( currency ) }}
                    </div>
                </div>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
    import feeConstants from '@core/utils/constants/fee';
    import shippingFilter from '@/core/filters/localFilters/shipping';
    import FeesContainerMixin from './Mixins/FeesContainerMixin';

    export default {
        name: 'OrderConfirmationModalPaymentInfo',
        mixins: [ FeesContainerMixin ],
        props: {
            currency: {
                type: String,
                required: true
            },
            paymentItems: {
                type: Array,
                required: true
            },
            hasTicketsOnly: {
                type: Boolean,
                required: true
            },
            isPackageOffer: {
                type: Boolean,
                default: false
            },
            order: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                showMoreDetails: false,
            };
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.orderConfirmationModal'
        },
        filters: {
            shippingFilter
        },
        computed: {
            totalPrice( ) {
                return this.order.totalAmount;
            },
            totalBasePrice( ) {
                let price = this.order.items[0].price;

                if ( this.order.items[1] ) {
                    price += this.order.items[1].price;
                }

                return price;
            },
            paymentInfo( ) {
                return this.order.paymentInfo;
            },
            shippingInformation() {
                const { charges, shipping } = this.order.items.find( item => item.shipping ) ;
                const price = charges.find( charge => charge.type === feeConstants.TYPES.DELIVERY ).fee;

                return {
                    name: shipping.short,
                    price
                };
            },
            titlePaymentItems: function( ) {
                if ( this.hasTicketsOnly ) {
                    return this.$t( '_common:terms.ticket_plural' );
                }
                return this.$t( '_common:terms.bundleTicketsHotel' );
            }
        },
    };
</script>

<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-order-confirmation-modal-payment {
        width: 100%;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        .payment-info {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'bold' );
            align-items: center;
            justify-content: space-between;
        }

        .gst-order-confirmation-modal-payment__summary {
            width: 100%;
            line-height: line-height( 'xxl' );
            padding-bottom: theme-spacing( 4 );
            margin-top: theme-spacing( 5 );
            font-size: font-size( 'm' );
            font-weight: font-weight( 'bold' );
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #E3E3E3;

            span:nth-child(2) {
                color: theme-color( 'primary' ) !important;
                cursor: pointer;
            }
        }

        .gst-order-confirmation-modal-payment__method {
            width: 100%;
            padding-bottom: theme-spacing( 4 );
            margin-top: theme-spacing( 5 );
            flex-direction: column;

            .payment-info {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'bold' );
                align-items: center;
                justify-content: space-between;
            }

            .card-info {
                display: flex;
                line-height: line-height( 'm' );
                margin-top: theme-spacing( 2 );
                color: #999999;
                font-size: font-size( 'xxs' );
                font-weight: font-weight( 'bold' );
                text-transform: uppercase;
                align-items: center;

                .card-info__separator {
                    width: 23px;
                    margin: theme-spacing( 0 ) theme-spacing( 1 );
                    border-bottom: 1px solid #999999;
                }

                .card-info__sales_final {
                    line-height: line-height( 'm' );
                    font-size: font-size( 'xxs' );
                    font-weight: font-weight( 'regular' );
                    text-transform: none;
                }
            }
        }

        .gst-order-confirmation-modal-payment__details {
            width: 100%;
            padding-bottom: theme-spacing( 6 );

            h5 {
                line-height: line-height( 'xxxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'large' );
            }

            .detail__item {
                padding-bottom: theme-spacing( 6 );
                border-bottom: 1px solid #E3E3E3;
            }

            .detail__item-name,
            .detail__item-price {
                line-height: line-height( 'xl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 's' );
                font-weight: font-weight( 'regular' );
            }
        }
    }
</style>
