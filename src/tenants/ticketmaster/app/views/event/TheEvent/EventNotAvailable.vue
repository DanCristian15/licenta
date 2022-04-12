<template>
    <div class="gst-event-not-available">
        <div class="gst-event-not-available__body d-flex align-center justify-center">
            <component :is="componentWarning" :event="event" />
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="gst-event-not-available__footer mt-4 mx-4" v-html="$t( 'footer.content')">
        </div>
    </div>
</template>

<script>
    import EventStatusCancelledWarning from '@tenant/app/static/TheEvent/EventNotAvailable/EventStatusCancelledWarning';
    import eventConstants from '@core/utils/constants/event';
    import {
        isPast as eventUtilsIsPast,
        isSaleDatesInFuture as eventUtilsIsSaleDatesInFuture
    } from '@core/utils/eventUtils';
    import EventStateInactiveWarning from './EventNotAvailable/EventStateInactiveWarning';
    import EventStatePastWarning from './EventNotAvailable/EventStatePastWarning';
    import EventTicketStatusNotAvailableWarning from './EventNotAvailable/EventTicketStatusNotAvailableWarning';
    import EventStateOnSaleDateFutureWarning from './EventNotAvailable/EventStateOnSaleDateFutureWarning';
    import EventStateNoDateWarning from './EventNotAvailable/EventStateNoDateWarning';
    import EventPackageOffersNotAvailableWarning from './EventNotAvailable/EventPackageOffersNotAvailableWarning';

    export default {
        name: 'EventNotAvailable',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventNotAvailable'
        },
        components: {
            /* eslint-disable vue/no-unused-components */
            EventStatusCancelledWarning,
            EventStateInactiveWarning,
            EventStatePastWarning,
            EventStateOnSaleDateFutureWarning,
            EventStateNoDateWarning,
            EventPackageOffersNotAvailableWarning
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            event: {
                type: Object,
                required: true
            },
            isPackageOffersNotAvailable: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            componentWarning( ) {
                const { ticketsStatus, eventStatus, startDateTimeAt, onSaleStartDateTimeAt, active } = this.event;
                const { isPackageOffersNotAvailable } = this;

                if ( !active ) {
                    return EventStateInactiveWarning;
                } else if ( eventStatus === eventConstants.EVENT_STATUS.CANCELLED ) {
                    return EventStatusCancelledWarning;
                } else if ( eventUtilsIsPast( this.event ) ) {
                    return EventStatePastWarning;
                } else if ( ticketsStatus === eventConstants.TICKETS_STATUS.NOT_AVAILABLE ) {
                    return EventTicketStatusNotAvailableWarning;
                } else if ( eventUtilsIsSaleDatesInFuture( this.event ) ) {
                    return EventStateOnSaleDateFutureWarning;
                } else if ( !startDateTimeAt || !onSaleStartDateTimeAt ) {
                    return EventStateNoDateWarning;
                } else if ( isPackageOffersNotAvailable ) {
                    return EventPackageOffersNotAvailableWarning;
                } else {
                    return null;
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-not-available {
        .gst-event-not-available__body {
            @include font-weight('large');
            @include line-height('xxxxxxl');

            width: 100%;
            padding: 48px 25% 32px;
            background: #262626;
            color: theme-color( 'white' );
            min-height: 136px;
            text-align: center;

            .gst-event-not-available__title {
                @include font-weight('large');
                @include line-height('xxxxxxl');

                margin-bottom: 16px;
                font-size: font-size( 'xxxxl' ) + 2;
            }

            .gst-event-not-available__content {
                @include font-size('s');
                @include font-weight('large');
                @include line-height('xxxl');
            }

            p {
                margin-bottom: 16px;
            }
        }

        .gst-event-not-available__footer {
            @include font-size('s');
            @include font-weight('regular');
            @include line-height('xl');

            color: #696966;
            text-align: center;
        }
    }

    @include mobile-only {
        .gst-event-not-available {
            .gst-event-not-available__body {
                @include font-size( 'xxxl' );
                @include line-height( 'xxxxl' );

                padding: 42px 10%;
                min-height: 160px;

                .gst-event-not-available__title {
                    @include line-height('xxxxl');

                    font-size: font-size( 'xxxl' );
                }

                .gst-event-not-available__footer {
                    @include font-size('xxs');
                    @include line-height('xxxl');
                }
            }
        }
    }
</style>