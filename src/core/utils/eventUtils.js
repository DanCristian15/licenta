import eventConstants from '@core/utils/constants/event';
import dateConstants from '@core/utils/constants/date';
import {
    isAfter as dateUtilsIsAfter,
    isWithinInterval as dateUtilsIsWithinInterval
} from '@core/utils/dateUtils';

export function hasTicketAvailable ( event ) {
    const { ticketsStatus, startDateTimeAt, onSaleStartDateTimeAt, eventStatus, active } = event;

    return active
            && eventStatus !== eventConstants.EVENT_STATUS.CANCELLED
            && !isPast( event )
            && ticketsStatus !== eventConstants.TICKETS_STATUS.NOT_AVAILABLE
            && !isSaleDatesInFuture( event )
            && onSaleStartDateTimeAt
            && startDateTimeAt;
}

export function isPast ( event ) {
    const { startDateTimeAt, endDateTimeAt } = event;
    const now = new Date( );

    if ( endDateTimeAt ) {
        return dateUtilsIsAfter( now, endDateTimeAt );
    }
    if ( startDateTimeAt ) {
        return dateUtilsIsAfter( now, startDateTimeAt );
    }

    return false;
}

export function isSaleDatesInFuture ( event ) {
    const { onSaleStartDateTimeAt } = event;

    return !!( onSaleStartDateTimeAt && dateUtilsIsAfter( onSaleStartDateTimeAt, new Date( ) ) ); 
}

export function isSaleDatesInProgress ( event ) {
    const { onSaleStartDateTimeAt, onSaleEndDateTimeAt } = event;

    if ( onSaleStartDateTimeAt ) {
        return dateUtilsIsWithinInterval( 
            new Date( ),
            onSaleStartDateTimeAt,
            onSaleEndDateTimeAt || new Date( dateConstants.INFINITE_DATE )
        );
    }

    return false;
}
