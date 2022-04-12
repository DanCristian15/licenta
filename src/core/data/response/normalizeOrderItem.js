import productsConstants from '@core/utils/constants/products';
import { normalizeOrderItemEventTicket } from '@core/data/response/normalizeOrderItemEventTicket';
import { normalizeOrderItemHotelReservation } from '@core/data/response/normalizeOrderItemHotelReservation';

/**
 * Order
 *
 * Normalize Order Partner
 */

export function normalizeOrderItem( data ) {
    switch ( data.productTypeId ) {
    case productsConstants.TYPES.TICKET:
        return normalizeOrderItemEventTicket( data );
    case productsConstants.TYPES.HOTEL_RESERVATION:
        return normalizeOrderItemHotelReservation( data );
    default:
        return data;
    }
}