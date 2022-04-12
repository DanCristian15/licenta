import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    normalizeQueryParams as apiUtilsNormalizeQueryParams,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    cities: {
        get: ( {
            keyword = '',
            countryCode,
            stateCode,
            limit = defaultGetParam.limit,
            offset = defaultGetParam.offset,
            onlyFavourite = false
        } = defaultGetParam ) => {
            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/city`,
                apiUtilsNormalizeQueryParams( { limit, offset, keyword, countryCode, stateCode, onlyFavourite } )
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}