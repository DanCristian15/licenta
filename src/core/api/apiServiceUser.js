import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
    normalizeQueryParams as apiUtilsNormalizeQueryParams,
    checkStatusRaw as apiUtilsCheckStatusRaw,
    checkError as apiUtilsCheckError
} from '@core/utils/apiUtils';
import { generateSessionId as sessionUtilsGenerateSessionId } from '@utils/sessionUtils';
import { createApiService, fetchAPI, getApiCommonHeaders } from '@core/api/_utils';

const defaultGetParam = apiUtilsGetDefaultGetParams( );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    user: {
        getUserProfile: ( {
            email = ''
        } ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/wallet/${email}` );
        },
        getSession: ( {
            email = ''
        } ) => {
            const headers = { };

            headers[ apiConstants.HEADERS.GST_SESSION_ID ] = sessionUtilsGenerateSessionId( );
            headers[ apiConstants.HEADERS.GST_ANALYTICS ] = 1;

            return fetch
                .request( `${apiConstants.BASE_URL}/api/user/session`, {
                    type: 'GET',
                    params: {
                        userIdentifier: email
                    },
                    headers: { ...getApiCommonHeaders( ), ...headers }
                } )
                .then ( apiUtilsCheckStatusRaw )
                .catch ( apiUtilsCheckError );
        },
        getAnalytics: ( { limit = defaultGetParam.limit } ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/user/analytics`, apiUtilsNormalizeQueryParams( { limit } ) );
        },
        deleteRecentlyViewed( items ) {
            return fetchAPI.delete( `${apiConstants.BASE_URL}/api/user/analytics`, { items } );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}