import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import './registerServiceWorker';
import Vue from 'vue';

/****** Modal Plugin ( vuetify modals used as an service ) ***********/

Vue.use( modalPlugin );

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

/****** SWIPER JS ***********/
import { Swiper as SwiperClass, Pagination } from 'swiper/js/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

SwiperClass.use( [ Pagination ] );
Vue.use( getAwesomeSwiper( SwiperClass ) );
import 'swiper/css/swiper.min.css';

import Hotjar from 'vue-hotjar';
import { getConfig as hotjarUtilsGetConfig } from '@/core/utils/hotjarUtils';

const hotjarConfig = hotjarUtilsGetConfig();
Vue.use ( Hotjar, hotjarConfig );

import devicePlugin from '@core/plugins/DevicePlugin';
import testIdPlugin from '@core/plugins/TestIdPlugin';
import modalPlugin from '@core/plugins/modal/modalPlugin';
import loadScriptPlugin from '@core/plugins/LoadScriptPlugin';
import '@scss/mixins/_z-index-export-js.scss';
import './filters';
import './unregisterServiceWorker';
