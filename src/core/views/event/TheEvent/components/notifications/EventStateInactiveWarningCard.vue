<template>
    <NotificationWarningCard
        :title="$t('title')"
        :message="$t('message')"
        class="gst-event-state-inactiv-warning-card" />
</template>

<script>
    import NotificationWarningCard from '@core/shared/components/notifications/NotificationWarningCard.vue';
    
    export default {
        name: 'EventStatusInactivWarningCard',
        components: {
            NotificationWarningCard
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.inactive'
        }
    };
</script>

<style lang="scss">
    $colorCard: #EE2E24;

    .gst-event-state-inactiv-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;

        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>