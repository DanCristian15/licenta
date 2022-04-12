import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    getDefaultGetParamsWithCount as apiUtilsGetDefaultGetParamsWithCount,
    normalizeQueryParamsWithCityLocation as apiUtilsNormalizeQueryParamsWithCityLocation,
    normalizeQueryParams as apiUtilsNormalizeQueryParams,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );
const defaultGetParamWithCount = apiUtilsGetDefaultGetParamsWithCount( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    events: {
        get: (
            {
                categoryId = '',
                city = {},
                keyword = defaultGetParam.keyword,
                attractionId = '',
                startDate= '',
                endDate= '',
                venueId = '',
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset,
                count = false,
                sort = '',
            } = defaultGetParamWithCount,
            { userAnalytics } = { },
            { cancelToken } = { }
        ) => {
            const headers = { };

            if ( userAnalytics ) headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/product`,
                apiUtilsNormalizeQueryParamsWithCityLocation ( {
                    categoryId,
                    city,
                    keyword,
                    attractionId,
                    startDate,
                    endDate,
                    venueId,
                    limit,
                    offset,
                    count,
                    order: sort.toUpperCase( )
                } ),
                headers,
                {
                    cancelToken
                }
            );
        },
        one: (
            id,
            { cancelToken } = { }
        ) => {
            const headers = { };

            headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/product/${id}`,
                {},
                headers,
                {
                    cancelToken
                }
            );
        },
        oneByLegacy: ( { id }, config ) => {
            const headers = { };

            headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.get( `${apiConstants.BASE_URL}/api/product/legacy/${id}`, { }, headers, config );
        },
        calculateBonusPointsEarn: ( id, { amount } ) => {
            return fetchAPI.post( `${apiConstants.BASE_URL}/api/compute/earn/points`, { productId: id, amount } );
        },
        informationDetails: ( id )  => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/product/${id}/info` );
        },
        dates: ( id, limit = defaultGetParam.limit, offset = defaultGetParam.offset ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/product/dates`, apiUtilsNormalizeQueryParams( { id, limit, offset } ) );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}