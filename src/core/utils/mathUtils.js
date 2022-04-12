export function getNearestUpperMultiple ( number, multiplier ) {
    return Math.ceil( number/multiplier ) * multiplier;
}