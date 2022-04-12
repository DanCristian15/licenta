import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';

import merge from 'lodash/merge';
import commonTenantEn from '@tenant/app/locales/_common/en';
import mainTenantEn from '@tenant/app/locales/main/en';
import sharedTenantEn from '@tenant/app/locales/shared/en';
import commonCoreEn from '@core/locales/_common/en';
import shareCoredEn from '@core/locales/shared/en';
import LogService from '@core/services/LogService';

const fallbackLanguage = 'en';
const supportedLanguages = [ 'en' ];

const getResources = ( ) => {
    return {
        en: {
            _common:    merge( commonCoreEn, commonTenantEn ),
            shared:    merge( shareCoredEn, sharedTenantEn ),
            main:    mainTenantEn
        }
    };
};

export default {
    create: ( ) => {
        const resources = getResources( );

        i18next
            .init( {
                debug: process.env.NODE_ENV !== 'production',
                lng: fallbackLanguage,
                fallbackLng: supportedLanguages,
                ns: [
                    'home',
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
                }
            } );

        Vue.use( VueI18Next );

        return new VueI18Next( i18next );
    }
};
