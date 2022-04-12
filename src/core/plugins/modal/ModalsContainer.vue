<template>
    <div id="modals_container">
        <div v-for="item in modals"
            :key="item.id">
            <component
                :is="item.componentModal"
                :modal="item.modal"
                @close="remove( item.id )" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                modals: [ ]
            };
        },
        methods: {
            add( componentModal, modal ) {
                let id = new Date( ).getTime( );

                this.modals.push(
                    {
                        id,
                        componentModal,
                        modal
                    }
                );
                return id;
            },
            remove( id ) {
                const index = this.modals.findIndex( item => item.id === id );

                if ( index !== -1 ) {
                    this.modals.splice( index, 1 );
                }

                return this.modals;
            }
        },
        created () {
            this.$root._dynamicContainer = this;
        },

    };
</script>
