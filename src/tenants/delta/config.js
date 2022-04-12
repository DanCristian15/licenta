import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import TermsAgreement  from './static/TermsAgreement/TermsAgreement.vue';
import LogoIcon from './components/LogoIcon.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'delta',
    i18n: {
        languages: [ 'en' ],
        locales: {
            _common: {
                en: commonEn
            },
            main: {
                en: mainEn
            },
            shared: {
                en: sharedEn
            }
        }
    },
    routes: [
        {
            name: 'termsAgreement',
            component: TermsAgreement
        }
    ],
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#10172E',
            secondary: '#E51937',
            tertiary: '#798292',
            quaternary: '#212529',
            quinary: '#F5F7FA',
            senary: '#ECF0F1',
            septenary: '#F5F7FA',
            accent: '#10172E',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            anchor: '#10172E',
            gradientPrimary1: '#10172E',
            gradientPrimary2: '#10172E',
            gradientSecondary1:'#2980B9',
            gradientSecondary2: '#6DD5FA',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            homeBannerGradientStart: '#10172E',
            homeBannerGradientEnd: '#10172E',
            homeBannerSearchButtonBgColor: '#E51937',
            footerGradientStart: '#10172E',
            footerGradientEnd: '#10172E',
            calendar: '#E51937',
            backgroundTimer:'#10172E',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#E51937',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantBonusPointsBadge': BonusPointsBadge,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation
    }
};
