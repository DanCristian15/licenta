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
    name: 'vans',
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
            primary: '#C9192E',
            secondary: '#1C1C1C',
            tertiary: '#575B5E',
            quaternary: '#2B2B2B',
            quinary: '#F1F2ED',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#C9192E',
            error: '#E92505',
            success: '#10B782',
            warning: '#FFC203',
            info: '#C9192E',
            anchor: '#589BC6',
            // gradients
            gradientPrimary1: '#1C1C1C',
            gradientPrimary2: '#1C1C1C',
            gradientSecondary1:'#1C1C1C',
            gradientSecondary2: '#C9192E',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#02B5FF',
            // custom variables for components
            homeBannerGradientStart: '#1C1C1C',
            homeBannerGradientEnd: '#1C1C1C',
            homeBannerSearchButtonBgColor: '#FA0202',
            footerGradientStart: '#1C1C1C',
            footerGradientEnd: '#1C1C1C',
            calendar: '#A11425',
            backgroundTimer:'#C9192E',
            backgroundSuccess: '#10B782',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FFFD06',
            bonusPointsChipColor: '#1C1C1C',
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
