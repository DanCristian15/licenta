import i18next from 'i18next';
import BundleProductsModel from '@tenant/app/models/BundleProductsModel';

export default function ( bundle = new BundleProductsModel( ) ) {
    const ret = [ ];
    const quantity = bundle.getQuantity( );

    if ( quantity.roomsCount ) {
        ret.push( i18next.t( '_common:terms.roomWithCount', { count: quantity.roomsCount } ) );
    }
    if ( quantity.nights ) {
        ret.push( i18next.t( '_common:terms.nightWithCount', { count: quantity.nights } ) );
    }
    if ( quantity.guests.adultsCount ) {
        ret.push( i18next.t( '_common:terms.adultWithCount', { count: quantity.guests.adultsCount } ) );
    }
    if ( quantity.guests.childrenCount ) {
        ret.push( i18next.t( '_common:terms.childrenWithCount', { count: quantity.guests.childrenCount } ) );
    }
    if ( quantity.tickets ) {
        ret.push( i18next.t( '_common:terms.ticketWithCount', { count: quantity.tickets } ) );
    }

    return ret.join( ', ' );
}
