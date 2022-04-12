<template>
    <component :is="chipComponent" class="gst-event-status-chip" />
</template>

<script>
    import eventConstants from '@core/utils/constants/event';
    import EventStatusChipCancelled from '@core/shared/components/event/EventStatusChipCancelled.vue';
    import EventStatusChipPostponed from '@core/shared/components/event/EventStatusChipPostponed.vue';
    import EventStatusChipRescheduled from '@core/shared/components/event/EventStatusChipRescheduled.vue';

    export default {
        name: 'EventStatusChip',
        components: {
            /* eslint-disable vue/no-unused-components */
            EventStatusChipCancelled,
            EventStatusChipPostponed,
            EventStatusChipRescheduled
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            status: {
                type: String,
                default: null
            }
        },
        computed: {
            chipComponent( ) {
                if ( this.status === eventConstants.EVENT_STATUS.CANCELLED ) {
                    return EventStatusChipCancelled;
                }
                if ( this.status === eventConstants.EVENT_STATUS.POSTPONED ) {
                    return EventStatusChipPostponed;
                }
                if ( this.status === eventConstants.EVENT_STATUS.RESCHEDULED ) {
                    return EventStatusChipRescheduled;
                }
                return '';
            }
        }
    };
</script>

<style lang="scss">
    .gst-event-status-chip {
        height: auto !important;
        padding: 4px 8px !important;
    }

    .gst-event-status-chip span {
        line-height: 13px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>