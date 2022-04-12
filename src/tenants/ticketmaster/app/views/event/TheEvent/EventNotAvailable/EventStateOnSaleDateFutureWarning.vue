<template>
    <div>
        <h5 class="gst-event-not-available__title">
            {{ $t( 'title' ) }}
        </h5>
        <div class="gst-event-not-available__content">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
    import {
        isSameDay as dateUtilsIsSameDay,
        differenceInSeconds as dateUtilsDifferenceInSeconds
    } from '@core/utils/dateUtils';

    export default {
        name: 'EventStateOnSaleDateFutureWarningCard',
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.onSaleDateFuture'
        },
        props: {
            event: {
                type: Object,
                default: null
            }
        },
        computed: {
            message( ) {
                const { onSaleStartDateTimeAt } = this.event;
                const now = new Date( );

                if ( !dateUtilsIsSameDay( now, onSaleStartDateTimeAt ) ) {
                    return this.$t( 'messageWithDate', { 
                        date: this.$options.filters.date( onSaleStartDateTimeAt, 'MMM dd, yyyy HH:mm:ss' ) 
                    } );
                }

                return this.$t( 'messageWithTime', { 
                    time:  this.$options.filters.date( 
                        new Date( 0, 0, 0, 0, 0, dateUtilsDifferenceInSeconds( onSaleStartDateTimeAt, now ) ),
                        'HH:mm:ss'
                    )
                } );
            }
        }
    };
</script>

<style lang="scss">
    $colorCard: #2199A0;

    .gst-event-state-on-sale-date-future-warning-card.gst-notification-warning-card {
        border-left: 4px solid $colorCard;

        svg .gst-svg-icon {
            fill: $colorCard;
        }
    }
</style>