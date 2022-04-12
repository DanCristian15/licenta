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
        <BackToTop :visible-offset-bottom="50" />
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapGetters, mapState } from 'vuex';
    import DefaultLayout from '@core/shared/layouts/Default';
    import BlankLayout from '@core/shared/layouts/Blank';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import NotificationContainer from '@core/shared/components/notifications/NotificationContainer';
    import BackToTop from '@shared/components/enhancers/BackToTop';
    import viewportConstants from '@core/utils/constants/viewport';
    import { setMetaViewport as viewportUtilsSetMetaViewport } from '@core/utils/viewportUtils';
    import {
        normalizeInitialStateFromQuery as searchUtilsNormalizeInitialStateFromQuery
    } from '@core/utils/searchUtils';

    /**
     * TODO HACK ionut
     * after we remove the pattern index.js we end up in a situatie where we have an css conflict order between chunks
     * for now we will "hide" that and resurect ticket 
     * https://boatyardx.atlassian.net/browse/GL-1221
     */
    // eslint-disable-next-line no-unused-vars
    import ExpansionPanel from '@core/shared/components/misc/ExpansionPanel.vue';
    // eslint-disable-next-line no-unused-vars
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2.vue';
    // eslint-disable-next-line no-unused-vars
    import EventHealthCheckWarningCardVariant1 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant1.vue';
    // eslint-disable-next-line no-unused-vars
    import EventHealthCheckWarningCardVariant2 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant2.vue';

    Vue.component( 'default-layout', DefaultLayout );
    Vue.component( 'blank-layout', BlankLayout );


    const STORE_SEARCH_STATE = 'searchState';
    const DEFAULT_LAYOUT = 'default';

    export default {
        name: 'App',
        components: {
            BackToTop,
            NotificationContainer,
            DataLoading
        },
        computed: {
            ...mapGetters( {
                userEmail: 'user/profile/email',
                userHasCurrentLocationPosition: 'user/location/hasCurrentPosition',
                userCurrentCityLocation: 'user/location/currentCityLocation'
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
                clearCurrentSearchState:            `${STORE_SEARCH_STATE}/clearCurrent`,
                getUserProfile:                     'user/profile/get',
                instantDeleteAllCartsIfExpired:     'cart/deleteAllIfExpired',
                instantDeleteCurrentCart:           'cart/instantDeleteCurrentCart',
                updateInitialSearchState:           `${STORE_SEARCH_STATE}/updateInitial`,
                updateCurrentSearchState:           `${STORE_SEARCH_STATE}/update`,
                updateTopEventsFilter:              'topEvents/updateFilter',
                getUserCurrentLocation:             'user/location/getCurrentLocation'
            } ),
            loadInitialSearchFromQuery( query ) {
                return this.updateInitialSearchState( searchUtilsNormalizeInitialStateFromQuery ( query ) );
            },
            overwriteCurrentSearchWithInitialSearch( ) {
                this.updateCurrentSearchState( this.initialSearch );
            },
            overwriteTopEventWithCity( ) {
                if ( this.initialSearch && this.initialSearch.city && this.initialSearch.city.name ) {
                    this.updateTopEventsFilter( { city: this.initialSearch.city } );
                } else if ( this.userHasCurrentLocationPosition ) {
                    this.updateTopEventsFilter( { city: this.userCurrentCityLocation } );
                }
            },
            showModal( to ) {
                let meta = to.meta;
                let modalConfig = meta.modalConfig;

                this.$modal.show(
                    modalConfig.component,
                    Object.assign( {}, modalConfig.props, to.params ),
                    Object.assign( 
                        {
                            'no-click-animation': true,
                            persistent: true,
                            scrollable: true,
                            'hide-overlay': true,
                            'retain-focus': false,
                        }, 
                        modalConfig.config, 
                        this.$vuetify.breakpoint.mdAndUp ? modalConfig.configDesktop : modalConfig.configMobile 
                    )
                );
            },
            applyBeforeEachOnRouter( ) {
                const router = this.$router;
                const filterEachRoute = async ( to, from, next ) => {
                    if ( await this.loadInitialSearchFromQuery( to.query ) ) {
                        this.overwriteCurrentSearchWithInitialSearch( );
                    } else {
                        if ( to.meta.type !== 'modal' ) {
                            this.clearCurrentSearchState( );
                        }
                    }

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
            },
        },
        created( ) {
            this.instantDeleteAllCartsIfExpired( );
            this.getUserProfile( this.userEmail );
            this.getUserCurrentLocation( { } );

            this.$router.onReady( () => {
                this.loadInitialSearchFromQuery( this.$route.query );
                this.overwriteCurrentSearchWithInitialSearch( );
                this.overwriteTopEventWithCity( );
                this.applyBeforeEachOnRouter( );
            } );

            if ( this.$vuetify.breakpoint.smAndDown && this.$device.hasIos ) {
                viewportUtilsSetMetaViewport( viewportConstants.IOS );
            }
        }
    };
</script>
