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
    name: 'santander',
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
                        currencyType: loyaltyConstants.CURRENCY_TYPES.MONEY,
                        type: loyaltyConstants.TYPES.EARN,
                        earnRate: 1
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#EC0000',
            secondary: '#000000',
            tertiary: '#6C6C6C',
            quaternary: '#333333',
            quinary: '#F4F4F4',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#1BB3BC',
            anchor: '#EC0000',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#EC0000',
            // gradients
            gradientPrimary1: '#EC0000',
            gradientPrimary2: '#EC0000',
            gradientSecondary1:'#EC0000',
            gradientSecondary2: '#B60062',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#EC0000',
            homeBannerGradientEnd: '#EC0000',
            homeBannerSearchButtonBgColor: '#000000',
            footerGradientStart: '#F7F7F7',
            footerGradientEnd: '#F7F7F7',
            calendar: '#EC0000',
            backgroundTimer:'#EC0000',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#000000',
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
