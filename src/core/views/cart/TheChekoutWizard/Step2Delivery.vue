<template>
    <v-card flat class="d-flex flex-column gst-checkout-step-2 py-0">
        <v-card-text class="flex-grow-0 py-0 px-0">
            <step2-delivery-form
                ref="step2DeliveryForm"
                :customer-model="customerModel"
                :shipping-model="shippingModel"
                :agree-model="agreeModel"
                :has-health-check="hasHealthCheck"
                :countries="countries"
                @healthcheck-validation-error="onHealthCheckValidationErrorDo" />
        </v-card-text>
        <v-card-actions class="px-0 mt-2">
            <v-flex d-flex justify-center>
                <ButtonBack
                    v-if="$vuetify.breakpoint.mdAndUp"
                    :data-test-id="$testId('buttons.back')"
                    :placeholder="$t( '_common:buttons.back' )"
                    @click="$emit( 'back' )" />
                <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
                <ButtonNext
                    :placeholder="$t( 'buttons.next' )"
                    :data-test-id="$testId('buttons.continueToPayment')"
                    :width="!$vuetify.breakpoint.mdAndUp ? '100%' : ''"
                    :disabled="hasHealthCheckValidationErrors"
                    @click="validate" />
            </v-flex>
        </v-card-actions>
    </v-card>
</template>
<script>
    import ButtonBack from '@core/shared/components/wizard/step/ButtonBack.vue';
    import ButtonNext from '@core/shared/components/wizard/step/ButtonNext.vue';
    import Step2DeliveryForm  from './Step2DeliveryForm.vue';

    export default {
        name: 'Step2Delivery',
        components: {
            ButtonBack,
            ButtonNext,
            Step2DeliveryForm
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step2Delivery'
        },
        testIdOptions: {
            keyPrefix: 'checkoutWizard.step2Delivery'
        },
        props: {
            step: {
                type: Object,
                required: true
            },
            customerModel: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            agreeModel: {
                type: Object,
                required: true
            },
            hasHealthCheck: {
                type: Boolean,
                default: false
            },
            countries: {
                type: Array,
                default: () => ( [] )
            }
        },
        data() {
            return {
                hasHealthCheckValidationErrors: false
            };
        },
        methods: {
            validate() {
                const isValid = !this.shippingModel.loading ? this.$refs.step2DeliveryForm.validate() : false;
                if( isValid ) this.$emit( 'next' );
            },
            onHealthCheckValidationErrorDo( value ) {
                this.hasHealthCheckValidationErrors = value;
            }
        }
    };
</script>
