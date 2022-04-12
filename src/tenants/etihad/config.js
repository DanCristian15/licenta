import loyaltyConstants from '@core/utils/constants/loyalty';
import LogoIcon from './components/LogoIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';

import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'etihad',
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
            primary: '#BD8B13',
            secondary: '#8E499B',
            tertiary: '#4E4C4A',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#BD8B13',
            gradientPrimary1:'#BD8B13',
            gradientPrimary2: '#BD8B13',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#BD8B13',
            anchor: '#BD8B13',
            homeBannerGradientStart: '#E5E4E3',
            homeBannerGradientEnd: '#E5E4E3',
            homeBannerSearchButtonBgColor: '#BD8B13',
            footerGradientStart: '#F5F5F5',
            footerGradientEnd: '#F5F5F5',
            calendar: '#F80445',
            backgroundTimer: '#BD8B13',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#BD8B13',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantBonusPointsHomeBanner': BonusPointsHomeBanner,
        'TenantBonusPointsCartCheckoutSummary': BonusPointsCartCheckoutSummary,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation
    }
};
