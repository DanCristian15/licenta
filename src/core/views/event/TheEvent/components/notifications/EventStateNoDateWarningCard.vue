<template>
    <NotificationWarningCard
        :title="$t('title')"
        :message="$t('message')"
        class="gst-event-state-no-date-warning-card" />
</template>

<script>
    import NotificationWarningCard from '@core/shared/components/notifications/NotificationWarningCard.vue';
    
    export default {
        name: 'EventStateNoDateWarningCard',
        components: {
            NotificationWarningCard
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.noDate'
        },
        props: {
            event: {
                type: Object,
                default: null
            }
        }
    };
</script>

<style lang="scss">
    $colorCard: #8800F0;

    .gst-event-state-no-date-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;
        
        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>