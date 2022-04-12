import i18next from 'i18next';
import { convertDistance } from '@core/utils/measureUtils';
import number from './number';

export default function distanceFrom ( distance, unitOfMeasure, from ) {
    const dist = convertDistance( distance, unitOfMeasure );

    return i18next.t(
        '_common:terms.distanceFrom', {
            distance: number( dist, '0,0.0' ),
            from,
            context: unitOfMeasure,
            interpolation:  { escapeValue: false }
        } );
}
