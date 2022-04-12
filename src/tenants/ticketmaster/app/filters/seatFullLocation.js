import i18next from 'i18next';

export default function seatFullLocation ( { section, row, seats } ) {
    let ret = [ ];

    if( section ) {
        ret.push ( `${i18next.t( '_common:entities.seat.section_abv' )} ${section}` );
    }

    if( row ) {
        ret.push ( `${i18next.t( '_common:terms.row' )} ${row}` );
    }

    if( Array.isArray( seats ) && seats.length ) {
        ret.push(  seats.length > 1 ?
            `${i18next.t( '_common:terms.seat_plural' )} ${seats[0]} - ${seats[seats.length - 1]}` :
            `${i18next.t( '_common:terms.seat' )}${seats[0]}` );
    } else {
        ret.push ( i18next.t( '_common:entities.seat.noSeats' ) );
    }

    return ret.join( ', ' );
}
