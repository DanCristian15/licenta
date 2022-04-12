import { providers } from './constants/card';

export const getCardProvider = ( cardNumber ) => {
    if ( providers.visa.regex.test( cardNumber ) ) {
        return providers.visa.name;
    }

    if ( providers.mastercard.regex.test( cardNumber ) ) {
        return providers.mastercard.name;
    }

    if ( providers.americanExpress.regex.test( cardNumber ) ) {
        return providers.americanExpress.name;
    }

    if ( providers.discover.regex.test( cardNumber ) ) {
        return providers.discover.name;
    }

    if ( providers.jcb.regex.test( cardNumber ) ) {
        return providers.jcb.name;
    }

    if ( providers.maestro.regex.test( cardNumber ) ) {
        return providers.maestro.name;
    }

    if ( providers.dinersClub.regex.test( cardNumber ) ) {
        return providers.dinersClub.name;
    }

    return '';
};