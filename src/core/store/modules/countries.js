import { createModuleView } from '@core/helpers/storeFactories/read/readStoreAllItemsFactory';

const STORE_NAME = 'countries';

const store = createModuleView(
    STORE_NAME,
    {
        get: async ( params ) => {
            const api = await apiServiceCountries( '' );
            const response = await api.countries.get( params );
            return response;
        }
    },
    {
        actionGetOptionsDefault: {
            refresh: false,
        },
    }
);

export default store;