<template>
    <v-flex 
        d-flex
        flex-row
        align-center
        align-self-center
        class="gst-event-ticket-status-few-available-warning-card py-2 px-3">
        <IconClockFull class="gst-event-ticket-status-few-available-warning-card__clock-full-icon" />
        <div class="flex-grow-1">
            {{ $t( 'message') }}
        </div>
        <v-icon
            class="gst-event-ticket-status-few-available-warning-card__close-icon ml-4"
            color="transparent" 
            @click="$emit('close')"
            v-text="'$vuetify.icons.close'" />
    </v-flex>
</template>

<script>
    import IconClockFull from '@core/shared/assets/icons/clock_full.svg';

    export default {
        name: 'EventTicketLimitedAvailabilityWarningCard',
        components: {
            IconClockFull
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventTicketStatus.fewAvailable'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    $colorCard: map-get-strict( $theme-colors-hex, 'event-status-chip-rescheduled' );

    .gst-event-ticket-status-few-available-warning-card {
        @include border-radius( 'm' );

        border: 1px solid rgba( $colorCard, 0.2 );
        background-color: rgba( $colorCard, 0.1 );
        color: $colorCard;
        font-size: font-size( 's' );
        font-weight: font-weight( 'bold' );
        letter-spacing: -0.7px;

        .gst-event-ticket-status-few-available-warning-card__clock-full-icon,
        ::v-deep .gst-event-ticket-status-few-available-warning-card__close-icon {
            .gst-svg-icon {
                fill: $colorCard;
            }
        }
    }
</style>