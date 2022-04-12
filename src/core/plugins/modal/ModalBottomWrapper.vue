<template>
    <v-bottom-sheet
        v-model="visibility"
        :attach="attachTo"
        :style="modal.modalAttrs.style"
        v-bind="modal.modalAttrs">
        <component
            :is="modal.component"
            v-bind="modal.componentAttrs"
            @close="visibility = false" />
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: 'ModalBottomlWrapper',
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
                }
            }
        },
        mounted( ) {
            this.visibility = true;
        }
    };
</script>
