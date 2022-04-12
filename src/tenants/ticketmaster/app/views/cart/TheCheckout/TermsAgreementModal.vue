<template>
    <v-card
        class="gst-terms-agreement-modal d-flex flex-column"
        :class="{
            'rounded-t-1': $vuetify.breakpoint.mdAndUp,
            'rounded-t-lg': !$vuetify.breakpoint.mdAndUp,
        }"
        color="text">
        <HeaderVariant1
            class="flex-grow-0"
            :title="$t( 'title' )"
            @close="$emit('close')" />
        <TermsAgreement />
    </v-card>
</template>

<script>
    import HeaderVariant1 from '@tenant/app/components/modals/HeaderVariant1';
    import TermsAgreement from '@tenant/app/static/TermsAgreement.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';

    export default {
        name: 'EventInfoModal',
        components: {
            HeaderVariant1,
            TermsAgreement
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.termsAgreementModal'
        },
    };
</script>
