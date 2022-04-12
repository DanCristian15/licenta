import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';

const STORE_NAME = 'appState';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        language: 'en',
        loading: false,
        api: {
            partner: null,
            mockData: false
        },
        page: {
            home: {
                showHeader: false
            }
        }
    },
    getters: {
        getPageProp: state => ( page, prop ) => {
            return state.page[ page ][ prop ];
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
        setPageProp( state, { page, prop, value } ) {
            state.page[ page ][ prop ] = value;
        },
        [ mutationTypes.CLEAR ]( state ) {
            state.api.mockData = false;
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
        setPageProp( { commit }, { page, prop, value } ) {
            commit( 'setPageProp', { page, prop, value } );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                language: state[STORE_NAME].language,
                api: {
                    mockData: state[STORE_NAME].api.mockData
                }
            };
        },
        getDataToLoad: ( data ) => data
    }
};
