import { intervalToDuration } from "date-fns";
import { forEach } from "lodash";

const STORE_NAME = 'addProduct';
// import apiServiceproduct from '@core/api/apiServiceproduct';
//import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
// import LogService from '@services/LogService';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        products: [],
        thisMoment: {
            type: Date
        }
    },
    getters: {
        getProducts: state => state.products,
        getProductById: ( state ) => id => {
            return state.products.find( product => product.productId = id ).remainingSeconds;
        }
    },
    mutations: {
        addProduct:( state, payload ) => {
            state.products.push( {
                'productId': Math.random() * 10,
                'productName': payload.productName,
                'condition': payload.condition,
                'geographicOrigin': payload.geographicOrigin,
                'years': payload.years,
                'lastBid': parseFloat( payload.lastBid ),
                'lastBidder': '',
                'category': payload.category,
                'description': payload.description,
                'sellerEmail': payload.sellerEmail,
                'sellerName': payload.sellerName,
                'moment': new Date(),
                'remainingSeconds': 1,
                'remainingMinutes': 1,
                'remainingHours': 1
             } );
        },
        setProductBid: ( state, payload ) => {
            state.products.forEach( product => {
                if ( product.productId === payload.productId ) {
                    product.lastBid = product.lastBid + parseInt( payload.bid );
                    product.remainingTime = (state.thisMoment.getSeconds() - product.moment.getSeconds())
                    product.moment = new Date()

                    console.log(payload)
                }
            })
        },
        setLastBidder: ( state, payload ) => {
            state.products.forEach( product => {
                if ( product.productId === payload.productId ) {
                    product.lastBidder = payload.lastBidderId
                }
            })
        },
        setThisMoment: ( state, payload ) => {
            state.thisMoment = payload;
        },
        setRemainingTime: ( state ) => {
            state.products.forEach( product => {
                product.remainingSeconds = Math.floor( ( state.thisMoment - ( product.moment ) ) / 1000 );
                product.remainingMinutes = Math.floor( product.remainingSeconds / 60 );
                product.remainingHours = Math.floor(product.remainingMinutes/60);
            })
        },
    },
    actions: {
        commitAddProduct( { commit }, payload ) {
            commit( 'addProduct', payload );
        },
        commitSetProductBid( { commit }, productId) {
            commit( 'setProductBid', productId)
        },
        commitSetLastBidder( { commit }, productId, bidder) {
            commit( 'setLastBidder', productId, bidder)
        },
        commitSetThisMoment( { commit }, payload) {
            commit( 'setThisMoment', payload)
        },
        commitSetRemainingTime( { commit }, payload) {
            commit( 'setRemainingTime', payload)
        }
    }
};