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
    name: 'trenitalia',
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
            primary: '#CC0033',
            secondary: '#006A65',
            tertiary: '#707070',
            quaternary: '#303030',
            quinary: '#E6E6E6',
            senary: '#C9C9C9',
            septenary: '#C9C9C9',
            accent: '#008001',
            error: '#E92505',
            success: '#008001',
            warning: '#FFC203',
            info: '#C41228',
            anchor: '#C41228',
            // gradients
            gradientPrimary1: '#707070',
            gradientPrimary2: '#707070',
            gradientSecondary1:'#C9C9C9',
            gradientSecondary2: '#303030',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#E6E6E6',
            homeBannerGradientEnd: '#E6E6E6',
            homeBannerSearchButtonBgColor: '#C41228',
            footerGradientStart: '#303030',
            footerGradientEnd: '#C9C9C9',
            calendar: '#C41228',
            backgroundTimer:'#CC0033',
            backgroundSuccess: '#008001',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#C41228',
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
