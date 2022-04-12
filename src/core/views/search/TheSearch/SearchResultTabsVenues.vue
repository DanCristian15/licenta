<template>
    <div class="gst-tabs__venues gst-tabs-content-narrow">
        <SearchResultTabsVenuesFilter
            v-if="showFilter"
            class="my-4"
            @input="onInputFilterDo" />
        <div v-if="!noData">
            <DataLoading v-if="showLoading" class="mt-5 mb-5 pt-5 pb-5" />
            <template v-else-if="hasItems">
                <SearchResultTabsVenuesList :items="venues" />
                <SeeMoreButton
                    v-if="!isAllItemsLoaded"
                    :data-test-id="$testId('buttons.seeMore')"
                    class="mx-auto d-flex mt-4"
                    :loading="loading"
                    @click="loadNextPage()" />
            </template>
        </div>
        <SearchResultTabsNoData
            v-else
            class="mt-6"
            :title="$t('messages.noData.title')"
            :content="$t('messages.noData.content')"
            :type="entityType" />
    </div>
</template>
<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    import isEqual from 'lodash/isEqual';
    import entityConstants from '@core/utils/constants/entity';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import SearchResultTabsNoData from './SearchResultTabsNoData.vue';
    import SearchResultMixin from './SearchResultMixin';
    import { SearchResultTabsVenuesList, SearchResultTabsVenuesFilter } from './SearchResultTabsVenues/index';

    const STORE_VENUES = 'venues';

    export default {
        name: 'SearchResultTabsVenues',
        components: {
            SearchResultTabsNoData,
            SeeMoreButton,
            SearchResultTabsVenuesList,
            SearchResultTabsVenuesFilter,
            DataLoading
        },
        mixins: [ SearchResultMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs.venues'
        },
        testIdOptions: {
            keyPrefix: 'search.venuesTab'
        },
        computed: {
            ...mapState( {
                venues:                 state => state[STORE_VENUES].list,
                loading:                state => state[STORE_VENUES].loading,
                total:                  state => state[STORE_VENUES].totalCount,
                filter:                 state => state[STORE_VENUES].filter
            } ),
            ...mapGetters( {
                isAllItemsLoaded:  `${ STORE_VENUES }/isAllItemsLoaded`
            } ),
            noData( ) {
                return !this.total && !this.venues.length && !this.loading;
            },
            entityType( ) {
                return entityConstants.TYPES.VENUE;
            },
            showLoading( ) {
                return !this.venues.length && this.loading;
            },
            hasItems( ) {
                return !!this.venues.length;
            },
            showFilter( ) {
                if ( !this.noData ) {
                    return true;
                }
                return Object.values( this.filter ).some( value => value );
            }
        },
        watch: {
            'filter': {
                handler: function ( newValue, oldValue ) {
                    isEqual( newValue, oldValue ) || this.loadData( );
                },
                deep: true
            },
        },
        methods: {
            ...mapActions( {
                get: `${ STORE_VENUES }/get`,
            } ),
            loadNextPage ( ) {
                this.get( { refresh: false, loadNextPage: true, search: this.searchParams } );
            },
            async loadData( ) {
                const params = {
                    offset: 0,
                    count: true,
                    ...this.searchParams
                };

                await this.get( { refresh: true, search : params, firstLoad: false } );
            },
            async onInputFilterDo( value ) {
                const newFilter = { ...this.filter, ...value };
                await this.changeRouteQuery( { queryParams: newFilter } );
                this.updateFilter( { filter: newFilter, entityType: this.entityType } );
            }
        },
        mounted( ) {
            this.updateFilter( { filter: this.filterSearchParams, entityType: this.entityType } );
        }
    };
</script>
