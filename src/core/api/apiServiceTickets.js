import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    normalizeQueryParamsWithCity as apiUtilsNormalizeQueryParamsWithCity,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    tickets: {
        get: (
            id,
            {
                priceRange = [],
                selection = '',
                quantity = '',
                accessibility = '',
                sort = '',
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset
            } = defaultGetParam,
            { userAnalytics } = { },
            config = { }
        ) => {
            const headers = { };

            if ( userAnalytics ) headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/product/${id}/tickets`,
                apiUtilsNormalizeQueryParamsWithCity( {
                    prices: ( priceRange && priceRange.length ) ? priceRange.join( ',' ) : null,
                    selection,
                    quantity,
                    accessibility,
                    sort,
                    offset,
                    limit
                } ),
                headers,
                { ...config }
            );
        },
        availability: (
            id,
            { cancelToken } = { }
        ) => fetchAPI.get(
            `${apiConstants.BASE_URL}/api/product/${id}/boundaries`,
            { },
            { },
            {
                cancelToken
            }
        )
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}