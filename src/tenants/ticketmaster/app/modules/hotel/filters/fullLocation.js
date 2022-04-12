export default function ( { address, cityName, stateCode, zipCode, countryCode  } ) {
    const zipState = [ stateCode || '', zipCode || '' ].filter( Boolean ).join( ' ' );

    return [ address, cityName, zipState, countryCode ].filter( Boolean ).join( ', ' );
}
