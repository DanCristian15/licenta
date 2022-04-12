<template>
    <v-chip class="gst-event-status-chip__cancelled" small>
        {{ $t('cancelled') }}
    </v-chip>
</template>

<script>
    export default {
        name: 'EventStatusChipCancelled',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.event.eventStatusChip'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-event-status-chip__cancelled {
        background: rgba( theme-color-hex( 'event-status-chip-cancelled' ), 0.1 ) !important;
        color: theme-color( 'event-status-chip-cancelled' ) !important;
    }
</style>