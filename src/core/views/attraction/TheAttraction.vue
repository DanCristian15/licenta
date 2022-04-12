<template>
    <div class="gst-attraction">
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else>
            <v-flex class="content-max-width pt-md-1">
                <AttractionBanner :item="item" />
            </v-flex>
            <v-flex class="mt-6 content-max-width">
                <v-flex xs12 d-flex flex-row class="gst-attraction__filter">
                    <!-- eslint-disable-next-line vue/max-attributes-per-line -->
                    <v-flex 
                        d-flex 
                        flex-row 
                        align-center 
                        justify-start 
                        flex-md-grow-0 
                        class="mr-md-5" 
                        :class="{ 'gst-attraction__filter-disabled': isFilterDisabled }">
                        <IconLocation class="gst-search-icon-svg mr-1" />
                        <span class="inline">
                            <CityDropDown 
                                v-model="city"
                                :items="cities"
                                :data-test-id="$testId('filter.city')"
                                :loading="eventDatesLoading"
                                :disabled="isFilterDisabled"
                                @click="onClickCityDropdownDo" />
                        </span>
                    </v-flex>
                    <v-divider v-if="!$vuetify.breakpoint.mdAndUp" class="gst-divider my-1" vertical inset />
                    <v-flex 
                        d-flex
                        flex-row
                        align-center
                        justify-end
                        flex-md-grow-0
                        class="ml-4 ml-md-0"
                        :class="{ 'gst-attraction__filter-disabled': isFilterDisabled }">
                        <IconDate class="gst-search-icon-svg mr-1" />
                        <span class="inline">
                            <DateDropDownField
                                v-model="date"
                                :data-test-id="$testId('filter.date')"
                                :disabled="isFilterDisabled"
                                :loading="eventDatesLoading"
                                :event-dates="eventDatesFiltered"
                                @click="onClickDateDropdownDo" />
                        </span>
                    </v-flex>
                </v-flex>
                <v-row v-if="!$vuetify.breakpoint.mdAndUp" class="mt-5">
                    <v-divider class="gst-divider" />
                </v-row>
                <v-flex xs12 md9 class="mt-4">
                    <EventsSearchBy :search="searchEvents" :with-user-analytics="true" :expandable-card="true" class="mt-5 mb-4">
                        <template slot="empty-list">
                            <TicketNoData align="center" justify="center">
                                <img :src="noTickets" width="70px" />
                                <h5 class="font-weight-medium my-1">
                                    {{ $t('messages.noData.title' ) }}
                                </h5>
                                <p class="tertiary--text">
                                    {{ $t('messages.noData.content' ) }}
                                </p>
                            </TicketNoData>
                        </template>
                    </EventsSearchBy>
                </v-flex>
                <div class="content-max-width">
                    <SimilarAttractions v-if="hasSimilarAttractions" class="mt-6 mt-lg-14 mb-8" />
                </div>
            </v-flex>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import TicketNoData from '@core/shared/components/ticket/TicketNoData';
    import isEmpty from 'lodash/isEmpty';
    import SimilarAttractions from '@core/shared/components/attraction/SimilarAttractions';
    import isEqual from 'lodash/isEqual'; 
    import entityConstants from '@core/utils/constants/entity';
    import imageConstants from '@core/utils/constants/imagePaths';
    import {
        buildSearchQueryObject as searchUtilsBuildSearchQueryObject,
        normalizeSearchQuery as searchUtilsNormalizeSearchQuery
    } from '@core/utils/searchUtils';
    import {
        generateIdForCity as generateIdForCityObjectUtils
    } from '@core/utils/cityObjectUtils';
    import {
        isEmpty as searchObjectUtilsIsEmpty,
    } from '@core/utils/searchObjectUtils';
    import { normalizeForFilter as cityObjectUtilsNormalizeForFilter } from '@utils/cityObjectUtils';
    import { normalizeAttractionEventDates } from '@core/data/response/normalizeAttractionEventDates';
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import IconDate from '@core/shared/assets/icons/date.svg';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EventsSearchBy from '@core/shared/components/event/EventsSearchBy.vue';
    import CityDropDown from '@core/shared/components/input/CityDropDown.vue';
    import DateDropDownField from '@core/shared/components/input/DateDropDownField.vue';
    import EntityNotFoundRedirect404 from '@core/mixins/EntityNotFoundRedirect404';
    import AttractionBanner from './TheAttraction/AttractionBanner.vue';

    const STORE_ATTRACTIONS = 'attractions';
    const STORE_EVENTS = 'events';
    const STORE_USER_HISTORY_BROWSING = 'user/browsingHistory';
    const EVENT_DATES_LIMIT = 1000;

    export default {
        name: 'TheAttraction',
        components: {
            SimilarAttractions,
            CityDropDown,
            DateDropDownField,
            DataLoading,
            EventsSearchBy,
            IconDate,
            IconLocation,
            TicketNoData,
            AttractionBanner
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.attraction.theAttraction'
        },
        testIdOptions: {
            keyPrefix: 'attraction'
        },
        mixins: [
            EntityNotFoundRedirect404
        ],
        data( ) {
            return {
                loading: true,
                city: { },
                date: {
                    startDate: null,
                    endDate: null
                },
                cities: [],
                eventDates: [],
                eventDatesLoading: false
            };
        },
        computed: {
            ...mapState( {
                item:                   state => state[STORE_ATTRACTIONS].detail,
                hasSimilarAttractions:  state => state.user.analytics.hasSimilarAttractions,
                events:                 state => state[STORE_EVENTS].list,
                eventsLoading:          state => state[STORE_EVENTS].loading,
                userFirstAccessApp:     state => state.user.firstAccess
            } ),
            itemId( ) {
                return this.$route.params.id;
            },
            searchEvents() {
                return {
                    attractionId: this.itemId,
                    city: this.city,
                    startDate: this.date.startDate,
                    endDate: this.date.endDate
                };
            },
            entityType() {
                return entityConstants.TYPES.ATTRACTION;
            },
            isFilterDisabled() {
                const hasFilter = !isEmpty( this.city ) || !!this.date.startDate || !!this.date.endDate;
                return !this.events.length && !hasFilter && !this.eventsLoading;
            },
            noTickets() {
                return imageConstants.FALLBACKS.NO_TICKETS;
            },
            searchParams() {
                const search = searchUtilsNormalizeSearchQuery( this.$route.query );

                if ( searchObjectUtilsIsEmpty( search ) ) {
                    return null;
                } else {
                    return {
                        startDate: search.startDate ? search.startDate : null,
                        endDate: search.endDate ? search.endDate : null,
                        city: search.city ? cityObjectUtilsNormalizeForFilter( search.city ) : null
                    };
                }
            },
            eventDatesFiltered( ) {
                if ( this.eventDates.length ) {
                    const res = this.eventDates.reduce( ( acc, item ) => {
                        if ( !this.city || isEmpty( this.city ) || isEqual( item.city, this.city ) ) {
                            acc.dates.push( item.date );
                        }
                        return acc;   
                    }, { dates: [ ] }  );
                    return res.dates;
                }
                return [];
            }
        },
        watch: {
            '$route.params.id': function ( ) {
                this.city = { };
                this.date.startDate = null;
                this.date.endDate = null;
                this.cities = [];
                this.eventDates = [];
                this.load( );
            }
        },
        methods: {
            ...mapActions( {
                loadOne                             : `${STORE_ATTRACTIONS}/one`,
                addEntityToUserBrowsingHistory      : `${STORE_USER_HISTORY_BROWSING}/addEntity`,
                cityEventDatesByAttraction          : `${STORE_EVENTS}/cityEventDatesByAttraction`,
            } ),
            changeRouteQuery( ) {
                const currentRoute = this.$router.currentRoute;

                this.$router.replace( {
                    name: currentRoute.name,
                    params: currentRoute.params,
                    query: searchUtilsBuildSearchQueryObject( {
                        city: this.city,
                        startDate: this.date.startDate,
                        endDate: this.date.endDate
                    } )
                }, ( ) => { } );
            },
            async load( ) {
                this.loading = true;
                const res = await this.loadOne( this.itemId );
                if ( !res ) {
                    this._goToNotFoundPage( );
                    return;
                }
                this.addEntityToUserBrowsingHistory( { entityType: entityConstants.TYPES.ATTRACTION, data: this.item } );
                this.loading = false;
            },
            async loadEventDatesByAttraction() {
                this.eventDatesLoading = true;
                const response = await this.cityEventDatesByAttraction( { id: this.itemId, limit: EVENT_DATES_LIMIT } );
                if ( response ) {
                    const res = response.reduce( ( acc, item ) => {
                        const attractionEventDatesItem = normalizeAttractionEventDates( item );
                        
                        if ( attractionEventDatesItem.date ) {
                            const eventDateItem = {
                                date: attractionEventDatesItem.date.toISOString().substr( 0, 10 ),
                                city: attractionEventDatesItem.city
                            };
                            acc.dates.push( eventDateItem );
                        }
                        if ( attractionEventDatesItem.city ) {
                            acc.citiesMap[generateIdForCityObjectUtils( attractionEventDatesItem.city )] = attractionEventDatesItem.city;
                        }

                        return acc;
                    }, { dates: [ ], citiesMap: { } } );

                    this.eventDates = res.dates;
                    this.cities = Object.values( res.citiesMap );
                }
                this.eventDatesLoading = false;
            },
            onClickCityDropdownDo( ) {
                ( this.cities.length || this.eventDatesLoading ) || this.loadEventDatesByAttraction();
            },
            onClickDateDropdownDo( ) {
                ( this.eventDates.length || this.eventDatesLoading ) || this.loadEventDatesByAttraction();
            }
        },
        mounted( ) {
            !this.searchParams || !this.searchParams.startDate  ||   ( this.date.startDate = this.searchParams.startDate );
            !this.searchParams || !this.searchParams.endDate    ||   ( this.date.endDate = this.searchParams.endDate );
            ( !this.searchParams || !this.searchParams.city || !this.searchParams.city.name ) || ( this.city = this.searchParams.city );
            this.$watch( 'city', this.changeRouteQuery );
            this.$watch( 'date', this.changeRouteQuery );
            this.load( );
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-attraction__title {
        font-weight: font-weight( 'medium' );
    }

    .gst-attraction .gst-no-data {
        max-width: 380px !important;

        p {
            line-height: line-height( 'l' );
        }
    }

    .gst-attraction__filter-disabled {
        span.gst-city-dropdown__target,
        span.gst-date-dropdown__target {
            color: theme-color( 'senary' ) !important;
        }

        .gst-svg-icon,
        .gst-dropdown-icon-svg .gst-svg-icon {
            fill: theme-color( 'senary' ) !important;
        }
    }

    @include mobile-only {
        .gst-attraction .gst-no-data {
            max-width: 100%;
        }
    }
</style>
