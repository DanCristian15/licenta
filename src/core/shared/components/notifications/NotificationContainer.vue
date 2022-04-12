<template>
    <div v-if="hasNotification"
        :class="{
            'gst-notification-container-mobile': $vuetify.breakpoint.smAndDown
        }"
        class="gst-notification-container">
        <transition-group name="fade"
            tag="div"
            appear>
            <v-card
                v-for="item in items"
                :key="item.uid"
                :class="item.className"
                class="card card-body u-box-shadow">
                <v-container class="pt-4 pb-0" card-toolbar>
                    <v-row no-gutters style="flex-wrap: nowrap;" class="pt-0">
                        <v-flex shrink>
                            <component :is="item.icon" height="24" width="24" />
                        </v-flex>
                        <v-flex class="title">
                            {{ item.title }}
                        </v-flex>
                        <v-flex shrink>
                            <v-icon color="transparent" class="gst-close-icon-svg" @click="close(item)" v-text="'$vuetify.icons.close'" />
                        </v-flex>
                    </v-row>
                </v-container>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <v-card-text class="card-text" v-html="item.content" />
            </v-card>
        </transition-group>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import IconWarning from '@core/shared/assets/icons/alert/warning.svg';
    import IconSuccess from '@core/shared/assets/icons/alert/success.svg';
    import IconInfo from '@core/shared/assets/icons/alert/info.svg';
    import IconError from '@core/shared/assets/icons/alert/error.svg';

    export default {
        components: {
            /* eslint-disable vue/no-unused-components */
            IconWarning,
            IconSuccess,
            IconInfo,
            IconError
            /* eslint-enable vue/no-unused-components */
        },
        computed: {
            ...mapState( [ 'notification' ] ),
            ...mapGetters( {
                hasNotification: 'notification/hasNotification',
            } ),
            items( ) {
                return this.notification.items.filter( item => item.show );
            }
        },
        methods: {
            ...mapActions( {
                close: 'notification/close'
            } )
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    $error: theme-color( 'error' );
    $success: theme-color( 'success' );
    $warning: theme-color( 'warning' );
    $info: theme-color( 'info' );

    .gst-notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        font-family: 'Roboto', sans-serif;
        z-index: $z-index-notification;
    }

    .gst-notification-container-mobile {
        top: unset;
        left: 50%;
        right: unset;
        bottom: 20px;
        z-index: $z-index-notification;
        transform: translateX( -50% );
    }

    .gst-notification-container .card {
        display: block;
        border: 8px;
        margin-bottom: 20px;
        color: theme-color( 'quaternary' );
        max-width: 380px;

        svg {
            margin-top: -3px;
            margin-right: 8px;
        }

        button {
            margin-top: -3px;
        }

        .gst-close-icon-svg {
            ::v-deep .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }
    }

    .gst-notification-container .card.info {
        border-left: 4px solid $info;

        svg .gst-svg-icon {
            fill: $info;
        }
    }

    .gst-notification-container .card.danger {
        border-left: 4px solid $error;

        svg .gst-svg-icon {
            fill: $error;
        }
    }

    .gst-notification-container .card.warning {
        border-left: 4px solid $warning;

        svg .gst-svg-icon {
            fill: $warning;
        }
    }

    .gst-notification-container .card.success {
        border-left: 4px solid $success;

        svg .gst-svg-icon {
            fill: $success;
        }
    }

    .gst-notification-container .card-body {
        width: 380px;
        padding: 0;
    }

    .gst-notification-container .card-toolbar {
        padding: 16px 12px;
        font-size: font-size( 'l' );
        font-weight: font-weight( 'bold' );
        overflow: hidden;
    }

    .gst-notification-container .card-text {
        padding-top: 8px;
        padding-right: 8px;
        padding-left: 44px;
        font-size: font-size( 's' );
    }

    .gst-notification-container .notification-close {
        display: block;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.35s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    //customs
    .notification__card__payment-initiated {
        background-color: theme-color( 'warning' );
        color: theme-color( 'white' );
        border-color: theme-color( 'transparent' );
    }

</style>
