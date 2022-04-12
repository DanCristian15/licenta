import apiServiceAttractions from '@core/api/apiServiceAttractions';

const STORE_NAME = 'attractions';

//TODO review this store and remove unused data/mutatations/actions
export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        list:               [],
    },
    mutations: {
    },

    getters: {
    },
    actions: {
        searchByEvent: async ( context, { eventId, search } ) => {
            const api = await apiServiceAttractions( '' );
            return await api.attractions.getByEvent( eventId, search );
        }
    }
};
