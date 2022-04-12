<template>
    <v-chip class="gst-event-status-chip__postponed" small>
        {{ $t('postponed') }}
    </v-chip>
</template>

<script>
    export default {
        name: 'EventStatusChipPostponed',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.event.eventStatusChip'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-event-status-chip__postponed {
        background-color: rgba( theme-color-hex( 'event-status-chip-postponed' ), 0.1 ) !important;
        color: theme-color( 'event-status-chip-postponed' ) !important;
    }
</style>