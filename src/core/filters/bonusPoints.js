import numberConstants from '@core/utils/constants/number';
import number from './number';

export default function bonusPoints( value ) {
    return number( value,  numberConstants.FORMAT.INTEGER  );
}
