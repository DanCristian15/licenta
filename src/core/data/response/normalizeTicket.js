export function normalizeTicket( data ) {
    return {
        type: data.type || null,
        section: data.section || null,
        selection: data.selection || null,
        row: data.row || null,
        venueSeatMapUrl: data.snapshotImageUrl || null,
        area: data.area || null,
        seats: Array.isArray( data.seats ) ? data.seats : [ ],
        offers: Array.isArray( data.offers ) ? data.offers : [ ],
        accessibility: Array.isArray( data.accessibility ) ? data.accessibility : [ ],
    };
}