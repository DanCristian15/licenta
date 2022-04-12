import city from './city';

export default function venueInfoLocation( venueInfoLocation ) {
    const { name, street, city: cityName, stateCode, countryCode } = venueInfoLocation;

    let ret = '';
    !name || ( ret+= `${name.trim()} - ` );
    !street || ( ret+= `${street.trim()}, ` );
    ret += city( { name: cityName, stateCode, countryCode } );

    return ret;
}
