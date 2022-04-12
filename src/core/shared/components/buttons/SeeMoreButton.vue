<template>
    <BaseButton
        :placeholder="$t('seeMore')"
        invert
        :classes="'gst-btn--see-more'"
        :loading="loading"
        @click="$emit('click')" />
</template>
<script>
    import BaseButton from './BaseButton.vue';

    export default {
        name: 'SeeMoreButton',
        components: {
            BaseButton
        },
        i18nOptions: { keyPrefix: 'components.buttons', namespaces: 'shared' },
        props: {
            loading: {
                type: [ Boolean, Number ],
                default: false
            }
        },
    };
</script>
