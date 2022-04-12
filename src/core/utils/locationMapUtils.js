export const getRouteToPoint = location => {
    const { street, city, stateCode, countryCode } = location;
    const query = encodeURIComponent( [ street, city, stateCode, countryCode ].filter( value => value ).join( ',' ) );
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
};

export const getRouteBetweenTwoPoints = ( from, to ) => {
    const originQuery = encodeURIComponent( [ from.street, from.city, from.stateCode, from.countryCode ].filter( value => value ).join( ',' ) );
    const destinationQuery = encodeURIComponent( [ to.street, to.city, to.stateCode, to.countryCode ].filter( value => value ).join( ',' ) );
    return `https://www.google.com/maps/dir/?api=1&origin=${originQuery}&destination=${destinationQuery}`;
};
