import currencyFull from '@/core/filters/currencyFull';

export default function currencyAbbr ( currencyCode, options ) {
    return currencyFull( 0, currencyCode,  options ).replace( /\d./g, '' );
}
