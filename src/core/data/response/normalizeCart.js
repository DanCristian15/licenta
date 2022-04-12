import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';
import { normalizeCartItem } from '@core/data/response/normalizeCartItem';
import utils from './_utils';

export function normalizeCart( cart ) {
    const collections = cart.items.map( normalizeCartItem );
    const itemExpireAt = dateUtilsParseDateString( collections[ 0 ].expireAt );
    const loyaltyCurrency = collections[ 0 ].loyaltyCurrency;

    return {
        cart: {
            id: cart.uuid,
            userId: cart.userId || null,
            tenantId: cart.tenantId || null,
            created: cart.created ? dateUtilsParseDateString( cart.created ) : new Date( ),
            expiredAt: itemExpireAt,
        },
        collections,
        order: {
            redeemPoints: cart.totals.redeemPoints || 0,
            earnPoints: cart.totals.earnPoints || 0,
            totalPrice: cart.totals.totalPrice || 0,
            totalDelivery: utils.getShippingPrice( collections ) || 0,
            basePrice: cart.totals.basePrice || 0,
            fee: cart.totals.fee || 0,
            currency: cart.totals.currency || null,
            charges: collections.reduce( ( acc, item ) => {
                return acc = acc.concat( item.charges.map( normalizeCharge ) );
            }, [] ),
            price: {
                basePrice: cart.totals.basePrice,
                fee:cart.totals.fee
            },
            loyaltyCurrency: loyaltyCurrency || null
        }
    };
}