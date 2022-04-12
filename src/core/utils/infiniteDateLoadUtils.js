/**
 *
 * This is a function that will try to make multiple calls if the items that are not valid.
 * Note: This was done for TMH-218
 * It can be used on the problem that we have on the TM ( we receive tickets without offers )
 * Example: page 1 return 5 items but only 4 are value, then it will try to fetch the next page and only add
 * in the final list the first element that is valid.
 *
 * @param {*} callFetchFn - real fetch data. Needs to return { success, list }
 * @param {*} isItemValidFn - check if the item needs to be added on the list or need to be skipped
 * @param {*} { offset, limit }
 * @returns {}
 */
export const infiniteDateLoad  = async ( callFetchFn, isItemValidFn, { offset, limit } ) => {
    let finalList = [ ];
    let allItemsLoaded = false;
    let realOffset = offset;
    let realLimit = limit * 2 + 1;
    let lastResponse = {
        success: true,
        list: [ ]
    };
    let response;

    while ( ( finalList.length < limit ) && !allItemsLoaded ) {
        response = await callFetchFn( realOffset, realLimit );

        if ( response.success ) {
            const responseList = response.list;
            for ( let i = 0; i < responseList.length; i++ ) {
                if ( isItemValidFn( responseList[ i ] ) ) {
                    finalList.push( responseList[ i ] );
                }
                if ( finalList.length >= limit ) {
                    break;
                }
            }
            if ( responseList.length !== realLimit ) {
                allItemsLoaded = true;
            }
            realOffset = realOffset + responseList.length;
        } else {
            allItemsLoaded = true;
        }
    }

    return {
        list: finalList,
        allItemsLoaded,
        offset: realOffset,
        lastResponse: lastResponse || response
    };
};