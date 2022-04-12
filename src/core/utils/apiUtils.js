import fetch from '@core/utils/fetch';
import { formatQueryParam as dateUtilsFormatQueryParam } from '@core/utils/dateUtils';
import apiConstants from './constants/api';

export function normalizeListSuccess ( { data } ) {
    return {
        success:    true,
        data: {
            list: data.items,
            totalCount: data.totalCount
        }
    };
}

export function normalizeSuccess ( { data } ) {
    return {
        success:    true,
        data
    };
}

export function normalizeSuccessRaw ( response ) {
    return {
        success: true,
        data: response
    };
}

export function normalizeError ( { title, detail, data, status, cancel = false, code = null } ) {
    return {
        success:    false,
        title:      title,
        message:    detail,
        detail:     data,
        status:     status,
        code:       code,
        cancel
    };
}

export function getDefaultGetParams ( ) {
    return {
        keyword:    apiConstants.GET_DEFAULT_PARAMS.KEYWORD,
        limit:      apiConstants.GET_DEFAULT_PARAMS.LIMIT,
        offset:     apiConstants.GET_DEFAULT_PARAMS.OFFSET
    };
}

export function getDefaultGetParamsWithCount ( ) {
    return {
        ...getDefaultGetParams( ),
        count: false
    };
}

export function cleanQueryParams ( params ) {
    const ret = { ...params };

    for ( let key in ret ) {
        if ( ret[key] === null || ret[key] === undefined || ret[key] === '' ) {
            delete ret[key];
        }
    }

    return ret;
}

export function normalizeQueryParams ( data ) {
    const ret = { ...data };

    ret.startDate = ret.startDate && dateUtilsFormatQueryParam ( ret.startDate );
    ret.endDate  =  ret.endDate && dateUtilsFormatQueryParam ( ret.endDate );

    return cleanQueryParams( ret );
}

export function normalizeQueryParamsWithCity ( { city, countryCode, ...rest } ) {
    if ( city && city.name ) {
        return normalizeQueryParams( {
            ...rest,
            cityName: city.name,
            stateCode: city.stateCode,
            countryCode: city.countryCode,
        } );
    } else {
        return normalizeQueryParams( {
            ...rest,
            countryCode: countryCode,
        } );
    }
}

export function normalizeQueryParamsWithCityLocation ( { city, countryCode, ...rest } ) {
    if ( city && !city.existsInApi && city.location && city.location.latitude && city.location.longitude ) {
        return normalizeQueryParams( {
            ...rest,
            lat: city.location.latitude,
            long: city.location.longitude,
            range: city.location.range || null,
        } );
    }
    if ( city && city.name ) {
        return normalizeQueryParams( {
            ...rest,
            cityName: city.name,
            stateCode: city.stateCode,
            countryCode: city.countryCode,
        } );
    }

    return normalizeQueryParams( {
        ...rest,
        countryCode: countryCode,
    } );
}

export function checkStatusList ( response ) {
    let data = response.data;
    return response.status === 200 ? normalizeListSuccess ( { data } ) : normalizeError ( data );
}

export function checkStatus ( response ) {
    let data = response.data;
    return response.status === 200 ? normalizeSuccess ( { data } ) : normalizeError ( data );
}

export function checkStatusRaw ( response ) {
    let data = response.data;

    return response.status === 200 ? normalizeSuccessRaw ( data ) : normalizeError ( data );
}

export function checkError ( error ) {
    if ( fetch.isRequestCancel( error ) ) {
        return normalizeError ( { cancel: true } ); 
    }
        
    return normalizeError  ( error.response && error.response.data ? error.response.data : error );
}