export function normalizeOffer( data ) {
    return {
        id: data.id || null,
        ticketTypeId: data.ticketTypeId || null,
        name: data.name || '',
        currency: data.currency || null,
        loyaltyCurrency: data.loyaltyCurrency || null,
        basePrice: data.basePrice || 0,
        totalPrice: data.totalPrice || 0,
        pointsEarned: data.pointsEarned || 0,
        earnRate: data.earnRate || 0,
        redeemPoints: data.redeemPoints || 0,
        limitMin: data.limitMin || 0,
        limitMax: data.limitMax || 0
    };
}