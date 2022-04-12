<template>
    <!-- eslint-disable vue/no-v-html  -->
    <v-overlay class="gst-payment-provider-down-overlay u-width-100"
        :absolute="absolute"
        :color="color"
        :dark="false"
        :light="true"
        :opacity="opacity"
        :value="value">
        <PaymentProviderDownWarningContainer 
            @close="value = false" />
    </v-overlay>
</template>

<script>
    import PaymentProviderDownWarningContainer from '@core/shared/components/notifications/PaymentProviderDownWarningContainer.vue';

    export default {
        name: 'PaymentProviderDownOverlay',
        components: {
            PaymentProviderDownWarningContainer
        },
        props: {
            absolute: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: '#FFFFFF'
            },
            opacity: {
                type: [ String, Number ],
                default: '0.9'
            },
        },
        data() {
            return {
                value: true
            };
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-payment-provider-down-overlay {
        ::v-deep .v-overlay__scrim {
            backdrop-filter: blur( 20px );
        }
    }
</style>