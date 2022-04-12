<template>
    <div class="gst-confirm-leave-checkout-modal">
        <h4 class="gst-confirm-leave-checkout-modal__title">
            {{ $t( 'title' ) }}
        </h4>
        <div class="gst-confirm-leave-checkout-modal__content">
            {{ $t( 'content' ) }}
        </div>
        <div class="d-flex flex-row justify-end px-4 pb-4 pt-6">
            <BaseButton 
                color="error"
                class="gst-confirm-leave-checkout-modal__cancel-btn text-capitalize"
                @click="onConfirmFn();$emit('close')">
                {{ $t( 'buttons.cancel' ) }}
            </BaseButton>
            <BaseButton 
                color="primary"
                class="gst-confirm-leave-checkout-modal__continue-btn text-capitalize"
                @click="$emit( 'close' )">
                {{ $t( 'buttons.continue' ) }}
            </BaseButton>
        </div>
    </div>
</template>

<script>
    import BaseButton from '@shared/components/buttons/BaseButton';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';

    export default {
        name: 'ConfirmLeaveModal',
        components: {
            BaseButton
        },
        mixins: [
            CloseModalOnRouteChangeMixin
        ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.confirmLeaveModal'
        },
        props: {
            onConfirmFn: {
                type: Function,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-confirm-leave-checkout-modal {
        background-color: theme-color( 'white' );
        color: theme-color( 'quaternary' );
        border-radius: 8px;

        .gst-confirm-leave-checkout-modal__title {
            line-height: font-size( 'xxxxxl' );
            padding: theme-spacing( 6, 8 );
            font-size: font-size( 'xxxxl' );
            font-weight: font-weight( 'large' );
        }

        .gst-confirm-leave-checkout-modal__content {
            padding: theme-spacing( 6, 8 );
            border-top: 1px solid #E3E4E5;
            border-bottom: 1px solid #E3E4E5;
        }

        .gst-confirm-leave-checkout-modal__cancel-btn,
        .gst-confirm-leave-checkout-modal__continue-btn {
            font-size: font-size( 's' );
            font-weight: font-weight( 'bold' );
        }

        .gst-confirm-leave-checkout-modal__cancel-btn {
            margin-right: theme-spacing( 2 );
        }
    }
</style>
