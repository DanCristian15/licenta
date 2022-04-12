import store from '@core/store/store';

export default {
    create: ( config = { } ) => {
        if ( config.stores && config.stores.appTenant && config.stores.appTenant.config ) {
            store.commit( 'appTenant/setConfig', config.stores.appTenant.config );
        }
        return store;
    }
};
