import numeral from 'numeral';
import numberConstants from './constants/number';

export function format ( value, currencySymbol, format = numberConstants.FORMAT ) {
    return  numeral( value ).format( currencySymbol + format );
}

export function getSymbol ( currency ) {
    try {
        return new Intl.NumberFormat( 'en-US', { style: 'currency', currency, currencyDisplay:'narrowSymbol' } )
            .formatToParts( 1 )
            .map( val => val.value )[ 0 ];
    } catch {
        return currency;
    }
}
