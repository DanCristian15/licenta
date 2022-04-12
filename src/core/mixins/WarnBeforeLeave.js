export const I18N_LEAVE_MESSAGE_KEY = '_common:messages.leaveRouteConfirm';

/**
 * can be used only on components that are declared in the routes
 */

const WarnBeforeLeave = {
    beforeRouteLeave ( to, from, next ) {
        if ( !this.warnBeforeLeaving ) {
            next( );
            return;
        }

        const answer = window.confirm( this.warnBeforeLeaveMessage );
        if ( answer ) {
            window.onbeforeunload = null;
            next( );
        } else {
            next( false );
        }
    },
    data() {
        return {
            warnBeforeLeaving: false,
            warnBeforeLeaveMessage: this.$t( I18N_LEAVE_MESSAGE_KEY )
        };
    },
    methods: {
        bindWarnBeforeYouLeaveMixin() {
            setTimeout( () => {
                const watchProps = this.$options.warnBeforeLeaveMixinOptions.watchData;
                for ( const prop of watchProps ) {
                    const disposer = this.$watch( prop, () => {
                        this.warnBeforeLeaving = true;
                    }, { deep: true } );

                    this.watcherDisposers.push( disposer );
                }
            }, 1000 );
        },
        unbindWarnBeforeYouLeaveMixin() {
            this.cleanWarnBeforeYouLeaveMixin( );
        },
        forceWarnBeforeLeaveMixin() {
            this.warnBeforeLeaving = true;
        },
        cleanWarnBeforeYouLeaveMixin() {
            for ( const disposer of this.watcherDisposers ) {
                disposer();
            }
            this.warnBeforeLeaving = false;
            window.onbeforeunload = null;
        },
    },
    created() {
        this.watcherDisposers = [];
        this.$watch( 'warnBeforeLeaving', ( newValue ) => {
            if ( newValue ) {
                window.onbeforeunload = () => this.warnBeforeLeaveMessage;
            }
            else {
                window.onbeforeunload = null;
            }
        } );
    },
    destroyed() {
        this.cleanWarnBeforeYouLeaveMixin( );
    }
};

export default WarnBeforeLeave;
