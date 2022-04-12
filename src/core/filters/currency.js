import numberConstants from '@core/utils/constants/number';
import number from './number';

/**
 * Currency value for 'en-US' locale ( no manipulation of the data ) 
 * @param {Number} value
 * @param {String} currency
 * @param {Object} options
 */
export default function currencyFilter( value, currency, options = { format: numberConstants.FORMAT.DEFAULT }  ) {
    const { format, ...optionsRest } = options;

    try {
        if ( !currency ) {
            return number ( value, format );
        } else {
            return new Intl.NumberFormat( 'en-US', { style: 'currency', currency, ...optionsRest } ).format( value );
        }
    } catch {
        return number ( value );
    }
}
