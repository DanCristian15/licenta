import i18next from 'i18next';
import dateConstants from '@core/utils/constants/date';
import dateFilter from '@core/filters/date';
import currencyFullFilter from '@/core/filters/currencyFull';
import cancellationPolicy from './cancellationPolicy';

export default function ( { current, futures }, currency, basePrice, accomodationNights ) {
    const currentPolicy = current || futures[0];
    let text = `${cancellationPolicy( currentPolicy, currency )}.`;

    if ( currentPolicy && !futures ) {
        const time =  dateFilter( currentPolicy.fromAt, dateConstants.FORMAT.TIME );
        const date =  dateFilter( currentPolicy.fromAt, dateConstants.FORMAT.UI_DATE );
        const amount = computeAmount( currentPolicy, basePrice, accomodationNights, currency );

        text += ` ${i18next.t( '_common:terms.freeCancellationCharge', { amount, date, time } )}.`;
    }

    if ( futures ) {
        for ( let index = 0; index < futures.length; index++ ) {
            const element = futures[index];
            const time =  dateFilter( element.fromAt, dateConstants.FORMAT.TIME );
            const date =  dateFilter( element.fromAt, dateConstants.FORMAT.UI_DATE );
            const amount = computeAmount( element, basePrice, accomodationNights, currency );

            text += ` ${i18next.t( '_common:terms.freeCancellationCharge', { amount, date, time } )}.`;
        }
    }

    return text;
}

function computeAmount( policy, basePrice, accomodationNights, currency ) {
    let amount = 0;

    if ( policy.amount ) {
        amount = currencyFullFilter( policy.amount, currency );
    }

    if ( policy.percent ) {
        amount = currencyFullFilter( basePrice * ( policy.percent / 100 ), currency );
    }

    if ( policy.numberOfNights ) {
        amount = currencyFullFilter( ( basePrice / accomodationNights ) * policy.numberOfNights, currency );
    }

    return amount;
}