const ServerErrorExtractor = {
    data( ) {
        return {
            serverErrors: {}
        };
    },
    methods: {
        _bindServerErrorExtractor( errors, model ) {
            this._clearServerErrorExtractor( );
            setTimeout( () => {
                this.$set( this, 'serverErrors', errors );
                for ( const key in errors ) {
                    if ( Object.prototype.hasOwnProperty.call ( errors, key ) ) {
                        const disposer = this.$watch( `${model}.${key}`, () => {
                            this.$delete( this.serverErrors, key );
                            this._watchDisposerServerErrorExtractor = this._watchDisposerServerErrorExtractor.filter( item => item !== disposer );
                            disposer( );
                        }, { deep: true } );
                        
                        this._watchDisposerServerErrorExtractor.push( disposer );
                    }
                }
            }, 40 );
        },
        _clearServerErrorExtractor( ) {
            this._watchDisposerServerErrorExtractor.forEach( item => item( ) );
            this.$set( this, 'serverErrors', { } );
        },
        _normalizeServerErrorExtractor( errors, callback ) {
            return errors.reduce( ( acc, error ) => {
                if ( callback ) {
                    return callback( error, acc );
                } else {
                    const { field, code } = error;
                    const message = this.$t( `_common.validationFieldServer.${code}` );

                    if ( acc[ field ] ) {
                        acc[ field ].push( message );
                    } else {
                        acc[ field ] = [ message ];
                    }
                }
                return acc;
            }, { } );
        }
    },
    mounted( ) {
        this._watchDisposerServerErrorExtractor = [ ];
    },
    destroyed( ) {
        this._clearServerErrorExtractor( );
    }
};

export default ServerErrorExtractor;
