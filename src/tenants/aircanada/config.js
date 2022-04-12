import loyaltyConstants from '@core/utils/constants/loyalty';
import LogoIcon from './components/LogoIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';

import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'aircanada',
    i18n: {
        languages: [ 'en' ],
        locales: {
            _common: {
                en: commonEn
            },
            shared: {
                en: sharedEn
            },
            main: {
                en: mainEn
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
            primary: '#005078',
            secondary: '#BAA88D',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#005078',
            gradientPrimary1: '#005078',
            gradientPrimary2: '#005078',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#005078',
            anchor: '#005078',
            homeBannerGradientStart: '#000000',
            homeBannerGradientEnd: '#2A2A2A',
            homeBannerSearchButtonBgColor: '#005078',
            footerGradientStart: '#2A2A2A',
            footerGradientEnd: '#2A2A2A',
            calendar: '#F01428',
            backgroundTimer: '#005078',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#005078',
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
