<template>
    <div>
        <DataLoading v-if="firstLoading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else>
            <v-tabs
                ref="tabs"
                background-color="transparent"
                color="primary"
                class="gst-user-favorite-tabs"
                :show-arrows="false">
                <v-tab
                    v-for="tab in tabs"
                    :key="tab.id"
                    :to="tab.to"
                    exact>
                    {{ tab.title }} ({{ totalsFormated( tab.total ) }})
                </v-tab>
            </v-tabs>

            <v-tabs-items class="gst-user-favorite-tabs__item">
                <router-view />
            </v-tabs-items>
        </template>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import numberConstants from '@core/utils/constants/number';
    import entityConstants from '@core/utils/constants/entity';
    import asyncParallel from '@core/utils/asyncParallel';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';

    export default {
        name: 'UserFavoritesTabs',
        components: {
            DataLoading
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.userFavorites.theUserFavorites._components.userFavoritesTabs'
        },
        data( ) {
            return {
                firstLoading: true
            };
        },
        computed: {
            ...mapState( {
                totalCountEvents:      state => state.user.favoriteEntities.totalCount[ entityConstants.TYPES.EVENT ],
                totalCountAttractions: state => state.user.favoriteEntities.totalCount[ entityConstants.TYPES.ATTRACTION ],
            } ),
            tabs() {
                return  [
                    {
                        id: 0,
                        title: this.$t( 'events.title' ),
                        to: { name: 'userFavorites', query: this.$route.query },
                        total: this.totalCountEvents
                    },
                    {
                        id: 1,
                        title: this.$t( 'attractions.title' ),
                        to: { name: 'userFavorites.attractions', query: this.$route.query },
                        total: this.totalCountAttractions
                    }
                ];
            },
            queryLimitEvents() {
                return 6;
            },
            queryLimitAttractions() {
                return this.$vuetify.breakpoint.mdAndUp ? 18 : 6;
            },
        },
        methods: {
            ...mapActions( {
                getFavoriteEntities: 'user/favoriteEntities/get',
            } ),
            async loadData() {
                const params = {
                    offset: 0,
                };
                await asyncParallel( [
                    async ( ) => { await this.getFavoriteEntities( { refresh: true, search: { type: entityConstants.TYPES.EVENT, limit: this.queryLimitEvents, ...params } } ); },
                    async ( ) => { await this.getFavoriteEntities( { refresh: true, search: { type: entityConstants.TYPES.ATTRACTION, limit: this.queryLimitAttractions, ...params } } ); },
                ], 2 );
            },
            totalsFormated( total ) {
                return this.$options.filters.number( total, numberConstants.FORMAT.INTEGER );
            }
        },
        async mounted() {
            await this.loadData( );
            this.firstLoading = false;
            /**
             * Hack - ionutt
             * vuetify/issues/4733
             */
            this.$refs.tabs && this.$refs.tabs.onResize( );
        }
    };
</script>


<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-favorite-tabs.v-tabs {
        border-bottom: 1px solid theme-color( 'quinary' );

        .v-slide-group__prev {
            display: none !important;
        }

        .v-tab {
            padding: 0;
            margin: 0 16px 0 0;
            font-size: font-size( 'l' );
            letter-spacing: -0.47px;
            text-transform: none;
            min-width: auto;
        }

        .v-tabs-bar .v-tab:not(.v-tab--active) {
            color: theme-color( 'tertiary' );
        }
    }
</style>
