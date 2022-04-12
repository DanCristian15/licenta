import loyaltyConstants from '@core/utils/constants/loyalty';
import themeColors from './theme-colors-export-js.scss';

export default {
    name: '_main',
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
            primary: '#00B4E2',
            secondary: '#FFC203',
            tertiary: '#6D7D90',
            quaternary: '#23262D',
            quinary: '#F0F2F3',
            senary: '#C2C2C2',
            septenary: '#D6DBE0',
            error: '#E92505',
            success: '#60B403',
            warning: '#FFC203',
            info: '#00B4E2',
            accent: '#00B4E2',
            anchor: '#00B4E2',
            gradientPrimary1:'#2980B9',
            gradientPrimary2: '#6DD5FA',
            gradientSecondary1: '#1D2671',
            gradientSecondary2: '#C33764',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            homeBannerGradientStart: '#2980B9',
            homeBannerGradientEnd: '#6DD5FA',
            homeBannerSearchButtonBgColor: '#00B4E2',
            footerGradientStart: '#2980B9',
            footerGradientEnd: '#6DD5FA',
            calendar: '#F80445',
            backgroundTimer: '#00B4E2',
            backgroundSuccess: '#60B403',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#FFC203',
            bonusPointsChipColor: '#23262D',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF',
            eventStatusChipCancelled: '#EE2E24',
            eventStatusChipPostponed: '#FF7203',
            eventStatusChipRescheduled: '#D011C9',
        }
    }
};
