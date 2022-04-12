import { NOTIFICATION_TYPES, NOTIFICATION_TIMEOUT, createItem, createConfig } from './helper';

const notification = {
    name: 'notification',
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        hasNotification: state => {
            return state.items.length !== 0;
        }
    },
    mutations: {
        notify( state, item ) {
            state.items = [ ];
            state.items.push( item );
        },
        close( state, item ) {
            let uid = item.uid;
            state.items.forEach( i => {
                if ( i.uid === uid ) {
                    i.show = false;
                }
            } );
        },
        remove( state, item ) {
            const uid = item.uid;
            state.items = state.items.filter( function( item ) {
                return item.uid !== uid;
            } );
        }
    },
    actions: {
        notify( context, item ) {
            context.commit( 'notify', item );
        },
        close( context, item ) {
            context.commit( 'close', item );
            setTimeout( function() {
                context.commit( 'remove', item );
            }, NOTIFICATION_TIMEOUT.CLEANUP );
        },
        error( context, payload ) {
            let item = createItem( createConfig( payload, NOTIFICATION_TYPES.DANGER ) );
            context.dispatch( 'notify', item ).then( () => {
                context.dispatch( 'autoClose', item );
            } );
        },
        success( context, payload ) {
            let item = createItem( createConfig( payload, NOTIFICATION_TYPES.SUCCESS ) );

            context.dispatch( 'notify', item ).then( () => {
                context.dispatch( 'autoClose', item );
            } );
        },
        info( context, payload ) {
            let item = createItem( createConfig ( payload, NOTIFICATION_TYPES.INFO  ) );

            context.dispatch( 'notify', item ).then( () => {
                context.dispatch( 'autoClose', item );
            } );
        },
        warning( context, payload ) {
            let item = createItem( createConfig( payload, NOTIFICATION_TYPES.WARNING ) );

            context.dispatch( 'notify', item ).then( () => {
                context.dispatch( 'autoClose', item );
            } );
        },
        custom( context, payload ) {
            let item = createItem( createConfig( payload, NOTIFICATION_TYPES.CUSTOM ) );

            context.dispatch( 'notify', item ).then( () => {
                context.dispatch( 'autoClose', item );
            } );
        },
        autoClose( context, item ) {
            if ( item.autoDismiss ) {
                setTimeout( function( ) {
                    context.dispatch( 'close', item );
                }, NOTIFICATION_TIMEOUT.FADEOUT );
            }
        },
    }
};

export default notification;
