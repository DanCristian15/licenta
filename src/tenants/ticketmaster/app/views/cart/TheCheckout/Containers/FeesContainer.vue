<template>
    <div class="gst-fees-container">
        <div class="mt-2 mt-md-4">
            <h5>{{ title }}</h5>
            <div class="d-flex flex-row">
                <div class="gst-fees-container__item flex-grow-1 u-text-transform-by-language">
                    <div v-for="(item, key) in itemsShow" :key="key" class="mb-0">
                        <span class="mr-1">{{ item.name }}</span>
                        <span>x {{ item.quantity }}</span>
                    </div>
                </div>
                <div class="gst-fees-container__price flex-shrink-0">
                    {{ totalBasePrice | currencyFull( currency ) }}
                </div>
            </div>
        </div>
        <div v-if="fees.length" class="mt-4 mt-md-6">
            <h5>{{ $t( '_common:terms.fee_plural' ) }}</h5>
            <div v-for="(item, key) in fees" :key="key" class="d-flex flex-row">
                <div class="gst-fees-container__item flex-grow-1 u-text-transform-by-language">
                    <div v-if="!item.isOrderFee || item.isOrderFee && item.quantity > 1">
                        <span class="mr-1">{{ item.name }}:</span>
                        <span class="mr-1">{{ item.price | currencyFull( currency ) }}</span>
                        <span>x {{ item.quantity }}</span>
                    </div>
                    <div v-else>
                        {{ item.name }}
                    </div>
                </div>
                <div class="gst-fees-container__price flex-shrink-0">
                    {{ item.amount | currencyFull( item.currency ) }}
                </div>
            </div>
        </div>
        <div v-else class="mt-4 mt-md-6">
            <h5>{{ $t( '_common:terms.fee_plural' ) }}</h5>
            <div>
                ---
            </div>
        </div>
        <div v-if="shippingOption" class="mt-4 mt-md-6">
            <h5>{{ $t( '_common:terms.delivery' ) }}</h5>
            <div class="d-flex flex-row mt-2">
                <div class="gst-fees-container__item flex-grow-1">
                    {{ shippingOption.description.short }}
                </div>
                <div class="gst-fees-container__price">
                    {{ shippingOption.totals.fee | currencyFull( shippingOption.totals.currencyCode ) }}
                </div>
            </div>
        </div>
        <BaseButton
            color="primary"
            text
            link
            :data-test-id="$testId('button.cancelOrder')"
            class="gst-fees-container__cancel-btn"
            @click="$emit('cancel')">
            Cancel Order
        </BaseButton>
    </div>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import productsConstants from '@core/utils/constants/products';
    import {
        findOneNonElectronicTicketItem as shippingOptionsUtilsFindOneNonElectronicTicketItem,
        findOneItemWithFees as shippingOptionsUtilsFindOneItemWithFees
    } from '@/core/utils/shippingOptionsUtils';
    import FeesContainerMixin from '../Mixins/FeesContainerMixin';

    export default {
        name: 'FeesContainer',
        components: {
            BaseButton,
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.containers.feesContainer'
        },
        testIdOptions: {
            keyPrefix: 'checkout.containers.feesContainer'
        },
        mixins: [ FeesContainerMixin ],
        props: {
            cartCollections: {
                type: Array,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
        },
        computed: {
            title: function( ) {
                if ( this.hasOnlyTickets ) {
                    return this.$t( '_common:terms.ticket_plural' );
                }
                return this.$t( '_common:terms.bundleTicketsHotel' );
            },
            hasOnlyTickets: function ( ) {
                return this.cartCollections.length === 1;
            },
            totalBasePrice( ) {
                return this.order.basePrice;
            },
            currency( ) {
                return this.order.currency;
            },
            hasTicketsOnly( ) {
                return this.cartCollections.length === 1;
            },
            ticketItems( ) {
                return this.ticket.items;
            },
            hotelReservation( ) {
                return this.cartCollections
                    .filter( item => item.productTypeId === productsConstants.TYPES.HOTEL_RESERVATION ) [ 0 ];
            },
            itemsShow( ) {
                const { ticketItems, hasTicketsOnly, hotelReservation } = this;

                const ret = ticketItems.reduce( ( acc, item ) => {
                    acc = [
                        ...acc,
                        {
                            name: item.name,
                            quantity: item.quantity
                        }
                    ];

                    return acc;
                }, [] );

                if ( !hasTicketsOnly )  {
                    ret.push( {
                        name: hotelReservation.hotel.room.name.toLowerCase(),
                        quantity: hotelReservation.accommodation.roomsCount
                    } );
                }
                return ret;
            },
            showShippingFeesSection( ) {
                const { options } = this.shippingModel;

                return shippingOptionsUtilsFindOneNonElectronicTicketItem( options )
                    || shippingOptionsUtilsFindOneItemWithFees( options );
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-fees-container {
        color: theme-color( 'quaternary' );

        h5 {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
            text-transform: capitalize;
        }

        .gst-fees-container__item,
        .gst-fees-container__price {
            line-height: line-height( 'xl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-fees-container__cancel-btn {
            padding: theme-spacing( 6, 0, 6, 0 );
            font-weight: font-weight( 'large' );
            letter-spacing: 0;
            text-transform: capitalize;
        }

        @include mobile-only {
            .gst-fees-container__item,
            .gst-fees-container__price {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'xs' );
            }
        }
    }
</style>
