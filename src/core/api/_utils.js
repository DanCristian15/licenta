import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    checkStatusList as apiUtilsCheckStatusList,
    checkStatusRaw as apiUtilsCheckStatusRawList,
    checkStatus as apiUtilsCheckStatus,
    checkError as apiUtilsCheckError
} from '@core/utils/apiUtils';
import { getLongFormatWithCountry as languageUtilsGetLongFormatWithCountry } from '@core/utils/languageUtils';
import { getSessionId as sessionUtilsGetSessionId } from '@utils/sessionUtils';

let sessionId;

export function getApiCommonHeaders ( ) {
    const store = window.$store;
    const apiPartner = store.state.appState.api.partner;
    const apiMockData = store.state.appState.api.mockData;
    const userSessionId = store.state.user.profile.sessionId;
    const userEmail = store.state.user.profile.email;
    let ret = {};

    if ( !sessionId ) {
        sessionId = sessionUtilsGetSessionId( );
    }

    apiPartner === null || ( ret[apiConstants.HEADERS.GST_PARTNER_API] = apiPartner );
    apiMockData === false || ( ret[apiConstants.HEADERS.GST_MOCK_DATA] = apiMockData );

    ret[apiConstants.HEADERS.GST_LANGUAGE] = languageUtilsGetLongFormatWithCountry( store.state.appState.language );
    ret[apiConstants.HEADERS.GST_SESSION_ID] = userSessionId || sessionId;
    ret[apiConstants.HEADERS.GST_ANALYTICS] = 0;
    if ( userEmail ) {
        ret[apiConstants.HEADERS.GST_USER_EMAIL] = userEmail;
    }

    return ret;
}

export const fetchAPI = {
    getList: ( url, params = { }, headers = { }, { cancelToken, paramsSerializer } = { } ) => {
        return fetch
            .get( url, { headers: { ...getApiCommonHeaders( ), ...headers }, params, cancelToken, paramsSerializer } )
            .then ( apiUtilsCheckStatusList )
            .catch ( apiUtilsCheckError );
    },
    getListRaw: ( url, params = { }, headers = { }, { cancelToken, paramsSerializer } = { } ) => {
        return fetch
            .get( url, { headers: { ...getApiCommonHeaders( ), ...headers }, params, cancelToken, paramsSerializer } )
            .then ( apiUtilsCheckStatusRawList )
            .catch ( apiUtilsCheckError );
    },
    get: ( url, params = { }, headers = { }, { cancelToken, paramsSerializer } = { } ) => {
        return fetch
            .get( url, { headers: { ...getApiCommonHeaders( ), ...headers }, params, cancelToken, paramsSerializer } )
            .then ( apiUtilsCheckStatus )
            .catch ( apiUtilsCheckError );
    },
    post: ( url, data, headers, { cancelToken } = { } ) => {
        return fetch
            .post( url, data, { headers: Object.assign( {}, headers, getApiCommonHeaders( ) ), cancelToken } )
            .then ( apiUtilsCheckStatus )
            .catch ( apiUtilsCheckError );
    },
    put: ( url, data, headers, { cancelToken } = { } ) => {
        return fetch
            .put( url, data, { headers: Object.assign( {}, headers, getApiCommonHeaders( ) ), cancelToken } )
            .then ( apiUtilsCheckStatus )
            .catch ( apiUtilsCheckError );
    },
    patch: ( url, data, headers, { cancelToken } = { } ) => {
        return fetch
            .patch( url, data, { headers: Object.assign( {}, headers, getApiCommonHeaders( ) ), cancelToken } )
            .then ( apiUtilsCheckStatus )
            .catch ( apiUtilsCheckError );
    },
    delete: ( url, data, headers, { cancelToken } = { } ) => {
        return fetch
            .delete( url, data, { headers: Object.assign( {}, headers, getApiCommonHeaders( ) ) }, cancelToken )
            .then ( apiUtilsCheckStatus )
            .catch ( apiUtilsCheckError );
    },
};

export async function createApiService ( config, api ) {
    let mockup;

    switch( config ) {
    case 'mockup':
        mockup = await import( '@core/api/apiServiceMock' );

        return mockup.default;
    case 'mockupAndApi':
        mockup = await import ( '@core/api/apiServiceMock' );

        return {
            ...mockup.default,
            ...api,
        };
    case 'apiAndMockup':
        mockup = await import ( '@core/api/apiServiceMock' );

        return {
            ...api,
            ...mockup.default,
        };
    default:
        return api;
    }
}