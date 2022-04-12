import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import createMutationsSharer from 'vuex-shared-mutations';
import i18next from 'i18next';
import appConstants from '@core/utils/constants/app';
import storeConstants from '@core/utils/constants/storage';
import {
    setLang as documentUtilsSetLang
} from '@core/utils/documentUtils';
import LogService from '@services/LogService';

import appStateStore           from './modules/appState';
import appTenantStore          from './modules/appTenant';
import  attractionsStore       from './modules/attractions/attractions';
import  cartStore              from './modules/cart';
import  categoriesStore        from './modules/categories';
import  citiesStore            from './modules/cities';
import  eventsStore            from './modules/events';
import  notificationStore      from './modules/notification/index';
import  searchStateStore       from './modules/searchState';
import  topEventsStore         from './modules/topEvents';
import  venuesStore            from './modules/venues';
import addProductStore         from './modules/addProduct';
import userStore from './modules/user/user';


const vuexLocalStorage = new VuexPersist( {
    key: storeConstants.KEYS.STORE, // The key to store the state on in the storage provider.
    storage: localStorage,
    reducer: ( state ) => ( {
        version: appConstants.VERSION,
        store: {
            appState:           appStateStore._persistent.getDataToSave ( state ),
            searchState:        searchStateStore._persistent.getDataToSave ( state ),
            cart:               cartStore._persistent.getDataToSave( state ),
            user:               userStore._persistent.getDataToSave( state )
        },
    } ),
    restoreState: ( key, storage ) => {
        try {
            if ( !storage || !storage[ key ] ) {
                return null;
            }
            const state = JSON.parse( storage[ key ] );
            const store = state.store;

            return {
                appState:           appStateStore._persistent.getDataToLoad ( store.appState ),
                searchState:        searchStateStore._persistent.getDataToLoad ( store.searchState ),
                cart:               cartStore._persistent.getDataToLoad( store.cart ),
                user:               userStore._persistent.getDataToLoad( store.user )
            };
        } catch ( e ) {
            LogService.error( `Vuex state cannot be loaded (${e.message} )` );
            return null;
        }
    }
} );

const vuexSessionStorage = new VuexPersist( {
    key: storeConstants.KEYS.STORE, // The key to store the state on in the storage provider.
    storage: sessionStorage,
    reducer: ( state ) => ( {
        version: appConstants.VERSION,
        store: {
            cart:               cartStore._sessionPersist.getDataToSave( state )
        }
    } ),
    restoreState: ( key, storage ) => {
        try {
            if ( !storage || !storage[ key ] ) {
                return null;
            }
            const state = JSON.parse( storage[ key ] );
            const store = state.store;

            return {
                cart:               cartStore._sessionPersist.getDataToLoad( store.cart )
            };
        } catch ( e ) {
            LogService.error( `Vuex session state cannot be loaded (${e.message} )` );
            return null;
        }
    }
} );

const vuexShareMutation = createMutationsSharer( {
    predicate: [
        'cart/addToList',
        'cart/removeFromList',
        'user/favoriteEntities/addId',
        'user/favoriteEntities/deleteId',
        'user/favoriteEntities/addIdBackend',
        'user/favoriteEntities/deleteIdBackend',
    ]
} );

Vue.use( Vuex );

const store = new Vuex.Store( {
    modules: {
        appState:           appStateStore,
        appTenant:          appTenantStore,
        attractions:        attractionsStore,
        cart:               cartStore,
        categories:         categoriesStore,
        cities:             citiesStore,
        events:             eventsStore,
        notification:       notificationStore,
        searchState:        searchStateStore,
        topEvents:          topEventsStore,
        venues:             venuesStore,
        user:               userStore,
        addProduct:         addProductStore
    },
    plugins: [ vuexLocalStorage.plugin, vuexSessionStorage.plugin, vuexShareMutation ],
    strict: process.env.NODE_ENV !== 'production'
} );


//TODO ( ionutt 2020-04-29 ) this should be moved away from the store,
//this depency should be at another level.
i18next.on( 'initialized', () => {
    const language = store.state.appState.language;
    const languages = i18next.languages;
    const initLanguage = languages.indexOf( language ) === -1 ? i18next.languages[ 0 ] : language;

    store.dispatch( 'appState/setLanguage', initLanguage );
    i18next.changeLanguage ( initLanguage );
    documentUtilsSetLang( initLanguage );

    store.watch( ( state ) => state.appState.language, ( val ) => {
        i18next.changeLanguage( val );
        documentUtilsSetLang( val );
    } );
} );

export default store;
