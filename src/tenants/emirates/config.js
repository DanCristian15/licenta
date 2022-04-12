import loyaltyConstants from '@core/utils/constants/loyalty';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import LogoIcon from './components/LogoIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import commonFr from './locales/_common/fr.json';
import sharedFr from './locales/shared/fr.json';
import mainFr from './locales/main/fr.json';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'emirates',
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
            primary: '#C60C30',
            secondary: '#8E499B',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#C60C30',
            gradientPrimary1:'#C60C30',
            gradientPrimary2: '#C60C30',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#C60C30',
            anchor: '#C60C30',
            homeBannerGradientStart: '#333333',
            homeBannerGradientEnd: '#333333',
            homeBannerSearchButtonBgColor: '#C60C30',
            footerGradientStart: '#333333',
            footerGradientEnd: '#333333',
            calendar: '#F80445',
            backgroundTimer: '#C60C30',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#C60C30',
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