/**
 * Note( ionutt )
 * Date Utils import store and that can lead to circular dependencies
 * ( search utils is also using that ). I made an ticket related to that GL-581
 */
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dateConstants from '@core/utils/constants/date';
import {
    buildSearchQueryObject as searchUtilsBuildSearchQueryObject,
    normalizeDataInitialState as searchUtilsNormalizeDataInitialState
} from '@core/utils/searchUtils';
import { isCity as cityObjectUtilsIsCity } from '@core/utils/cityObjectUtils';
import { isEmpty as searchObjectUtilsIsEmpty } from '@core/utils/searchObjectUtils';
import { format as dateUtilsFormat } from '@core/utils/dateUtils';
import asyncParallel from '@core/utils/asyncParallel';
import fetch from '@core/utils/fetch';

const STORE_NAME = 'searchState';
let searchCancelRequest;

const searchObj = {
    airport:            { },
    city:               { },
    startDate:          null,
    endDate:            null,
    keyword:            '',
    loyaltyAccount:     { },
    loyaltyProgram:     { }
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        current: { ...searchObj },
        initial: { ...searchObj },
        results: {
            attractions: [],
            events: [],
            venues: []
        }
    },
    getters: {
        isEmptyCurrentSearchParams: state => ( ) => {
            return searchObjectUtilsIsEmpty( state.current );
        },
        currentSearchParams: state => {
            let ret = { },
                { current } = state;

            if ( cityObjectUtilsIsCity( current.city ) ) {
                ret.city = current.city;
            }
            !( current.keyword )                   || ( ret.keyword = current.keyword );
            !( current.startDate )                 || ( ret.startDate = current.startDate );
            !( current.endDate )                   || ( ret.endDate = current.endDate );

            return ret;
        },
        currentQueryObject: state => {
            const { keyword, city, startDate, endDate } = state.current;

            return searchUtilsBuildSearchQueryObject( {
                keyword,
                city,
                startDate: startDate,
                endDate: endDate
            } );
        },
        currentQueryObjectHasOnlyKeyword: state => {
            const { keyword, city, startDate, endDate } = state.current;

            return keyword && isEmpty( city ) && !startDate && !endDate;
        },
        currentQueryObjectOnlyKeyword: state => {
            const { keyword } = state.current;

            return searchUtilsBuildSearchQueryObject( {
                keyword
            } );
        }
    },
    mutations: {
        clearCurrent ( state ) {
            state.current = { ...searchObj };
        },
        setCurrentCity ( state, city ) {
            state.current.city = city;
        },
        setCurrentStartDate ( state, startDate ) {
            state.current.startDate = startDate ? new Date ( startDate ) : null;
        },
        setCurrentEndDate ( state, endDate ) {
            state.current.endDate = endDate ? new Date( endDate ) : null;
        },
        setCurrentKeyword ( state, keyword ) {
            state.current.keyword = keyword;
        },
        updateInitial ( state, initial ) {
            state.initial = {
                ...searchObj,
                ...initial
            };
        },
        updateResults ( state, results ) {
            state.results.attractions = results.attractions ? [ ...results.attractions ] : [];
            state.results.events = results.events ? [ ...results.events ] : [];
            state.results.venues = results.venues ? [ ...results.venues ] : [];
        }
    },
    actions: {
        update( { commit, dispatch }, data ) {
            if ( data.hasOwnProperty( 'city' ) ) {
                if ( cityObjectUtilsIsCity ( data.city ) ) {
                    commit( 'setCurrentCity', data.city );
                    !data.city.name || dispatch( 'user/browsingHistory/addCity', data.city, { root: true } );
                } else {
                    commit( 'setCurrentCity', { } );
                }
            }

            !( data.hasOwnProperty( 'keyword' ) )   || commit( 'setCurrentKeyword', data.keyword );

            !( data.hasOwnProperty( 'startDate' ) ) || commit( 'setCurrentStartDate', data.startDate );
            !( data.hasOwnProperty( 'endDate' ) )   || commit( 'setCurrentEndDate', data.endDate );
        },
        async updateInitial( { commit }, data ) {
            if ( data ) {
                commit ( 'updateInitial', data );
            }

            return data;
        },
        clearCurrent ( { commit } ) {
            commit ( 'clearCurrent' );
        },
        async search( { commit, dispatch }, { search } ) {
            let attractions, venues, events;

            !searchCancelRequest || searchCancelRequest.cancel( );
            searchCancelRequest = fetch.getCancelRequest( );
            const params = { search: cloneDeep( search ), requestConfig: { cancelToken: searchCancelRequest.token } };

            await asyncParallel( [
                async ( ) => { attractions = await dispatch( 'attractions/searchList', params, {  root: true } ); },
                async ( ) => { events = await dispatch( 'events/searchList', params, {  root: true } ); },
                async ( ) => { venues = await dispatch( 'venues/searchList', params, {  root: true } ); },
            ], 3 );
            commit( 'updateResults', { attractions, venues, events } );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                initial: state[STORE_NAME].initial
            };
        },
        getDataToLoad: ( data ) => {
            const initialData = data.initial;

            !initialData.startDate || ( initialData.startDate = dateUtilsFormat( new Date( initialData.startDate ), dateConstants.FORMAT.DEFAULT ) );
            !initialData.endDate || ( initialData.endDate = dateUtilsFormat( new Date( initialData.endDate ), dateConstants.FORMAT.DEFAULT ) );

            return {
                initial: {
                    ...searchObj,
                    ...( searchUtilsNormalizeDataInitialState( initialData ) )
                }
            };
        }
    }
};
