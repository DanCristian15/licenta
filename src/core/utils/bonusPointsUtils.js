export function calculate ( price = 0, quantity = 1 ) {
    return Math.floor( price * quantity * 10 );
}

export function calculateBonusPointsRedeem ( amount, rate ) {
    return Math.ceil( amount * rate );
}

export function calculateBonusPointsEarn ( amount, orderFee, rate ) {
    const priceForPoints = amount - orderFee;

    return priceForPoints > 0 ? priceForPoints * rate : 0;
}

export function calculatePointsRemainingFromTotal ( total, amount, rate ) {
    return Math.ceil ( ( total - amount ) * rate );
}

export function calculateAmountRemainingFromTotal ( total, points, rate ) {
    const ret = total - ( points / rate );

    return ret > 0 ? Math.round( ( ret ) * 1e12 ) / 1e12 : 0;
}
