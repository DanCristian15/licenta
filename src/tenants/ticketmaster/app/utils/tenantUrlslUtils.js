import tenantUrlsConstants from '@tenant/app/utils/constants/tenantUrls';
import { getSetting as getSettingStorageUtils, saveSetting as saveSettingStorageUtils } from '@core/utils/storageUtils';

export function redirectToHome( ) {
    window.location.href = tenantUrlsConstants.home;
}

export function redirectToReferrerUrl() {
    const referrerUrl = getSettingStorageUtils( 'gstReferrerUrl' );
    if ( referrerUrl && isUrlFromTenant( referrerUrl ) ) {
        window.location.href = referrerUrl;
    } else {
        window.location.href = tenantUrlsConstants.home;
    }
}

export function saveReferrerUrl() {
    const referrerUrl = document.referrer;
    if ( referrerUrl && isUrlFromTenant( referrerUrl ) ) {
        const expireTime = 10 * 60 * 1000; // 10 minutes
        saveSettingStorageUtils( 'gstReferrerUrl', referrerUrl, expireTime );
    }
}

export function isUrlFromTenant( url ) {
    return url.includes( 'ticketmaster' );
}

export function redirectToSearch( value ) {
    window.location.href = `${tenantUrlsConstants.search}?q=${value}`;
}

export function openTicketMasterLoginPage() {
    window.open( tenantUrlsConstants.ticketMasterLogin, '_blank' );
}