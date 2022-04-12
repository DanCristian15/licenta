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
    name: 'albertheijn',
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
                        currencyType: loyaltyConstants.CURRENCY_TYPES.POINTS,
                        type: loyaltyConstants.TYPES.BOTH
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#00ADE6',
            secondary: '#D9F3FB',
            tertiary: '#838383',
            quaternary: '#303030',
            quinary: '#F5F5F5',
            senary: '#ACACAC',
            septenary: '#D6DBE0',
            accent: '#FF7900',
            error: '#EA3D3D',
            success: '#69BD86',
            warning: '#FFC203',
            info: '#00ADE6',
            anchor: '#00ADE6',
            // gradients
            gradientPrimary1: '#00ADE6',
            gradientPrimary2: '#00ADE6',
            gradientSecondary1:'#00ADE6',
            gradientSecondary2: '#0077B2',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#F5F5F5',
            homeBannerGradientEnd: '#F5F5F5',
            homeBannerSearchButtonBgColor: '#00ADE6',
            footerGradientStart: '#F5F5F5',
            footerGradientEnd: '#F5F5F5',
            calendar: '#F80445',
            backgroundTimer:'#00ADE6',
            backgroundSuccess: '#69BD86',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FF7900',
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
