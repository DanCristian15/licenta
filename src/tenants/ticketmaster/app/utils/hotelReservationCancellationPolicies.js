export const getTimeline = ( hotelCancellationPolicies ) => {
    let current = null;
    let futures = null;

    if ( !hotelCancellationPolicies.length ) {
        return { current, futures };
    }

    if ( hotelCancellationPolicies.length === 1 ) {
        current = hotelCancellationPolicies[0];
        return { current, futures };
    }

    const chronologicallySortedPolicies = [ ...hotelCancellationPolicies ].sort( ( a, b ) => new Date( a.fromAt ) - new Date( b.fromAt ) );

    for ( let index = 0; index < chronologicallySortedPolicies.length ; index++ ) {
        const element = chronologicallySortedPolicies[index];

        if ( new Date( element.fromAt ) < new Date() ) {
            current = element;
            futures = chronologicallySortedPolicies.slice( index + 1 );
            break;
        } else {
            futures = Array.isArray( futures ) ? [ ...futures, element ] : [ element ];
        }
    }

    return {
        current,
        futures,
    };
};