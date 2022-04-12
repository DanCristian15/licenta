<template>
    <v-card
        class="gst-event-info-modal rounded-">
        <HeaderVariant1
            :show-close-icon="false"
            class="gst-event-info-modal__header">
            <h5 class="gst-event-info-modal__title ml-2">
                {{ $t( 'title' ) }}
            </h5>
        </HeaderVariant1>
        <v-divider class="gst-event-info-modal__divider" />
        <HealthCheckTextBody :health-check="healthCheck" />
        <v-divider class="mt-2 gst-event-info-modal__divider" />
        <v-card-actions class="pa-6 flex-row-reverse">
            <BaseButton
                class="gst-event-info-modal__ok-btn"
                @click="$emit( 'close' )">
                {{ $t( '_common:buttons.iAgree') }}
            </BaseButton>
        </v-card-actions>
    </v-card>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import HeaderVariant1 from '@core/shared/components/modals/layout/HeaderVariant1.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import HealthCheckTextBody from '../HealthCheckTextBody';

    export default {
        name: 'HealthCheckModal',
        components: {
            HeaderVariant1,
            BaseButton,
            HealthCheckTextBody
        },
        mixins: [
            CloseModalOnRouteChangeMixin
        ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.healthCheckConfirmationModal'
        },
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

    .gst-event-info-modal {
        position: relative;
        border-radius: 8px !important;

        .gst-event-info-modal__header {
            background-color: theme-color( 'white' ) !important;
            color: theme-color( 'quaternary' );

            svg {
                .gst-svg-icon-2 {
                    fill: theme-color( 'white' );
                }
            }
        }

        .gst-event-info-modal__title {
            @include font-size('xxxxl');
            @include font-weight('large');

            letter-spacing: -0.1px;
            text-transform: capitalize;
        }

        .gst-event-info-modal__ok-btn {
            @include font-size('s');
            @include font-weight('bold');

            padding: 9px 12px !important;
            background-color: theme-color( 'primary' ) !important;
            color: theme-color( 'white' );
            text-transform: capitalize;
            border-radius: 2px;
        }

        .gst-event-info-modal__divider {
            border-color: theme-color( 'quinary' );
        }
    }

    @include mobile-only {
        .gst-event-info-modal {
            .gst-event-info-modal__title {
                @include font-size('l');
            }
        }
    }
</style>
