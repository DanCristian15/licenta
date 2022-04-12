import dateConstants from '@core/utils/constants/date';
import {
    format as dateUtilsFormat,
    parseString as dateUtilsParseString
} from '@core/utils/dateUtils';
import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';

export default function period( { startDate, endDate }, format = dateConstants.FORMAT.UI_DATE, language = documentUtilsGetLang( ) ) {
    let ret = '';

    ret += startDate ? dateUtilsFormat( dateUtilsParseString( startDate ), format, language ) : '';
    ret += endDate  ? ` - ${dateUtilsFormat( dateUtilsParseString( endDate ), format, language )}`: '';

    return ret;
}
