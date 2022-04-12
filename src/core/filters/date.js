import dateConstants from '@core/utils/constants/date';
import {
    format as dateUtilsFormat,
    parseString as dateUtilsParseString
} from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function date( value, format = dateConstants.FORMAT.UI_DATE, language = documentUtilsGetLang ( ) ) {
    if ( !value ) {
        return '';
    }
    if ( Object.prototype.toString.call( value ) === '[object Date]' ) {
        return dateUtilsFormat( value, format, language );
    }
    return dateUtilsFormat( dateUtilsParseString( value ), format, language );
}
