import isEmpty from 'lodash/isEmpty';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';
import { normalizeHealthCheck } from '@/core/data/response/normalizeHealthCheck';
import normalizeAddress from './normalize/address';
import utils from './_utils';

export function normalizeOrderItemEventTicket( data ) {
    return {
        price:          data.price,
        basePrice:      data.basePrice,
        fees:           data.fees,
        cartItemId:     data.cartItemId,
        orderNumber:    data.orderNumber,
        orderToken:     data.orderToken,
        totalAmount:    data.totalPrice,
        packageOfferId: data.packageId || null,
        productTypeId:  data.productTypeId,
        paymentId:      data.paymentOptionId,
        redemptionUrl:  data.redemptionUrl || null,
        charges: Array.isArray( data.charges ) ? data.charges.map( normalizeCharge ) : [],
        offers: Array.isArray( data.items ) ? data.items.map( offer => {
            return {
                charges: offer.charges,
                name: offer.name,
                quantity: offer.quantity
            };
        } ) : [ ],
        event:          normalizeEventInfo( data.info ),
        ticket:         normalizeTicket( data ),
        shipping: data.shippingDescription ? {
            short: data.shippingDescription
        } : null
    };
}

function normalizeEventInfo( data ) {
    const { address } = data;

    return {
        name: data.name || '',
        imageUrl: data.imageUrl || '',
        venueName: address.venueName || null,
        address: normalizeAddress( {
            address: address.street || null,
            cityName: address.city || null,
            countryCode: address.countryCode || null,
            stateCode: address.stateCode || null,
        } ),
        healthCheck: !isEmpty( data.healthCheck ) ? normalizeHealthCheck( data.healthCheck ) : null,
        ...utils.getEventDates( {
            startDateTime: dateUtilsParseDateString( data.startDateTime ),
            endDateTimeAt: dateUtilsParseDateString( data.endDateTimeUtc ),
            timeOffset: data.timeOffset
        } ),
    };
}

export function normalizeTicket( data = { } ) {
    const item = data.items ? data.items[ 0 ] : { };

    return {
        id: item.id || null,
        name: item.name || '',
        description: item.description || '',
        quantity: item.quantity || 0,
        section: item.section || 0,
        row: item.row || 0,
        seats: item.seats ? item.seats.split( ',' ) : null,
        inventory: item.inventory || null,
    };
}