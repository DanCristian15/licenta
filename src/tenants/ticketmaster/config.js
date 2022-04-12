import themeColors from './theme-colors-export-js.scss';


export default {
    name: 'ticketmaster',
    theme: {
        vuetify: themeColors,
        vuetifyOld: {
            primary: '#026CDF',
            secondary: '#C56BFF',
            tertiary: '#8F9296',
            quaternary: '#1F262D',
            quinary: '#F6F6F6',
            senary: '#EBEBEB',
            septenary: '#BFBFBF',
            accent: '#904EBA',
            error: '#D93A3A',
            success: '#1BAB1E',
            warning: '#F2BD2A',
            info: '#026CDF',
            anchor: '#026CDF',
            // gradients
            gradientPrimary1: '#026CDF',
            gradientPrimary2: '#0150A7',
            gradientSecondary1:'#C56BFF',
            gradientSecondary2: '#6D236C',
            gradientRadial1: '#FF9F00',
            gradientRadial2: '#FFEE00',
            // custom variables for components
            homeBannerGradientStart: '#282F35',
            homeBannerGradientEnd: '#1F262D',
            homeBannerSearchButtonBgColor: '#1BAB1E',
            footerGradientStart: '#1F262D',
            footerGradientEnd: '#1F262D',
            calendar: '#0150A7',
            backgroundTimer:'#026CDF',
            backgroundSuccess: '#E8F6E8',
            overlay: '#000000',
            shadow: '#D5DADF',
            bonusPointsChipBgColor: '#962D94',
            bonusPointsChipColor: '#FFFFFF',
            favoriteMarked: '#F80445',
            favoriteUnMarked: '#FFFFFF'
        }
    }
};
