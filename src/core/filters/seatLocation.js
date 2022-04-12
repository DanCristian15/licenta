import i18next from 'i18next';

export default function ( { section, row } ) {
    let ret = '';

    if ( section ) {
        ret = `${i18next.t( '_common:entities.seat.section_abv' )} ${section}`;
    }

    if ( row ) {
        ret+= `${ret ? ', ': ''} ${i18next.t( '_common:entities.seat.row' )} ${row}`;
    }

    return ret;
}
