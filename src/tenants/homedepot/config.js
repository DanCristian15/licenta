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
    name: 'homedepot',
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
            primary: '#F96302',
            secondary: '#53565A',
            tertiary: '#666666',
            quaternary: '#333333',
            quinary: '#F3F5F5',
            senary: '#CCCCCC',
            septenary: '#D6DBE0',
            accent: '#F96302',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#F96302',
            anchor: '#3E7697',
            // gradients
            gradientPrimary1: '#5192B8',
            gradientPrimary2: '#3E7697',
            gradientSecondary1:'#A6A6A6',
            gradientSecondary2: '#53565A',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#53565A',
            homeBannerGradientEnd: '#53565A',
            homeBannerSearchButtonBgColor: '#F96302',
            footerGradientStart: '#EEEEEE',
            footerGradientEnd: '#EEEEEE',
            calendar: '#D81118',
            backgroundTimer:'#F96302',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#F96302',
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
