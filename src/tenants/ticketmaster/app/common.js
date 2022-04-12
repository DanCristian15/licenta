import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';


/**
 * Modules
 */
import '@tenant/app/modules/hotel/module';

/****** Modal Plugin ( vuetify modals used as an service ) ***********/

Vue.use( modalPlugin, {
    modalProps: {
        overlayOpacity: 0.8,
    },
    modalBottomProps: {
        overlayOpacity: 0.8,
    }
} );

/****** Test Id Plugin ***********/

Vue.use( testIdPlugin );

/****** Device Plugin ***********/

Vue.use( devicePlugin );

/****** Load Script Plugin ***********/

Vue.use( loadScriptPlugin );

/****** Vue Scroll to ***********/
import VueScrollTo from 'vue-scrollto';

Vue.use( VueScrollTo );

/****** Vuelidate plugin ( validations ) ***********/
import Vuelidate from 'vuelidate';

Vue.use( Vuelidate );


/****** VUE INFINITE SCROLL ***********/
import infiniteScroll from 'vue-infinite-scroll';

Vue.use( infiniteScroll );

import '@tenant/app/filters';
import devicePlugin from '@core/plugins/DevicePlugin';
import testIdPlugin from '@core/plugins/TestIdPlugin';
import modalPlugin from '@core/plugins/modal/modalPlugin';
import loadScriptPlugin from '@core/plugins/LoadScriptPlugin';
import '@scss/mixins/_z-index-export-js.scss';



