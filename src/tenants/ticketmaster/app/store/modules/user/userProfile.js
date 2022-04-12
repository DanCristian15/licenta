import Schema from 'validate';
import apiServiceUser from '@core/api/apiServiceUser';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';

const STORE_NAME = 'profile';
const DEFAULT_STATE = {
    detail: null,
    email: null,
    loading: false,
    error: false,
    sessionId: null
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: { ...DEFAULT_STATE },
    getters: {
        loading: state => state.loading,
        getDetail: state => state.detail,
        balance: state => state.detail ? state.detail.balance : 0,
        email: state => state.email,
        isAuth: state => !!state.email,
        hasError: state => state.error
    },
    mutations: {
        setDetail( state, data ) {
            state.detail = data;
        },
        setError( state, isError ) {
            state.error = isError;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setLoading( state, loading ) {
            state.loading = loading;
        },
        setSessionId( state, sessionId ) {
            state.sessionId = sessionId;
        },
        [mutationTypes.CLEAR]( state ) {
            state.setError = false;
            state.email = null;
            state.detail = null;
            state.sessionId = null;
        }
    },
    actions: {
        get: async ( { commit, state }, email ) => {
            if ( email === null ) return;
            commit( 'setLoading', true );
            const api = await apiServiceUser( '' );
            const response = await api.user.getUserProfile( { email: email } );
            commit( 'setError', false );

            if ( response.success ) {
                commit( 'setDetail', response.data );
                commit( 'setEmail', email );
                commit( 'setLoading', false );
                return state.detail;
            } else {
                // Error handling is just a simulation
                // this will be most probably made by the integration of points.com login
                commit( 'setError', true );
                commit( 'setLoading', false );
                LogService.debug( 'problems loading email ' + email );
                return false;
            }
        },
        /**
         * Hack until we have an session with points.com
         */
        getSession: async ( { commit }, email ) => {
            const api = await apiServiceUser( '' );
            const response = await api.user.getSession( { email } );
            if ( response.success ) {
                commit( 'setSessionId', response.data );
                return response.data;
            } else {
                LogService.debug( 'problems loading session for ' + email );
                commit( 'clear' );
                return null;
            }
        },
        setError( { commit }, isError ) {
            commit( 'setError', isError );
        },
        setLoading( { commit }, loading = true ) {
            commit ( 'setLoading', loading );
        },
        /**
         * TODOs
         * Temporary action to store email address
         *
         * @param {*} param0
         * @param {*} email
         */
        setEmail( { commit }, email ) {
            commit( 'setEmail', email );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                email: state[STORE_NAME].email,
                sessionId: state[STORE_NAME].sessionId,
            };
        },
        getDataToLoad: ( data ) => {
            const schema = new Schema( {
                email: {
                    type: String,
                    required: true,
                },
            } );
            if ( !data || schema.validate( data ).length ) {
                throw( new Error( 'Invalid schema for userProfile store', JSON.stringify( schema.validate ) ) );
            }
            return {
                email: data.email,
                sessionId: data.sessionId,
            };
        }
    }
};
