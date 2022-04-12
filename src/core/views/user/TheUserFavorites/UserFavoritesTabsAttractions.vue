<template>
    <div v-if="!showNoData">
        <UserFavoriteTabsAttractionsFilter
            :sort="sort"
            :filter="filter"
            class="mt-3" />
        <DataLoading v-if="showLoading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else-if="items.length">
            <UserFavoriteTabsAttractionsList 
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
            class="gst-user-favorite-tabs-attractions__no-filtered-data mt-8 mt-md-7"
            @reset-filters="resetFilters" />
    </div>
    <UserFavoritesTabsNoData 
        v-else
        :title="$t('noData.title')"
        :content="$t('noData.content')"
        :card="noDataCardCardData"
        :type="entityType" />
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton';
    import UserFavoritesTabsNoData from '@views/user/TheUserFavorites/UserFavoritesTabsNoData';
    import entityConstants from '@core/utils/constants/entity';
    import NoFilteredData from '@core/shared/components/misc/NoFilteredData.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import { 
        UserFavoriteTabsAttractionsFilter,
        UserFavoriteTabsAttractionsList,

    } from './UserFavoritesTabsAttractions/index';
    
    export default {
        name: 'UserFavoritesTabsAttractions',
        components: {
            UserFavoriteTabsAttractionsFilter,
            UserFavoriteTabsAttractionsList,
            DataLoading,
            SeeMoreButton,
            UserFavoritesTabsNoData,
            NoFilteredData
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.userFavorites.theUserFavorites._components.userFavoritesTabs.attractions'
        },
        testIdOptions: {
            keyPrefix: 'userFavorites.attractionsTab'
        },
        data() {
            const defaultSort = { value: 'asc', 'display': this.$t( '_common:terms.sortAlphabetical_abv' ) };

            return {
                loading: false,
                sort: {
                    value: defaultSort,
                    options: [
                        defaultSort,
                        { value: 'desc', 'display': this.$t( '_common:terms.sortAlphabeticalDesc_abv' ) },
                    ]
                },
                filter: { 
                    category: null
                }
            };
        },
        computed: {
            ...mapState( {
                items: state => state.user.favoriteEntities.list[ entityConstants.TYPES.ATTRACTION ],
                total: state => state.user.favoriteEntities.totalCount[ entityConstants.TYPES.ATTRACTION ],
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
                return !this.isAllItemsLoaded( entityConstants.TYPES.ATTRACTION );
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
                return entityConstants.TYPES.ATTRACTION;
            },
            queryLimit() {
                return this.$vuetify.breakpoint.mdAndUp ? 18 : 6;
            },
            querySearch( ) {
                const filter = this.filter.category ? { 
                    categoryId: this.filter.category ? this.filter.category.search : null
                } : null;

                return {
                    sort: this.sort.value.value,
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
                this.$set( this.filter, 'category', null );
            }
        },
    };
</script>

<style lang="scss">
    .gst-user-favorite-tabs-attractions__no-filtered-data {
        .gst-no-filtered-data__icon .v-icon__component {
            height: 127px;
            width: 109px;
        }
    }
</style>
