import isEmpty from 'lodash/isEmpty';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';
import { normalizeHealthCheck } from '@/core/data/response/normalizeHealthCheck';
import utils from './_utils';

export function normalizeCartItemEventTicket( data ) {
    return {
        id: data.id || null,
        packageOfferId: data.packageId || null,
        partnerCartId: data.partnerCartId || null,
        productId: data.productId || null,
        shippingId: data.shippingId || null,
        expireAt: dateUtilsParseDateString( data.expireAt ),
        productTypeId: data.productTypeId || null,
        partnerProductId: data.partnerProductId || null,
        orderNumber: data.orderNumber || null,
        redemptionUrl: data.redemptionUrl || null,
        cashPayment: data.cashPayment || null,
        pointsPayment: data.pointsPayment || null,
        pointsEarn: data.pointsEarn || null,
        pointsRedeem: data.pointsRedeem || null,
        portalId: data.portalId || null,
        paymentOptionId: data.paymentOptionId || null,
        currency: data.currency || null,
        loyaltyCurrency: data.loyaltyCurrency || null,
        amount: data.price || 0,
        fee: data.fee || 0,
        totalAmount: data.totalPrice || 0,
        status: data.status || null,
        created: dateUtilsParseDateString( data.created ),
        charges: Array.isArray( data.charges ) ? data.charges.map( normalizeCharge ) : [ ],
        items: Array.isArray( data.details ) ? data.details.map( normalizeCartItemDetails ) : [ ],
        info: data.info ? normalizeCartItemInfo( data.info ) : null,
        totalPrice: data.totalPrice,
        price: {
            basePrice: data.details[0].price,
            fee: data.details[0].fee,
        },
        bonusPoints: data.pointsEarn || 0,
        bonusPointsRedeem: data.pointsRedeem || 0,
        offers: Array.isArray( data.details ) ? data.details.map( offer => {
            return {
                charges: offer.charges,
                name: offer.name,
                quantity: offer.quantity
            };
        } ) : [ ]
    };
}

export function normalizeCartItemInfo( data ) {
    return {
        name: data.name || '',
        imageUrl: data.imageUrl || '',
        venueName: data.address.venueName || null,
        venueStreet: data.address.street || null,
        venueCity: data.address.city || null,
        venueStateCode: data.address.stateCode || null,
        venueCountryCode: data.address.countryCode || null,
        healthCheck: !isEmpty( data.healthCheck ) ? normalizeHealthCheck( data.healthCheck ) : null,
        ...utils.getEventDates( {
            startDateTime: dateUtilsParseDateString( data.startDateTime ),
            endDateTimeAt: dateUtilsParseDateString( data.endDateTimeUtc ),
            timeOffset: data.timeOffset
        } ),
    };
}

export function normalizeCartItemDetails( data ) {
    return {
        id: data.id || null,
        cartPartnerId: data.cartPartnerId || null,
        name: data.name || '',
        description: data.description || '',
        quantity: data.quantity || 0,
        amount: data.price || 0,
        fee: data.fee || 0,
        section: data.section || 0,
        row: data.row || 0,
        seats: data.seats ? data.seats.split( ',' ) : null,
        selection: data.selection || null,
        inventory: data.inventory || null,
        charges: Array.isArray( data.charges ) ? data.charges.map( normalizeCharge ) : [],
    };
}