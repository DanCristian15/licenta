import feeConstants from '@core/utils/constants/fee';
import {
    addSeconds as dateUtilsAddSeconds,
    differenceInSeconds as dateUtilsDifferenceInSeconds,
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';

const self = {
    getEventDates: ( { startDateTime, startDateTimeAt, timeOffset, endDateTimeAt, endDateTime, hasStartTime } ) => {
        let startDt = startDateTime;
        let endDt = endDateTime;
        const isOffset = Number.isInteger( timeOffset );

        if ( !startDt ) {
            if ( isOffset && startDateTimeAt ) {
                startDt = dateUtilsAddSeconds( dateUtilsParseDateString( startDateTimeAt ), timeOffset * 60 );
            }
        }
        if ( !endDt ) {
            if ( isOffset && endDateTimeAt ) {
                endDt = dateUtilsAddSeconds( dateUtilsParseDateString( endDateTimeAt ), timeOffset * 60 );
            } else if ( startDateTime && startDateTimeAt && endDateTimeAt ) {
                endDt = dateUtilsAddSeconds( dateUtilsParseDateString( endDateTimeAt ), dateUtilsDifferenceInSeconds( startDateTime, startDateTimeAt ) );
            }
        }

        return {
            startDateTime: startDt,
            startDateTimeAt: startDateTimeAt || null,
            timeOffset: timeOffset || null,
            endDateTimeAt: endDateTimeAt || null,
            endDateTime: endDt || null,
            hasStartTime: hasStartTime
        };
    },
    getOnSaleDateTimeUtc: ( value ) => {
        if ( value === undefined ) {
            return undefined;
        }

        return dateUtilsParseDateString( value );
    },
    hasStartTime: ( value ) => {
        if ( value ) {
            return ( value instanceof Date ) ? true : value.split( 'T' ).length > 1;
        }

        return false;
    },
    getShippingPrice: ( items ) => {
        return items
            .reduce( ( acc, item ) => {
                return [
                    ...acc,
                    ...item.charges
                ];
            }, [ ] )
            .filter( item => item.type === feeConstants.TYPES.DELIVERY )
            .reduce( ( acc, item ) => {
                return acc + item.fee;
            }, 0 );
    }
};

export default self;