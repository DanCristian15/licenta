<template>
    <!-- eslint-disable vue/no-v-html  -->
    <v-flex class="gst-payment-provider-down-warning-container d-flex flex-column justify-center" align-center>
        <img :src="iconSrc" height="72px" class="mb-8" />
        <p class="gst-payment-provider-down-warning-container__title" v-html="$t( 'title' )"></p>
        <p class="gst-payment-provider-down-warning-container__message" v-html="$t( 'message' )"></p>
        <BaseButton class="mt-4"
            :placeholder="buttonLabel"
            @click="$emit( 'close' )" />
    </v-flex>
    <!-- eslint-enable vue/no-v-html  -->
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import imageConstants from '@core/utils/constants/imagePaths';

    export default {
        name: 'PaymentProviderDownWarningContainer',
        components: {
            BaseButton
        },
        props: {
            buttonLabel: {
                type: String,
                default: function ( ) { 
                    return this.$t( '_common:buttons.close' );
                }
            }
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.notifications.paymentProviderDownWarningContainer'
        },
        computed: {
            iconSrc() {
                return imageConstants.FALLBACKS.EVENT_TICKETS_MAINTENANCE;
            }
        }
        
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-payment-provider-down-warning-container {
        text-align: center;

        .gst-payment-provider-down-warning-container__title {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
        }

        .gst-payment-provider-down-warning-container__message {
            line-height: line-height( 'xl' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'regular' );
        }
    }
</style>