<template>
    <div
        class="gst-base-form-input"
        :class="[hasError && 'form-input-error']">
        <label
            v-if="label"
            class="gst-base-form-input__label">
            {{ label }}
        </label>
        <slot name="prependInput"></slot>
        <BaseInput
            v-bind="$attrs"
            :class="[hasPrependInputSlot && 'prepend-slot', hasAppendInputSlot && 'append-slot']"
            :has-error="hasError"
            :value="value"
            v-on="$listeners" />
        <slot name="appendInput"></slot>
    </div>
</template>

<script>
    import BaseInput from './BaseInput.vue';

    export default {
        name: 'BaseFormInput',
        components: {
            BaseInput,
        },
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: null,
            },
            value: {
                type: [ String, Number ],
                default: null,
            },
            errorMessages: {
                type: Array,
                default: function ( ) {
                    return [ ];
                }
            }
        },
        computed: {
            hasPrependInputSlot() {
                return Boolean( this.$slots.prependInput );
            },
            hasAppendInputSlot() {
                return Boolean( this.$slots.appendInput );
            },
            hasError( ) {
                return !!this.errorMessages.length;
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-base-form-input {
        display: flex;
        position: relative;
        flex-direction: column;

        .gst-base-form-input__label {
            position: relative;
            bottom: theme-spacing( 0 );
            line-height: line-height( 'xl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .prepend-slot,
        .append-slot {
            position: absolute;
            top: 50%;
        }

        .prepend-slot {
            left: theme-spacing( 2 );
        }

        .append-slot {
            right: theme-spacing( 2 );
        }
    }
</style>
