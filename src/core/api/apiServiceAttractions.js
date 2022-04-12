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
    attractions: {
        get: (
            {
                category = '',
                keyword = defaultGetParam.keyword,
                city = {},
                startDate = '',
                endDate = '',
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset,
                count = false } = defaultGetParamWithCount,
            { userAnalytics } = { },
            { cancelToken } = { }
        ) => {
            const headers = { };

            if ( userAnalytics ) headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/attraction`,
                apiUtilsNormalizeQueryParamsWithCityLocation (
                    {
                        category,
                        keyword,
                        startDate,
                        endDate,
                        city,
                        limit,
                        offset,
                        count
                    },
                ),
                headers,
                { cancelToken }
            );
        },
        one: ( id )  => {
            const headers = { };

            headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.get( `${apiConstants.BASE_URL}/api/attraction/${id}`, { }, headers );
        },
        getByEvent: ( id ) => fetchAPI.getList( `${apiConstants.BASE_URL}/api/attraction/event/${id}` ),
        getSimilar: (
            id,
            { limit = defaultGetParam.limit,  offset = defaultGetParam.offset }
        ) =>
            fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/attraction/${id}/similar`,
                apiUtilsNormalizeQueryParams( { limit, offset } )
            )
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}