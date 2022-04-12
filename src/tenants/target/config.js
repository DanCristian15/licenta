import loyaltyConstants from '@core/utils/constants/loyalty';
import commonEn from './locales/_common/en.json';
import sharedEn from './locales/shared/en.json';
import mainEn from './locales/main/en.json';
import BonusPointsBadge from './components/BonusPointsBadge.vue';
import BonusPointsChip from './components/BonusPointsChip.vue';
import BonusPointsHomeBanner from './components/BonusPointsHomeBanner.vue';
import BonusPointsCartCheckoutSummary from './components/BonusPointsCartCheckoutSummary.vue';
import BonusPointsCartCheckoutConfirmation from './components/BonusPointsCartCheckoutConfirmation.vue';
import PriceIcon from './components/PriceIcon.vue';

import LogoIcon from './components/LogoIcon.vue';
import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'target',
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
                        currencyType: loyaltyConstants.CURRENCY_TYPES.MONEY,
                        type: loyaltyConstants.TYPES.EARN,
                        earnRate: 1
                    }
                }
            }
        }
    },
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#CC0000',
            secondary: '#FFE1D6',
            tertiary: '#666666',
            quaternary: '#333333',
            quinary: '#F7F7F7',
            senary: '#C2C2C2',
            septenary: '#888888',
            accent: '#006601',
            error: '#E92505',
            success: '#008300',
            warning: '#B85300',
            info: '#CC0000',
            anchor: '#333333',
            gradientPrimary1: '#CC0000',
            gradientPrimary2: '#CC0000',
            gradientSecondary1:'#790000',
            gradientSecondary2: '#790000',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#02B5FF',
            homeBannerGradientStart: '#F7F7F7',
            homeBannerGradientEnd: '#F7F7F7',
            homeBannerSearchButtonBgColor: '#CC0000',
            footerGradientStart: '#F7F7F7',
            footerGradientEnd: '#F7F7F7',
            calendar: '#CC0000',
            backgroundTimer:'#CC0000',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#790000',
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
        'TenantBonusPointsCartCheckoutConfirmation': BonusPointsCartCheckoutConfirmation,
        'TenantBonusPointsChip': BonusPointsChip,
        'TenantPriceIcon': PriceIcon
    }
};
