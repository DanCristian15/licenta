<template>
    <button 
        class="gst-toggle-input"
        :class="{
            'gst-toggle-input--checked': value,
            'gst-toggle-input--disabled': disabled
        }"
        @click="!disabled && $emit('input', !value)">
        <span 
            :class="{
                'gst-toggle-input__switch--checked': value,
            }"
            class="gst-toggle-input__switch">
            <slot name="switch"></slot>
        </span>
    </button>
</template>

<script>
    export default {
        name: 'Toggle',
        props: {
            value: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-toggle-input {
        display: inline-block;
        position: relative;
        height: 24px;
        width: 48px;
        border: 0;
        background: theme-color( 'septenary' );
        min-width: 48px;
        border-radius: 40px;
        text-align: center;
        -webkit-box-shadow: none;
        white-space: nowrap;
        box-shadow: inset 0 0 4px #999999;
        overflow: hidden;
        transition: all 0.2s ease-out;
    }

    .gst-toggle-input--checked {
        background: theme-color( 'primary' );
        box-shadow: inset 0 0 4px theme-color( 'primary' );
    }

    .gst-toggle-input__switch {
        display: inline-block;
        position: absolute;
        top: 1px;
        left: 1px;
        height: 22px;
        width: 22px;
        background-color: theme-color( 'white' );
        vertical-align: top;
        overflow: hidden;
        border-radius: 100%;
        transition: all 0.2s ease-out;
    }

    .gst-toggle-input__switch--checked {
        left: calc( 100% - 22px - 1px );
    }
</style>