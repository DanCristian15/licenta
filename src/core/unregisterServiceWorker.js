/* eslint-disable no-console */

const { LogService } = require( '@core/services' );

/**
 * Old service worker before branding
 * We need to delete the old service worker
 */

if ( process.env.NODE_ENV === 'production' ) {
    navigator.serviceWorker.getRegistrations( )
        .then( registrations => {
            let found = false;
            LogService.log( 'Trying to find any SW' );
            registrations.forEach( sw => {
                sw.unregister( );
                found = true;
            } );
            if ( found ) {
                LogService.log( 'SW Found reloading...' );
                setTimeout( ( ) => {
                    window.location.reload( true );
                }, 1000 );
            } else {
                LogService.log( 'SW not found' );
            }
        } );
}
