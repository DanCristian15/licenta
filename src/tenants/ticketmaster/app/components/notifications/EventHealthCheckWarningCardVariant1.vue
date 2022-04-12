<template>
    <v-card class="gst-event-health-check-warning-card-variant-1">
        <v-flex d-flex flex-row>
            <v-flex d-flex flex-column align-center shrink class="pr-2">
                <IconHealthCheck class="gst-event-health-check-warning-card-variant-1__health-check-icon" />
            </v-flex>
            <v-flex d-flex flex-row flex-column>
                <h6 class="gst-event-health-check-warning-card-variant-1__title quaternary--text pb-2">
                    {{ title }}
                </h6>
                <span
                    class="gst-event-health-check-warning-card-variant-1__message pb-2">
                    {{ message }}
                </span>
                <div>
                    <v-btn
                        v-if="learnMoreUrl"
                        text
                        small
                        shrink
                        class="gst-event-health-check-warning-card-variant-1__learn-more-btn text-capitalize"
                        target="_blank"
                        :href="learnMoreUrl">
                        {{ $t( '_common:buttons.learnMore') }}
                    </v-btn>
                </div>
            </v-flex>
        </v-flex>
    </v-card>
</template>

<script>
    import IconHealthCheck from '@tenant/app//assets/icons/health_cross.svg';
    import EventHealthCheckWarningCardMixin from '@core/shared/components/notifications/mixins/EventHealthCheckWarningCardMixin';

    export default {
        name: 'EventHealthCheckWarningCardVariant1',
        components: {
            IconHealthCheck
        },
        mixins: [
            EventHealthCheckWarningCardMixin
        ]
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-health-check-warning-card-variant-1 {
        @include border-radius('s');

        padding-left: theme-spacing( 8 );
        background-color: theme-color( 'primary-lighten-1' ) !important;
        color: theme-color( 'quaternary' );
        border-left: 4px solid theme-color( 'event-health-check' );

        .gst-event-health-check-warning-card-variant-1__health-check-icon {
            height: 24px;
            width: 24px;
        }

        .gst-event-health-check-warning-card-variant-1__title {
            line-height: 24px;
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
            vertical-align: middle;
        }

        .gst-event-health-check-warning-card-variant-1__message {
            line-height: line-height( 'l' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
        }

        .gst-event-health-check-warning-card-variant-1__learn-more-btn {
            padding: 0;
            color: theme-color( 'primary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            letter-spacing: -0.14px;

            .gst-svg-icon {
                fill: theme-color( 'event-health-check' );
            }
        }
    }

    .gst-event-health-check-warning-card-variant-1.v-card:not(.v-sheet--outlined) {
        box-shadow: 0 1px 4px 1px rgba( theme-color-hex( 'primary' ), 0.52 );
    }

    @include mobile-only {
        .gst-event-health-check-warning-card-variant-1 {
            padding: theme-spacing( 4, 4, 4, 2 );
        }
    }
</style>
