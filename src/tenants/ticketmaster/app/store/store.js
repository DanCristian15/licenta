import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import createMutationsSharer from 'vuex-shared-mutations';
import addHotelReservationStateStore    from '@tenant/app/modules/hotel/stores/addHotelReservationState/addHotelReservationState';
import appConstants from '@core/utils/constants/app';
import storeConstants from '@core/utils/constants/storage';
import LogService from '@services/LogService';

import  appStateStore                   from './modules/appState';
import  cartStore                       from './modules/cart';
import  eventsStore                     from './modules/events';
import  notificationStore               from './modules/notification/index';
import  ticketsStore                    from './modules/tickets';
import  userStore                       from './modules/user/user';
import  countriesStore                  from './modules/countries';
import  statesStore                     from './modules/states';
import  attractionsStore                from './modules/attractions/attractions';
import  packagesOffersStore             from './modules/packageOffers';

const vuexLocalStorage = new VuexPersist( {
    key: storeConstants.KEYS.STORE, // The key to store the state on in the storage provider.
    storage: localStorage,
    reducer: ( state ) => {
        return {
            version: appConstants.VERSION,
            store: {
                appState:                   appStateStore._persistent.getDataToSave(  state ),
                cart:                       cartStore._persistent.getDataToSave( state ),
                user:                       userStore._persistent.getDataToSave( state ),
                packageOffers:              packagesOffersStore._persistent.getDataToSave( state ),
                addHotelReservationState:   addHotelReservationStateStore._persistent.getDataToSave( state ),
            },
        };
    },
    restoreState: ( key, storage ) => {
        try {
            if ( !storage || !storage[ key ] ) {
                return null;
            }
            const state = JSON.parse( storage[ key ] );
            const store = state.store;
            const ret = {
                appState:                   appStateStore._persistent.getDataToLoad( store.appState ),
                cart:                       cartStore._persistent.getDataToLoad( store.cart ),
                user:                       userStore._persistent.getDataToLoad( store.user ),
                packageOffers:              packagesOffersStore._persistent.getDataToLoad( store.packageOffers ),
                addHotelReservationState:   addHotelReservationStateStore._persistent.getDataToLoad( store.addHotelReservationState ),
            };
            for ( let key in ret ) {
                if ( !ret[key] ) {
                    delete ret[key];
                }
            }

            return ret;
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
            const ret = {
                cart:               cartStore._sessionPersist.getDataToLoad( store.cart )
            };
            for ( let key in ret ) {
                if ( !ret[key] ) {
                    delete ret[key];
                }
            }
            return ret;
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
    ]
} );

Vue.use( Vuex );

const store = new Vuex.Store( {
    modules: {
        appState:                   appStateStore,
        cart:                       cartStore,
        events:                     eventsStore,
        notification:               notificationStore,
        tickets:                    ticketsStore,
        user:                       userStore,
        countries:                  countriesStore,
        states:                     statesStore,
        attractions:                attractionsStore,
        addHotelReservationState:   addHotelReservationStateStore,
        packageOffers:              packagesOffersStore
    },
    plugins: [ vuexLocalStorage.plugin, vuexSessionStorage.plugin, vuexShareMutation ],
    strict: process.env.NODE_ENV !== 'production'
} );


export default store;
