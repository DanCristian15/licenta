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
    name: 'visa',
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
            primary: '#1A1F71',
            secondary: '#F7B600',
            tertiary: '#5C5C5C',
            quaternary: '#2C2C2C',
            quinary: '#EEEEEE',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#003EA9',
            anchor: '#003EA9',
            error: '#E92505',
            success: '#42AF58',
            warning: '#FFC203',
            info: '#003EA9',
            // gradients
            gradientPrimary1: '#003EA9',
            gradientPrimary2: '#003EA9',
            gradientSecondary1:'#1A1F71',
            gradientSecondary2: '#003EA9',
            gradientRadial1: '#FFEE00',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#1A1F71',
            homeBannerGradientEnd: '#1A1F71',
            homeBannerSearchButtonBgColor: '#003EA9',
            footerGradientStart: '#F7F7F7',
            footerGradientEnd: '#F7F7F7',
            calendar: '#F80445',
            backgroundTimer:'#1A1F71',
            backgroundSuccess: '#42AF58',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#F7B600',
            bonusPointsChipColor: '#23262D',
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
