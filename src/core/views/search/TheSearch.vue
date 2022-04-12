<template>
    <div>
        <DataLoading v-if="firstLoad" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else>
            <DetailBanner :src="bannerImage" :title="title" />
            <div class="pa-3 content-max-width">
                <SearchResultTabs :tabs="tabs" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';
    import numberConstants from '@core/utils/constants/number';
    import entityConstants from '@core/utils/constants/entity';
    import asyncParallel from '@core/utils/asyncParallel';
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import { SearchResultTabs } from './TheSearch/index';
    import SearchResultMixin from './TheSearch/SearchResultMixin';

    const STORE_VENUES = 'venues';
    const STORE_EVENTS = 'events';
    const STORE_ATTRACTIONS = 'attractions';

    export default {
        name: 'Search',
        components: {
            SearchResultTabs,
            DetailBanner,
            DataLoading
        },
        mixins: [ SearchResultMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch'
        },
        data() {
            return {
                gradient: 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
            };
        },
        computed: {
            ...mapGetters( {
                currentSearchParams: 'searchState/currentSearchParams',
            } ),
            ...mapState( {
                venuesFirstLoad:                state => state[STORE_VENUES].listFirstLoad,
                attractionsFirstLoad:           state => state[STORE_ATTRACTIONS].listFirstLoad,
                eventsFirstLoad:                state => state[STORE_EVENTS].listFirstLoad,
                venuesTotalCount:               state => state[STORE_VENUES].totalCount,
                attractionsTotalCount:          state => state[STORE_ATTRACTIONS].totalCount,
                eventsTotalCount:               state => state[STORE_EVENTS].totalCount,
            } ),
            tabs() {
                return  [
                    {
                        id: 0,
                        title: this.$t( '_components.searchResultTabs.all.title' ),
                        to: { name: 'search', query: this.$route.query }
                    },
                    {
                        id: 1,
                        title: this.$t( '_components.searchResultTabs.attractions.title' ),
                        to: { name: 'search.attractions', query: this.$route.query },
                        total: this.totalFormated( this.attractionsTotalCount )
                    },
                    {
                        id: 2,
                        title: this.$t( '_components.searchResultTabs.events.title' ),
                        to: { name: 'search.events', query: this.$route.query },
                        total: this.totalFormated( this.eventsTotalCount )
                    },
                    {
                        id: 3,
                        title: this.$t( '_components.searchResultTabs.venues.title' ),
                        to: { name: 'search.venues', query: this.$route.query },
                        total: this.totalFormated( this.venuesTotalCount )
                    },
                ];
            },
            firstLoad() {
                return this.venuesFirstLoad || this.attractionsFirstLoad || this.eventsFirstLoad;
            },
            totalCount() {
                return this.venuesTotalCount + this.attractionsTotalCount + this.eventsTotalCount;
            },
            title() {
                let { keyword } = this.$route.query;

                return keyword ?
                    this.$t( 'titleKeyword', { totalCount: this.totalFormated( this.totalCount ), keyword: keyword, interpolation: { escapeValue: false } } ) :
                    this.$t( 'titleAll', { totalCount: this.totalFormated( this.totalCount ) } );
            },
            bannerImage() {
                return imageConstants.BANNERS.SEARCH;
            }
        },
        watch: {
            'searchParams': {
                handler: function ( newValue, oldValue ) {
                    if ( newValue && oldValue && ( newValue.keyword !== oldValue.keyword ) ) {
                        this.loadData( );
                    }
                },
                deep: true
            },
        },
        methods: {
            ...mapActions( {
                getEvents:                          `${ STORE_EVENTS }/get`,
                getAttractions:                     `${ STORE_ATTRACTIONS }/get`,
                getVenues:                          `${ STORE_VENUES }/get`,
            } ),
            totalFormated( total ) {
                return this.$options.filters.number( total, numberConstants.FORMAT.INTEGER );
            },
            async loadData( ) {
                const params = {
                    offset: 0,
                    count: true,
                    ...this.searchParams,
                };

                this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.ATTRACTION } );
                this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.EVENT } );
                this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.VENUE } );

                await asyncParallel( [
                    async ( ) => { 
                        const searchParams = this.$route.query.sort ? { ...params, sort: this.$route.query.sort } : params;
                        this.getEvents( { refresh: true, search : searchParams, userAnalytics: true } );
                    },
                    async ( ) => { this.getAttractions( { refresh: true, search: params } ); },
                    async ( ) => { this.getVenues( { refresh: true, search: params } ); },
                ], 3 );
            }
        },
        mounted() {
            if ( !this.searchParams ) {
                this.$router.push( { name: 'home' } );
            }
            this.loadData( );
        }
    };
</script>
