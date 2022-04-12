import Vue from 'vue';
import VueRouter from 'vue-router';
import commonRoutes from '@tenant/app/routes/index';


export default {
    create: ( ) => {
        Vue.use( VueRouter );

        return new VueRouter( {
            mode: 'history',
            base: '/',
            routes: commonRoutes
        } );
    }
};
