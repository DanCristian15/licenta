<template>
    <div v-if="!showNoData">
        <UserFavoriteTabsEventsFilter 
            class="mt-3" 
            :filter="filter" />
        <DataLoading v-if="showLoading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else-if="items.length">
            <UserFavoriteTabsEventsList 
                :items="items"
                class="mt-4" />
            <SeeMoreButton
                v-if="showLoadMore"
                :data-test-id="$testId('buttons.seeMore')"
                class="mx-auto d-flex mt-4"
                :loading="loading"
                @click="loadNextPage()" />
        </template>
        <NoFilteredData v-else
            :message="$t('messages.noFilterData')"
            :icon-v-text="'$vuetify.icons.searchFavoriteData'"
            class="gst-user-favorite-tabs-events__no-filtered-data mt-8 mt-md-7"
            @reset-filters="resetFilters" />
    </div>
    <UserFavoritesTabsNoData 
        v-else
        :title="$t('noData.title')"
        :content="$t('noData.content')"
        :card="noDataCardCardData" />
</template>
<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    import entityConstants from '@core/utils/constants/entity';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import UserFavoritesTabsNoData from '@views/user/TheUserFavorites/UserFavoritesTabsNoData.vue';
    import NoFilteredData from '@core/shared/components/misc/NoFilteredData.vue';
    import { 
        UserFavoriteTabsEventsFilter,
        UserFavoriteTabsEventsList,

    } from './UserFavoritesTabsEvents/index';
    
    export default {
        name: 'UserFavoritesTabsEvents',
        components: {
            SeeMoreButton,
            DataLoading,
            UserFavoritesTabsNoData,
            UserFavoriteTabsEventsFilter,
            UserFavoriteTabsEventsList,
            NoFilteredData
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.userFavorites.theUserFavorites._components.userFavoritesTabs.events'
        },
        testIdOptions: {
            keyPrefix: 'userFavorites.eventsTab'
        },
        data() {
            return {
                loading: false,
                filter: { 
                    city: null
                }
            };
        },
        computed: {
            ...mapState( {
                items: state => state.user.favoriteEntities.list[ entityConstants.TYPES.EVENT ],
                total: state => state.user.favoriteEntities.totalCount[ entityConstants.TYPES.EVENT ],
            } ),
            ...mapGetters( {
                isAllItemsLoaded: 'user/favoriteEntities/isAllItemsLoaded'
            } ),
            showNoData( ) {
                return !this.total && !this.items.length && !this.loading;
            },
            showLoading( ) {
                return !this.items.length && this.loading;
            },
            showLoadMore( ) {
                return !this.isAllItemsLoaded( entityConstants.TYPES.EVENT );
            },
            noDataCardCardData() {
                return {
                    title: this.$t( 'noData.card.title' ), 
                    content: { 
                        event: this.$t( 'noData.card.content.event' ), 
                        tickets: this.$t( 'noData.card.content.tickets' ), 
                        favorite: this.$t( 'noData.card.content.favorite' ) 
                    }
                };
            },
            entityType() {
                return entityConstants.TYPES.EVENT;
            },
            queryLimit() {
                return 6;
            },
            querySearch( ) {
                const filter = this.filter.city ? { 
                    city: this.filter.city ? this.filter.city : null
                } : null;

                return {
                    filter
                };
            }
        },
        watch: {
            'querySearch': {
                handler: function ( ) {
                    this.load( );
                },
                deep: true
            } 
        },
        methods: {
            ...mapActions( {
                get: 'user/favoriteEntities/get'
            } ),
            async loadNextPage ( ) {
                this.loading = true;
                await this.get( 
                    { 
                        refresh: false, 
                        loadNextPage: true, 
                        search: { 
                            type: this.entityType, 
                            limit: this.queryLimit, 
                            ...this.querySearch 
                        } 
                    } 
                );
                this.loading = false;
            },
            async load ( ) {
                this.loading = true;
                await this.get( 
                    { 
                        refresh: true, 
                        loadNextPage: false, 
                        search: { 
                            type: this.entityType, 
                            limit: this.queryLimit, 
                            ...this.querySearch 
                        } 
                    } 
                );
                this.loading = false;
            },
            resetFilters( ) {
                this.$set( this.filter, 'city', null );
            }
        },
    };
</script>

<style lang="scss">
    .gst-user-favorite-tabs-events__no-filtered-data {
        .gst-no-filtered-data__icon .v-icon__component {
            height: 127px;
            width: 109px;
        }
    }
</style>