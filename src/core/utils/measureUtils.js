import { DISTANCE } from '@core/utils/constants/measure';
import number from '@core/filters/number';

const { UNIT, RATE } = DISTANCE;

export function getDistanceUnitOfMeasureForCountry( countryCode ) {
    switch( countryCode ) {
    case 'US':
    case 'UK':
        return DISTANCE.UNIT.MILES;
    default:
        return DISTANCE.UNIT.KM;
    }
}


/**
 * @param {Number|String} distance - distance value
 * @param { UNIT.MILES }  unitTo - the unit in which the distance should be converted
 * @returns {String}
 */
export function convertDistance( distance, unitTo = UNIT.MILES ) {
    const distanceParsed = Number.parseFloat( distance );

    if( isNaN( distance ) ) {
        return '';
    }

    if( unitTo === UNIT.MILES ) {
        return number( distanceParsed / RATE.KM_FROM_MILE, '0,0.0' );
    }

    return distance;
}
