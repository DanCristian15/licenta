<template>
    <NotificationWarningCard
        raised
        :title="$t('title')"
        :message="$t('message')"
        class="gst-event-ticket-status-not-available-warning-card" />
</template>

<script>
    import NotificationWarningCard from '@core/shared/components/notifications/NotificationWarningCard.vue';
    
    export default {
        name: 'EventTicketStatusNotAvailableWarningCard',
        components: {
            NotificationWarningCard
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventTicketStatus.notAvailable'
        }
    };
</script>

<style lang="scss">
    $colorCard: #F80445;

    .gst-event-ticket-status-not-available-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;

        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>