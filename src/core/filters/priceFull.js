import i18next from 'i18next';
import  currencyFilter from './currencyFull';

export default function priceFull( { basePrice, totalPrice, currency } ) {
    let ret = '';

    if ( basePrice !== totalPrice ) {
        ret+= currencyFilter( basePrice, currency ) ;
        ret+=' + ' + currencyFilter( totalPrice - basePrice, currency ) + ' ' + i18next.t( '_common:terms.feeWithTaxes_plural' );
    } else {
        ret = currencyFilter( basePrice, currency ) + ', ' + i18next.t( '_common:terms.includingTaxes' );
    }

    return ret;
}
