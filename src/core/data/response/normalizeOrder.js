import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeOrderItem } from '@core/data/response/normalizeOrderItem';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';

/**
 * Order
 *
 * Normalize Order Object
 */

export function normalizeOrder( data ) {
    return {
        created:        dateUtilsParseDateString( data.created ),
        createdAt:      dateUtilsParseDateString( data.createdAt ),
        currency:       data.currency,
        id:             data.id,
        items:          data.items.map( normalizeOrderItem ),
        paymentCash:    data.paymentCash,
        paymentPoints:  data.pointsPayment,
        paymentStatus:  data.paymentStatus,
        pointsEarned:   data.pointsEarned,
        paymentInfo:    normalizePaymentInfo( data.paymentInfo || { } ),
        status:         data.orderStatus,
        totalAmount:    data.totalPrice,
        totalTaxes:     data.totalTaxes,
        userId:         data.userId,
        charges:        data.items.reduce( ( acc, item ) => {
            return acc = acc.concat( item.charges.map( normalizeCharge ) );
        }, [] ),
    };
}


function normalizePaymentInfo( info ) {
    return {
        card: {
            expireMonth:        info.cardExpireMonth,
            expireYear:         info.cardExpireYear,
            last4:              info.cardLast4,
            type:               info.cardType,
        },
    };
}