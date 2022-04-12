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
    name: 'jambajuice',
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
            primary: '#036D58',
            secondary: '#FFB600',
            tertiary: '#595A59',
            quaternary: '#2B3936',
            quinary: '#F6F9F9',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            accent: '#036D58',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#036D58',
            anchor: '#036D58',
            // gradients
            gradientPrimary1: '#9AC53A',
            gradientPrimary2: '#036D58',
            gradientSecondary1:'#FAC53C',
            gradientSecondary2: '#F5804B',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#036D58',
            homeBannerGradientEnd: '#B1D461',
            homeBannerSearchButtonBgColor: '#036D58',
            footerGradientStart: '#F6F9F9',
            footerGradientEnd: '#F6F9F9',
            calendar: '#F25B17',
            backgroundTimer:'#036D58',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FAC53C',
            bonusPointsChipColor: '#2B3936',
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
