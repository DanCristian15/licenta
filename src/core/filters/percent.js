import numeral from 'numeral';
import numberConstants from '@core/utils/constants/number';

export default function percent( value, format = numberConstants.FORMAT.PERCENT  ) {
    return `${numeral( value ).format( format )}%`;
}