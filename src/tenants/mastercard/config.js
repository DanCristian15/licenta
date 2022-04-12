import loyaltyConstants from '@core/utils/constants/loyalty';
import commonEn from './locales/_common/en.json';
import commonFr from './locales/_common/fr.json';
import sharedEn from './locales/shared/en.json';
import sharedFr from './locales/shared/fr.json';
import mainEn from './locales/main/en.json';
import mainFr from './locales/main/fr.json';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'mastercard',
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#FF5F00',
            secondary: '#F79E1B',
            tertiary: '#959599',
            quaternary: '#333333',
            quinary: '#F0F2F3',
            senary: '#E6E6E6',
            septenary: '#F0F2F3',
            accent: '#E92505',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#E92505',
            // gradients
            gradientPrimary1: '#FF5F00',
            gradientPrimary2: '#FF5F00',
            gradientSecondary1:'#2980B9',
            gradientSecondary2: '#6DD5FA',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#FF5F00',
            homeBannerGradientEnd: '#F79E1B',
            homeBannerSearchButtonBgColor: '#FF5F00',
            footerGradientStart: '#333333',
            footerGradientEnd: '#333333',
            calendar: '#FF5F00',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#F79E1B',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    i18n: {
        languages: [ 'en', 'fr' ],
        locales: {
            _common: {
                en: commonEn,
                fr: commonFr
            },
            shared: {
                en: sharedEn,
                fr: sharedFr
            },
            main: {
                en: mainEn,
                fr: mainFr
            }
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
    },
    store: {
        stores: {
            appTenant: {
                config: {
                    loyalty: {
                        currencyType: loyaltyConstants.CURRENCY_TYPES.POINTS,
                        type: loyaltyConstants.TYPES.NONE
                    }
                }
            }
        }
    }
};
