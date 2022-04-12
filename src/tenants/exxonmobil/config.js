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
    name: 'exxonmobil',
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
            primary: '#0E469B',
            secondary: '#FE000C',
            tertiary: '#6D6E71',
            quaternary: '#2B2626',
            quinary: '#F2F2F2',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#0E469B',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#0E469B',
            anchor: '#0C479D',
            gradientPrimary1: '#0C479D',
            gradientPrimary2: '#0C479D',
            gradientSecondary1:'#069ADA',
            gradientSecondary2: '#383B8C',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            homeBannerGradientStart: '#F0F0F0',
            homeBannerGradientEnd: '#F0F0F0',
            homeBannerSearchButtonBgColor: '#0E469B',
            footerGradientStart: '#292929',
            footerGradientEnd: '#292929',
            calendar: '#BB0000',
            backgroundTimer:'#0E469B',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FE000C',
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
