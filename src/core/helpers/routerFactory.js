import Vue from 'vue';
import VueRouter from 'vue-router';
import commonRoutes from '@core/routes/index';


export default {
    create: ( { routes = [ ] } = { } ) => {
        const finalRoutes = commonRoutes
            .map( item => {
                const customRoute = routes.find( itemCustomRoute => itemCustomRoute.name === item.name );

                return {
                    ...item,
                    component: ( customRoute && customRoute.component ) ? customRoute.component : item.component
                };
            } );

        Vue.use( VueRouter );

        return new VueRouter( {
            mode: 'history',
            base: '/',
            routes: finalRoutes,
            scrollBehavior ( to, from, savedPosition ) {
                if ( savedPosition ) {
                    return savedPosition;
                } else {
                    return to.hash ? { selector: to.hash } : { x: 0, y: 0 };
                }
            }
        } );
    }
};
