let mixin = {
    methods: {
        closeModal() {
            this.$emit( 'close' );
        }
    },
    mounted() {
        this._mixinBreakpointChange = this.$watch( '$vuetify.breakpoint.mdAndUp', ( ) => {
            this.closeModal();
        } );
    }
};

export default mixin;
