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
    name: 'hilton',
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
            primary: '#0080B9',
            secondary: '#104C97',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#F0F2F3',
            accent: '#0080B9',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#0080B9',
            // gradients
            gradientPrimary1: '#0080B9',
            gradientPrimary2: '#0080B9',
            gradientSecondary1:'#104C97',
            gradientSecondary2: '#009CDE',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#104C97',
            homeBannerGradientEnd: '#104C97',
            homeBannerSearchButtonBgColor: '#0080B9',
            footerGradientStart: '#FFFFFF',
            footerGradientEnd: '#FFFFFF',
            calendar: '#84325E',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#104C97',
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
