
const STORE_NAME = 'loggedUser';

export default  {
    name: STORE_NAME,
    namespaced: true,
    state: {
        isLogged: '',
        loggedUser: {
            name: '',
            email: '',
            password: '',
            username: ''
        }
    },
    getters: {
        getLoggedUser( state ) {
            return state.loggedUser;
        },
        getIsLogged( state ) {
            return state.isLogged;
        },
    },
    mutations: {
        setLoggedUser: ( state, payload ) => {
            state.loggedUser.name = payload.name;
            state.loggedUser.email = payload.email;
            state.loggedUser.password = payload.password;
            state.loggedUser.username = payload.username;
            state.isLogged = true;
        },
        unsetLoggedUser: ( state ) => {
            state.loggedUser.name = '';
            state.loggedUser.email = '';
            state.loggedUser.password = '';
            state.loggedUser.username = '';
            state.isLogged = false;
        },

    },
    actions: {
        commitSetLoggedUser( { commit }, payload ) {
            commit( 'setLoggedUser', payload );
        },
        commitUnsetLoggedUser( { commit } ) {
            commit( 'unsetLoggedUser' );
        }
    }
};