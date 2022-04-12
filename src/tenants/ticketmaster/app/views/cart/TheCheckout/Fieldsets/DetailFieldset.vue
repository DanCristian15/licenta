<template>
    <div class="gst-checkout-detail-fieldset">
        <h5 class="mb-6">
            {{ $t( 'title' ) }}
        </h5>
        <div class="row">
            <BaseFormInput
                v-model="customerModel.firstName"
                :label="$t('labels.firstName')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.firstName' )"
                :show-check-icon="validation.customerModel.firstName.$dirty"
                maxlength="30"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.firstName')"
                @blur="validation.customerModel.firstName.$touch()" />
            <BaseFormInput
                v-model="customerModel.lastName"
                :label="$t('labels.lastName')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.lastName' )"
                :show-check-icon="validation.customerModel.lastName.$dirty"
                maxlength="30"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.lastName')"
                @blur="validation.customerModel.lastName.$touch()" />
            <BaseFormInput
                v-model="customerModel.email"
                :label="$t('labels.email')"
                :show-check-icon="validation.customerModel.email.$dirty"
                :error-messages="extractValidationsMessagesFn( 'customerModel.email' )"
                maxlength="255"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.email')"
                @blur="validation.customerModel.email.$touch()" />
            <BaseFormInput
                v-model="customerModel.confirmEmail"
                :show-check-icon="validation.customerModel.confirmEmail.$dirty"
                :label="$t('labels.emailConfirm')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.confirmEmail' )"
                maxlength="255"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.emailConfirm')"
                @blur="validation.customerModel.confirmEmail.$touch()" />
            <BaseFormTextarea
                v-model="customerModel.hotelReservationRequest"
                :label="$t('labels.hotelReservationRequest')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.hotelReservationRequest' )"
                maxlength="500"
                counter
                class="col col-12 py-0 mt-1"
                :data-test-id="$testId('textarea.hotelReservationRequest')"
                @blur="validation.customerModel.hotelReservationRequest.$touch()" />
        </div>
    </div>
</template>

<script>
    import BaseFormInput from '@tenant/app/components/inputs/BaseFormInput';
    import BaseFormTextarea from '@tenant/app/components/inputs/BaseFormTextarea';

    export default {
        name: 'DetailFieldset',
        components: {
            BaseFormInput,
            BaseFormTextarea
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.fieldsets.detailFieldset'
        },
        testIdOptions: {
            keyPrefix: 'checkout.fieldsets.detailFieldset'
        },
        props: {
            customerModel: {
                type: Object,
                required: true,
            },
            validation: {
                type: Object,
                required: true
            },
            extractValidationsMessagesFn: {
                type: Function,
                required: true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-checkout-detail-fieldset {
        padding: theme-spacing( 4 ) theme-spacing( 9 );
        border: 1px solid theme-color( 'septenary' );
        border-radius: 4px;

        h5 {
            line-height: font-size( 'xxxxl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxxl' );
        }
    }

    @include mobile-only {
        .gst-checkout-detail-fieldset {
            padding: theme-spacing( 4 ) theme-spacing( 6 );
            margin-top: theme-spacing( 4 );

            h5 {
                line-height: font-size( 'xl' );
                font-size: font-size( 'l' );
            }
        }
    }
</style>
