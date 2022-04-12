import {
    isSameMonth as dateUtilsIsSameMonth,
    isSameYear as dateUtilsIsSameYear,
    format as dateUtilsFormat
} from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function reservationDatePeriod( startDate, endDate, format = { period: 'd', periodDiffMonth: 'd MMM', periodFull: 'd MMM yyyy', time: 'p' }, language = documentUtilsGetLang( ) ) {

    const isSameMonth = dateUtilsIsSameMonth( startDate, endDate );
    const isSameYear = dateUtilsIsSameYear( startDate, endDate );


    if ( !isSameYear ) {
        const startDateFormated = dateUtilsFormat( startDate, format.periodFull, language );
        const endDateFormated = dateUtilsFormat( endDate, format.periodFull, language );
        return `${startDateFormated} - ${endDateFormated}`;
    }

    if ( !isSameMonth ) {
        const startDateFormated = dateUtilsFormat( startDate, format.periodDiffMonth, language );
        const endDateFormated = dateUtilsFormat( endDate, format.periodFull, language );
        return `${startDateFormated} - ${endDateFormated}`;
    }
    
    const startDateFormated = dateUtilsFormat( startDate, format.period, language );
    const endDateFormated = dateUtilsFormat( endDate, format.periodFull, language );
    return `${startDateFormated} - ${endDateFormated}`;
}