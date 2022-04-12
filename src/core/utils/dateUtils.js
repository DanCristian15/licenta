import parseFns from 'date-fns/parse';
import formatFns from 'date-fns/format';
import isWithinIntervalFns from 'date-fns/isWithinInterval';
import isSameDayFns from 'date-fns/isSameDay';
import isSameMonthFns from 'date-fns/isSameMonth';
import isSameYearFns from 'date-fns/isSameYear';
import isThisYearFns from 'date-fns/isThisYear';
import isAfterFns from 'date-fns/isAfter';
import differenceInSecondsFns from 'date-fns/differenceInSeconds';
import addSecondsFns from 'date-fns/addSeconds';
import differenceInDaysFns from 'date-fns/differenceInDays';
import { fr, enUS }  from 'date-fns/locale';
import LogService from '@services/LogService';
import dateConstants from './constants/date';

const locales = { fr, enUS };
const getLocal = ( language ) => locales[ language ] ? locales[ language ] : enUS;

export function isValid ( date ) {
    return date.getTime( ) === date.getTime( );
}

export function parseDateString( value ) {
    if ( !value ) {
        return null;
    }

    if ( value instanceof Date ) {
        return value;
    }
    
    if ( value.includes( 'T' ) ) {
        return new Date( value );
    }

    return parseString( value );
}

export function parseString ( value, format = dateConstants.FORMAT.DEFAULT ) {
    if ( value instanceof Date ) {
        return value;
    }
    try {
        return parseFns( value, format, new Date( ) );
    } catch ( e ) {
        if ( process.env.NODE_ENV !== 'production' ) {
            LogService.warn( `Invalid date to process ${value} with format ${format}.` );
        }
        return null;
    }
}

export function format ( value, format, language ) {
    try {
        language || LogService.debug( `Language is missing.` );

        return formatFns( value, format, { locale: getLocal( language || 'en' ) } );
    } catch ( e ) {
        if ( process.env.NODE_ENV !== 'production' ) {
            LogService.warn( `Invalid date to process ${value} with format ${format}.` );
        }
        return '';
    }
}

export function formatQueryParam ( value, format = dateConstants.FORMAT.DEFAULT ) {
    return formatFns( parseString( value, format ), format );
}

export function isWithinInterval ( date, startDate, endDate ) {
    try {
        return isWithinIntervalFns( date, { start: startDate, end: endDate } );
    } catch ( e ) {
        if ( process.env.NODE_ENV !== 'production' ) {
            LogService.warn( `Invalid interval: ${JSON.stringify( date )} ${JSON.stringify( startDate )} ${JSON.stringify( endDate )}` );
        }
        return false;
    }
}

export function isAfter( date1, date2 ) {
    return isAfterFns( date1, date2 );
}
export function isSameDay( date1, date2 ) {
    return isSameDayFns( date1, date2 );
}
export function isSameMonth( date1, date2 ) {
    return isSameMonthFns( date1, date2 );
}
export function isSameYear( date1, date2 ) {
    return isSameYearFns( date1, date2 );
}
export function isThisYear( date ) {
    return isThisYearFns( date );
}

export function differenceInSeconds( date1, date2 ) {
    return differenceInSecondsFns( date1, date2 );
}

export function differenceInDays( date1, date2 ) {
    return differenceInDaysFns( date1, date2 );
}

export function addSeconds( date, seconds ) {
    return addSecondsFns( date, seconds );
}

export function addDays( date, days ) {
    return addSecondsFns( date, days * 24 * 60 * 60 );
}
