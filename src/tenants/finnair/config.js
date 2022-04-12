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
    name: 'finnair',
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
            primary: '#0B1560',
            secondary: '#A53F8C',
            tertiary: '#737373',
            quaternary: '#1E1E1E',
            quinary: '#F1F4F7',
            senary: '#C2C2C2',
            septenary: '#F8F8F8',
            accent: '#00A6A2',
            error: '#E92505',
            success: '#60B403',
            warning: '#00A6A2',
            info: '#00A6A2',
            anchor: '#0B1560',
            // gradients
            gradientPrimary1: '#0B1560',
            gradientPrimary2: '#AFAFAF',
            gradientSecondary1:'#AFAFAF',
            gradientSecondary2: '#737373',
            gradientRadial1: '#AFAFAF',
            gradientRadial2: '#AFAFAF',
            // custom variables for components
            homeBannerGradientStart: '#0B1560',
            homeBannerGradientEnd: '#0B1560',
            homeBannerSearchButtonBgColor: '#0B1560',
            footerGradientStart: '#F1F4F7',
            footerGradientEnd: '#F1F4F7',
            calendar: '#00A6A2',
            backgroundTimer:'#0B1560',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#0B1560',
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
