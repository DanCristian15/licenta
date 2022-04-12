import get from 'lodash/get'; 

const defaultOptions = {
    dirty: true,
    first: 1
};

export default {
    computed: {
        _validationsMessages: function ( ) {
            return {

            };
        },
    },
    methods: {
        _extractValidationsMessages: function ( fieldName, options = { }  ) {
            const field = get( this.$v, fieldName );
            const opts = { ...defaultOptions, ...options };
            const messages = this._validationsMessages;

            if ( !field ) {
                return [ ];
            }
            if ( field.$pending || ( opts.dirty && !field.$dirty ) ) {
                return [ ];
            }
            const keys = Object.keys( field )
                .filter( key => key.charAt( 0 ) !== '$' && field[ key ] === false );
            
            return keys.map( key => {
                const message = get( messages, fieldName );
    
                if ( !message || !message[ key ] ) {
                    return  'Invalid';
                }

                return message[ key ].call( this, field, field.$params[ key ] );
            } );
        }
    }
};