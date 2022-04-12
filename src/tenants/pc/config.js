import commonEn from './locales/_common/en.json';
import commonFr from './locales/_common/fr.json';
import sharedEn from './locales/shared/en.json';
import sharedFr from './locales/shared/fr.json';
import mainEn from './locales/main/en.json';
import mainFr from './locales/main/fr.json';
import Contact  from './static/Contact/Contact.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'pc',
    i18n: {
        languages: [ 'en', 'fr' ],
        locales: {
            _common: {
                en: commonEn,
                fr: commonFr
            },
            shared: {
                en: sharedEn,
                fr: sharedFr
            },
            main: {
                en: mainEn,
                fr: mainFr
            }
        }
    },
    routes: [
        {
            name: 'contact',
            component: Contact
        }
    ],
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#E92505',
            secondary: '#E92505',
            tertiary: '#959599',
            quaternary: '#333333',
            quinary: '#F0F2F3',
            senary: '#E6E6E6',
            septenary: '#F0F2F3',
            accent: '#E92505',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#E92505',
            gradientPrimary1: '#E92505',
            gradientPrimary2: '#E92505',
            gradientSecondary1:'#2980B9',
            gradientSecondary2: '#6DD5FA',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            homeBannerGradientStart: '#E92505',
            homeBannerGradientEnd: '#E92505',
            homeBannerSearchButtonBgColor: '#E92505',
            footerGradientStart: '#333333',
            footerGradientEnd: '#333333',
            calendar: '#E92505',
            backgroundTimer:'#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#E92505',
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
