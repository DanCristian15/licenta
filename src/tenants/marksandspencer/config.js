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
    name: 'marksandspencer',
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
                        type: loyaltyConstants.TYPES.EARN
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#000000',
            secondary: '#008000',
            tertiary: '#757575',
            quaternary: '#333333',
            quinary: '#F0F0F0',
            senary: '#CCCCCC',
            septenary: '#D6DBE0',
            accent: '#008000',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#E50010',
            anchor: '#000000',
            // gradients
            gradientPrimary1: '#E97068',
            gradientPrimary2: '#EA766E',
            gradientSecondary1:'#EA766E',
            gradientSecondary2: '#EA766E',
            gradientRadial1: '#02B5FF',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#F5F5F5',
            homeBannerGradientEnd: '#F5F5F5',
            homeBannerSearchButtonBgColor: '#BDD755',
            footerGradientStart: '#161616',
            footerGradientEnd: '#161616',
            calendar: '#EA766E',
            backgroundTimer:'#000000',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#BDD755',
            bonusPointsChipColor: '#000000',
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
