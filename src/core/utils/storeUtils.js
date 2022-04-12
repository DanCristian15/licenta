import storeConstants from './constants/store';

export function isStoreOutDated ( timestamp, refreshTime = storeConstants.REFRESH_TIME ) {
    let now = new Date( ).getTime( );

    if ( now - timestamp > refreshTime ) {
        return true;
    }
    return false;
}