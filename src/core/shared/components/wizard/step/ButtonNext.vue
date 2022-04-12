<template>
    <BaseButton
        :placeholder="$attrs.placeholder ? $attrs.placeholder : $t( '_common:buttons.next' )"
        v-bind="$attrs"
        @click="$emit('click')" />
</template>
<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';

    export default {
        name: 'ButtonNext',
        components: {
            BaseButton
        },
        inheritAttrs: true
    };
</script>
