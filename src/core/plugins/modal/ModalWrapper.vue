<template>
    <v-dialog
        v-model="visibility"
        :attach="attachTo"
        :style="modal.modalAttrs.style"
        v-bind="modal.modalAttrs">
        <component
            :is="modal.component"
            v-bind="modal.componentAttrs"
            @close="visibility = false" />
    </v-dialog>
</template>

<script>
    export default {
        name: 'ModalWrapper',
        props: {
            modal: {
                type: Object,
                default: () => { return { }; }
            },
            attachTo: {
                type: String,
                default: '#app'
            }
        },
        data( ) {
            return {
                visibility: false
            };
        },
        watch: {
            visibility: function ( newValue ) {
                if ( !newValue ) {
                    !this.modal.events.beforeClose || this.modal.events.beforeClose( );
                    setTimeout( ( ) => {
                        !this.modal.events.close || this.modal.events.close( );
                        this.$emit( 'close' );
                    }, 200 );
                } else {
                    !this.modal.events.beforeOpen || this.modal.events.beforeOpen( );
                    setTimeout( ( ) => {
                        !this.modal.events.open || this.modal.events.open( );
                        this.$emit( 'open' );
                    }, 200 );
                }
            }
        },
        mounted( ) {
            this.visibility = true;
        }
    };
</script>
