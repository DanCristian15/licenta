import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import { createApiService, fetchAPI } from '@core/api/_utils';

let api = {
    getCancelRequest: fetch.getCancelRequest,
    categories: {
        get: ( ) => {
            return fetchAPI.getList( `${apiConstants.BASE_URL}/api/category` );
        },
        getForFavoriteAttractions: ( ) => {
            return fetchAPI.getList( `${apiConstants.BASE_URL}/api/attraction/favourite/categories` );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}