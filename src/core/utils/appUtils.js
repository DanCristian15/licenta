import appConstants from './constants/app';

/**
 * It will compare two version by level
 *
 * Example 3.0.1 and 3.0.2
 * It will compatible on level 1 and 2, but not on 3
 *
 * @param {string} version
 * @param {number} level
 */

export function isSameVersion ( version, level = 1 ) {
    try {
        const verArray = version.split( '.' ),
            appVerArray = appConstants.VERSION.split ( '.' );

        for ( let i = 0; i < Math.min( appVerArray.length, level ); i += 1 ) {
            if ( verArray[i] !== appVerArray[i] ) {
                return false;
            }
        }

        return true;
    } catch ( e ) {
        return false;
    }
}