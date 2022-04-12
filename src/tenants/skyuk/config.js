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
    name: 'skyuk',
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
            primary: '#0072C9',
            secondary: '#73ADD8',
            tertiary: '#7F7F7F',
            quaternary: '#4A4A4A',
            quinary: '#EAEAEA',
            senary: '#9F9F9F',
            septenary: '#EAEAEA',
            accent: '#73ADD8',
            error: '#FF2744',
            success: '#299934',
            warning: '#FFC203',
            info: '#0072C9',
            anchor: '#0072C9',
            // gradients
            gradientPrimary1: '#0280DF',
            gradientPrimary2: '#089EF7',
            gradientSecondary1:'#125FA0',
            gradientSecondary2: '#1B7BC8',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#003267',
            homeBannerGradientEnd: '#063E9F',
            homeBannerSearchButtonBgColor: '#0072C9',
            footerGradientStart: '#FFFFFF',
            footerGradientEnd: '#FFFFFF',
            calendar: '#F80445',
            backgroundTimer:'#0072C9',
            backgroundSuccess: '#299934',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#0072C9',
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
