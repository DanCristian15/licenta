
const STORE_NAME = 'loggedUser';

export default  {
    name: STORE_NAME,
    namespaced: true,
    state: {
        token:"",
        isLogged: '',
        loggedUser: {
            name: '',
            email: '',
            password: '',
            username: '',
            purchasedProducts: '',
            id: ''
        }
    },
    getters: {
        getLoggedUser( state ) {
            return state.loggedUser;
        },
        getIsLogged( state ) {
            return state.isLogged;
        },
        getToken( state ) {
            return state.token;
        }
    },
    mutations: {
        setLoggedUser: ( state, payload ) => {
            state.loggedUser.name = payload.name;
            state.loggedUser.email = payload.email;
            state.loggedUser.password = payload.password;
            state.loggedUser.username = payload.username;
            state.loggedUser.id = payload.id
            state.loggedUser.purchasedProducts = payload.purchasedProducts
            state.isLogged = true;
        },
        unsetLoggedUser: ( state ) => {
            state.loggedUser.name = '';
            state.loggedUser.email = '';
            state.loggedUser.password = '';
            state.loggedUser.username = '';
            state.loggedUser.id = '',
            state.loggedUser.purchasedProducts = []
            state.isLogged = false;
        },
        addToken: ( state, payload ) => {
            state.token = payload;
        },
    },
    actions: {
        commitSetLoggedUser( { commit }, payload ) {
            commit( 'setLoggedUser', payload );
        },
        commitUnsetLoggedUser( { commit } ) {
            commit( 'unsetLoggedUser' );
        },
        commitAddToken( { commit }, payload ) {
            commit( 'addToken', payload)
        }
    }
};