import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import { createApiService, fetchAPI } from '@core/api/_utils';

let api = {
    getCancelRequest: fetch.getCancelRequest,
    payments: {
        getClientToken: ( ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/client/token` );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}