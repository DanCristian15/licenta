<template>
    <div class="gst-payment-provider-down-container">
        <PaymentProviderMaintenanceIcon class="gst-payment-provider-down-container__icon" />
        <p class="gst-payment-provider-down-container__title">
            {{ $t( 'title' ) }}
        </p>
        <p class="gst-payment-provider-down-container__message">
            {{ $t( 'message' ) }}
        </p>
        <div class="gst-payment-provider-down-container__actions">
            <BaseButton
                class="gst-payment-provider-down-container__actions-btn mr-2"
                outlined
                color="primary"
                :data-test-id="$testId('button.back')"
                :placeholder="$t( '_common:buttons.back' )"
                @click="$emit('back')" />
            <BaseButton
                class="gst-payment-provider-down-container__actions-btn"
                color="primary"
                :data-test-id="$testId('button.tryAgain')"
                :placeholder="$t( '_common:buttons.tryAgain' )"
                @click="$emit('reload')" />
        </div>
    </div>
</template>

<script>
    import BaseButton from '@shared/components/buttons/BaseButton';
    import PaymentProviderMaintenanceIcon from '@tenant/app/assets/payment-provider-maintenance.svg';

    export default {
        name: 'PaymentProviderDownContainer',
        components: {
            BaseButton,
            PaymentProviderMaintenanceIcon
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.containers.paymentProviderDownContainer'
        },
        testIdOptions: {
            keyPrefix: 'checkout.containers.paymentProviderDownContainer'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-payment-provider-down-container {
        display: flex;
        margin-top: 95px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .gst-payment-provider-down-container__icon {
            margin-bottom: theme-spacing( 8 );
        }

        .gst-payment-provider-down-container__title {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'large' );
        }

        .gst-payment-provider-down-container__message {
            line-height: line-height( 'xl' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            max-width: 80%;
        }

        .gst-payment-provider-down-container__actions {
            display: flex;
            margin-top: theme-spacing( 2 );
            flex-wrap: wrap;
            justify-content: center;

            .gst-payment-provider-down-container__actions-btn {
                font-weight: font-weight( 'large' );
                text-transform: capitalize;
            }
        }

        @include mobile-only {
            margin-top: theme-spacing( 5 );
            margin-bottom: theme-spacing( 10 );

            .gst-payment-provider-down-container__title {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'l' );
            }

            .gst-payment-provider-down-container__actions {
                margin-top: theme-spacing( 4 );
            }
        }
    }
</style>