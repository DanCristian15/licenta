<template>
    <div class="gst-select">
        <BaseSelect
            :value="value"
            v-bind="{ ...$attrs, ...$props }"
            class="gst-select__input"
            @input="onInputDo" />
        <slot name="append">
            <ChevronDownIcon class="gst-select__icon" />
        </slot>
    </div>
</template>

<script>
    import ChevronDownIcon from '@core/shared/assets/icons/chevron_down.svg';
    import BaseSelect from './BaseSelect';

    export default {
        name: 'BaseFormSelect',
        components: {
            BaseSelect,
            ChevronDownIcon
        },
        inheritAttrs: false,
        props: {
            clearable: {
                type: Boolean,
                default: false,
            },
            displayProp: {
                type: String,
                default: 'name'
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false
            },
            i18nPrefix: {
                type: String,
                default: ''
            },
            invalidateOnChangeOptions: {
                type: Boolean,
                default: true
            },
            options: {
                type: Array,
                required: true
            },
            optionsArrayObj: {
                type: Boolean,
                default: true
            },
            renderer: {
                type: Function,
                default: null,
            },
            valueProp: {
                type: String,
                default: 'id'
            },
            value: {
                type: [ Object, String, Number ],
                default: null
            },
        },
        methods: {
            onInputDo ( value ) {
                this.$emit( 'input', value );
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-select {
        position: relative;
        border: 1px solid theme-color( 'primary' );

        .gst-select__input {
            position: relative;
            height: 100%;
            width: 100%;
            color: theme-color( 'primary' );
            cursor: pointer;
            outline: none;
        }

        .gst-select__icon {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 8px;
            bottom: 0;
            margin: auto;
            fill: theme-color( 'primary' );
            pointer-events: none;
        }
    }

</style>
