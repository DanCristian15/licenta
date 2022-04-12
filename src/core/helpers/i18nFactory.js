import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import merge from 'lodash/merge';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import appConstants from '@core/utils/constants/app';
import mainEn from '@core/locales/main/en';
import sharedEn from '@core/locales/shared/en';
import commonEn from '@core/locales/_common/en';
import LogService from '@core/services/LogService';

const fallbackLanguage = 'en';
const supportedLanguages = [ 'en', 'fr' ];
const extractSupportedLanguages = ( langs ) => {
    if ( langs && langs.length ) {
        const ret =  langs.filter ( lang => supportedLanguages.indexOf( lang ) !== -1 );

        return ret.length ? ret : [ fallbackLanguage ];
    }
    return supportedLanguages;
};
const getResources = ( langs, customLocales = { } ) => {
    const ret = { };

    if ( langs.indexOf ( 'en' ) !== -1 ) {
        ret.en = {
            _common:    ( customLocales._common && customLocales._common.en ) ? merge( commonEn, customLocales._common.en ) : commonEn,
            main:       ( customLocales.main && customLocales.main.en ) ? merge( mainEn, customLocales.main.en ) : mainEn,
            shared:     ( customLocales.shared && customLocales.shared.en ) ? merge( sharedEn, customLocales.shared.en ) : sharedEn,
        };
    }
    if ( langs.indexOf ( 'fr' ) !== -1 ) {
        ret.fr = {
            _common:    ( customLocales._common && customLocales._common.fr ) ? customLocales._common.fr : {},
            main:       ( customLocales.main && customLocales.main.fr ) ? customLocales.main.fr : {},
            shared:     ( customLocales.shared && customLocales.shared.fr ) ? customLocales.shared.fr : {},
        };
    }

    return ret;
};

export default {
    create: ( { languages, locales } = { } ) => {
        const langs = extractSupportedLanguages( languages );
        const resources = getResources( langs, locales || {} );
        const localStorageDefaultVersion = `v${appConstants.VERSION}-${appConstants.BUILD_TIMESTAMP}`;

        i18next
            .use( ChainedBackend )
            .init( {
                debug: process.env.NODE_ENV !== 'production',
                lng: langs[ 0 ],
                fallbackLng: langs,
                ns: [
                    '_common',
                    'shared',
                    'main'
                ],
                resources,
                parseMissingKeyHandler: ( ) => {
                    if ( process.env.NODE_ENV === 'production' )
                        LogService.warn( 'Missing Key from translation file' );
                    return 'Invalid Key';
                },
                interpolation: {
                    format: ( value, format ) => {
                        switch ( format ) {
                        case 'uppercase': 
                            return value.toUpperCase( );
                        case 'lowercase':
                            return value.toLowerCase( );
                        default:
                            return value;
                        }
                    }
                },
                backend: {
                    backends: [
                        LocalStorageBackend,
                        resourcesToBackend( ( language, namespace, callback ) => {
                            
                            if ( language === 'fr' ) {
                                // Note: Using + operator for concat strings.
                                // Importing paths with template strings does not pass lint rule e.g: import( `@core/locales/${namespace}/${language}.json` )
                                import( '@core/locales/' + namespace + '/' + language + '.json' )
                                    .then( ( res ) => {
                                        const commonResources = resources[ language ][ namespace ];
                                        const mergedResources =  merge( res, commonResources );

                                        callback( null, mergedResources );
                                    } )
                                    .catch( ( error ) => {
                                        callback( error, null );
                                    } );
                            }
                        } )
                    ],
                    backendOptions: [
                        {
                            prefix: 'gstI18n_',
                            expirationTime: 7 * 24 * 60 * 60 * 1000,
                            defaultVersion: localStorageDefaultVersion,
                            store: typeof window !== 'undefined' ? window.localStorage : null
                        }
                    ]
                }
            } )
            .then( () => {
                i18next.reloadResources( );
            } );

        Vue.use( VueI18Next );

        return new VueI18Next( i18next );
    }
};
