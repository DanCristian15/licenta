import numberConstants from '@core/utils/constants/number';
import number from './number';

/**
 * Currency value for 'en-US' locale plus the currency value
 * Example:
 * - 1000 Canadian Dollars: $100 CAD
 * - 1000 US Dollars: $100 USD
 * - 1000 Euro: E100 EUR
 * @param {Number} value
 * @param {String} currency
 * @param {Object} options
 */
export default function currencyFullFilter( value, currency, options = { format: numberConstants.FORMAT.DEFAULT }  ) {
    const { format, ...optionsRest } = options;

    try {
        if ( !currency ) {
            return number ( value, format );
        } else {
            let ret = new Intl.NumberFormat( 'en-US', { style: 'currency', currency, ...optionsRest } ).format( value );
            let arrayRet = ret.split( '$' );

            if ( arrayRet.length > 1 ) {
                return `$${arrayRet[1]} ${currency}`;
            } else {
                return `${ret} ${currency}`;
            }
        }
    } catch {
        return number ( value );
    }
}
