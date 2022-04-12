import loyaltyConstants from '@core/utils/constants/loyalty';
import LogoIcon from './components/LogoIcon.vue';
import LogoLoyaltyPartnerIcon from './components/LogoLoyaltyPartnerIcon.vue';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import commonFr from './locales/_common/fr.json';
import sharedFr from './locales/shared/fr.json';
import mainFr from './locales/main/fr.json';

import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import UserDropdownMenu from './components/UserDropdownMenu.vue';
import UserMobileMenu from './components/UserMobileMenu.vue';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: 'rakuten',
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
    store: {
        stores: {
            appTenant: {
                config: {
                    loyalty: {
                        currencyType: loyaltyConstants.CURRENCY_TYPES.MONEY,
                        type: loyaltyConstants.TYPES.EARN
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#8529CD',
            secondary: '#ED5050',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#8529CD',
            gradientPrimary1: '#8529CD',
            gradientPrimary2: '#8529CD',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            accent: '#8529CD',
            anchor: '#8529CD',
            homeBannerGradientStart: '#5A5BC0',
            homeBannerGradientEnd: '#921A9F',
            homeBannerSearchButtonBgColor: '#8529CD',
            footerGradientStart: '#252525',
            footerGradientEnd: '#252525',
            calendar: '#F80445',
            backgroundTimer: '#8529CD',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#ED5050',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    },
    components: {
        'TenantLogoIcon': LogoIcon,
        'TenantLogoLoyaltyPartnerIcon': LogoLoyaltyPartnerIcon,
        'TenantBonusPointsBadge': BonusPointsBadge,
        'TenantBonusPointsHomeBanner': BonusPointsHomeBanner,
        'TenantBonusPointsCartCheckoutSummary': BonusPointsCartCheckoutSummary,
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation,
        'TenantUserDropdownMenu': UserDropdownMenu,
        'TenantUserMobileMenu': UserMobileMenu
    }
};
