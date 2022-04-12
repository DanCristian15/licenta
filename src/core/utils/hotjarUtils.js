import hotjarConstants from '@/core/utils/constants/hotjar';
import environmentConstants from '@/core/utils/constants/environment';
import {
    getType as environmentUtilsGetType
} from './environmentUtils';

export function getSiteId( environmentType ) {
    switch ( environmentType ) {
    case environmentConstants.TYPES.TEST:
        return hotjarConstants.SITE_ID.TEST;
    case environmentConstants.TYPES.UAT:
        return hotjarConstants.SITE_ID.UAT;
    case environmentConstants.TYPES.PRODUCTION:
        return hotjarConstants.SITE_ID.UAT;
    default:
        return hotjarConstants.SITE_ID.LOCALHOST;
    }
}

export function getConfig() {
    const environmentType = environmentUtilsGetType();
    const isProduction = environmentType !== environmentConstants.TYPES.LOCALHOST;
    const siteId = getSiteId( environmentType );

    const config = {
        id: siteId,
        isProduction: isProduction
    };

    return config;
}