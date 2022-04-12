export function normalizeBundleDetails( data ) {
    return {
        eventDetails: {
            venueMapUrl: data.eventDetails.venueMapUrl || '',
            venueMapWithLabelsUrl: data.eventDetails.venueMapWithLabelsUrl || '',
        },
        packageDetails: {
            description: data.packageDetails.description || '',
            available: data.packageDetails.available || false
        }
    };
}
