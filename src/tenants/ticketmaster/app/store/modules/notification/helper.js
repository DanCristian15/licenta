import i18next from  'i18next';

export const NOTIFICATION_TYPES = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    CUSTOM: 'custom'
};

export const NOTIFICATION_ICONS = {
    DANGER: 'IconError',
    SUCCESS: 'IconSuccess',
    WARNING: 'IconWarning',
    INFO: 'IconInfo',
    CUSTOM: 'IconWarning'
};

export const NOTIFICATION_TIMEOUT = {
    CLEANUP: 61 * 1000,
    FADEOUT: 10 * 1000
};

export function createItem( config ) {
    return {
        content: config.content,
        type: config.type,
        title: config.title,
        className: config.className,
        autoDismiss: config.autoDismiss,
        icon: config.icon,
        uid: Math.random( )
            .toString( 36 )
            .substr( 2, 9 ),
        show: true
    };
}

export function createConfig ( payload, type ) {
    let config = Object.assign(
        { autoDismiss: true },
        ( typeof payload === 'object' ) ? payload: { content: payload },
        { type: type }
    );

    switch ( config.type ) {
    case NOTIFICATION_TYPES.SUCCESS: {
        config.title = config.title || i18next.t( '_common:notificationTitles.success' );
        config.className = 'success';
        config.icon = NOTIFICATION_ICONS.SUCCESS;
        break;
    }
    case NOTIFICATION_TYPES.DANGER: {
        config.title = config.title || i18next.t( '_common:notificationTitles.error' );
        config.className = 'danger';
        config.icon = NOTIFICATION_ICONS.DANGER;
        break;
    }
    case NOTIFICATION_TYPES.WARNING: {
        config.title = config.title || i18next.t( '_common:notificationTitles.warning' );
        config.className = 'warning';
        config.icon = NOTIFICATION_ICONS.WARNING;
        break;
    }
    case NOTIFICATION_TYPES.INFO: {
        config.title = config.title || i18next.t( '_common:notificationTitles.info' );
        config.className = 'info';
        config.icon = NOTIFICATION_ICONS.INFO;
        break;
    }
    case NOTIFICATION_TYPES.CUSTOM: {
        config.icon = NOTIFICATION_ICONS.WARNING;
        break;
    }
    default: {
        throw 'Unhandled notification type';
    }
    }

    return config;
}
