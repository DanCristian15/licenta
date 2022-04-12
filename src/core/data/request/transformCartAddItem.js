import { formatQueryParam as dateUtilsFormatQueryParam } from '@core/utils/dateUtils';

export default function ( ticket, hotelReservation, bundle ) {
    let ret = { };

    if ( ticket ) {
        const { eventId, offers, seats, row, section, accessibility, selection  } = ticket;
        ret = {
            ...ret,
            ticket: {
                items: [ {
                    productId: eventId,
                    offers,
                    section,
                    row,
                    seats,
                    accessibility,
                    selection
                } ]
            }
        };
    }

    if ( hotelReservation ) {
        const { hotel, accommodation, room  } = hotelReservation;
        const { rate } = room;

        ret = {
            ...ret,
            hotelRoom: {
                hotelId: hotel.id,
                stayRange: {
                    checkin: dateUtilsFormatQueryParam( accommodation.startDateTime ),
                    checkout: dateUtilsFormatQueryParam( accommodation.endDateTime ),
                },
                roomCriteria: {
                    roomCount: accommodation.roomsCount,
                    adultCount: accommodation.guests.adultsCount,
                    childCount: accommodation.guests.childrenCount,
                    childAges: accommodation.guests.childAges || [ ]
                },
                roomId: room.id,
                roomRate: {
                    rateId: rate.id,
                    currency: rate.currency,
                    inventory: rate.inventory,
                    amountBeforeTax: rate.amountBeforeTax,
                    amountAfterTax: rate.amountAfterTax,
                    mealPlan: rate.mealPlan,
                    fees: rate.fees.map( transformRoomRateFee ),
                    rateType: rate.type,
                    paymentType: rate.paymentType,
                    cancellationPolicies: rate.cancellationPolicies.map( item => {
                        return {
                            from: item._originalFromAt,
                            amount: item.amount,
                            percent: item.percent,
                            numberOfNights: item.numberOfNights
                        };
                    } )
                }
            }
        };
    }

    if ( bundle ) {
        ret = {
            ...ret,
            packageInfo: {
                id: bundle.id
            }
        };
    }

    return ret;
}


const transformRoomRateFee = ( { dateRange, fee } ) => {
    const { typeIncluded, ...rest } = fee;

    return {
        ...dateRange,
        fee: {
            included: typeIncluded,
            ...rest
        }
    };
};
