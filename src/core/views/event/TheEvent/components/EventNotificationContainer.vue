<template>
    <component :is="componentWarning" :event="event" />
</template>

<script>
    import eventConstants from '@core/utils/constants/event';
    import {
        isPast as eventUtilsIsPast,
        isSaleDatesInFuture as eventUtilsIsSaleDatesInFuture
    } from '@core/utils/eventUtils';
    import EventStateNoDateWarningCard from './notifications/EventStateNoDateWarningCard';
    import EventStateOnSaleDateFutureWarningCard from './notifications/EventStateOnSaleDateFutureWarningCard';
    import EventStatePastWarningCard from './notifications/EventStatePastWarningCard';
    import EventStatusCancelledWarningCard from './notifications/EventStatusCancelledWarningCard';
    import EventTicketStatusNotAvailableWarningCard from './notifications/EventTicketStatusNotAvailableWarningCard';
    import EventStateInactiveWarningCard from './notifications/EventStateInactiveWarningCard';

    export default {
        name: 'EventNotificationContainer',
        components: {
            /* eslint-disable vue/no-unused-components */
            EventStateNoDateWarningCard,
            EventStateOnSaleDateFutureWarningCard,
            EventStatePastWarningCard,
            EventStatusCancelledWarningCard,
            EventTicketStatusNotAvailableWarningCard,
            EventStateInactiveWarningCard
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            event: {
                type: Object,
                default: null
            }
        },
        computed: {
            componentWarning( ) {
                const { ticketsStatus, eventStatus, startDateTimeAt, onSaleStartDateTimeAt, active } = this.event;

                if ( !active ) {
                    return EventStateInactiveWarningCard; 
                } else if ( eventStatus === eventConstants.EVENT_STATUS.CANCELLED ) {
                    return EventStatusCancelledWarningCard;
                } else if ( eventUtilsIsPast( this.event ) ) {
                    return EventStatePastWarningCard;
                } else if ( ticketsStatus === eventConstants.TICKETS_STATUS.NOT_AVAILABLE ) {
                    return EventTicketStatusNotAvailableWarningCard; 
                } else if ( eventUtilsIsSaleDatesInFuture( this.event ) ) {
                    return EventStateOnSaleDateFutureWarningCard;
                } else if ( !startDateTimeAt || !onSaleStartDateTimeAt ) {
                    return EventStateNoDateWarningCard;
                } else {
                    return null; 
                }
            }
        }
    };
</script>