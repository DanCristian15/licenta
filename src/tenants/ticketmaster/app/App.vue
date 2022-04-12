<template>
    <v-app>
        <component :is="layout">
            <router-view />
            <v-overlay :value="loadingOverlay" color="white" opacity="0.8" z-index="5002">
                <DataLoading size="40" />
            </v-overlay>
        </component>
        <div id="modals_container"></div>
        <NotificationContainer />
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapGetters, mapState } from 'vuex';
    import DefaultLayout from '@tenant/app/layouts/Default.vue';
    import BlankLayout from '@tenant/app/layouts/Blank';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import NotificationContainer from '@core/shared/components/notifications/NotificationContainer';
    import { saveReferrerUrl } from '@tenant/app/utils/tenantUrlslUtils';
    import viewportConstants from '@core/utils/constants/viewport';
    import { setMetaViewport as viewportUtilsSetMetaViewport } from '@core/utils/viewportUtils';

    Vue.component( 'default-layout', DefaultLayout );
    Vue.component( 'blank-layout', BlankLayout );


    const STORE_SEARCH_STATE = 'searchState';
    const DEFAULT_LAYOUT = 'default';

    export default {
        name: 'App',
        components: {
            NotificationContainer,
            DataLoading
        },
        computed: {
            ...mapGetters( {
                userEmail: 'user/profile/email',
            } ),
            ...mapState( {
                initialSearch: state => state[STORE_SEARCH_STATE].initial,
                loadingOverlay: state => state['appState'].loading
            } ),
            layout( ) {
                const layout = this.$route.meta.layout || DEFAULT_LAYOUT;

                if ( layout.toLocaleLowerCase( ) === 'blank' ) {
                    return 'blank-layout';
                }

                return 'default-layout';
            }
        },
        methods: {
            ...mapActions( {
                getUserProfile:                     'user/profile/get',
                instantDeleteAllCartsIfExpired:     'cart/deleteAllIfExpired',
                instantDeleteCurrentCart:           'cart/instantDeleteCurrentCart',
                getUserCurrentLocation:             'user/location/getCurrentLocation'
            } ),
            showModal( to ) {
                const modalConfig = to.meta.modalConfig;
                const platformModalConfig = this.$vuetify.breakpoint.mdAndUp ? modalConfig.configDesktop : modalConfig.configMobile;
                const defaultModalConfig = {
                    'no-click-animation': true,
                    persistent: true,
                    scrollable: true,
                    'hide-overlay': true,
                    'retain-focus': false,
                };
                const componentProps = { ...modalConfig.props, ...to.params };
                const config = { ...defaultModalConfig, ...modalConfig.config, ...platformModalConfig };

                if( this.$vuetify.breakpoint.mdAndUp ) {
                    this.$modal.show( modalConfig.component, componentProps, config );
                } else {
                    this.$modal.showBottom( modalConfig.component, componentProps, config );
                }

            },
            applyBeforeEachOnRouter( ) {
                const router = this.$router;
                const filterEachRoute = async ( to, from, next ) => {

                    if ( from.name === 'cartCheckout' && to.name !== 'cartCheckout' ) {
                        this.instantDeleteCurrentCart( );
                    }

                    if ( to.meta.type === 'modal' ) {
                        this.showModal( to );
                    } else {
                        next( );
                    }
                };

                router.beforeEach( filterEachRoute );
            }
        },
        created( ) {
            this.instantDeleteAllCartsIfExpired( );

            saveReferrerUrl();

            this.$router.onReady( () => {
                this.applyBeforeEachOnRouter( );
            } );

            if ( this.$vuetify.breakpoint.smAndDown && this.$device.hasIos ) {
                viewportUtilsSetMetaViewport( viewportConstants.IOS );
            }
        }
    };
</script>
