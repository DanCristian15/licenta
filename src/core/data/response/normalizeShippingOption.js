import isEmpty from 'lodash/isEmpty';

export function normalizeShippingOption( data ) {
    return {
        id: data.id || null,
        carrier: data.carrier || null,
        serviceLevel: data.serviceLevel || null,
        requiresAddress: data.requiresAddress || false,
        description: !isEmpty( data.description ) ? {
            short: data.description.short,
            long: data.description.long
        } : {
            short: null,
            long: null
        },
        totals: !isEmpty( data.totals ) ? {
            currencyCode: data.totals.currencyCode,
            fee: data.totals.fee,
            tax: data.totals.tax
        } : {
            currencyCode: null,
            fee: null,
            tax: null
        },
        destinationRegion: data.destinationRegion || null
    };  
}