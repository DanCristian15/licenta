<template>
    <div class="gst-tabs__attractions gst-tabs-content-narrow">
        <div v-if="!noData">
            <DataLoading v-if="showLoading" class="mt-5 mb-5 pt-5 pb-5" />
            <template v-else-if="hasItems">
                <SearchResultTabsAttractionsList :items="attractions" />
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
    import SearchResultMixin from './SearchResultMixin';
    import SearchResultTabsNoData from './SearchResultTabsNoData.vue';
    import { SearchResultTabsAttractionsList } from './SearchResultTabsAttractions/index';

    const STORE_ATTRACTIONS = 'attractions';

    export default {
        name: 'SearchResultTabsAttractions',
        components: {
            SearchResultTabsNoData,
            SeeMoreButton,
            SearchResultTabsAttractionsList,
            DataLoading
        },
        mixins: [ SearchResultMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs.attractions'
        },
        testIdOptions: {
            keyPrefix: 'search.atractionsTab'
        },
        computed: {
            ...mapState( {
                loading:                state => state[STORE_ATTRACTIONS].loading,
                attractions:            state => state[STORE_ATTRACTIONS].list,
                filter:                 state => state[STORE_ATTRACTIONS].filter
            } ),
            ...mapGetters( {
                isAllItemsLoaded:  `${ STORE_ATTRACTIONS }/isAllItemsLoaded`
            } ),
            noData( ) {
                return !this.total && !this.attractions.length && !this.loading;
            },
            entityType( ) {
                return entityConstants.TYPES.ATTRACTION;
            },
            showLoading( ) {
                return !this.attractions.length && this.loading;
            },
            hasItems( ) {
                return !!this.attractions.length;
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
                get:            `${ STORE_ATTRACTIONS }/get`,
            } ),
            loadNextPage ( ) {
                this.get( { refresh: false, loadNextPage: true, search: this.searchParams, userAnalytics: true } );
            },
            async loadData( ) {
                const params = {
                    offset: 0,
                    count: true,
                    ...this.searchParams
                };

                await this.get( { refresh: true, search : params, firstLoad: false } );
            }
        },
        mounted( ) {
            this.updateFilter( { filter: this.filterSearchParams, entityType: this.entityType } );
        }
    };
</script>
