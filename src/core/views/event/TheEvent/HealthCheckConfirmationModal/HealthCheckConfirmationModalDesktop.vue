<template>
    <v-card 
        class="health-check-confirmation-modal-desktop rounded-t-lg">
        <HeaderVariant1
            :show-close-icon="false"
            class="health-check-confirmation-modal-desktop__header">
            <IconHealthChecked />
            <h5 class="health-check-confirmation-modal-desktop__title ml-2">
                {{ healthCheck.summary }}
            </h5>
        </HeaderVariant1>
        <v-card-text class="health-check-confirmation-modal-desktop__content flex-grow-0 content-max-width px-6 py-4" :style="{ color:'inherit'}">
            {{ healthCheck.description }}
        </v-card-text>
        <v-card-actions class="pa-6">
            <v-spacer />
            <v-btn
                v-if="healthCheck.learnMoreUrl"
                text
                small
                class="health-check-confirmation-modal-desktop__learn-more-btn text-capitalize"
                color="primary"
                target="_blank"
                :href="healthCheck.learnMoreUrl">
                {{ $t( '_common:buttons.learnMore') }}
            </v-btn>
            <BaseButton
                class="health-check-confirmation-modal-desktop__ok-btn"
                @click="$emit( 'close' )">
                {{ $t( '_common:buttons.iAgree') }}
            </BaseButton>
        </v-card-actions>
    </v-card>
</template>

<script>
    import IconHealthChecked from '@assets/icons/health_checked.svg';
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import HeaderVariant1 from '@core/shared/components/modals/layout/HeaderVariant1.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';

    export default {
        name: 'HealthCheckModalDesktop',
        components: {
            HeaderVariant1,
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

    .health-check-confirmation-modal-desktop {
        .health-check-confirmation-modal-desktop__header {
            svg {
                .gst-svg-icon-2 {
                    fill: theme-color( 'white' );
                }
            }
        }
        
        .health-check-confirmation-modal-desktop__title {
            color: theme-color( 'white' );
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.1px;
        }

        .health-check-confirmation-modal-desktop__content {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .health-check-confirmation-modal-desktop__learn-more-btn {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: 0;
        }

        .health-check-confirmation-modal-desktop__ok-btn {
            padding: 16px 40px !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'bold' );
        }
    }
</style>
