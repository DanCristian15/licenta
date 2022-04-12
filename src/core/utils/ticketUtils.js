import ticketConstants from '@core/utils/constants/ticket';

export function getTypeFromOfferName ( name ) {
    if ( ( name || '' ).toLocaleLowerCase( ).indexOf ( ticketConstants.TYPES.RESALE ) !== -1 ) {
        return ticketConstants.TYPES.RESALE;
    }

    return ticketConstants.TYPES.STANDARD;
}

export function isResale ( value ) {
    return ( value || '' ).toLocaleLowerCase( ) === ticketConstants.TYPES.RESALE;
}

export function isStandard ( value ) {
    return ( value || '' ).toLocaleLowerCase( ) === ticketConstants.TYPES.STANDARD;
}