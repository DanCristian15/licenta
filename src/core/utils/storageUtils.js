import appConstants from './constants/app';
import {
    isSameVersion as appUtilsIsSameVersion
} from './appUtils';

export function saveSetting( setting, value, ttl ) {
    if ( ttl ) {
        const now = new Date();
        value = {
            value: value,
            _expire: now.getTime() + ttl,
        };
    }
    localStorage.setItem( setting, JSON.stringify( value ) );
}

export function getSetting ( setting ) {
    try {
        const storedValue = localStorage.getItem( setting );
        if ( !storedValue ) {
            return null;
        }
        const value = JSON.parse( storedValue );
        const now = new Date();

        if ( value._expire && now.getTime() > value._expire ) {
            localStorage.removeItem( setting );
            return null;
        }

        return value;
    } catch ( e ) {
        return null;
    }
}

export function saveSettingWithAppVersion ( setting, value ) {
    saveSetting( setting, { version: appConstants.VERSION, value } );
}

export function getSettingSameAppVersion ( setting, versionLevel = 2 ) {
    const data = getSetting ( setting );

    return data && data.version && appUtilsIsSameVersion( data.version, versionLevel ) ? data.value : null;
}