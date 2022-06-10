import storeModuleFactory from '@core/helpers/storeModuleFactory';

const STORE_NAME = 'states';

const store = storeModuleFactory.createModuleView(
    STORE_NAME,
    {
        get: async ( params ) => {
            const api = await apiServiceStates( '' );
            const response = await api.states.get( params );
            return response;
        }
    },
    {
        actionGetOptionsDefault: {
            refresh: false
        }
    }
);

export default store;