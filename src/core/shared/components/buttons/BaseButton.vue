<template>
    <v-btn
        :class="['gst-btn', invert && 'gst-btn--invert', disabled && 'gst-btn--disabled', classes]"
        depressed
        :loading="!!loading"
        :disabled="disabled"
        v-bind="$attrs"
        @click="$emit('click')">
        <slot v-if="!icon && !placeholder"></slot>
        <component
            :is="icon"
            v-if="icon"
            class="gst-btn-icon" />
        {{ placeholder }}
    </v-btn>
</template>
<script>
    export default {
        name: 'BaseButton',
        inheritAttrs: true,
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            invert: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            classes: {
                type: String,
                default: () => ''
            },
            icon: {
                type: String,
                default: null
            },
            loading: {
                type: [ Boolean, Number ],
                default: false
            }
        },
    };
</script>
