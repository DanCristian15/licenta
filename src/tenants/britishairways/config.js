import loyaltyConstants from '@core/utils/constants/loyalty';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import LogoIcon from './components/LogoIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'britishairways',
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
            primary: '#CF2424',
            secondary: '#2A78CD',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#CF2424',
            gradientPrimary1:'#CF2424',
            gradientPrimary2: '#CF2424',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#CF2424',
            anchor: '#CF2424',
            homeBannerGradientStart: '#F7F9FC',
            homeBannerGradientEnd: '#F7F9FC',
            homeBannerSearchButtonBgColor: '#CF2424',
            footerGradientStart: '#0E1B2E',
            footerGradientEnd: '#0E1B2E',
            calendar: '#F80445',
            backgroundTimer: '#CF2424',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#2A78CD',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantBonusPointsHomeBanner': BonusPointsHomeBanner,
        'TenantBonusPointsCartCheckoutSummary': BonusPointsCartCheckoutSummary,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation
    }
};
