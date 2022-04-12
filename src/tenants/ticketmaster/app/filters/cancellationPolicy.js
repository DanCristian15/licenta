import i18next from 'i18next';
import dateConstants from '@core/utils/constants/date';
import dateFilter from '@core/filters/date';
import currencyFullFilter from '@/core/filters/currencyFull';

export default function  ( cancellationPolicy, currency ) {
    if ( cancellationPolicy && cancellationPolicy.fromAt ) {
        const time =  dateFilter( cancellationPolicy.fromAt, dateConstants.FORMAT.TIME );
        const date =  dateFilter( cancellationPolicy.fromAt, dateConstants.FORMAT.UI_DATE );
        const amount = currencyFullFilter( cancellationPolicy.amount, currency );

        if ( new Date() >= new Date( cancellationPolicy.fromAt ) ) {
            return i18next.t( '_common:terms.freeCancellationCharge', { amount, date, time } );
        }

        return i18next.t(
            '_common:terms.freeCancellationBefore',
            {
                time,
                date
            }
        );
    } else {
        return i18next.t( '_common:terms.freeCancellation' );
    }
}