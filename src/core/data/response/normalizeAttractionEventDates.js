import isEmpty from 'lodash/isEmpty';
import { parseDateString as dateUtilsParseDateString } from '@core/utils/dateUtils';

export function normalizeAttractionEventDates( data ) {
    return {
        city: !isEmpty( data.city ) ? data.city : null,
        date: dateUtilsParseDateString( data.date )
    };
}