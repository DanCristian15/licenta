import apiConstants from '@core/utils/constants/api';
import countryConstants from '@core/utils/constants/country';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    normalizeQueryParamsWithCityLocation as apiUtilsNormalizeQueryParamsWithCityLocation,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );
const defaultCountryCode = countryConstants.DEFAULT.countryCode;

let api = {
    getCancelRequest: fetch.getCancelRequest,
    topEvents: {
        get: (
            {
                city = {},
                keyword = defaultGetParam.keyword,
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset,
                attractionId = '',
                startDate= '',
                endDate= '',
                countryCode = defaultCountryCode,
                search
            } = defaultGetParam,
            { userAnalytics } = { } ) => {
            const transformSearch = ( ) => {
                if ( !search || !search.split ) {
                    return { };
                } else {
                    let searchArr = search.split( '=' );
                    let ret = { };
                    ret [searchArr[0] ] = searchArr[ 1 ];

                    return ret;
                }
            };

            const headers = { };
            if ( userAnalytics ) if ( userAnalytics ) headers[apiConstants.HEADERS.GST_ANALYTICS] = 1;

            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/product/popular`,
                apiUtilsNormalizeQueryParamsWithCityLocation( {
                    ...transformSearch( ),
                    city,
                    keyword,
                    limit,
                    offset,
                    attractionId,
                    startDate,
                    endDate,
                    countryCode
                } ),
                headers
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}