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
    name: 'astonlark',
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
            primary: '#A146BB',
            secondary: '#FD4F57',
            tertiary: '#6D7D90',
            quaternary: '#090928',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#A146BB',
            accent: '#FD4F57',
            anchor: '#FD4F57',
            // gradients
            gradientPrimary1: '#2980B9',
            gradientPrimary2: '#A146BB',
            gradientSecondary1:'#A146BB',
            gradientSecondary2: '#FD4F57',
            gradientRadial1: '#02B5FF',
            gradientRadial2: '#FF9F00',
            // custom variables for components
            homeBannerGradientStart: '#080828',
            homeBannerGradientEnd: '#080828',
            homeBannerSearchButtonBgColor: '#A146BB',
            footerGradientStart: '#080828',
            footerGradientEnd: '#080828',
            calendar: '#FD4F57',
            backgroundTimer:'#A146BB',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#A146BB',
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
