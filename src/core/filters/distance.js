import i18next from 'i18next';
import { convertDistance } from '@core/utils/measureUtils';
import number from './number';

/**
 * Convert distance unit and return the formatted number ( distance should be in km)
 * @param {Number|String} distance - distance value
 * @param {UNIT.MILES}    to - the unit in which the distance should be converted
 * @returns {String}
 */
export default function distance ( distance, to ) {
    const dist = convertDistance( distance, to );

    return i18next.t(
        '_common:terms.distance', {
            distance: number( dist, '0,0.0' ),
            context: to,
        } );
}
