<template>
    <input
        type="text"
        class="gst-base-input"
        :class="[hasError && 'input-error']"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit( 'blur' )"
        @focus="$emit( 'focus' )" />
</template>

<script>
    export default {
        name: 'BaseInput',
        props: {
            hasError: {
                type: Boolean,
                default: false
            },
            value: {
                type: [ String, Number ],
                default: null
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-base-input {
        line-height: line-height( 'xxl' );
        padding: theme-spacing( 2, 4, 2, 4 );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'regular' );
        border-radius: border-radius( 'xxs' ) !important;

        &.prepend-slot {
            padding-left: theme-spacing( 8 ) !important;
        }

        &.append-slot {
            padding-right: theme-spacing( 8 ) !important;
        }

        &:focus {
            outline: none;
        }
    }
</style>
