import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    normalizeQueryParamsWithCity as apiUtilsNormalizeQueryParamsWithCity,
    normalizeQueryParams as apiUtilsNormalizeQueryParams,
} from '@core/utils/apiUtils';
import { transformToTypeApi as entityUtilsTransformToTypeApi } from '@core/utils/entityUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    favorites: {
        getIds: ( { type, limit, offset } ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/favourite/${entityUtilsTransformToTypeApi( type )}/ids`,
                apiUtilsNormalizeQueryParams( {
                    limit,
                    offset
                } )
            );
        },
        get: (
            {
                type = '',
                offset = defaultGetParam.offset,
                limit = defaultGetParam.limit,
                sort = '',
                categoryId = '',
                city = { }
            } ) => {
            //Hacky solution ionutt ( 2021-02-02 )
            //in the categoryId we will receive an string "categoryId='1231asda'" or "genre='123123'"
            const transformCategoryId = ( ) => {
                if ( !categoryId || !categoryId.split ) {
                    return { };
                } else {
                    let searchArr = categoryId.split( '=' );
                    let ret = { };
                    ret [searchArr[0] ] = searchArr[ 1 ];

                    return ret;
                }
            };

            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/favourite/${entityUtilsTransformToTypeApi( type )}`,
                apiUtilsNormalizeQueryParamsWithCity( {
                    ...transformCategoryId( ),
                    limit,
                    offset,
                    order: sort.toUpperCase( ),
                    city
                } )
            );
        },
        addEntity: ( type, id ) => {
            return fetchAPI.post(
                `${apiConstants.BASE_URL}/api/favourite`,
                {
                    items: [ { type: entityUtilsTransformToTypeApi( type ), id } ]
                }
            );
        },
        deleteEntity: ( type, id ) => {
            return fetchAPI.delete(
                `${apiConstants.BASE_URL}/api/favourite/delete`,
                {
                    items: [ { type: entityUtilsTransformToTypeApi( type ), id } ]
                }
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}