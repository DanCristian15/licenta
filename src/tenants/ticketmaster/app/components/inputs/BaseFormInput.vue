<template>
    <div
        class="gst-base-form-input"
        :class="[hasError && 'form-input-error']">
        <label
            v-if="label"
            class="gst-base-form-input__label">
            {{ label }}
        </label>
        <div class="d-relative">
            <BaseInput
                v-bind="$attrs"
                class="gst-base-form-input__input"
                :class="{
                    'pr-8': hasError || ( !hasError && showCheckIcon )
                }"
                :has-error="hasError"
                :value="value"
                :data-test-id="dataTestId"
                v-on="$listeners" />
            <div class="gst-base-form-input__append-icons">
                <CheckRoundIcon v-if="!hasError && showCheckIcon" class="success-icon" />
                <ExclamationRoundIcon v-if="hasError" />
            </div>
        </div>
        <div class="gst-base-form-input__errors-messages">
            {{ errorMessages.join( ' ' ) }}
        </div>
    </div>
</template>

<script>
    import ExclamationRoundIcon from '@tenant/app/assets/icons/exclamation_round.svg';
    import CheckRoundIcon from '@tenant/app/assets/icons/check_round.svg';
    import BaseInput from '@/core/shared/components/input/BaseInput.vue';
    import CoreBaseFormInput from '@/core/shared/components/input/BaseFormInput.vue';

    export default {
        name: 'BaseFormInput',
        extends: CoreBaseFormInput,
        components: {
            BaseInput,
            CheckRoundIcon,
            ExclamationRoundIcon
        },
        props: {
            showCheckIcon: {
                type: Boolean,
                default: false
            },
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

    .gst-base-form-input {
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

        .gst-base-form-input__input {
            @include border-radius( 'xxs' );

            width: 100%;
            border: 1px solid theme-color( 'septenary' );
            color: theme-color( 'quaternary' );
            font-size: font-size( l );
            box-shadow: inset 0 2px 4px rgba( theme-color-hex( 'black' ), 0.1 );
        }

        .gst-base-form-input__input:hover {
            border-color: theme-color( 'tertiary' );
        }

        .gst-base-form-input__input:focus {
            border-color: theme-color( 'primary' );
        }

        .gst-base-form-input__errors-messages {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
            min-height: line-height( 's' );
        }

        .gst-base-form-input__append-icons {
            position: absolute;
            top: 43%;
            right: theme-spacing( 5 );

            svg {
                height: 19px;
                width: 19px;
            }

            .success-icon {
                path {
                    fill: theme-color( 'success' );
                }
            }
        }
    }

    .gst-base-form-input.form-input-error {
        .gst-base-form-input__input {
            border-color: theme-color( 'error' );
        }

        .gst-base-form-input:hover {
            border-color: theme-color( 'error' );
        }
    }
</style>
