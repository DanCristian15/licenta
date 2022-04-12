<template>
    <BaseButton
        :placeholder="$attrs.placeholder ? $attrs.placeholder : $t( '_common:buttons.back' )"
        invert
        v-bind="$attrs"
        @click="$emit('click')" />
</template>
<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';

    export default {
        name: 'ButtonBack',
        components: {
            BaseButton
        },
        inheritAttrs: true,
    };
</script>
