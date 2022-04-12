<template>
    <div
        class="gst-base-form-select"
        :class="[hasError && 'form-select-error']">
        <label
            v-if="label"
            class="gst-base-form-input__label">
            {{ label }}
        </label>
        <CoreBaseSelect
            :value="value"
            v-bind="{ ...$attrs, ...$props }"
            class="gst-base-form-select__input"
            :data-test-id="dataTestId"
            @input="onInputDo"
            @focus="$emit('focus')"
            @blur="$emit('blur')" />
        <slot name="append">
            <ChevronDownIcon class="gst-base-form-select__icon" :class="[hasError && 'has-error']" />
        </slot>
        <div class="gst-base-form-select__errors-messages">
            {{ errorMessages.join( ' ' ) }}
        </div>
    </div>
</template>

<script>
    import ChevronDownIcon from '@core/shared/assets/icons/chevron_down.svg';
    import CoreBaseSelect from '@/core/shared/components/input/BaseSelect.vue';

    export default {
        name: 'BaseFormSelect',
        extends: CoreBaseSelect,
        components: {
            CoreBaseSelect,
            ChevronDownIcon,
        },
        props: {
            clearable: {
                type: Boolean,
                default: false,
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
            label: {
                type: String,
                default: null,
            },
            errorMessages: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            dataTestId: {
                type: String,
                required: true
            }
        },
        computed: {
            hasError() {
                return !!this.errorMessages.length;
            }
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

    .gst-base-form-select {
        @include border-radius( 'xxs' );

        display: flex;
        position: relative;
        flex-direction: column;

        .gst-base-form-input__label {
            position: relative;
            line-height: line-height( 'xl' );
            margin-bottom: theme-spacing( 2 );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-base-form-select__input {
            @include border-radius( 'xxs' );

            height: 36px;
            width: 100%;
            padding-right: theme-spacing( 6 );
            padding-left: theme-spacing( 4 );
            border: 1px solid theme-color( 'septenary' );
            color: theme-color( 'quaternary' );
            font-size: font-size( l );
            box-shadow: inset 0 2px 4px rgba( theme-color-hex( 'black' ), 0.1 );
            outline: none;
        }

        .gst-base-form-select__icon {
            position: absolute;
            top: 40%;
            right: theme-spacing( 4 );
            pointer-events: none;
        }

        .gst-base-form-select__icon.has-error {
            path {
                fill: theme-color( 'error' );
            }
        }

        .gst-base-form-select__errors-messages {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
            min-height: line-height( 's' );
        }

        .gst-select {
            border: none;
        }

        .gst-select__input {
            color: theme-color( 'quaternary' ) !important;
        }

        .gst-select-input:hover {
            cursor: pointer;
            border-color: theme-color( 'tertiary' );
        }
    }

    .gst-base-form-select.form-select-error {
        .gst-select-input {
            border-color: theme-color( 'error' );
        }
    }
</style>
