<template>
    <component :is="component" />
</template>
<script>
    import { mapState } from 'vuex';
    import EventStatusCancelledWarning_en from './EventStatusCancelledWarning_en.vue';


    export default {
        name: 'EventStatusCancelled',
        components: {
            /* eslint-disable vue/no-unused-components */
            EventStatusCancelledWarning_en,
            /* eslint-enable vue/no-unused-components */
        },
        computed: {
            ...mapState( {
                language:  state => state.appState.language
            } ),
            component() {
                return `EventStatusCancelledWarning_${this.language}`;
            }
        }
    };
</script>
