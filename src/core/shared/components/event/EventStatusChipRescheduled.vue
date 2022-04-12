<template>
    <v-chip class="gst-event-status-chip__rescheduled" small>
        {{ $t('rescheduled') }}
    </v-chip>
</template>

<script>
    export default {
        name: 'EventStatusChipRescheduled',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.event.eventStatusChip'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-event-status-chip__rescheduled {
        background-color: rgba( theme-color-hex( 'event-status-chip-rescheduled' ), 0.1 ) !important;
        color: theme-color( 'event-status-chip-rescheduled' ) !important;
    }
</style>