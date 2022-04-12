export function normalizeTicketType( data ) {
    return {
        id: data.ticketTypeId || null,
        ticketTypeId: data.ticketTypeId || null,
        sellableQuantities: Array.isArray( data.sellableQuantities ) ? data.sellableQuantities : [],
        name: data.name || ''
    };
}