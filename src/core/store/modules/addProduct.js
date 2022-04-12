const STORE_NAME = 'addProduct';
// import apiServiceproduct from '@core/api/apiServiceproduct';
//import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
// import LogService from '@services/LogService';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        products: [ ]
    },
    getters: {
        getProducts: state => state.products
    },
    mutations: {
        addProduct:( state, payload ) => {
            state.products.push( {
                'productName': payload.productName,
                'condition': payload.condition,
                'geographicOrigin': payload.geographicOrigin,
                'years': payload.years,
                'startBid': parseFloat( payload.startBid ),
                'category': payload.category,
                'description': payload.description,
                'sellerEmail': payload.sellerEmail,
                'sellerName': payload.sellerName
            } );
        }
    },
    actions: {
        commitAddProduct( { commit }, payload ) {
            commit( 'addProduct', payload );
        }
    }
};