const STORE_NAME = 'signUp';
// import apiServiceUser from '@core/api/apiServiceUser';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
// import LogService from '@services/LogService';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers( state ) {
            return state.users;
        }
    },
    mutations: {
        addUser: ( state, payload ) => {
            state.users.push ( {
                'name': payload.name,
                'password': payload.password,
                'email': payload.email,
                'username': payload.username,
                'notifications': [],
                'id': Math.random()
            } );
        },
        setUserNotifications: ( state, payload ) => {
            state.users.forEach( user => {
                if ( user.id === payload.lastBidder ) {
                    user.notifications.push( `You got the the ${payload.productName} at price of ${payload.lastBid}` );
                }
            })
        }
    },
    actions: {
        commitAddUser( { commit }, payload ) {
            commit( 'addUser', payload );
        },
        commitSetUserNotifications( { commit }, payload ) {
            commit( 'setUserNotifications', payload );
        }
    }

};