import i18next from 'i18next';
import dateConstants from '@core/utils/constants/date';
import { format as dateUtilsFormat } from '@core/utils/dateUtils';
import { getLang as documentGetLang } from '@core/utils/documentUtils';

export default function dateFull( value, format = { date: dateConstants.FORMAT.FULL, time: dateConstants.FORMAT.TIME }, language = documentGetLang( ) ) {
    return i18next.t( '_common:terms.dateAndTimeAt', {
        date: `${dateUtilsFormat( value, format.date, language )}`,
        time: `${dateUtilsFormat( value, format.time, language )}`
    } );
}