<template>
    <v-card
        class="gst-step3-payment-order-details-modal d-flex flex-column rounded-t-lg"
        color="text">
        <HeaderVariant2 @close="$emit('close')" />
        <v-card-text class="flex-grow-0 content-max-width px-4 pb-0" :style="{ color:'inherit'}">
            <h6 class="mt-3 mb-3 text-uppercase tertiary--text">
                {{ $t( 'orderDetailsModal.title' ) }}
            </h6>
            <container-item-price-detail-card
                class="pa-0"
                :cart-collection="cartCollection"
                :order="order"
                :payment-model="paymentModel"
                :shipping-model="shippingModel" />
        </v-card-text>
        <v-card-actions class="pa-2 mt-2">
            <BaseButton
                :placeholder="$t( '_common:buttons.placeOrder' )"
                block
                @click="onClickButtonDo" />
        </v-card-actions>
    </v-card>
</template>

<script>
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';
    import ContainerItemPriceDetailCard  from './ContainerItemPriceDetailCard.vue';

    export default {
        name: 'Step3PaymentOrderDetailsModalContent',
        components: {
            HeaderVariant2,
            ContainerItemPriceDetailCard,
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step3Payment'
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        props: {
            cartCollection: {
                type: Object,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            paymentModel: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            busEventsParent: {
                type: Object,
                required: true
            }
        },
        methods: {
            onClickButtonDo( ) {
                this.$emit( 'close' );
                this.busEventsParent.$emit( 'next' );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-step3-payment-order-details-modal {
        h6 {
            line-height: line-height( 'xs' );
            font-size: font-size( 'xxxs' );
        }
    }
</style>
