import fetch from '@core/utils/fetch';

let axiosTokens = {};

export default {
    getToken ( key ) {
        const token = fetch.getCancelRequest();
        axiosTokens[ key ] = axiosTokens[ key ] ? axiosTokens[ key ] : [];
        axiosTokens[ key ].push( token );
        return token.token;
    },
    clear( key, reason ) {
        const hasKey = axiosTokens.hasOwnProperty( key );
        if ( hasKey && Array.isArray( axiosTokens[ key ] ) ) {
            axiosTokens[ key ].map( token => {
                token.cancel( reason );
            } );
            axiosTokens[ key ] = [];
        }
    },
};
