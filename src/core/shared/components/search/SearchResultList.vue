
<template>
    <div class="gst-search-list">
        <DataLoading v-if="loading && requestsInProgress" :width="2" />
        <div v-else>
            <div v-if="attractions.length">
                <SectionTitleSmall>{{ $t('headers.attractions') }}</SectionTitleSmall>
                <v-list-item
                    v-for="(attraction, index) in attractions"
                    :key="index"
                    class="px-0 py-2"
                    :to="redirectToAttraction ? {name:'attraction', params: {id: attraction.id} } : null"
                    @click="redirectToAttraction || $emit( 'select', attraction.name )">
                    <AttractionCardVariant1 :item="attraction" class="u-background-transparent u-width-100" />
                </v-list-item>
                <v-divider class="my-2" />
            </div>
            <div v-if="events.length">
                <SectionTitleSmall>{{ $t('headers.events') }}</SectionTitleSmall>
                <v-list-item
                    v-for="(event, index) in events"
                    :key="index"
                    class="px-0"
                    :to="redirectToEvent ? {name:'event', params: {id: event.id} } :null"
                    @click="redirectToEvent || $emit( 'select', event.name )">
                    <EventCardVariant1
                        :with-price-icon="true"
                        :event="event"
                        :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                        :content-max-lines="1"
                        class="u-background-transparent u-width-100 pa-2" />
                </v-list-item>
                <v-divider class="my-2" />
            </div>
            <div v-if="venues.length">
                <SectionTitleSmall>{{ $t('headers.venues') }}</SectionTitleSmall>
                <v-list-item
                    v-for="(venue, index) in venues"
                    :key="index"
                    class="px-0"
                    :to="redirectToVenue ? {name:'venue', params: {id: venue.id} } : null"
                    @click="redirectToVenue || $emit( 'select', venue.name )">
                    <VenueCardSmall :venue="venue" class="u-background-transparent u-width-100 pa-2" />
                </v-list-item>
                <v-divider class="my-2" />
            </div>
            <v-flex v-if="!showNoData" d-flex justify-center class="pt-6">
                <SeeAllButton
                    :to="seeAllButtonRoute" />
            </v-flex>
            <SearchResultNoData v-if="showNoData">
                {{ $t('messages.noData' ) }}
            </SearchResultNoData>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    import debounce from 'lodash/debounce';
    import searchConstants from '@core/utils/constants/search';
    import {
        hasCustomCityLocation as searchObjectUtilsHasCustomCityLocation,
        updateSearchWithCityLocationRange as searchObjectUtilsUpdateSearchWithCityLocationRange
    } from '@core/utils/searchObjectUtils';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EventCardVariant1 from '@core/shared/components/event/EventCardVariant1.vue';
    import AttractionCardVariant1 from '@core/shared/components/attraction/AttractionCardVariant1.vue';
    import VenueCardSmall from '@core/shared/components/venue/VenueCardSmall.vue';
    import SearchResultNoData from '@core/shared/components/search/common/SearchResultNoData.vue';
    import SectionTitleSmall from '@core/shared/components/misc/SectionTitleSmall.vue';
    import SeeAllButton from '@core/shared/components/buttons/SeeAllButton.vue';

    export default {
        name: 'SearchResultList',
        components: {
            DataLoading,
            EventCardVariant1,
            AttractionCardVariant1,
            VenueCardSmall,
            SectionTitleSmall,
            SearchResultNoData,
            SeeAllButton
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.search.searchResultList'
        },
        props: {
            searchKeywordOnly: {
                type: Boolean,
                default: false
            },
            redirectToAttraction: {
                type: Boolean,
                default: true
            },
            redirectToEvent: {
                type: Boolean,
                default: true
            },
            redirectToVenue: {
                type: Boolean,
                default: true
            },
            seeAllButtonRoute: {
                type: Object,
                default: null
            }
        },
        data () {
            return {
                loading: false,
                requestsInProgress: 0,
                firstLoad: false
            };
        },
        computed: {
            ...mapState( {
                searchState:        state => state.searchState.current,
                events:             state => state.searchState.results.events,
                attractions:        state => state.searchState.results.attractions,
                venues:             state => state.searchState.results.venues
            } ),
            ...mapGetters( {
                currentSearchParams: 'searchState/currentSearchParams',
                currentQueryObject: 'searchState/currentQueryObject',
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            showNoData() {
                return this.firstLoad && !this.events.length && !this.attractions.length && !this.venues.length;
            }
        },
        watch:{
            searchState: {
                handler: function ( ) {
                    this.loading = true;
                    this.loadDataDebouced( );
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            ...mapActions( {
                loadResults:        'searchState/search',
            } ),
            loadDataDebouced: debounce( function ( ) {
                this.loadData( );
            }, 500 ),
            async loadData( ) {
                const params = this.searchKeywordOnly ? { keyword: this.currentSearchParams.keyword } : { ...this.currentSearchParams };

                if ( this.searchKeywordOnly && !this.currentSearchParams.keyword ) {
                    return;
                }
                if ( !Object.keys( params ).length ) {
                    return;
                }
                const search = {
                    ...params,
                    offset: 0,
                    limit: 5
                };

                this.loading = true;
                this.requestsInProgress = this.requestsInProgress + 1;
                if ( this.searchKeywordOnly || !searchObjectUtilsHasCustomCityLocation( search ) ) {
                    await this.loadResults( { search } );
                } else {
                    await this.loadResults( { search: searchObjectUtilsUpdateSearchWithCityLocationRange( search, searchConstants.DEFAULT.LOCATION.RANGE.DEFAULT ) } );
                    if ( !this.events.length && !this.attractions.length && !this.venues.length ) {
                        await this.loadResults( { search: searchObjectUtilsUpdateSearchWithCityLocationRange( search, searchConstants.DEFAULT.LOCATION.RANGE.FALLBACK ) } );
                    }
                }
                this.firstLoad = true;
                this.loading = false;
                this.requestsInProgress = this.requestsInProgress - 1;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-search-list {
        .v-list-item {
            min-height: auto;
        }
    }

    .search-event-modal__keyword .v-input__slot:hover {
        fieldset {
            border-radius: border-radius( 'm' ) !important;
        }
    }
</style>
