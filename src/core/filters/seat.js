import i18next from 'i18next';

export default function ( { seats }, options = { joinChar: ' & ' } ) {
    let ret = '';

    if ( seats ) {
        if ( seats.length ) {
            ret = seats.join( options.joinChar );
        } else {
            ret = `${i18next.t( '_common:entities.seat.noSeats' )}`;
        }
    }

    return ret;
}