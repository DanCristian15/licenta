import productsConstants from '@core/utils/constants/products';
import { normalizeCartItemEventTicket } from '@core/data/response/normalizeCartItemEventTicket';
import { normalizeCartItemHotelReservation } from '@core/data/response/normalizeCartItemHotelReservation';

export function normalizeCartItem( data ) {
    switch ( data.productTypeId ) {
    case productsConstants.TYPES.TICKET:
        return normalizeCartItemEventTicket( data );
    case productsConstants.TYPES.HOTEL_RESERVATION:
        return normalizeCartItemHotelReservation( data );
    default:
        return data;
    }
}