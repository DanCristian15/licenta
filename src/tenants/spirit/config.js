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
    name: 'spirit',
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
            primary: '#0073E6',
            secondary: '#FFEC00',
            tertiary: '#707070',
            quaternary: '#000000',
            quinary: '#EFEFEF',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#0073E6',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#0073E6',
            anchor: '#0073E6',
            // gradients
            gradientPrimary1: '#FFEC00',
            gradientPrimary2: '#FFEC00',
            gradientSecondary1:'#FFEC00',
            gradientSecondary2: '#FFEC00',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#FFEC00',
            homeBannerGradientEnd: '#FFEC00',
            homeBannerSearchButtonBgColor: '#0073E6',
            footerGradientStart: '#000000',
            footerGradientEnd: '#000000',
            calendar: '#0073E6',
            backgroundTimer:'#0073E6',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FFEC00',
            bonusPointsChipColor: '#000000',
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
