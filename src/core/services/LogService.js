/* eslint-disable no-console */

/**
 * TODO ( ionutt )
 * If you want to suppress base on the environment, we should show
 * the console from PWA SW, so the last arguments of this function should be
 * thread as an "force" parameter.
 */

import appConstants from '@core/utils/constants/app';

export default {
    log() {
        appConstants.SUPPRESS_LOGS || console.log.apply( null, arguments );
    },
    debug( ) {
        appConstants.SUPPRESS_LOGS || console.debug.apply( null, arguments );
    },
    warn( ) {
        appConstants.SUPPRESS_LOGS || console.warn.apply( null, arguments );
    },
    error( ) {
        appConstants.SUPPRESS_LOGS || console.error.apply( null, arguments );
    },
    critical( ) {
        appConstants.SUPPRESS_LOGS || console.critical.apply( null, arguments );
    }
};
