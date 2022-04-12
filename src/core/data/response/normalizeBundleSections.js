export function normalizeBundleSections( data ) {
    return Array.isArray( data.sections ) ? data.sections.map( data => {
        return {
            section: data.section || null,
            minPrice: data.minPrice || 0,
            currency: data.currency || null,
            packageOffersIds: data.packages || [ ],
            venueSeatMapUrl: data.snapshotImageUrl || '',
        };
    } ) : [];
}
