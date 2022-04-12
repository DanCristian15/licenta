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
    name: 'timhortons',
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
            primary: '#C8102E',
            secondary: '#3F2021',
            tertiary: '#3F2021',
            quaternary: '#3F2021',
            quinary: '#F9F5EE',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#880A1E',
            error: '#C8102E',
            success: '#60B403',
            warning: '#FFC203',
            info: '#C8102E',
            anchor: '#3F2021',
            gradientPrimary1: '#C8102E',
            gradientPrimary2: '#C8102E',
            gradientSecondary1:'#C8102E',
            gradientSecondary2: '#880A1E',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            homeBannerGradientStart: '#C8102E',
            homeBannerGradientEnd: '#C8102E',
            homeBannerSearchButtonBgColor: '#880A1E',
            footerGradientStart: '#ECECEC',
            footerGradientEnd: '#ECECEC',
            calendar: '#880A1E',
            backgroundTimer:'#C8102E',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#C8102E',
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
