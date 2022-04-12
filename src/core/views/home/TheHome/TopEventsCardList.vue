<template>
    <div class="gst-top-events-card-list">
        <h4 ref="cityDropDown" 
            class="mt-8">
            {{ $t('title') }}
            <span class="inline">
                <CitySearchStoreDropDown
                    v-model="selectedCity"
                    :data-test-id="$testId('filter.city')"
                    :has-current-location-option="true"
                    @open="onCityDropDownOpenDo" />
            </span>
        </h4>
        <div class="u-overflow-auto-x">
            <TopEventsCardListCategoryFilter
                v-if="!loadingCategories && categories.length"
                v-model="selectedCategoryId"
                :items="categories"
                class="mt-4"
                @input="onChangeCategoryDo" />
        </div>
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else>
            <NoData v-if="!events.length" :message="$t( 'messages.noData' )" class="pt-4" />
            <v-container
                grid-list-xl
                align-center
                fluid
                class="pa-2 ma-0 mt-2">
                <v-layout
                    row
                    wrap>
                    <v-flex
                        v-for="(event, i) in events"
                        :key="i"
                        class="pa-2"
                        xs12
                        sm6
                        md4>
                        <EventCardVariant2 
                            :event="event"
                            :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                            :data-test-id="$testId(`card.${i+1}`)" />
                    </v-flex>
                </v-layout>
                <SeeMoreButton
                    v-if="!allItemsLoaded"
                    :data-test-id="$testId('buttons.seeMore')"
                    class="mx-auto d-flex mt-4"
                    :loading="loadingSeeMore"
                    @click="loadNextPage()" />
            </v-container>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import debounce from 'lodash/debounce';
    import isEqual from 'lodash/isEqual';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import EventCardVariant2 from '@core/shared/components/event/EventCardVariant2';
    import CitySearchStoreDropDown from '@core/shared/components/input/CitySearchStoreDropDown';
    import NoData from '@core/shared/components/misc/NoData';
    import listConstants from '@core/utils/constants/list';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton.vue';
    import TopEventsCardListCategoryFilter from './TopEventsCardListCategoryFilter.vue';

    const STORE_EVENTS = 'topEvents';
    const STORE_CATEGORIES = 'categories';

    export default {
        name: 'TopEventsCardList',
        components: {
            EventCardVariant2,
            TopEventsCardListCategoryFilter,
            SeeMoreButton,
            DataLoading,
            CitySearchStoreDropDown,
            NoData
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.home.theHome._components.eventCardList',
        },
        testIdOptions: {
            keyPrefix: 'home.topEvents'
        },
        data( ) {
            return {
                selectCityChanged: false,
                lastAppliedFilter: {
                    categoryId: null,
                    city: { }
                }
            };
        },
        computed: {
            ...mapState( {
                events:                 state => state[STORE_EVENTS].listView,
                categories:             state => state[STORE_CATEGORIES].list,
                loadingEvents:          state => state[STORE_EVENTS].loading,
                loadingCategories:      state => state[STORE_CATEGORIES].loading,
                allItemsLoaded:         state => state[STORE_EVENTS].allItemsLoaded,
                topEventsFilter:        state => state[STORE_EVENTS].filter
            } ),
            ...mapGetters( {
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            selectedCity: {
                get: function ( ) {
                    return this.topEventsFilter.city || { };
                },
                set: function ( value ) {
                    this.selectCityChanged = true;

                    const userAnalytics = !!( value.name || this.selectedCategoryId );
                    const filter = { city: value, ...this.selectedCategory( this.selectedCategoryId ) };

                    this.updateFilter( filter );
                    this.getEventsDebounced( { refresh: true, filter: filter, userAnalytics: userAnalytics } );
                }
            },
            selectedCategoryId: {
                get: function ( ) {
                    return this.topEventsFilter.categoryId;
                },
                set: function (  value ) {
                    const userAnalytics = !!( value || ( this.selectCityChanged && this.selectedCity.name ) ) ;
                    const filter = { city: this.selectedCity, ...this.selectedCategory( value ) };

                    this.updateFilter( filter );
                    this.getEventsDebounced( { refresh: true, filter: filter, userAnalytics: userAnalytics } );
                }
            },
            loading( ) {
                return ( this.loadingEvents && !this.events.length );
            },
            loadingSeeMore() {
                return this.loadingEvents;
            }
        },
        methods: {
            ...mapActions( {
                getEvents:     `${STORE_EVENTS}/get`,
                updateFilter:     `${STORE_EVENTS}/updateFilter`,
                getCategories:     `${STORE_CATEGORIES}/get`,
            } ),
            loadNextPage ( ) {
                this.getEvents( { loadNextPage: true, filter: { city: this.selectedCity, ...this.selectedCategory( ) } } );
            },
            onCityDropDownOpenDo( ) {
                if ( this.$vuetify.breakpoint.smAndDown )
                    this.$scrollTo(
                        this.$refs.cityDropDown,
                        100,
                        {
                            offset: -60,
                            y: true
                        }
                    );
            },
            selectedCategory( id ) {
                const category = this.categories.find( item => item.id === id );

                if ( !category ){
                    return null;
                }
                return {
                    categoryId: category.id,
                    search: category.search
                };
            },
            onChangeCategoryDo( value ) {
                const updatedFilters = {};
                if ( !value ) {
                    updatedFilters.categoryId = null;
                    updatedFilters.search = null;
                }
                this.updateFilter( updatedFilters );
            },
            getEventsDebounced: debounce( function( params = { refresh: false } ) {
                const initialFilter = { ...this.topEventsFilter };
                delete initialFilter.search;

                if ( isEqual ( this.lastAppliedFilter, initialFilter ) && params.refresh ) {
                    return;
                }

                this.lastAppliedFilter = { ...initialFilter };

                this.getEvents( params );
            }, listConstants.DEBOUNCE_DELAY )
        },
        mounted( ) {
            this.getCategories( );
            this.getEvents( { filter: this.topEventsFilter } );
        }
    };
</script>
