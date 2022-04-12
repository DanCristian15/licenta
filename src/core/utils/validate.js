export function zipCA ( value ) {
    return !!value.match( /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/ ) || !!value.match( /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/ );
}

export function phoneNumber ( value ) {
    return !!value.match( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ );
}

export function cardNumber ( value ) {
    const cleanValue = value && value.replace( /\D/g, '' ) || '';
    let sum = 0;
    let shouldDouble = false;

    for ( let index = cleanValue.length - 1; index >= 0; index-- ) {
        let digit = parseInt( cleanValue.charAt( index ) );

        if ( shouldDouble ) {
            if ( ( digit *= 2 ) > 9 ) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return ( sum % 10 ) === 0;
}

export function cardExpirationDate( value ) {
    if ( !value ) {
        return true;
    }

    if ( value && value.includes( '/' ) ) {
        const now = new Date();
        const expirationDate = new Date();
        const month = value.split( '/' )[0];
        const year = value.split( '/' )[1];

        if ( month > 0 && month < 13 ) {
            expirationDate.setFullYear( `20${year}`, month, 1 );

            return now < expirationDate;
        }
    }

    return false;
}
