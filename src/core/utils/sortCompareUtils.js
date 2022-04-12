export function sortCompare( firstItem, secondItem, ascendingOrder = true ) {
    if ( typeof firstItem === 'string' ) {
        return sortCompareString( firstItem, secondItem, ascendingOrder );
    }

    else if ( typeof firstItem === 'number' ) {
        return sortCompareNumbers( firstItem, secondItem, ascendingOrder );
    }
}

export function sortCompareString( firstItem, secondItem, ascendingOrder ) {
    if ( ascendingOrder ) {
        return firstItem.localeCompare( secondItem );
    }

    return secondItem.localeCompare( firstItem );
}

export function sortCompareNumbers( firstNumber, secondNumber, ascendingOrder ) {
    if ( ascendingOrder ) {
        return firstNumber - secondNumber;
    }
}