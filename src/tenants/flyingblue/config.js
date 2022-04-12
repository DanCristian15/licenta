import loyaltyConstants from '@core/utils/constants/loyalty';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import LogoIcon from './components/LogoIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'flyingblue',
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
            primary: '#0C1CAF',
            secondary: '#2A6FF3',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E32849',
            success: '#60B403',
            warning: '#F5BF63',
            info: '#0C1CAF',
            gradientPrimary1:'#0C1CAF',
            gradientPrimary2: '#0C1CAF',
            gradientSecondary1: '#0C1CAF',
            gradientSecondary2: '#2A6FF3',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#0C1CAF',
            anchor: '#30B2FF',
            homeBannerGradientStart: '#0C1CAF',
            homeBannerGradientEnd: '#0C1CAF',
            homeBannerSearchButtonBgColor: '#2A6FF3',
            footerGradientStart: '#EFEFF9',
            footerGradientEnd: '#EFEFF9',
            calendar: '#7649D1',
            backgroundTimer: '#0C1CAF',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#0C1CAF',
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
