import Vue from 'vue';
import i18next from 'i18next';
import apiMapLocationConstants from '@core/utils/constants/apiMapLocation';
import LogService from '@services/LogService';

const serviceProvider = {
    loadScripts: async ( ) => {
        const loadBundle = ( ) => {
            return new Promise( ( resolve ) => {
                Vue.loadScript( apiMapLocationConstants.CONFIG.HERE.scriptBundleUrl, 'module', { async: false } )
                    .then( ( ) => {
                        resolve( true );
                    } )
                    .catch( ( ) => resolve( false ) );
            } );
        };

        const respBundle = await loadBundle( );
        if ( respBundle ) {
            return true;
        }

        return false;
    },
    getService: async ( ) => {
        if ( await serviceProvider.loadScripts() ) {
            const api = window.H;

            if ( api ) {
                return new api.service.Platform( {
                    'apikey': apiMapLocationConstants.CONFIG.HERE.apiKey
                } );
            }
        }

        return false;

    }
};


export default {
    city: {
        getByPosition: async ( latitude, longitude ) => {
            let service = await serviceProvider.getService( );

            if ( service ) {
                return new Promise( ( resolve ) => {
                    service.getGeocodingService( ).reverseGeocode(
                        {
                            mode: 'retrieveAddresses',
                            'maxresults': 1,
                            prox: `${latitude},${longitude}`,
                            additionaldata:'Country2,true',

                        }, ( response ) => {
                            try {
                                if ( response.Response.View.length
                                    && response.Response.View[0].Result.length === 1
                                    && response.Response.View[0].Result[0].Location.Address.City ) {
                                    const address = response.Response.View[0].Result[0].Location.Address;
                                    const data = {
                                        name: address.City,
                                        countryCode: address.AdditionalData.find( item => item.key === 'Country2' ).value
                                    };

                                    !address.State || ( data.stateCode = address.State );

                                    resolve( {
                                        success: true,
                                        data
                                    } );
                                } else {
                                    resolve( {
                                        success: false,
                                        message: i18next.t( '_common:messages.apiMapLocationError' )
                                    } );
                                }
                            } catch ( error ) {
                                // eslint-disable-next-line no-console
                                LogService.debug( 'problems retriving city from apiLocation ' + error );
                                resolve( {
                                    success: false,
                                    message: i18next.t( '_common:messages.apiMapLocationError' )
                                } );
                            }
                        }, error => {
                            // eslint-disable-next-line no-console
                            LogService.debug( 'problems retriving city from apiLocation ' + error );
                            resolve( {
                                success: false,
                                message: i18next.t( '_common:messages.apiMapLocationContactingError' )
                            } );
                        }
                    );
                } );

            }

            return {
                success: false,
                message: i18next.t( '_common:messages.apiMapLocationContactingError' )
            };
        }
    }
};
