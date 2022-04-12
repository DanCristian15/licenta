import startOfToday from  'date-fns/startOfToday';
import {
    isWithinInterval as dateUtilsIsWithinInterval,
    parseString as dateUtilsParseString,
    formatQueryParam as dateUtilsFormatQueryParam,
    isValid as dateUtilsIsValid
} from '@core/utils/dateUtils';
import dateConstants from './constants/date';
import {
    hasCity as searchObjectUtilsHasCity,
    hasCustomCityLocation as searchObjectUtilsHasCustomCityLocation
} from './searchObjectUtils';

export function isParamPeriodValid ( startDate, endDate ) {
    if ( startDate && endDate && startDate.getTime( ) <= endDate.getTime( ) ) {
        return dateUtilsIsWithinInterval ( startOfToday( ), dateConstants.FIRST_DATE, endDate );
    }
    return false;
}

export function normalizeDataInitialState ( data ) {
    if ( !data || !data.city || !data.startDate || !data.endDate || !data.loyaltyAccount || !data.loyaltyAccount.id ) {
        return null;
    }
    const ret = { ...data };

    if ( !searchObjectUtilsHasCity ( data ) ) {
        return null;
    }

    ret.startDate = dateUtilsParseString ( ret.startDate, dateConstants.FORMAT.DEFAULT  );
    ret.endDate   = dateUtilsParseString ( ret.endDate, dateConstants.FORMAT.DEFAULT );
    if ( !isParamPeriodValid( ret.startDate, ret.endDate ) ) {
        return null;
    }
    return ret;
}

export function getInitialStateFromQuery ( query ) {
    return {
        city: {
            name:           query.cityName,
            stateCode:      query.stateCode,
            countryCode:    query.countryCode
        },
        startDate:          query.startDate,
        endDate:            query.endDate,
        loyaltyAccount:     {
            id:             query.loyaltyAccountId
        }
    };
}

export function normalizeInitialStateFromQuery ( query ) {
    return normalizeDataInitialState( getInitialStateFromQuery( query ) );
}

export function buildSearchQueryObject ( { keyword, startDate, endDate, city, sort } ) {
    const getCity = ( ) => {
        if ( searchObjectUtilsHasCity( { city } ) ) {
            let ret = {
                cityName: city.name,
                stateCode: city.stateCode,
                countryCode: city.countryCode,
                cityExistsInApi: city.existsInApi,
                    
            };
            if ( searchObjectUtilsHasCustomCityLocation( { city } ) ) {
                ret = {
                    ...ret,
                    latitude: city.location.latitude,
                    longitude: city.location.longitude,
                    locationCurrent: city.location.current,
                };
            }

            return ret;
        }

        return { };
    };

    return Object.assign(
        { },
        keyword ? { keyword } : {},
        startDate ? { startDate: dateUtilsFormatQueryParam( startDate, 'yyyy-MM-dd' )  } : {},
        endDate ? { endDate: dateUtilsFormatQueryParam( endDate, 'yyyy-MM-dd' ) } : { },
        sort ? { sort: sort.toUpperCase( ) } : {},
        getCity( )
    );
}
    
export function normalizeSearchQuery ( query ) {
    const getSearchObjectFromQuery = ( q ) => {
        return {
            keyword:    q.keyword,
            city: {
                name:           q.cityName,
                stateCode:      q.stateCode,
                countryCode:    q.countryCode,
                existsInApi:    q.cityExistsInApi === '1',
                location: {
                    latitude: q.latitude ? q.latitude * 1 : null,
                    longitude: q.longitude ? q.longitude * 1 : null,
                    current: q.locationCurrent === '1',
                }
            },
            startDate:  q.startDate,
            endDate:    q.endDate,
        };
    };
    const queryObject = getSearchObjectFromQuery( query );

    if ( !query ) {
        return { };
    }
    let ret = { ...queryObject };
        
    searchObjectUtilsHasCity ( ret ) || ( delete ret.city );
    ret.keyword || ( delete ret.keyword );
    ret.startDate = dateUtilsParseString ( ret.startDate );
    ret.endDate   = dateUtilsParseString ( ret.endDate );
    if ( dateUtilsIsValid( ret.startDate ) &&  !dateUtilsIsValid( ret.endDate ) ) {
        delete ret.endDate;
    } else if ( !isParamPeriodValid( ret.startDate, ret.endDate ) ) {
        delete ret.startDate;
        delete ret.endDate;
    }

    return ret;
}
