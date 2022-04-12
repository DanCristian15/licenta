<template>
    <div
        class="gst-base-form-textarea"
        :class="[hasError && 'form-input-error']">
        <label
            v-if="label"
            class="gst-base-form-textarea__label">
            {{ label }}
        </label>
        <slot name="prependInput"></slot>
        <BaseTextarea
            v-bind="$attrs"
            :class="[hasPrependInputSlot && 'prepend-slot', hasAppendInputSlot && 'append-slot']"
            :has-error="hasError"
            :value="value"
            v-on="$listeners" />
        <slot name="appendInput"></slot>
    </div>
</template>

<script>
    import BaseTextarea from './BaseTextarea.vue';

    export default {
        name: 'BaseFormTextarea',
        components: {
            BaseTextarea,
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
            },
            hint: {
                type: String,
                default: null
            },
            counter: {
                type: Boolean,
                default: false
            },
            counterLimit: {
                type:  [ Number, String ],
                default: null
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
            },
            counterValue( ) {
                const { value, counter, counterLimit, $attrs } = this;
                if ( counter ) {
                    const currentChars = value.length;
                    const maxChars = $attrs.maxlength ? $attrs.maxlength : counterLimit;
                    if ( maxChars ) {
                        return `${currentChars} / ${maxChars}`;
                    }
                    return currentChars;
                }
                return '';
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-base-form-textarea {
        display: flex;
        position: relative;
        flex-direction: column;

        .gst-base-form-textarea__label {
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
