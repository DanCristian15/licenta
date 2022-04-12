<template>
    <div class="gst-shipment-fieldset">
        <DataLoadingOverlay
            :show="shippingModel.loading"
            color="white"
            opacity="0.8">
            <span class="gst-shipment-fieldset__title">
                {{ $t( 'title' ) }}
                <div class="gst-shipment-fieldset__status-icons">
                    <CheckRoundIcon v-if="!hasError && showCheckIcon" class="status-icon success-icon" />
                    <ExclamationRoundIcon v-if="hasError" class="status-icon" />
                </div>
            </span>
            <span class="gst-shipment-fieldset__error-messages">{{ errorMessages.join( ' ' ) }}</span>
            <div class="gst-shipment-fieldset__options">
                <div v-for="option in shippingModel.options" :key="option.id" class="option">
                    <div>
                        <input
                            :id="option.id"
                            v-model="shippingModel.optionId"
                            :value="option.id"
                            type="radio"
                            :name="option.serviceLevel"
                            :data-test-id="$testId('input.shipmentOption', option.id)"
                            @input="validation.shippingModel.optionId.$touch()"
                            @blur="validation.shippingModel.optionId.$touch()" />
                        <label :for="option.id">
                            {{ $options.filters.shippingFilter( option ) }}
                        </label>
                    </div>
                    <BaseTooltip
                        bottom
                        :text="option.description.long"
                        class-content="gst-shipment-fieldset__tooltip-content"
                        class="gst-shipment-fieldset__tooltip">
                        <HelpIcon />
                    </BaseTooltip>
                </div>
            </div>
        </DataLoadingOverlay>
    </div>
</template>

<script>
    import HelpIcon from '@tenant/app/assets/icons/help.svg';
    import CheckRoundIcon from'@tenant/app/assets/icons/check_round.svg';
    import ExclamationRoundIcon from '@tenant/app/assets/icons/exclamation_round.svg';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';
    import DataLoadingOverlay from '@/core/shared/components/loading/DataLoadingOverlay.vue';
    import shippingFilter from '@/core/filters/localFilters/shipping';

    export default {
        name: 'ShipmentFieldset',
        components: {
            BaseTooltip,
            HelpIcon,
            CheckRoundIcon,
            ExclamationRoundIcon,
            DataLoadingOverlay
        },
        props: {
            hasTicketsOnly: {
                type: Boolean,
                default: false
            },
            shippingModel: {
                type: Object,
                default: () => ( {} )
            },
            validation: {
                type: Object,
                required: true
            },
            extractValidationsMessagesFn: {
                type: Function,
                required: true,
            }
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'views.cart.theCheckout._components.fieldsets.shipmentFieldset'
        },
        testIdOptions: {
            keyPrefix: 'checkout.fieldsets.shipmentFieldset'
        },
        filters: {
            shippingFilter
        },
        computed: {
            showCheckIcon() {
                return this.validation.shippingModel.optionId.$dirty;
            },
            errorMessages() {
                return this.extractValidationsMessagesFn( 'shippingModel.optionId' );
            },
            hasError() {
                return !!this.errorMessages.length;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-shipment-fieldset {
        @include border-radius( 'xs' );

        padding: theme-spacing( 4 ) theme-spacing( 6 );
        border: 1px solid theme-color( 'septenary' );
        font-family: "Averta Std", sans-serif !important;

        .gst-shipment-fieldset__status-icons {
            min-height: 25px;
        }

        .gst-shipment-fieldset__error-messages {
            line-height: line-height( 's' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
        }

        .gst-shipment-fieldset__title {
            display: flex;
            line-height: line-height( 'xxxl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'large' );
            align-items: center;

            .status-icon {
                height: 22px;
                width: 22px;
                margin-left: theme-spacing( 2 );
            }

            .success-icon {
                path {
                    fill: theme-color( 'success' );
                }
            }
        }

        .gst-shipment-fieldset__options {
            width: 50%;

            .option {
                display: flex;
                line-height: line-height( 'xxxl' );
                margin-top: theme-spacing( 5 );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'large' );
                align-items: center;
                justify-content: space-between;

                div {
                    display: flex;
                    align-items: center;

                    label {
                        margin-left: theme-spacing( 2 );
                        cursor: pointer;
                    }

                    input {
                        height: 24px;
                        width: 24px;
                    }

                    input:hover {
                        cursor: pointer;
                    }
                }

                svg {
                    height: 18px;
                    width: 18px;
                }

                .gst-svg-icon {
                    stroke: theme-color( 'tertiary' ) !important;
                }

                .gst-svg-icon:nth-child(2) {
                    fill: transparent !important;
                }
            }
        }
    }

    @include mobile-only {
        .gst-shipment-fieldset {
            .gst-shipment-fieldset__options {
                width: 100% !important;
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-shipment-fieldset {
        margin-top: theme-spacing( 8 );
    }

    @include mobile-only {
        .gst-shipment-fieldset {
            margin-top: theme-spacing( 4 );
        }
    }

    .gst-shipment-fieldset__tooltip-content.v-tooltip__content {
        @include border-radius( 'xs' );

        width: 316px !important;
        padding: theme-spacing( 4 ) !important;
        background: theme-color( 'white' ) !important;
        color: theme-color( 'quaternary' ) !important;
        box-shadow: 0 2px 6px rgba( 0, 0, 0, 0.25 ) !important;
        opacity: 1 !important;
    }
</style>
