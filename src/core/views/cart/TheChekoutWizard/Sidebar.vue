<template>
    <div>
        <container-item-price-detail-card
            class="pa-0 mb-4"
            :cart-collection="cartCollections[0]"
            :order="order"
            :payment-model="paymentModel"
            :shipping-model="shippingModel"
            :show-shipping-fees-section-empty="currentStep === 0 && !shippingModel.lastSubmittedOptionId"
            :outlined="this.$vuetify.breakpoint.mdAndUp" />
        <EventHealthCheckWarningCardVariant1
            v-if="hasHealthCheck && $vuetify.breakpoint.mdAndUp && currentStep !== 2"
            :health-check="cartCollections[0].info.healthCheck"
            class="mb-4" />
        <sidebar-faq-card />
    </div>
</template>
<script>
    import EventHealthCheckWarningCardVariant1 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant1.vue';
    import ContainerItemPriceDetailCard  from './ContainerItemPriceDetailCard.vue';
    import SidebarFaqCard  from './SidebarFaqCard.vue';

    export default {
        name: 'Sidebar',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.sidebar'
        },
        components: {
            ContainerItemPriceDetailCard,
            SidebarFaqCard,
            EventHealthCheckWarningCardVariant1
        },
        props: {
            cartCollections: {
                type: Array,
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
            hasHealthCheck: {
                type: Boolean,
                default: false
            },
            currentStep: {
                type: Number,
                required: true
            }
        }
    };
</script>
