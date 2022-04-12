import loyaltyConstants from '@core/utils/constants/loyalty';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import BonusPointsBadge from './components/BonusPointsBadgePng.vue';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'costco',
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
                        currencyType: loyaltyConstants.CURRENCY_TYPES.MONEY,
                        type: loyaltyConstants.TYPES.EARN
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#0073A6',
            secondary: '#E31837',
            tertiary: '#707070',
            quaternary: '#333333',
            quinary: '#F5F5F5',
            senary: '#CCCCCC',
            septenary: '#D6DBE0',
            accent: '#0073A6',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#0073A6',
            anchor: '#337AB7',
            // gradients
            gradientPrimary1: '#0073A6',
            gradientPrimary2: '#47B7E9',
            gradientSecondary1:'#47B7E9',
            gradientSecondary2: '#0073A6',
            gradientRadial1: '#0AB4FF',
            gradientRadial2: '#0073A6',
            // custom variables for components
            homeBannerGradientStart: '#0073A6',
            homeBannerGradientEnd: '#0073A6',
            homeBannerSearchButtonBgColor: '#0073A6',
            footerGradientStart: '#EEEEEE',
            footerGradientEnd: '#EEEEEE',
            calendar: '#E31837',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#E31837',
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
