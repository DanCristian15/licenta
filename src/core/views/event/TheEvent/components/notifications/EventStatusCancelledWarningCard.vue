<template>
    <NotificationWarningCard
        :title="$t('title')"
        :message="$t('message')"
        class="gst-event-status-cancelled-warning-card" />
</template>

<script>
    import NotificationWarningCard from '@core/shared/components/notifications/NotificationWarningCard.vue';
    
    export default {
        name: 'EventStatusCancelledWarningCard',
        components: {
            NotificationWarningCard
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventStatus.cancelled'
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    $colorCard: #EE2E24;

    .gst-event-status-cancelled-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;

        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>