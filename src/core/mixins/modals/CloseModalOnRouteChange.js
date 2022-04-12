let mixin = {
    methods: {
        closeModal() {
            this.$emit( 'close' );
        }
    },
    mounted() {
        this._mixinRouteChange = this.$watch( '$route', ( ) => {
            this.closeModal();
        } );
    }
};

export default mixin;
