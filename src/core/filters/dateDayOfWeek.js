import dateConstants from '@core/utils/constants/date';
import { format as dateUtilsFormat } from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function dateDayOfWeek( value, format = dateConstants.FORMAT.DAY_OF_WEEK, language = documentUtilsGetLang( ) ) {
    return dateUtilsFormat( value, format, language );
}
