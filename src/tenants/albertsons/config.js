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
    name: 'albertsons',
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
                        type: loyaltyConstants.TYPES.BOTH,
                        earnRate: 3
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#00529F',
            secondary: '#DD1E25',
            tertiary: '#757575',
            quaternary: '#4B4B4B',
            quinary: '#E8E8E8',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#0077B3',
            anchor: '#0077B3',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00529F',
            // gradients
            gradientPrimary1: '#0077B3',
            gradientPrimary2: '#00529F',
            gradientSecondary1:'#009FE0',
            gradientSecondary2: '#00529F',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#EFEFEF',
            homeBannerGradientEnd: '#EFEFEF',
            homeBannerSearchButtonBgColor: '#00529F',
            footerGradientStart: '#FFFFFF',
            footerGradientEnd: '#FFFFFF',
            calendar: '#DD1E25',
            backgroundTimer:'#00529F',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#00529F',
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
