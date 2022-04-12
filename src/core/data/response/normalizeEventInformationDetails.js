import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

export function normalizeEventInformationDetails( data ) {
    const details = {
        info: !isEmpty( data.info ) ? data.info : null,
        pleaseNote: !isEmpty( data.pleaseNote ) ? data.pleaseNote : null,
        ticketLimit: !isEmpty( data.ticketLimit ) ? data.ticketLimit : null,
        boxOfficeInfo: !isEmpty( data.boxOfficeInfo ) ? data.boxOfficeInfo : null,
        parkingDetail: !isEmpty( data.parkingDetail ) ? data.parkingDetail : null,
        accessibleSeatingDetail: !isEmpty( data.accessibleSeatingDetail ) ? data.accessibleSeatingDetail : null,
        generalRule: !isEmpty( data.generalRule ) ? data.generalRule : null,
        childRule: !isEmpty( data.childRule ) ? data.childRule : null
    };

    return pickBy( details, value => value !== null );
}