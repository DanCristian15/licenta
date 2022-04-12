import isEmpty from 'lodash/isEmpty';
import shippingConstants from '@/core/utils/constants/shipping';

export function filterOnlyForCountry( items = [], country = '' ) {
    return items.filter( item => {
        if ( !isEmpty( item.destinationRegion ) ) {
            let isExcluded;
            let isIncluded;

            if ( item.destinationRegion.allCountriesExcluding ) {
                isExcluded = !!Object.keys( item.destinationRegion.allCountriesExcluding ).find( value => value === country );
            }
            if ( item.destinationRegion.includeCountries ) {
                isIncluded = !!( Object.keys( item.destinationRegion.includeCountries ).find( value => value === country ) );
            }

            return ( isIncluded === true || isExcluded === false ) ? item : false;
        } else {
            return item;
        }
    } );
}

export function filterByCountries( items = [], countries = [] ) {
    let res = [];
    countries.map( value => {
        let resCountry = filterOnlyForCountry( items, value );
        res = res.concat( resCountry );
        res = [ ...new Map( res.map( item => [ item.id, item ] ) ).values() ];
    } );

    return res;
}

export function sort( items = [ ] ) {
    const getSortOrder = ( a ) => {
        switch ( a.serviceLevel ) {
        case shippingConstants.OPTIONS.SERVICE_LEVEL.ETICKET:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.ETICKET;
        case shippingConstants.OPTIONS.SERVICE_LEVEL.MOBILE:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.MOBILE;
        case shippingConstants.OPTIONS.SERVICE_LEVEL.MOBILETICKET:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.MOBILETICKET;
        case shippingConstants.OPTIONS.SERVICE_LEVEL.DIGITAL:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.DIGITAL;
        case shippingConstants.OPTIONS.SERVICE_LEVEL.TICKETFAST:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.TICKETFAST;
        default:
            return shippingConstants.OPTIONS.SERVICE_LEVEL_SORT.OTHER;
        }
    };

    const arr = [ ...items ];

    arr.sort( ( a, b ) =>  {
        if ( getSortOrder ( a ) < getSortOrder ( b ) ) return -1;
        if ( getSortOrder ( a ) > getSortOrder ( b ) ) return 1;
        return 0;
    } );

    return arr;
}

export function isElectronicTicketItem( item ) {
    return item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.ETICKET
    || item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.MOBILE
    || item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.MOBILETICKET
    || item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.DIGITAL
    || item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.TICKETFAST;
}

export function findOneElectronicTicketItem( items = [ ] ) {
    return items.find( item => isElectronicTicketItem( item ) );
}

export function findOneNonElectronicTicketItem( items = [ ] ) {
    return items.find( item => !isElectronicTicketItem( item ) );
}

export function findOneItemWithFees( items = [ ] ) {
    return items.find( item => item.totals.fee );
}

export function isMobileTicket( item ) {
    return item.serviceLevel === shippingConstants.OPTIONS.SERVICE_LEVEL.MOBILE;
}