<template>
    <div class="gst-tabs__all">
        <div class="gst-tabs-content-narrow d-flex flex-column">
            <SearchResultTabsAllNoData v-if="noData" />
            <div class="gst-tabs__all-attractions">
                <SearchResultTabsAllSectionHeader
                    :title="$t( 'attractions.title' )"
                    :to="{ name: 'search.attractions', query: this.$route.query }"
                    :text-button="$t( 'all.buttons.seeAll' )"
                    :show-button="!noAttractionsData && $vuetify.breakpoint.mdAndUp" />
                <DataLoading v-if="showAttractionsLoading" class="mt-5 mb-5 pt-5 pb-5" />
                <template v-else>
                    <div v-if="!noAttractionsData" class="d-flex flex-column">
                        <SearchResultTabsAttractionsList :items="attractionItems" class="py-0" />
                        <BaseButton
                            v-if="!$vuetify.breakpoint.mdAndUp"
                            :placeholder="$t( 'all.buttons.seeAll' )"
                            :to="{ name: 'search.attractions', query: this.$route.query }"
                            invert
                            class="gst-btn--see-all text-capitalize mt-4 mx-auto" />
                    </div>
                    <SearchResultTabsNoData
                        v-else
                        :title="$t('attractions.messages.noData.title')"
                        :content="$t('attractions.messages.noData.content')"
                        :type="attractionEntityType" />
                </template>
            </div>
            <div class="gst-tabs__all-events">
                <SearchResultTabsAllSectionHeader
                    :title="$t( 'events.title' )"
                    :to="{ name: 'search.events', query: this.$route.query }"
                    :text-button="$t( 'all.buttons.seeAll' )"
                    :show-button="!noEventsData && $vuetify.breakpoint.mdAndUp" />
                <DataLoading v-if="showEventsLoading" class="mt-5 mb-5 pt-5 pb-5" />
                <template v-else>
                    <div v-if="!noEventsData" class="d-flex flex-column">
                        <SearchResultTabsEventsList :items="eventItems" class="py-0" />
                        <BaseButton
                            v-if="!$vuetify.breakpoint.mdAndUp"
                            :placeholder="$t( 'all.buttons.seeAll' )"
                            :to="{ name: 'search.events', query: this.$route.query }"
                            invert
                            class="gst-btn--see-all text-capitalize mt-4 mx-auto" />
                    </div>
                    <SearchResultTabsNoData
                        v-else
                        :title="$t('events.messages.noData.title')"
                        :content="$t('events.messages.noData.content')"
                        :type="eventEntityType" />
                </template>
            </div>
            <div class="gst-tabs__all-venues">
                <SearchResultTabsAllSectionHeader
                    class="pt-4 pb-2"
                    :title="$t( 'venues.title' )"
                    :to="{ name: 'search.venues', query: this.$route.query }"
                    :text-button="$t( 'all.buttons.seeAll' )"
                    :show-button="!noVenuesData && $vuetify.breakpoint.mdAndUp" />
                <DataLoading v-if="showVenuesLoading" class="mt-5 mb-5 pt-5 pb-5" />
                <template v-else>
                    <div v-if="!noVenuesData" class="d-flex flex-column">
                        <SearchResultTabsVenuesList :items="venueItems" class="py-0" />
                        <BaseButton
                            v-if="!$vuetify.breakpoint.mdAndUp"
                            :placeholder="$t( 'all.buttons.seeAll' )"
                            :to="{ name: 'search.venues', query: this.$route.query }"
                            invert
                            class="gst-btn--see-all text-capitalize mt-4 mx-auto" />
                    </div>
                    <SearchResultTabsNoData
                        v-else
                        :title="$t('venues.messages.noData.title')"
                        :content="$t('venues.messages.noData.content')"
                        :type="venueEntityType" />
                </template>
            </div>
        </div>
        <div class="content-max-width">
            <SimilarAttractions v-if="hasSimilarAttractions" class="mt-6 mt-lg-12 mb-8" />
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import SimilarAttractions from '@core/shared/components/attraction/SimilarAttractions';
    import isEqual from 'lodash/isEqual';
    import entityConstants from '@core/utils/constants/entity';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import SearchResultTabsNoData from './SearchResultTabsNoData.vue';
    import SearchResultTabsVenuesList from './SearchResultTabsVenues/SearchResultTabsVenuesList.vue';
    import SearchResultTabsEventsList from './SearchResultTabsEvents/SearchResultTabsEventsList.vue';
    import SearchResultTabsAttractionsList from './SearchResultTabsAttractions/SearchResultTabsAttractionsList.vue';
    import {
        SearchResultTabsAllSectionHeader,
        SearchResultTabsAllNoData
    } from './SearchResultTabsAll/index';
    import SearchResultMixin from './SearchResultMixin';

    const STORE_EVENTS = 'events';
    const STORE_ATTRACTIONS = 'attractions';
    const STORE_VENUES = 'venues';

    export default {
        name: 'SearchResultTabsAll',
        components: {
            BaseButton,
            SimilarAttractions,
            SearchResultTabsAttractionsList,
            SearchResultTabsEventsList,
            SearchResultTabsVenuesList,
            SearchResultTabsNoData,
            SearchResultTabsAllSectionHeader,
            SearchResultTabsAllNoData,
            DataLoading
        },
        mixins: [ SearchResultMixin ],
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs'
        },
        testIdOptions: {
            keyPrefix: 'search.eventsTab'
        },
        computed: {
            ...mapState( {
                attractions:            state => state[STORE_ATTRACTIONS].list,
                events:                 state => state[STORE_EVENTS].list,
                venues:                 state => state[STORE_VENUES].list,
                hasSimilarAttractions:  state => state.user.analytics.hasSimilarAttractions,
                filterAttractions:      state => state[STORE_ATTRACTIONS].filter,
                filterEvents:           state => state[STORE_EVENTS].filter,
                filterVenues:           state => state[STORE_VENUES].filter,
                loadingAttractions:     state => state[STORE_ATTRACTIONS].loading,
                loadingEvents:          state => state[STORE_EVENTS].loading,
                loadingVenues:          state => state[STORE_VENUES].loading,
            } ),
            noAttractionsData() {
                return !this.attractions.length;
            },
            noEventsData() {
                return !this.events.length;
            },
            noVenuesData() {
                return !this.venues.length;
            },
            noData() {
                return this.noAttractionsData && this.noEventsData && this.noVenuesData && !this.loadingAttractions && !this.loadingEvents && !this.loadingVenues;
            },
            attractionItems() {
                return this.attractions.slice( 0, 5 );
            },
            eventItems() {
                return this.events.slice( 0, 5 );
            },
            venueItems() {
                return this.venues.slice( 0, 5 );
            },
            attractionEntityType() {
                return entityConstants.TYPES.ATTRACTION;
            },
            eventEntityType() {
                return entityConstants.TYPES.EVENT;
            },
            venueEntityType() {
                return entityConstants.TYPES.VENUE;
            },
            showAttractionsLoading( ) {
                return !this.attractions.length && this.loadingAttractions;
            },
            showEventsLoading( ) {
                return !this.events.length && this.loadingEvents;
            },
            showVenuesLoading( ) {
                return !this.venues.length && this.loadingVenues;
            },
            params() {
                return {
                    offset: 0,
                    count: true,
                    ...this.searchParams
                };
            }
        },
        methods: {
            ...mapActions( {
                getEvents:                          `${ STORE_EVENTS }/get`,
                getAttractions:                     `${ STORE_ATTRACTIONS }/get`,
                getVenues:                          `${ STORE_VENUES }/get`,
            } ),
            updateFiltersWithSearchParams( ) {
                if ( !isEqual( this.filterAttractions, this.filterSearchParams ) ) {
                    this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.ATTRACTION } );
                    this.loadAttractionsData( );
                }
                if ( !isEqual( this.filterEvents, this.filterSearchParams ) ) {
                    this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.EVENT } );
                    this.loadEventsData( );
                }
                if ( !isEqual( this.filterVenues, this.filterSearchParams ) ) {
                    this.updateFilter( { filter: this.filterSearchParams, entityType: entityConstants.TYPES.VENUE } );
                    this.loadVenuesData( );
                }
            },
            async loadAttractionsData( ) {
                await this.getAttractions( { refresh: true, search : this.params, firstLoad: false } );
            },
            async loadEventsData( ) {
                const searchParams = this.$route.query.sort ? { ...this.params, sort: this.$route.query.sort } : this.params;
                await this.getEvents( { refresh: true, search : searchParams, firstLoad: false } );
            },
            async loadVenuesData( ) {
                await this.getVenues( { refresh: true, search : this.params, firstLoad: false } );
            },
        },
        mounted( ) {
            this.updateFiltersWithSearchParams();
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-tabs__all {
        .gst-tabs__all-attractions,
        .gst-tabs__all-events {
            ::v-deep .v-list {
                .v-list-item:last-child {
                    border-bottom: 0;
                }
            }
        }
    }

    @include mobile-only {
        .gst-tabs__all {
            .gst-tabs__all-venues {
                ::v-deep .v-list {
                    .v-list-item:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
    }
</style>
