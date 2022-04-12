import roomRateFeeConstants from '@core/utils/constants/roomRateFee';

export function normalizeCharge( data ) {
    return {
        type: data.type || null,
        currency: data.currency || null,
        delivery: data.delivery || 0,
        fee: data.fee || 0,
        grand: data.grand || 0,
        merchandise: data.merchandise || 0,
        tax: data.tax || 0,
        unpaid: data.unpaid || 0,
        upsell: data.upsell || 0,
        price: data.price || data.fee || 0,
        quantity: data.quantity || 0,
        included: data.extra && data.extra.included || data.included || roomRateFeeConstants.TYPES_INCLUDED.PAY_NOW,
        name: data.extra && data.extra.name || null,
        info: data.extra ? {
            shortDesc: data.extra.shortDesc,
            longDesc: data.extra.longDesc,
            serviceLevel: data.extra.serviceLevel
        } : {}
    };
}