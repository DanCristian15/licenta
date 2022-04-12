import i18next from  'i18next';
import apiConstants from './constants/api';

export function getFromApiResponse ( { title, message, status, code }, customMessage = null ) {
    if ( code && i18next.exists( `_common:messageServerErrorCodes.${code}.title` ) && i18next.exists( `_common:messageServerErrorCodes.${code}.detail` ) ) {
        return {
            title: i18next.t( `_common:messageServerErrorCodes.${code}.title` ),
            content: i18next.t( `_common:messageServerErrorCodes.${code}.detail` )
        };
    }

    if ( code && i18next.exists( `_common:messageServerErrorCodes.${code}` ) ) {
        return {
            content: i18next.t( `_common:messageServerErrorCodes.${code}` )
        };
    }

    if ( status === apiConstants.STATUS.INTERNAL_SERVER_ERROR ) {
        return customMessage ? { content: customMessage } : { content: message || i18next.t( '_common:messages.internalError' )  };
    }

    return {
        title: title === message ? '' : title,
        content: message || title
    };
}