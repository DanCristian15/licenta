import i18next from 'i18next';
import dateConstants from '@core/utils/constants/date';
import {
    isSameDay as dateUtilsIsSameDay,
    isSameYear as dateUtilsIsSameYear,
    format as dateUtilsFormat
} from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function datePeriod(
    startDate,
    endDate,
    {
        format = { full: dateConstants.FORMAT.FULL, period: dateConstants.FORMAT.PERIOD, periodFull: dateConstants.FORMAT.PERIOD_FULL, time: dateConstants.FORMAT.TIME },
        language = documentUtilsGetLang(),
        hasStartTime = false
    } = { }, ) {
    const isSameDay = dateUtilsIsSameDay( startDate, endDate );
    const isSameYear = dateUtilsIsSameYear( startDate, endDate );
    const timeFormated = dateUtilsFormat( startDate, format.time, language );
    let dateFormated = dateUtilsFormat( startDate, format.full, language );

    if ( endDate ) {
        if ( isSameYear ) {
            if ( !isSameDay ) {
                const startDateFormated = dateUtilsFormat( startDate, format.period, language );
                const endDateFormated = dateUtilsFormat( endDate, format.periodFull, language );
                dateFormated = `${startDateFormated} - ${endDateFormated}`;
            }
        } else {
            const startDateFormated = dateUtilsFormat( startDate, format.periodFull, language );
            const endDateFormated = dateUtilsFormat( endDate, format.periodFull, language );
            dateFormated = `${startDateFormated} - ${endDateFormated}`;
        }
    }

    if ( hasStartTime ) {
        return i18next.t( '_common:terms.dateAndTimeAt', {
            date: dateFormated,
            time: timeFormated
        } );
    }

    return dateFormated;
}