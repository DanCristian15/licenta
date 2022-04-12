<template>
    <v-card 
        class="d-flex flex-column" 
        :class="{
            'rounded-t-lg': !$vuetify.breakpoint.mdAndUp
        }"
        color="text">
        <HeaderVariant1
            v-if="$vuetify.breakpoint.mdAndUp"
            :title="$t('_common:pages.termsAgreement.title')"
            @close="$emit('close')" />
        <HeaderVariant2 v-else @close="$emit('close')" />
        <v-card-text class="flex-grow-0 content-max-width px-4 pb-2" :style="{ color:'inherit'}">
            <h6 v-if="!$vuetify.breakpoint.mdAndUp" class="mt-3 text-uppercase tertiary--text">
                {{ $t('_common:pages.termsAgreement.title') }}
            </h6>
            <component 
                :is="termAgreeement" 
                :class="{
                    'pt-4': $vuetify.breakpoint.mdAndUp,
                    'pt-2': !$vuetify.breakpoint.mdAndUp
                }" 
                v-bind="{ hideBanner: true }" />
        </v-card-text>
    </v-card>
</template>

<script>
    import HeaderVariant1 from '@core/shared/components/modals/layout/HeaderVariant1.vue';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';

    export default {
        name: 'Step2DeliveryFormTermsAgreementModalContent',
        components: {
            HeaderVariant1,
            HeaderVariant2
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        computed: {
            termAgreeement( ) {
                const routeAggrement = this.$router.options.routes.find( item => item.name === 'termsAgreement' );

                return routeAggrement ? routeAggrement.component : '';
            }
        }
    };
</script>
