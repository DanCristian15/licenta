<template>
    <v-card class="py-3 pl-2 pr-4 gst-event-health-check-warning-card-variant-1">
        <v-flex d-flex flex-row>
            <v-flex d-flex flex-column align-center shrink class="pr-2">
                <IconHealthCheck class="gst-event-health-check-warning-card-variant-1__health-check-icon" />
            </v-flex>
            <v-flex d-flex flex-row flex-column>
                <h6 class="gst-event-health-check-warning-card-variant-1__title quaternary--text pb-2">
                    {{ title }}
                </h6>
                <span
                    class="gst-event-health-check-warning-card-variant-1__message tertiary--text pb-2">
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
                        <IconDropDownArrow class="ml-1 u-rotate-90-n" />
                    </v-btn>
                </div>
            </v-flex>
        </v-flex>
    </v-card>
</template>

<script>
    import IconHealthCheck from '@core/shared/assets/icons/health_checked.svg';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import EventHealthCheckWarningCardMixin from './mixins/EventHealthCheckWarningCardMixin';

    export default {
        name: 'EventHealthCheckWarningCardVariant1',
        components: {
            IconHealthCheck,
            IconDropDownArrow
        },
        mixins: [
            EventHealthCheckWarningCardMixin
        ]
    };
</script>

<style scoped lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-health-check-warning-card-variant-1 {
        border-radius: border-radius( 's' ) !important;
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
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }

        .gst-event-health-check-warning-card-variant-1__learn-more-btn {
            padding: 0;
            color: theme-color( 'event-health-check' );
            font-size: font-size( 's' );
            letter-spacing: -0.14px;

            .gst-svg-icon {
                fill: theme-color( 'event-health-check' );
            }
        }
    }

    .gst-event-health-check-warning-card-variant-1.v-card:not(.v-sheet--outlined) {
        box-shadow: 0 1px 4px 1px rgba( theme-color-hex( 'tertiary' ), 0.35 );
    }

</style>
