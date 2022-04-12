const TestIdPlugin = {
    install( Vue ) {
        if ( this.installed ) {
            return;
        }

        this.installed = true;

        Vue.mixin( {
            beforeCreate() {
                if ( this.$options && this.$options.testIdOptions ) {
                    const {
                        keyPrefix = null
                    } = this.$options.testIdOptions;
                    
                    this._testIdOptions = {
                        keyPrefix
                    };
                } else {
                    this._testIdOptions = {
                        keyPrefix: '' 
                    };
                }
            }
        } );

        Vue.prototype.$testId = function ( ) {
            const ids = Array.prototype.slice.call( arguments );
            const { keyPrefix } = this._testIdOptions;

            return [ keyPrefix, ...ids ].filter( item => !!item ).join( '.' );
        };
    }
};

export default TestIdPlugin;