import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    getDefaultGetParamsWithCount as apiUtilsGetDefaultGetParamsWithCount,
    normalizeQueryParamsWithCityLocation as apiUtilsNormalizeQueryParamsWithCityLocation,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );
const defaultGetParamWithCount = apiUtilsGetDefaultGetParamsWithCount( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    venues: {
        get: (
            {
                city = {},
                startDate = '',
                endDate = '',
                keyword = defaultGetParam.keyword,
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset,
                count = false
            } = defaultGetParamWithCount,
            { userAnalytics } = { },
            { cancelToken } = { } ) => {

            const headers = { };

            if ( userAnalytics ) headers[ apiConstants.HEADERS.GST_ANALYTICS ] = userAnalytics;

            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/venue`,
                apiUtilsNormalizeQueryParamsWithCityLocation( {
                    city,
                    startDate,
                    endDate,
                    keyword,
                    limit,
                    offset,
                    count
                } ),
                headers,
                { cancelToken }
            );
        },
        one: ( id ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/venue/${id}` );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}