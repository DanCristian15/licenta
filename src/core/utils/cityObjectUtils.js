export function isCity ( val ) {
    return val && ( ( val.name && val.countryCode ) || hasLocation( val ) );
}

export function hasCustomLocation ( val ) {
    return isCity( val ) && !val.existsInApi && hasLocation( val );
}

export function hasLocation ( val ) {
    return val.location && val.location.latitude && val.location.longitude;
}

export function hasCurrentLocation ( val ) {
    return val.location && val.location.current;
}

export function generateIdForCity( val ) {
    const cityName = val.name.split( ' ' ).join( '_' );

    if ( val.stateCode ) {
        return `${val.countryCode}_${val.stateCode}_${cityName}`;
    }

    return `${val.countryCode}_${cityName}`;
}

export function normalizeForFilter ( val ) {
    let ret = { };
    val.countryCode ? ret = { ...ret, countryCode: val.countryCode } : ret;
    val.name ? ret = { ...ret, name: val.name } : ret;
    val.stateCode ? ret = { ...ret, stateCode: val.stateCode } : ret;

    return ret;
}