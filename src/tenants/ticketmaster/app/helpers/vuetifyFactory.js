import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { appMainTheme } from '@core/utils/appMainTheme';
import appIcons from './vuetifyFactoryIcons';

Vue.use( Vuetify );

export default {
    create: ( theme = { } ) => {
        const  themeLight = ( theme && theme.vuetify ) ? { ...appMainTheme, ...theme.vuetify } : appMainTheme;
        const opts = {
            theme: {
                options: {
                    customProperties: true,
                    variations: false
                },
                themes: {
                    light: { ...themeLight },
                },
            },
            components: {
                
            },
            icons: {
                values: { ...appIcons }
            },
        };
        return new Vuetify( opts );
    }
};
