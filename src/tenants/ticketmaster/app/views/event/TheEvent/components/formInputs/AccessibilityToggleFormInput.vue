<template>
    <div class="gst-accessibility-toggle-form-input"
        @click="onClickAccessibilityDo">
        <div class="d-flex flex-row aling-center flex-wrap">
            <label for="filter_accesibilty" class="gst-accessibility-toggle-form-input__label flex-grow-1">
                {{ $t('_common:terms.accessibility') }}
            </label>
            <ToggleInput
                id="filter_accesibilty"
                :value="value"
                :disabled="disabled"
                class="gst-accessibility-toggle-form-input__input"
                @input="$emit('input', $event)">
                <template slot="switch">
                    <IconAccessibility />
                </template>
            </ToggleInput>
        </div>
        <div v-if="showWarningMessage" class="gst-accessibility-toggle-form-input__warning u-with-100 d-flex flex-row">
            <div>
                <IconWarning />
            </div>

            <p class="gst-accessibility-toggle-form-input__warning__text ma-0">
                {{ $t( 'message' ) }}
            </p>
        </div>
    </div>
</template>

<script>
    import ToggleInput from '@tenant/app/components/inputs/ToggleInput';
    import IconWarning from '@tenant/app/assets/icons/warning.svg';
    import IconAccessibility from '@core/shared/assets/icons/accessibility.svg';

    export default {
        name: 'AccessibilityToggleFormInput',
        components: {
            ToggleInput,
            IconWarning,
            IconAccessibility
        },
        props: {
            value: {
                type: Boolean,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components._components.inputs.accessibilityToggleFormInput'
        },
        data( ) {
            return {
                showWarningMessage: false
            };
        },
        methods: {
            onClickAccessibilityDo( ) {
                this.disabled && ( this.showWarningMessage = true );
            }
        }
    };
</script>


<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-accessibility-toggle-form-input__label {
        @include font-size( 's' );
        @include line-height( 'xxxl' );
        @include font-weight( 'regular' );
        
        color: theme-color( 'tertiary' );
        vertical-align: middle;
    }

    .gst-accessibility-toggle-form-input__input {
        svg {
            height: 14px;
            width: 14px;
            margin-top: 3px;

            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }

    .gst-accessibility-toggle-form-input__warning {
        padding: 12px;
        margin: 16px -16px 0;
        background-color: theme-color( 'primary-lighten-1' );
        color: theme-color( 'quaternary' );

        > div {
            margin-right: 8px;
        }

        .gst-accessibility-toggle-form-input__warning__text {
            @include line-height('xl');
        }
    }

    @include mobile-only {
        .gst-accessibility-toggle-form-input {
            .gst-accessibility-toggle-form-input__label {
                @include font-size('l');

                line-height: 16px;
                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
            }
        }

        .gst-accessibility-toggle-form-input__warning {
            display: flex;
            padding: 16px;
            margin: 16px -16px 0;
            align-items: center;

            .gst-accessibility-toggle-form-input__warning__text {
                @include line-height('m');

                font-size: font-size( 'xxs' );
                max-width: 80%;
            }
        }
    }
</style>
