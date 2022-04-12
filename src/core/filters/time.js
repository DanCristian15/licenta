import dateConstants from '@core/utils/constants/date';
import { format as dateUtilsFormat } from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function time( value, format = dateConstants.FORMAT.TIME, language = documentUtilsGetLang( ) ) {
    return dateUtilsFormat( value, format, language );
}
