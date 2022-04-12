/**
 *
 * @param {*} address - string | object. If object we need to find { address, cityName
 *                      zipCode, stateCode, countryCode }
 * @param {*} cityName
 * @param {*} zipCode
 * @param {*} stateCode
 * @param {*} countryCode
 */
export default function normalize( address, cityName, zipCode, stateCode, countryCode ) {
    if ( typeof address === 'object' ) {
        return {
            address:        address.address,
            cityName:       address.cityName,
            zipCode:        address.zipCode,
            stateCode:      address.stateCode,
            countryCode:    address.countryCode
        };
    }
    return {
        address,
        cityName,
        zipCode,
        stateCode,
        countryCode
    };
}