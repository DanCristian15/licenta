import dateConstants from '@core/utils/constants/date';
import { format as dateUtilsFormat } from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function dateMonth( value, format = dateConstants.FORMAT.MONTH, language = documentUtilsGetLang( ) ) {
    return dateUtilsFormat( value, format, language );
}
