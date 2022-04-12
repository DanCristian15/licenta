import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import { createApiService, fetchAPI } from '@core/api/_utils';

let api = {
    getCancelRequest: fetch.getCancelRequest,
    packageOffers: {
        detailsByEventId: ( eventId, config = {}, headers = {} ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/product/${eventId}/package`,
                {},
                headers,
                config
            );
        },
        detailsByExternalId: ( externalId, config = {}, headers = {} ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/product-package/${externalId}`,
                { },
                headers,
                config
            );
        },
        sectionsByEventId: (
            {
                eventId,
                guestCount,
            } = { },
            config = { },
            headers = { }
        ) => {
            return fetchAPI.getListRaw(
                `${apiConstants.BASE_URL}/api/product/${eventId}/section`,
                {
                    guestCount
                },
                headers,
                config
            );
        },
        hotelsByEventId: (
            {
                eventId,
                ids,
                guestCount,
                sectionName
            } = { },
            config = { },
            headers = { }
        ) => {
            return fetchAPI.getList(
                `${apiConstants.BASE_URL}/api/product/${eventId}/hotel`,
                {
                    ids,
                    guestCount,
                    sectionName
                },
                headers,
                config
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}
