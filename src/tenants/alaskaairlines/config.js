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
    name: 'alaskaairlines',
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
            primary: '#2774AE',
            secondary: '#01426A',
            tertiary: '#959599',
            quaternary: '#333333',
            quinary: '#F0F2F3',
            senary: '#E6E6E6',
            septenary: '#F0F2F3',
            accent: '#2774AE',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#2774AE',
            // gradients
            gradientPrimary1: '#2774AE',
            gradientPrimary2: '#2774AE',
            gradientSecondary1:'#2980B9',
            gradientSecondary2: '#6DD5FA',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#01426A',
            homeBannerGradientEnd: '#01426A',
            homeBannerSearchButtonBgColor: '#2774AE',
            footerGradientStart: '#01426A',
            footerGradientEnd: '#01426A',
            calendar: '#F80445',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#01426A',
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
