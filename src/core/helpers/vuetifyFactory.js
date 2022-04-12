import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { VExpansionPanels, VWindow, VSlideGroup, VTabs, VTooltip, VCheckbox } from 'vuetify/lib';
import { appMainTheme } from '@core/utils/appMainTheme';
import { appMainIcons } from '@core/utils/appMainIcons';

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
                    light: { ...themeLight }
                }
            },
            icons: {
                values: { ...appMainIcons }
            },
            components: {
                /**
                 * TODO see on the next version if that is remove if this will go away - ionutt
                 * 
                 * Resolve build warnings give by mini-css-extract-plugin [webpack ] 
                 * Declare this component at the core level so it will be first loaded from vuetify so 
                 * those conflicts will not happen
                 * https://github.com/vuetifyjs/vuetify/issues/5271
                */
                VExpansionPanels,
                VTabs,
                VWindow,
                VSlideGroup,
                VTooltip,
                VCheckbox
            }
        };
        return new Vuetify( opts );
    }
};
