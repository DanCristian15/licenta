import currencyConstants from '@core/utils/constants/currency';
import { normalizeEvent } from '@core/data/response/normalizeEvent';
import normalizeHotel from './normalize/hotel';

export function normalizePackageDetails( data ) {
    return {
        event: normalizeEvent( data.event ),
        hotel: normalizeHotel( data.hotel ),
        currency: data.currency || currencyConstants.DEFAULT,
        totals: {
            totalPrice: data.totalPrice || 0,
            basePrice: data.basePrice || 0,
        }
    };
}
