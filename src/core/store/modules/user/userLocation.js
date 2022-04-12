import i18next from  'i18next';
import apiMapLocationService from '@core/api/apiMapLocation';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';

const STORE_NAME = 'location';
export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        currentPosition: {
            latitude: null,
            longitude: null
        },
        currentCity: {
            name: null,
            stateCode: null,
            countryCode: null,
            existsInApi: false
        }
    },
    getters: {
        currentPosition: state => {
            if ( state.currentPosition && state.currentPosition.latitude && state.currentPosition.longitude ) {
                return state.currentPosition;
            }

            return { };
        },
        hasCurrentPosition: state => state.currentPosition && state.currentPosition.latitude && state.currentPosition.longitude,
        currentCity: state => {
            if ( state.currentCity && state.currentCity.name  ) {
                return state.currentCity;
            }

            return { };
        },
        hasCurrentCity: state => state.currentCity && state.currentCity.name && state.currentCity.countryCode,
        currentCityLocation: ( state, getters ) => {
            return {
                ...getters.currentCity,
                location: getters.hasCurrentPosition ? {
                    current: true,
                    ...getters.currentPosition
                } : { }
            };
        }
    },
    mutations: {
        setCurrentPosition: ( state, pos ) => {
            state.currentPosition.latitude = pos.latitude;
            state.currentPosition.longitude = pos.longitude;
        },
        setCurrentCity: ( state, city ) => {
            state.currentCity.name = city.name;
            state.currentCity.stateCode = city.stateCode;
            state.currentCity.countryCode = city.countryCode;
            state.currentCity.existsInApi = !!city.existsInApi;
        },
        clearCurrentCity: ( state ) => {
            state.currentCity.name = null;
            state.currentCity.stateCode = null;
            state.currentCity.countryCode = null;
            state.currentCity.existsInApi = false;
        },
        [mutationTypes.CLEAR]( state ) {
            state.currentPosition = {
                latitude: null,
                longitude: null
            };
            state.currentCity = {
                name: null,
                stateCode: null,
                countryCode: null,
                existsInApi: false
            };
        }
    },
    actions: {
        getCurrentPosition: async ( { commit, dispatch, state }, { showMessages = false, refresh = false } ) => {
            return new Promise( ( resolve ) => {
                navigator.geolocation.getCurrentPosition(
                    ( pos ) => {
                        const currentPosition  = state.currentPosition;
                        const { latitude, longitude } = pos.coords;

                        if ( latitude !== currentPosition.latitude || longitude !== currentPosition.longitude ) {
                            commit( 'clearCurrentCity' );
                        }
                        commit( 'setCurrentPosition', { latitude, longitude } );
                        resolve( pos.coords );
                    },
                    ( error ) => {
                        if( error.code == error.PERMISSION_DENIED ) {
                            commit( mutationTypes.CLEAR );
                            !showMessages || dispatch( 'notification/error', i18next.t( '_common:messages.browserLocationPermissionError' ), { root: true } );
                            LogService.debug( 'Geolocation: Need permission' );
                        } else {
                            !showMessages || dispatch( 'notification/error', i18next.t( '_common:messages.browserLocationError' ), { root: true } );
                            LogService.debug( 'Geolocation: ', JSON.stringify( error ) );
                        }

                        resolve( false );
                    },
                    {
                        maximumAge: refresh ? 0 : 1000 * 60 * 60 * 24,
                    }
                );
            } );
        },
        getCurrentCity: async ( { commit, dispatch, getters, }, { showMessages = false, checkExistsInApi = true } ) => {
            if ( !getters.hasCurrentPosition ) {
                return false;
            }
            const result = await apiMapLocationService.city.getByPosition( getters.currentPosition.latitude, getters.currentPosition.longitude );

            if ( result.success ) {
                const { data } = result;
                !checkExistsInApi || ( data.existsInApi = await dispatch( 'cities/exists', { city: data }, { root: true } ) );
                commit( 'setCurrentCity', data );
                return result.data;
            } else {
                !showMessages || dispatch( 'notification/error', result.message, { root: true } );
                LogService.debug( 'Api Location Error', result.message );
                return false;
            }
        },
        getCurrentLocation: async ( { dispatch, getters }, { showMessages, refresh } ) => {
            let city;
            
            if ( !await dispatch( 'getCurrentPosition', { showMessages, refresh } ) ) {
                return false;
            }
            if ( !getters.hasCurrentCity ) {
                city = await dispatch( 'getCurrentCity', { showMessages } );
            } else {
                city = getters.currentCity;
            }

            return {
                position: getters.currentPosition,
                city
            };
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                currentPosition: state[STORE_NAME].currentPosition,
                currentCity: state[ STORE_NAME ].currentCity,
            };
        },
        getDataToLoad: ( data ) => {
            return {
                currentPosition: data.currentPosition,
                currentCity: data.currentCity,
            };
        }
    }
};