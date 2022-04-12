import feeConstants from '@core/utils/constants/fee';
import roomRateFeeConstants from '@core/utils/constants/roomRateFee';
import productsConstants from '@core/utils/constants/products';
import { cleanAndTranslate as feeUtilsCleanAndTranslate } from '@core/utils/feeUtils';
import { groupByLabelAndPrice as feeUtilsGroupByLabelAndPrice } from '@core/utils/feeUtils';
import { sortCompare } from '@core/utils/sortCompareUtils';

export default {
    computed: {
        ticket( ) {
            const items = this.order.items || this.cartCollections;

            return items.find( item => item.productTypeId === productsConstants.TYPES.TICKET );
        },
        ticketOffers() {
            return this.ticket.offers || [];
        },
        ticketOffersWithFees( ) {
            if ( !this.ticketOffers.length ) {
                return [];
            }

            return this.ticketOffers
                .map( ( { name, quantity, charges } ) => {
                    return {
                        name,
                        quantity,
                        fees: feeUtilsCleanAndTranslate( charges, name ).filter( fee => fee.type !== feeConstants.TYPES.BASE )
                    };
                } );
        },
        orderWithFees( ) {
            if ( !this.order || !this.order.charges ) {
                return [];
            }

            const feesFiltered = this.order.charges
                .map( fee => {
                    return {
                        ...fee,
                        prependLabel: true
                    };
                } )
                .filter( fee => fee.included === roomRateFeeConstants.TYPES_INCLUDED.PAY_NOW && fee.type !== feeConstants.TYPES.DELIVERY );

            return feeUtilsCleanAndTranslate( feesFiltered );
        },
        shippingOption( ) {
            const { optionId, options } = this.shippingModel;

            if ( optionId ) {
                return options.find( item => item.id === optionId );
            }

            return null;
        },
        feesTickets( ) {
            if ( !this.ticketOffersWithFees.length ) {
                return [];
            }

            return this.ticketOffersWithFees
                .reduce( ( acc, item ) => {
                    acc = acc.concat( item.fees.map( fee => {
                        return {
                            name: fee.label,
                            quantity: fee.quantity,
                            price: ( fee.price + fee.tax ),
                            amount: ( fee.price + fee.tax ) * fee.quantity,
                            currency: this.currency,
                            isOrderFee: false,
                            order: fee.order
                        };
                    } ) );

                    return acc;
                }, [] )
                .sort( ( a, b ) => sortCompare( a.order, b.order ) );

        },
        feesHotels( ) {
            const items = this.order.items || this.cartCollections;
            const hotelInfo = items
                .find( item => item.productTypeId === roomRateFeeConstants.TYPES.HOTEL_RESERVATION ) || { charges: [] };
            const payNowFees = hotelInfo.charges.filter( charge => charge.included === roomRateFeeConstants.TYPES_INCLUDED.PAY_NOW );

            if ( payNowFees.length === 0 ) {
                return [];
            }

            return payNowFees.map( charge => {
                return {
                    name: charge.name,
                    quantity: charge.quantity,
                    price: charge.price,
                    amount: charge.price * charge.quantity,
                    currency: this.currency,
                    isOrderFee: false
                };
            } );
        },
        feesOrder( ) {
            if ( !this.orderWithFees ) {
                return [];
            }

            return this.orderWithFees
                .map( item => {
                    return {
                        name: item.label,
                        quantity: 1,
                        price: ( item.price + item.tax ),
                        amount: ( item.price + item.tax ) * 1,
                        currency: this.currency,
                        isOrderFee: true
                    };
                } );
        },
        fees: function () {
            const fees = [
                ...this.feesTickets,
                ...this.feesHotels,
                ...this.feesOrder
            ];

            return feeUtilsGroupByLabelAndPrice( fees );
        },
    }
};