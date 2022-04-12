import i18next from 'i18next';
import roomRateFee  from '@core/utils/constants/roomRateFee';
import percentFilter from '@core/filters/percent';
import currencyFilter  from '@core/filters/currencyFull';

export default function ( { name = '', amount = 0, amountType, chargeType },  currency ) {
    let ret = '';

    if( amountType === roomRateFee.AMOUNT_TYPES.PERCENT ) {
        ret+= `${percentFilter( amount ) }`;
    } else {
        ret+= `${currencyFilter( amount, currency ) }`;
    }
    ret+=` ${name}`;
    ret+=` ${i18next.t( '_common:entities.roomRateFee.chargeTypes.' + chargeType ) }`;

    return ret;
}