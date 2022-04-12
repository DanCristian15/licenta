<template>
    <v-card 
        class="health-check-confirmation-modal-mobile rounded-t-lg">
        <HeaderVariant2 
            :close-button-text="$t('_common:buttons.back')"
            @close="$router.back( );" />
        <v-card-text class="health-check-confirmation-modal-mobile__content flex-grow-0 content-max-width px-4 py-4" :style="{ color:'inherit'}">
            <v-flex d-flex flex-row align-center class="mb-4">
                <IconHealthChecked />
                <h5 class="health-check-confirmation-modal-mobile__title ml-2">
                    {{ healthCheck.summary }}
                </h5>
            </v-flex>
            {{ healthCheck.description }}
        </v-card-text>
        <v-card-actions class="mt-2 mb-8 flex flex-column">
            <BaseButton
                class="health-check-confirmation-modal-mobile__ok-btn mb-6"
                @click="$emit( 'close' )">
                {{ $t( '_common:buttons.iAgree') }}
            </BaseButton>
            <v-btn
                v-if="healthCheck.learnMoreUrl"
                text
                small
                class="health-check-confirmation-modal-mobile__learn-more-btn text-capitalize"
                color="primary"
                target="_blank"
                :href="healthCheck.learnMoreUrl">
                {{ $t( '_common:buttons.learnMore') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import IconHealthChecked from '@assets/icons/health_checked.svg';
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';

    export default {
        name: 'HealthCheckConfirmationModalMobile',
        components: {
            HeaderVariant2,
            BaseButton,
            IconHealthChecked
        },
        mixins: [ 
            CloseModalOnRouteChangeMixin
        ],
        props: {
            healthCheck: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .health-check-confirmation-modal-mobile {
        .health-check-confirmation-modal-mobile__title {
            line-height: line-height( 's' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.1px;
            text-transform: uppercase;
            vertical-align: top;
        }

        .health-check-confirmation-modal-mobile__content {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .health-check-confirmation-modal-mobile__learn-more-btn {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: 0;
        }

        .health-check-confirmation-modal-mobile__ok-btn {
            @include border-radius( 's' );

            padding: 16px 40px !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'bold' );
        }
    }
</style>
