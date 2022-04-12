import Schema from 'validate';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';

const STORE_NAME = 'filters';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        quantity: 2
    },
    mutations: {
        [ mutationTypes.UPDATE ]( state, { quantity } ) {
            state.quantity = quantity;
        },
        [ mutationTypes.CLEAR ] ( state ) {
            state.quantity = 2;
        }
    },
    actions: {
        update( { commit }, { quantity } ) {
            commit( mutationTypes.UPDATE, { quantity } );
        },
        clear( { commit } ) {
            commit ( mutationTypes.CLEAR );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            return {
                quantity: state[STORE_NAME].quantity
            };
        },
        getDataToLoad: ( data ) => {
            const schema = new Schema( {
                quantity: {
                    type: Number,
                    required: true,
                },
            } );
            if ( !data || schema.validate( data ).length ) {
                throw( new Error( 'Invalid schema for package offers filters' ) );
            }

            return data;
        }
    }
};
