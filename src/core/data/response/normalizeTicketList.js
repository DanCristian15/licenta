import { normalizeTicket } from '@core/data/response/normalizeTicket';
import { normalizeOffer } from '@core/data/response/normalizeOffer';
import { normalizeTicketType } from '@core/data/response/normalizeTicketType';

export function normalizeTicketsList( data ) {
    return {
        eventDetails: {
            venueMapUrl: data.eventDetails.venueMapUrl,
            venueMapWithLabelsUrl: data.eventDetails.venueMapWithLabelsUrl,
        } || null,
        tickets: {
            items: Array.isArray( data.tickets.items ) ? data.tickets.items.map( ticket => normalizeTicket( ticket ) ) : [],
            totalCount: data.tickets.totalCount || 0
        },
        offers: Array.isArray( data.offers ) ? data.offers.map( offer => normalizeOffer( offer ) ) : [],
        ticketTypes: Array.isArray( data.ticketTypes ) ? data.ticketTypes.map( ticketType => normalizeTicketType( ticketType ) ) : []
    };
}