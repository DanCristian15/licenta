import numeral from 'numeral';
import numberConstants from '@core/utils/constants/number';

export default function number( value, format = numberConstants.FORMAT.DEFAULT  ) {
    return numeral( value ).format( format );
}
