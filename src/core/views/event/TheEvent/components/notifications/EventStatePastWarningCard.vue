<template>
    <NotificationWarningCard
        :title="$t('title')"
        :message="$t('message')"
        class="gst-event-state-past-warning-card" />
</template>

<script>
    import NotificationWarningCard from '@core/shared/components/notifications/NotificationWarningCard.vue';
    
    export default {
        name: 'EventStatusPastWarningCard',
        components: {
            NotificationWarningCard
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.past'
        }
    };
</script>

<style lang="scss">
    $colorCard: #0500F0;

    .gst-event-state-past-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;

        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>