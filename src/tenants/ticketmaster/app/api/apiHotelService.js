import GuestsModel from '@tenant/app/models/GuestsModel';
import qs from 'qs';
import apiConstants from '@core/utils/constants/api';
import fetch from '@core/utils/fetch';
import {
    getDefaultGetParams as apiUtilsGetDefaultGetParams,
} from '@core/utils/apiUtils';
import { createApiService, fetchAPI } from '@core/api/_utils';
import { normalizeQueryParams } from './_utils.js';

const defaultGetParam = apiUtilsGetDefaultGetParams( );

const paramsSerializerFn = params => qs.stringify( params, { arrayFormat: 'repeat', indices: false } );

let api = {
    getCancelRequest: fetch.getCancelRequest,
    hotels: {
        get: (
            {
                limit = defaultGetParam.limit,
                offset = defaultGetParam.offset,
            },
            {
                startDate = '',
                endDate = '',
                guests = new GuestsModel( ),
                roomsCount,
                latitude,
                longitude,
                range
            },
            config = { } ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/hotels`,
                normalizeQueryParams( {
                    startDate,
                    endDate,
                    guests,
                    roomsCount,
                    latitude,
                    longitude,
                    range,
                    limit,
                    offset
                } ),
                {},
                {
                    ...config,
                    paramsSerializer: paramsSerializerFn
                }
            );
        },
        one: ( id, {
            startDate = '',
            endDate = '',
            guests = new GuestsModel( ),
            roomsCount
        }, dataProvider ) => {
            return fetchAPI.get(
                `${apiConstants.BASE_URL}/api/hotels/${id}`,
                normalizeQueryParams( {
                    startDate,
                    endDate,
                    guests,
                    roomsCount,
                    externalSystem: dataProvider
                } ),
                {},
                {
                    paramsSerializer: paramsSerializerFn
                }
            );
        }
    }
};

export default async function ( config ) {
    return createApiService( config, api );
}
