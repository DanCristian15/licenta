<template>
    <div class="gst-tabs__attractions gst-tabs-content-narrow">
        <SearchResultTabsEventsFilter
            v-if="showFilter"
            class="my-4"
            :sort="sort"
            @input="onInputFilterDo" />
        <div v-if="!noData">
            <DataLoading v-if="showLoading" class="mt-5 mb-5 pt-5 pb-5" />
            <template v-else-if="hasItems">
                <SearchResultTabsEventsList :items="events" />
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
    import { SearchResultTabsEventsList, SearchResultTabsEventsFilter } from './SearchResultTabsEvents/index';

    const STORE_EVENTS = 'events';

    export default {
        name: 'SearchResultTabsEvents',
        components: {
            SearchResultTabsNoData,
            SeeMoreButton,
            SearchResultTabsEventsList,
            SearchResultTabsEventsFilter,
            DataLoading
        },
        mixins: [ SearchResultMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs.events'
        },
        testIdOptions: {
            keyPrefix: 'search.eventsTab'
        },
        data( ) {
            const sortOptions = [
                { value: 'date', 'display': this.$t( '_common:terms.sortByDate' ) },
                { value: 'price', 'display': this.$t( '_common:terms.sortByPrice' ) },
                { value: 'asc', 'display': this.$t( '_common:terms.sortAlphabetical_abv' ) },
                { value: 'desc', 'display': this.$t( '_common:terms.sortAlphabeticalDesc_abv' ) }
            ];
            const defaultSort = sortOptions.find( option => option.value === 'date' );

            return {
                sort: {
                    value: defaultSort,
                    options: sortOptions
                },
                isQuerySort: false,
            };
        },
        computed: {
            ...mapState( {
                events:                 state => state[STORE_EVENTS].list,
                loading:                state => state[STORE_EVENTS].loading,
                total:                  state => state[STORE_EVENTS].totalCount,
                filter:                 state => state[STORE_EVENTS].filter
            } ),
            ...mapGetters( {
                isAllItemsLoaded:  `${ STORE_EVENTS }/isAllItemsLoaded`,
            } ),
            noData( ) {
                return !this.total && !this.events.length && !this.loading;
            },
            entityType( ) {
                return entityConstants.TYPES.EVENT;
            },
            showLoading( ) {
                return !this.events.length && this.loading;
            },
            hasItems( ) {
                return !!this.events.length;
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
            'sort.value': {
                handler: function ( newValue, oldValue ) {
                    if ( newValue !== oldValue ) {
                        if ( !this.isQuerySort ) {
                            this.changeRouteQuery( { queryParams: {
                                ...this.searchParams,
                                sort: this.sort.value.value
                            } } );
                            this.loadData();
                        }
                        this.isQuerySort = false;
                    }
                },
                deep: true
            }
        },
        methods: {
            ...mapActions( {
                get: `${ STORE_EVENTS }/get`,
            } ),
            loadNextPage ( ) {
                this.get( { refresh: false, loadNextPage: true, search: this.searchParams, userAnalytics: true } );
            },
            async loadData( ) {
                const params = {
                    offset: 0,
                    count: true,
                    ...this.searchParams,
                    sort: this.sort.value.value,
                };

                await this.get( { refresh: true, search : params, userAnalytics: true, firstLoad: false } );
            },
            async onInputFilterDo( value ) {
                const newFilter = { ...this.filter, ...value };
                await this.changeRouteQuery( { queryParams: newFilter } );
                this.updateFilter( { filter: newFilter, entityType: this.entityType } );
            },
            updateQuerySort() {
                if ( this.$route.query.sort ) {
                    this.isQuerySort = true;
                    const sort = this.sort.options.find( option => option.value === this.$route.query.sort.toLowerCase() );
                    if ( this.sort && this.sort.value ) {
                        this.sort.value = sort;
                    }
                }
            }
        },
        mounted( ) {
            this.updateFilter( { filter: this.filterSearchParams, entityType: this.entityType } );
            this.updateQuerySort();
        }
    };
</script>
