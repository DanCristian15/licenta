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
    name: 'airmiles',
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
            primary: '#1790CC',
            secondary: '#8E499B',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#1790CC',
            gradientPrimary1:'#1790CC',
            gradientPrimary2: '#1790CC',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#1790CC',
            anchor: '#1790CC',
            homeBannerGradientStart: '#1790CC',
            homeBannerGradientEnd: '#1790CC',
            homeBannerSearchButtonBgColor: '#61C1EE',
            footerGradientStart: '#F5F5F5',
            footerGradientEnd: '#F5F5F5',
            calendar: '#F80445',
            backgroundTimer: '#1790CC',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#1790CC',
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
