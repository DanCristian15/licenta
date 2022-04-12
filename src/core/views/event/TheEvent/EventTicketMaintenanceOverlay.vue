<template>
    <!-- eslint-disable vue/no-v-html  -->
    <v-overlay class="gst-event-tickets-maintenance-overlay"
        :absolute="absolute"
        :dark="dark"
        :light="light"
        :color="color"
        :opacity="opacity"
        :value="value">
        <v-flex class="gst-event-tickets-maintenance-overlay__content d-flex flex-column justify-center" align-center>
            <img :src="iconSrc" height="72px" class="mb-8" />
            <p v-html="$t( 'message' )"></p>
            <BaseButton class="mt-5"
                :placeholder="$t('_common:buttons.backToHome')"
                :to="'/'" />
        </v-flex>
    </v-overlay>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import imageConstants from '@core/utils/constants/imagePaths';

    export default {
        name: 'EventTicketMaintenanceOverlay',
        components: {
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventTicketsMaintenanceOverlay'
        },
        props: {
            absolute: {
                type: Boolean,
                default: true
            },
            dark: {
                type: Boolean,
                default: false
            },
            light: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: '#FFFFFF'
            },
            opacity: {
                type: [ String, Number ],
                default: '0.8'
            },
            value: {
                type: Boolean,
                default: true
            }
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

.gst-event-tickets-maintenance-overlay {
    ::v-deep .v-overlay__scrim {
        backdrop-filter: blur( 10px );
    }

    .gst-event-tickets-maintenance-overlay__content {
        max-width: 275px;
        text-align: center;

        p {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
        }
    }
}
</style>