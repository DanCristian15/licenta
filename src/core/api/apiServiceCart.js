import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    normalizeQueryParams as apiUtilsNormalizeQueryParams,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';
import transformCartAddItem from '@core/data/request/transformCartAddItem';
import transformCartAddShippingOption from '@core/data/request/transformCartAddShippingOption';

let api = {
    getCancelRequest: fetch.getCancelRequest,
    cart: {
        get: ( id ) => {
            return fetchAPI.get( `${apiConstants.BASE_URL}/api/cart/${id}` );
        },
        addItem: ( ticket, hotelReservation, bundleProducts ) => {
            return fetchAPI.post(
                `${apiConstants.BASE_URL}/api/cart/reserve`,
                transformCartAddItem( ticket, hotelReservation, bundleProducts )
            );
        },
        checkout: ( id, data ) => {
            return fetchAPI.post( `${apiConstants.BASE_URL}/api/cart/${id}/purchase_v2`, data );
        },
        delete: ( id ) => {
            return fetchAPI.delete( `${apiConstants.BASE_URL}/api/cart/${id}` );
        },
        addShippingOption: ( id, data ) => {
            return fetchAPI.put( `${apiConstants.BASE_URL}/api/cart/${id}/shippingOption`, transformCartAddShippingOption( data ) );
        },
        getShippingOptions: ( id, data ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/cart/${id}/shippingOption`,
                apiUtilsNormalizeQueryParams( data )
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}