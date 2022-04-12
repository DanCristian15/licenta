import loyaltyConstants from '@core/utils/constants/loyalty';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'scotiabank',
    i18n: {
        languages: [ 'en' ],
        locales: {
            _common: {
                en: commonEn,
            },
            shared: {
                en: sharedEn,
            },
            main: {
                en: mainEn,
            }
        }
    },
    store: {
        stores: {
            appTenant: {
                config: {
                    loyalty: {
                        currencyType: loyaltyConstants.CURRENCY_TYPES.POINTS,
                        type: loyaltyConstants.TYPES.BOTH
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#EC111A',
            secondary: '#7849B8',
            tertiary: '#747474',
            quaternary: '#333333',
            quinary: '#F5F6FC',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#009DD6',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#7849B8',
            anchor: '#007EAB',
            // gradients
            gradientPrimary1: '#7849B8',
            gradientPrimary2: '#7849B8',
            gradientSecondary1:'#EC111A',
            gradientSecondary2: '#7849B8',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#7849B8',
            homeBannerGradientEnd: '#7849B8',
            homeBannerSearchButtonBgColor: '#EC111A',
            footerGradientStart: '#F5F6FC',
            footerGradientEnd: '#F5F6FC',
            calendar: '#7849B8',
            backgroundTimer:'#EC111A',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#EC111A',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantBonusPointsBadge': BonusPointsBadge,
        'TenantBonusPointsHomeBanner': BonusPointsHomeBanner,
        'TenantBonusPointsCartCheckoutSummary': BonusPointsCartCheckoutSummary,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation
    }
};
