import Schema from 'validate';
import {
    isProduction as environmentUtilsIsProduction
} from '@core/utils/environmentUtils';
import LogService from '@services/LogService';

const STORE_NAME = 'appState';

const DEFAULT_STATE = {
    language: 'en',
    loading: false,
    api: {
        partner: null,
        mockData: false
    },
    forceDynamicFlow: false
};

export default {
    name: STORE_NAME,
    namespaced: true,
    state: DEFAULT_STATE,
    getters: {
        isForcedDynamicFlow: ( state ) => {
            const isProduction = environmentUtilsIsProduction();

            return state.forceDynamicFlow && !isProduction;
        }
    },
    mutations: {
        setLanguage( state, language ) {
            state.language = language;
        },
        setApiPartner( state, partner ) {
            state.api.partner = partner;
        },
        setApiMockData( state, value ) {
            state.api.mockData = value;
        },
        setLoading( state, loading ) {
            state.loading = loading;
        },
        setForceDynamicFlow ( state, value ) {
            state.forceDynamicFlow = value;
        }
    },
    actions: {
        setLanguage( { commit }, language ) {
            commit( 'setLanguage', language );
        },
        setApiPartner( { commit }, partner ) {
            commit( 'setApiPartner', partner );
        },
        setApiMockData( { commit }, value ) {
            commit( 'setApiMockData', value );
        },
        setLoading( { commit }, loading = true ) {
            commit ( 'setLoading', loading );
        },
        setForceDynamicFlow( { commit }, value = true ) {
            commit ( 'setForceDynamicFlow', value );
        },
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                language: state[STORE_NAME].language,
                api: {
                    mockData: state[STORE_NAME].api.mockData
                },
                forceDynamicFlow: state[STORE_NAME].forceDynamicFlow
            };
        },
        getDataToLoad: ( data ) => {
            try {
                const schema = new Schema( {
                    language: {
                        type: String,
                        required: true,
                    },
                    api: {
                        mockData: {
                            type: 'boolean',
                            required: true
                        }
                    },
                    forceDynamicFlow: {
                        type: 'boolean',
                        required: false
                    }
                } );

                if ( !data || schema.validate( data ).length ) {
                    throw( new Error( 'Invalid schema for appState store' + JSON.stringify( schema.validate( data ) ) ) );
                }

                return data;
            } catch ( e ) {
                LogService.error( `Vuex state cannot be loaded - AppState: ${ e.message }` );
                return null;
            }
        }
    }
};
