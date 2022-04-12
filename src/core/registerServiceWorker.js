/* eslint-disable no-console */

// const { LogService } = require( '@services' );

// import { register } from 'register-service-worker';

if ( process.env.NODE_ENV === 'production' ) {
    // register( `${process.env.BASE_URL}service-worker-brand`.js, {
    //     ready() {
    //        LogService.log(
    //             'App is being served from cache by a service worker.\n' +
    //       'For more details, visit https://goo.gl/AFskqB'
    //         );
    //     },
    //     registered() {
    //         LogService.log( 'Service worker has been registered.' );
    //     },
    //     cached() {
    //         LogService.log( 'Content has been cached for offline use.' );
    //     },
    //     updatefound() {
    //         LogService.log( 'New content is downloading.' );
    //     },
    //     updated() {
    //         LogService.log( 'New content is available; please     refresh.' );
    //         window.location.reload( true );
    //     },
    //     offline() {
    //         LogService.log( 'No internet connection found. App is running in offline mode.' );
    //     },
    //     error( error ) {
    //         LogService.error( 'Error during service worker registration:', error );
    //     }
    // } );
}
