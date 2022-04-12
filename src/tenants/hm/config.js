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
    name: 'hm',
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
            primary: '#E50010',
            secondary: '#F1EBDF',
            tertiary: '#6D7D90',
            quaternary: '#222222',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#E50010',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#E50010',
            anchor: '#E50010',
            // gradients
            gradientPrimary1: '#E50010',
            gradientPrimary2: '#FF707A',
            gradientSecondary1:'#FF707A',
            gradientSecondary2: '#E50010',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#F1EBDF',
            homeBannerGradientEnd: '#F1EBDF',
            homeBannerSearchButtonBgColor: '#E50010',
            footerGradientStart: '#E4E4E4',
            footerGradientEnd: '#E4E4E4',
            calendar: '#E50010',
            backgroundTimer:'#E50010',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#F1EBDF',
            bonusPointsChipColor: '#E50010',
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
