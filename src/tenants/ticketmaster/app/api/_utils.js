import { formatQueryParam as dateUtilsFormatQueryParam } from '@core/utils/dateUtils';

export function cleanQueryParams ( params ) {
    const ret = { ...params };

    for ( let key in ret ) {
        if ( ret[key] === null || ret[key] === undefined || ret[key] === '' ) {
            delete ret[key];
        }
    }

    return ret;
}

export function normalizeQueryParams ( { startDate, endDate, guests, latitude, longitude, range, roomsCount, ...rest } ) {
    const ret = {
        ...rest
    };

    ret.checkin = startDate && dateUtilsFormatQueryParam ( startDate );
    ret.checkout =  endDate && dateUtilsFormatQueryParam ( endDate );
    ret.latitude = latitude;
    ret.longitude = longitude;
    ret.range = range;
    ret.roomCount = roomsCount;
    ret.adultCount = guests && guests.adultsCount;
    ret.childCount = guests && guests.childrenCount;
    ret.childAges = guests && guests.childAges;

    return cleanQueryParams( ret );
}
