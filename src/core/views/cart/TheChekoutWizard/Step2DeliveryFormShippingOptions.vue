<template>
    <v-radio-group
        v-if="hasItems"
        v-model="shippingModel.optionId"
        v-bind="$attrs"
        class="gst-checkout-step-2-form__shipping-options rounded-lg mt-0 pt-0">
        <v-card v-for="(item, index) in shippingModel.options"
            :key="index"
            outlined
            flat
            class="pa-3 mb-2 d-flex justify-space-between u-width-100"
            :class="{
                'error--text': hasErrors
            }">
            <v-radio
                :label="$options.filters.shippingFilter( item )"
                :value="item.id"
                off-icon="$vuetify.icons.checkboxRoundUnchecked"
                on-icon="$vuetify.icons.checkboxRoundChecked"
                class="gst-checkbox gst-input gst-input--secondary ma-0" />
            <BaseTooltip
                :text="item.description.long"
                :open-on-click="!$vuetify.breakpoint.mdAndUp"
                :open-on-hover="$vuetify.breakpoint.mdAndUp"
                class-content="gst-checkout-step-2-form__tooltip gst-base-tooltip">
                <v-btn class="gst-checkout-step-2-form__tooltip-btn" icon small :ripple="false">
                    <IconHelp class="gst-checkout-step-2-form__tooltip-icon" />
                </v-btn>
            </BaseTooltip>
        </v-card>
    </v-radio-group>
</template>

<script>
    import IconHelp from '@core/shared/assets/icons/help.svg';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';
    import shippingFilter from '@/core/filters/localFilters/shipping';

    export default {
        name: 'Step2DeliveryFormShippingOptions',
        components: {
            BaseTooltip,
            IconHelp
        },
        props: {
            shippingModel: {
                type: Object,
                required: true
            }
        },
        filters: {
            shippingFilter
        },
        computed: {
            hasErrors( ) {
                return this.$attrs['error-messages'].length ? true : false;
            },
            hasItems() {
                return !!this.shippingModel.options.length;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-checkout-step-2-form__shipping-options {
        ::v-deep .v-input__control {
            .v-input__slot {
                margin: 0;
            }

            .v-messages {
                height: auto;
                min-height: auto;
            }

            .v-card {
                color: theme-color( 'quinary' );
                border-radius: border-radius( 'm' ) !important;
                border-color: currentColor;
            }

            .v-card:last-child:not(.error--text) {
                margin-bottom: 0 !important;
            }
        }

        ::v-deep .v-input--radio-group__input {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
<style lang="scss">
    @import "@scssVariables";

    .gst-checkout-step-2-form__tooltip-icon {
        outline: none;

        .gst-svg-icon {
            fill: theme-color( 'senary' );
            transition: all 0.5s ease;
        }
    }

    .gst-checkout-step-2-form__tooltip-icon:hover {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-checkout-step-2-form__tooltip-btn::before {
        display: none;
    }

    .gst-checkout-step-2-form__tooltip.v-tooltip__content {
        line-height: line-height( 'xxs' );
        padding: 8px !important;
        background: theme-color( 'tertiary' ) !important;
        font-size: font-size( "xxs" );
    }
</style>