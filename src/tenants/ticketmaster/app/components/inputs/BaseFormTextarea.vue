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
            class="gst-base-form-textarea__input"
            :class="[hasPrependInputSlot && 'prepend-slot', hasAppendInputSlot && 'append-slot']"
            :has-error="hasError"
            :value="value"
            :data-test-id="dataTestId"
            v-on="$listeners" />
        <slot name="appendInput"></slot>
        <span v-if="hint" class="gst-base-form-input__hint">
            {{ hint }}
        </span>
        <span v-if="counter" class="gst-base-form-input__counter text-right">
            {{ counterValue }}
        </span>
        <span class="gst-base-form-input__errors-messages">
            {{ errorMessages.join( ' ' ) }}
        </span>
    </div>
</template>
<script>
    import CoreBaseFormTextarea from '@/core/shared/components/input/BaseFormTextarea.vue';
    import BaseTextarea from '@/core/shared/components/input/BaseTextarea.vue';

    export default {
        name: 'BaseFormTextArea',
        extends: CoreBaseFormTextarea,
        components: {
            BaseTextarea
        },
        props: {
            dataTestId: {
                type: String,
                required: true
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
            line-height: line-height( 'xl' );
            margin-bottom: theme-spacing( 2 );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-base-form-textarea__input {
            border: 1px solid theme-color( 'septenary' );
            color: theme-color( 'quaternary' );
            box-shadow: inset 0 2px 4px rgba( theme-color-hex( 'black' ), 0.1 );
        }

        .gst-base-form-textarea__error {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
            min-height: line-height( 's' );
        }

        .gst-base-form-textarea__input.input-error {
            border-color: theme-color( 'error' );
        }

        .gst-base-form-textarea__input:hover {
            border-color: theme-color( 'tertiary' );
        }

        .gst-base-form-input__errors-messages {
            border-color: theme-color( 'primary' );
        }

        .gst-base-form-input__hint {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            font-size: font-size( 'xxs' );
        }

        .gst-base-form-input__counter {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
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