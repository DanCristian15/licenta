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
    name: 'dufry',
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
            primary: '#DF021B',
            secondary: '#656565',
            tertiary: '#3D3935',
            quaternary: '#101010',
            quinary: '#F0F0F0',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#DF021B',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#DF021B',
            anchor: '#DF021B',
            // gradients
            gradientPrimary1: '#656565',
            gradientPrimary2: '#656565',
            gradientSecondary1:'#DF021B',
            gradientSecondary2: '#DF021B',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#02B5FF',
            // custom variables for components
            homeBannerGradientStart: '#F1F1F1',
            homeBannerGradientEnd: '#F1F1F1',
            homeBannerSearchButtonBgColor: '#FA0202',
            footerGradientStart: '#3D3935',
            footerGradientEnd: '#3D3935',
            calendar: '#DF021B',
            backgroundTimer:'#DF021B',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FA0202',
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
