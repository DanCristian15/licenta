import Vue from 'vue';
import entityConstants from '@core/utils/constants/entity';
import '@core/common';
import App from '@core/App.vue';
import i18nFactory from './i18nFactory';
import routerFactory from './routerFactory';
import storeFactory from './storeFactory';
import vuetifyFactory from './vuetifyFactory';

export default {
    create: ( config ) => {
        const tenantComponents = Object.assign (
            {
                'TenantLogo'                                  : () => import( '@core/shared/components/TenantLogo.vue' ),
                'TenantLogoIcon'                              : () => import( '@core/shared/components/TenantLogoIcon.vue' ),
                'TenantLogoLoyaltyPartnerIcon'          : () => import( '@core/shared/components/TenantLogoLoyaltyPartnerIcon.vue' ),
                'TenantBonusPointsBadge'                      : () => import ( '@core/shared/components/bonusPoints/BonusPointsBadge.vue' ),
                'TenantBonusPointsHomeBanner'                 : () => import( '@core/shared/components/bonusPoints/BonusPointsHomeBanner' ),
                'TenantBonusPointsCartCheckoutSummary'        : () => import( '@core/shared/components/bonusPoints/BonusPointsCartCheckoutSummary' ),
                'TenantBonusPointsCartCheckoutConfirmation'   : () => import( '@core/shared/components/bonusPoints/BonusPointsCartCheckoutConfirmation' ),
                'TenantBonusPointsChip'                       : () => import( '@core/shared/components/bonusPoints/BonusPointsChip' ),
                'TenantPriceIcon'                             : () => import( '@core/shared/components/misc/PriceIcon' ),
                'TenantUserDropdownMenu'                : ()  => import( '@core/shared/components/menu/UserDropdownMenu' ),
                'TenantUserMobileMenu'                      : () => import( '@core/shared/components/menu/UserMobileMenu' ),
            },
            config.components || { }
        );

        const i18n      = i18nFactory.create( config.i18n || { } );
        const router    = routerFactory.create( { routes: config.routes || [ ] } );
        const vuetify   = vuetifyFactory.create( config.theme );
        const store     = storeFactory.create( config.store );

        for ( const property in tenantComponents ) {
            Vue.component( property, tenantComponents[property] );
        }

        router.beforeEach( ( to, from, next ) => {
            if ( !to.meta.isPublic && !store.getters[ 'user/profile/isAuth'] ) {
                router.replace( { name: 'home' } );
            } else {
                next( );
            }
        } );

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
        if ( !store.state.user.firstAccess ) {
            store.dispatch( 'user/favoriteEntities/getIds', { type: entityConstants.TYPES.EVENT } );
            store.dispatch( 'user/favoriteEntities/getIds', { type: entityConstants.TYPES.ATTRACTION } );
        }
        app.$mount( '#app' );
    }
};
