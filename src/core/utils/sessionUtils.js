import uuid from 'uuid-random';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'gst-session-id';

export function generateSessionId( ) {
    return uuid( ) + '-' + new Date( ).getTime( );
}

export function getSessionId( ) {
    const cookie = Cookies.get( COOKIE_NAME );

    if ( cookie ) {
        Cookies.set( COOKIE_NAME, cookie, { expires: 10 * 365 } );
        return cookie;
    } else {
        const sessionId = generateSessionId( );
        Cookies.set( COOKIE_NAME, sessionId, { expires: 10 * 365 } );

        return sessionId;
    }
}

export function hasSessionId( ) {
    return !!Cookies.get( COOKIE_NAME );
}
