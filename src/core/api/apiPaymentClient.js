import Vue from 'vue';
import apiPaymentClientConstants from '@core/utils/constants/apiPaymentClient';

function api ( ) {
    return {
        loadClient: ( ) => {
            return new Promise( ( resolve ) => {
                Vue.loadScript( apiPaymentClientConstants.CONFIG.BRAINTREE.scriptUrl )
                    .then( ( ) => resolve( true ) )
                    .catch ( ( ) => resolve( false ) );
            } );
        },
        openPaymentIFrame: ( token, selector, cfg, callback ) => {
            braintree.dropin.create( {
                authorization: token,
                container: selector,
                ...cfg,
            }, callback );
        }
    };
}

export default api();
