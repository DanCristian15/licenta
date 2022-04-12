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
    name: 'hawaiianairlines',
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
            primary: '#413691',
            secondary: '#CE0C88',
            tertiary: '#6D7D90',
            quaternary: '#221F1F',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#413691',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#413691',
            anchor: '#CE0C88',
            // gradients
            gradientPrimary1: '#413691',
            gradientPrimary2: '#413691',
            gradientSecondary1:'#413691',
            gradientSecondary2: '#CE0C88',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#413691',
            homeBannerGradientEnd: '#413691',
            homeBannerSearchButtonBgColor: '#EE453D',
            footerGradientStart: '#FFFFFF',
            footerGradientEnd: '#FFFFFF',
            calendar: '#EE453D',
            backgroundTimer:'#413691',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#413691',
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
