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
    name: 'axa',
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
            primary: '#00008F',
            secondary: '#F07662',
            tertiary: '#999999',
            quaternary: '#333333',
            quinary: '#F5F5F5',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#00008F',
            anchor: '#F07662',
            error: '#C91432',
            success: '#1CC54E',
            warning: '#FFC203',
            info: '#00008F',
            // gradients
            gradientPrimary1: '#4976BA',
            gradientPrimary2: '#103183',
            gradientSecondary1:'#00ADC6',
            gradientSecondary2: '#027180',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#4976BA',
            homeBannerGradientEnd: '#4976BA',
            homeBannerSearchButtonBgColor: '#F07662',
            footerGradientStart: '#4976BA',
            footerGradientEnd: '#4976BA',
            calendar: '#F80445',
            backgroundTimer:'#00008F',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#4976BA',
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
