import environmentConstants from '@/core/utils/constants/environment';

export function getType() {
    const hostname = window.location.hostname;

    if ( hostname.includes( 'ui.test' ) ) {
        return environmentConstants.TYPES.TEST;
    } else if ( hostname.includes( 'ui.uat' ) ) {
        return environmentConstants.TYPES.UAT;
    } else if ( hostname.includes( 'ui.prod' ) ) {
        return environmentConstants.TYPES.PRODUCTION;
    } else {
        return environmentConstants.TYPES.LOCALHOST;
    }
}

export function isProduction() {
    const hostname = window.location.hostname;

    return hostname === hostname.includes( 'ui.prod' );
}
