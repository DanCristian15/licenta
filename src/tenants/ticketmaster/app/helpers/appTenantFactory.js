import Vue from 'vue';
import '@tenant/app/common';
import App from '@tenant/app/App.vue';
import {
    isProduction as environmentUtilsIsProduction
} from '@core/utils/environmentUtils';
import i18nFactory from './i18nFactory';
import routerFactory from './routerFactory';
import storeFactory from './storeFactory';
import vuetifyFactory from './vuetifyFactory';

export default {
    create: ( config = { } ) => {
        const i18n          = i18nFactory.create( config.i18n || { } );
        const router        = routerFactory.create( { routes: config.routes || [ ] } );
        const vuetify       = vuetifyFactory.create( config.theme );
        const store         = storeFactory.create( config.store );
        const isProduction  = environmentUtilsIsProduction();

        if ( !isProduction ) {
            router.beforeEach( ( to, from, next ) => {
                if ( !store.getters[ 'user/profile/isAuth' ] && to.name !== 'user.login' ) {
                    router.push( { name: 'user.login', params: { redirectRouteToAfterLogin: to } } );
                } else {
                    next( );
                }
            } );
        }

        router.onError( error => {
            if ( /loading chunk [^\n]+ failed./i.test( error.message ) ) {
                window.location.reload( );
            }
        } );

        window.$store = store;

        const app = new Vue( {
            router,
            store,
            vuetify,
            i18n,
            render: h => h( App )
        } );
        app.$mount( '#app' );
    }
};
