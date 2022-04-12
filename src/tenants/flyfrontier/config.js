import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'flyfrontier',
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
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#006643',
            secondary: '#006643',
            tertiary: '#959599',
            quaternary: '#333333',
            quinary: '#F0F2F3',
            senary: '#E6E6E6',
            septenary: '#F0F2F3',
            accent: '#006643',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#006643',
            // gradients
            gradientPrimary1: '#006643',
            gradientPrimary2: '#006643',
            gradientSecondary1:'#2980B9',
            gradientSecondary2: '#6DD5FA',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#006643',
            homeBannerGradientEnd: '#006643',
            homeBannerSearchButtonBgColor: '#00ACEC',
            footerGradientStart: '#F5F5F5',
            footerGradientEnd: '#F5F5F5',
            calendar: '#E92505',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#00ACEC',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantBonusPointsBadge': BonusPointsBadge,
        'TenantBonusPointsCartCheckoutSummary': BonusPointsCartCheckoutSummary,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation
    }
};
