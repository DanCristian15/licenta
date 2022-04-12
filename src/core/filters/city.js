
export default function city( { name, stateCode, countryCode }, showCountry = true ) {
    const values = showCountry ? [ name, stateCode, countryCode ] : [ name, stateCode ];

    return values
        .filter( value => value )
        .join( ', ' );
}