<template>
    <div class="gst-base-form-checkbox" :class="{ 'gst-base-form-checkbox__check': value, 'gst-base-form-checkbox__disabled': disabled }">
        <label class="gst-base-form-checkbox__label">
            <BaseCheckbox
                type="checkbox"
                :value="value"
                :disabled="disabled"
                :data-test-id="dataTestId"
                v-bind="$attrs"
                v-on="$listeners" />
            <span class="gst-base-form-checkbox__checkmark d-flex justify-center align-center rounded-s">
                <CheckmarkIcon
                    v-if="value === onValue" />
            </span>
            <slot name="label">
                {{ label }}
            </slot>
        </label>
        <div class="gst-base-form-checkbox__errors-messages">
            {{ errorMessages.join( ' ' ) }}
        </div>
    </div>
</template>

<script>
    import CheckmarkIcon from '@tenant/app/assets/icons/checkmark.svg';
    import BaseCheckbox from '@shared/components/input/BaseCheckbox.vue';


    export default {
        name: 'Checkbox',
        components: {
            CheckmarkIcon,
            BaseCheckbox
        },
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean
            },
            value: {
                type: [ String, Number, Object, Boolean ],
                default: null
            },
            onValue: {
                type: [ String, Number, Object, Boolean ],
                default: function ( ) {
                    return true;
                }
            },
            offValue: {
                type: [ String, Number, Object, Boolean ],
                default: function ( ) {
                    return false;
                }
            },
            errorMessages: {
                type: Array,
                default: function ( ) {
                    return [ ];
                }
            },
            dataTestId: {
                type: String,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-base-form-checkbox {
        .gst-base-form-checkbox__label {
            display: block;
            position: relative;
            padding-left: theme-spacing( 5 );
            color: theme( 'quaternary' );
            cursor: pointer;
            user-select: none;
        }

        input {
            position: absolute;
            height: 0;
            width: 0;
            opacity: 0;
            cursor: pointer;
            user-select: none;
        }

        .gst-base-form-checkbox__checkmark {
            @include border-radius( 'xxs' );

            position: absolute;
            top: 50%;
            left: 0;
            height: 14px;
            width: 14px;
            border: 1px solid theme-color( 'tertiary' );
            background: theme-color( 'white' );
            transition: all 150ms ease-in-out;
            transform: translateY( -50% );

            svg {
                path {
                    fill: theme-color( 'primary' );
                }
            }
        }

        .gst-base-form-checkbox__errors-messages {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
            min-height: line-height( 's' );
        }

        &.gst-base-form-checkbox__check {
            .gst-base-form-checkbox__checkmark {
                svg {
                    path {
                        fill: theme-color( 'primary' );
                    }
                }
            }

            label {
                color: theme-color( 'quaternary' );
            }
        }
    }
</style>