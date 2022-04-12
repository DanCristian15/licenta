<template>
    <BaseButton
        :placeholder="$t('resetFilters')"
        invert
        :classes="'gst-btn-reset-filters'"
        @click="$emit('click')" />
</template>
<script>
    import BaseButton from './BaseButton.vue';

    export default {
        name: 'ResetFiltersButton',
        components: {
            BaseButton
        },
        i18nOptions: { keyPrefix: 'buttons', namespaces: '_common' },
    };
</script>
