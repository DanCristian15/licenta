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
    name: 'icelandair',
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
            primary: '#003A7D',
            secondary: '#FFB600',
            tertiary: '#5E5E5E',
            quaternary: '#444444',
            quinary: '#F4F4F4',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#459BCA',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#003A7D',
            anchor: '#003A7D',
            // gradients
            gradientPrimary1: '#297CB1',
            gradientPrimary2: '#003A7D',
            gradientSecondary1:'#297CB1',
            gradientSecondary2: '#00237D',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#003A7D',
            homeBannerGradientEnd: '#003A7D',
            homeBannerSearchButtonBgColor: '#3B770A',
            footerGradientStart: '#EAEAEA',
            footerGradientEnd: '#EAEAEA',
            calendar: '#F80445',
            backgroundTimer:'#003A7D',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FFB600',
            bonusPointsChipColor: '#333333',
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
