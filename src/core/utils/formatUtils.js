export function zipFormat ( value, countryCode ) {
    if ( countryCode === 'CA' ) {
        value = value.replace( /\s+/g, '' ).replace( /^(.{3})/g, '$1 ' ).toUpperCase();
        return value;
    }

    return value;
}