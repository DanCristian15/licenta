
let mixin = {
    methods: {
        _goToNotFoundPage( onCompleteFn ) {
            this._isDestroyed || this.$router.replace( { name: 'notFound' }, onCompleteFn );
        }
    },
    destroyed( ) {
        this._isDestroyed = true;
    }
};

export default mixin;
