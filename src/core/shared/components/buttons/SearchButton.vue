<template>
    <BaseButton
        :placeholder="$t('search')"
        :classes="'gst-btn--search'"
        v-bind="$attrs"
        @click="$emit('click')" />
</template>
<script>
    import BaseButton from './BaseButton.vue';

    export default {
        name: 'SearchButton',
        i18nOptions: { keyPrefix: 'components.buttons', namespaces: 'shared' },
        components: {
            BaseButton
        },
        inheritAttrs: true,
    };
</script>
