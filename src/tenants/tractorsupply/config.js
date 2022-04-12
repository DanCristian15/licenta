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
    name: 'tractorsupply',
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
            primary: '#D10000',
            secondary: '#649430',
            tertiary: '#6C757D',
            quaternary: '#333333',
            quinary: '#F3F3F3',
            senary: '#CCCCCC',
            septenary: '#D6DBE0',
            accent: '#649430',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#D10000',
            anchor: '#005EBD',
            // gradients
            gradientPrimary1: '#D10000',
            gradientPrimary2: '#D10000',
            gradientSecondary1:'#D10000',
            gradientSecondary2: '#D10000',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#EFEFEF',
            homeBannerGradientEnd: '#EFEFEF',
            homeBannerSearchButtonBgColor: '#D10000',
            footerGradientStart: '#333333',
            footerGradientEnd: '#333333',
            calendar: '#D20000',
            backgroundTimer:'#D10000',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#B5121B',
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
