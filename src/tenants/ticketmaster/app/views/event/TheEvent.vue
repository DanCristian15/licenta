<template>
    <div class="gst-event"
        :class="{'gst-event-mobile': !$vuetify.breakpoint.mdAndUp}">
        <Header v-if="$vuetify.breakpoint.mdAndUp" />
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else-if="isEvent" class="d-flex flex-column u-height-100">
            <EventBanner :item="event" @click-back="onBannerClickBackDo" />
            <EventNotAvailable v-if="isEventTicketsNotAvailable || isEventPackageOffersNotAvailable" :event="event" :is-package-offers-not-available="isEventPackageOffersNotAvailable" />
            <template v-else>
                <EventVenueImage v-if="!$vuetify.breakpoint.smAndUp" :loading="loadingTickets || loadingSections" :tickets="tickets" :venue-details="venueDetails" />
                <div :style="{'flex': 1, display: 'flex', 'min-height':0}">
                    <div v-if="$vuetify.breakpoint.smAndUp" :style="{flex: 1}" class="col col-sm-8 pa-0">
                        <EventTicketImage
                            :loading-tickets="loadingTickets || loadingSections"
                            :tickets="tickets"
                            :venue-details="venueDetails"
                            :venue-seat-map-url="venueSeatMapUrl" />
                    </div>
                    <div :style="{ flex: 1 }" class="d-flex flex-column col col-sm-4 u-position-relative pa-0">
                        <DataLoading v-if="loadingSections" class="mt-5 mb-5 pt-5 pb-5" />
                        <div v-else-if="!isPackageFlow" class="d-flex flex-column u-position-relative pa-0 u-height-100">
                            <v-slide-x-reverse-transition>
                                <EventTicketDetailSidebar
                                    v-if="selectedTicket"
                                    :ticket="selectedTicket"
                                    :offers="selectedTicketDetailInfo.offers"
                                    :hotel-reservation="selectedHotelReservation"
                                    :event="selectedTicketDetailInfo.event"
                                    :quantity="selectedTicketDetailInfo.quantity"
                                    :bus-event-parent="busEvent"
                                    :venue-details="venueDetails"
                                    class="u-width-100 u-height-100 u-pull-front u-position-absolute"
                                    @close-ticket="selectedTicket = null" />
                            </v-slide-x-reverse-transition>
                            <EventTicketFilter
                                v-model="filter"
                                :options="filterOptions.current"
                                :show-filters="showAddionalTicketFilters"
                                @click-filter-btn="showAddionalTicketFilters = !showAddionalTicketFilters" />
                            <div :style="{'flex': 1, display: 'flex', 'min-height':0}" class="u-position-relative">
                                <v-slide-x-reverse-transition>
                                    <EventTicketAddionalFiltersSidebar
                                        v-if="showAddionalTicketFilters"
                                        :value="filter"
                                        :options="filterOptions.current"
                                        class="u-width-100 u-height-100 u-pull-front u-position-absolute"
                                        @apply="updateFilter"
                                        @reset="resetFilter"
                                        @close="showAddionalTicketFilters = false" />
                                </v-slide-x-reverse-transition>
                                <EventTicketList
                                    :event="event"
                                    :tickets="tickets"
                                    :total-tickets="totalTickets"
                                    :tickets-with-offers="ticketsWithOffers"
                                    :loading-tickets="loadingTickets"
                                    :selected-ticket="selectedTicket"
                                    :selected-ticket-detail-info="selectedTicketDetailInfo"
                                    :sort="sort"
                                    :bus-event-parent="busEvent"
                                    @hightlight-ticket="setHighlightedTicket"
                                    @click-item="openEventTicketDetail"
                                    @load-more="loadTicketsDebounced"
                                    @close-ticket="selectedTicket = null" />
                            </div>
                        </div>
                        <div v-else-if="isPackageFlow" class="d-flex flex-column u-position-relative pa-0 u-height-100">
                            <v-slide-x-reverse-transition>
                                <SectionDetailSidebar
                                    v-if="selectedSection"
                                    :section="selectedSection"
                                    :hotel-reservation="selectedHotelReservation"
                                    :event="event"
                                    :quantity="filterSections.quantity"
                                    :bus-event-parent="busEvent"
                                    :venue-details="venueDetails"
                                    class="u-width-100 u-height-100 u-pull-front u-position-absolute"
                                    @close-ticket="selectedSection = null" />
                            </v-slide-x-reverse-transition>
                            <EventSectionsFilters v-model="filterSections" :options="filterSectionOptions" />
                            <SectionsList
                                :style="{'flex': 1, display: 'flex', 'min-height':0}"
                                :event="event"
                                :sections="sections"
                                :loading-sections="loadingSections"
                                @hightlight-section="setHighlightedSection"
                                @select-section="setSelectedSection" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <router-view />
    </div>
</template>

<script>
    import Header from '@tenant/app/layouts/components/Header.vue';
    import Vue from 'vue';
    import debounce from 'lodash/debounce';
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import { redirectToHome as tenantRedirectToHome } from '@tenant/app/utils/tenantUrlslUtils';
    import eventConstants from '@core/utils/constants/event';
    import apiConstants from '@core/utils/constants/api';
    import listConstants from '@core/utils/constants/list';
    import {
        isAfter as dateUtilsIsAfter,
        differenceInSeconds as dateUtilsDifferenceInSeconds
    } from '@core/utils/dateUtils';
    import {
        hasTicketAvailable as eventUtilsHasTicketAvailable
    } from '@core/utils/eventUtils';
    import { getFromApiResponse as notificationUtilsGetFromApiResponse } from '@core/utils/notificationUtils';
    import asyncParallel from '@core/utils/asyncParallel';
    import EntityNotFoundRedirect404 from '@core/mixins/EntityNotFoundRedirect404';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import ApiCancelService from '@services/ApiCancelService';
    import EventBanner from './TheEvent/EventBanner.vue';
    import EventTicketList from './TheEvent/EventTicketList.vue';
    import EventTicketFilter from './TheEvent/EventTicketFilter.vue';
    import EventTicketImage from './TheEvent/EventTicketImage.vue';
    import EventVenueImage from './TheEvent/EventVenueImage.vue';
    import HealthCheckConfirmationModal from './TheEvent/HealthCheckConfirmationModal/HealthCheckConfirmationModal';
    import SectionsList from './TheEvent/SectionsList';
    import EventSectionsFilters from './TheEvent/EventSectionsFilters';
    import SectionDetailSidebar from './TheEvent/SectionDetailSidebar';

    const STORE_NAME = 'events';
    const STORE_NAME_PACKAGES = 'packageOffers';

    const CONFIG_TICKETS = {
        LIMIT: 20,
        FILTER_DEFAULT: {
            QUANTITY: 2,
            MIN_QUANTITY: 1,
            MAX_QUANTITY: 50,
            PRICE: {
                MIN: 0,
                MAX: 5000,
                CURRENCY: ''
            },
            ACCESSIBILITY: false,
        },
        FILTER_BUNDLE_DEFAULT: {
            QUANTITY: 2,
            MIN_QUANTITY: 2,
            MAX_QUANTITY: 50
        }
    };

    export default {
        name: 'TheEvent',
        components: {
            SectionDetailSidebar,
            Header,
            DataLoading,
            EventBanner,
            EventTicketList,
            EventTicketFilter,
            EventTicketImage,
            EventVenueImage,
            SectionsList,
            EventSectionsFilters,
            EventNotAvailable: ( ) => import( './TheEvent/EventNotAvailable.vue' ),
            EventTicketAddionalFiltersSidebar: () => import( './TheEvent/EventTicketAddionalFiltersSidebar' ),
            EventTicketDetailSidebar: () => import( './TheEvent/EventTicketDetailSidebar' )
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent'
        },
        testIdOptions: {
            keyPrefix: 'event'
        },
        mixins: [
            EntityNotFoundRedirect404,
        ],
        data( ) {
            const defaultSort = { value: 'price', 'display': this.$t( '_common:terms.lowestPrice' ) };

            return {
                loading: true,
                tickets: [ ],
                sections: [ ],
                totalTickets: 0,
                offersMap: { },
                ticketTypesMap: { },
                venueDetails: {
                    mapUrl: '',
                    mapWithlabelsUrl: ''
                },
                event: { },
                selectedHotelReservation: null,
                highlightedTicket: null,
                highlightedSection: null,
                selectedTicket: null,
                selectedSection: null,
                showAddionalTicketFilters: false,
                defaultSort: defaultSort,
                sort: {
                    value: defaultSort,
                    options: [
                        defaultSort,
                        { value: 'quality', 'display': this.$t( '_common:terms.bestSeats' ) },
                    ]
                },
                filter: {
                    quantity: CONFIG_TICKETS.FILTER_DEFAULT.QUANTITY,
                    price: {
                        range: [ CONFIG_TICKETS.FILTER_DEFAULT.PRICE.MIN, CONFIG_TICKETS.FILTER_DEFAULT.PRICE.MAX ],
                        min: CONFIG_TICKETS.FILTER_DEFAULT.PRICE.MIN,
                        max: CONFIG_TICKETS.FILTER_DEFAULT.PRICE.MAX,
                        currency: CONFIG_TICKETS.FILTER_DEFAULT.PRICE.QUANTITY
                    },
                    accessibility: CONFIG_TICKETS.FILTER_DEFAULT.ACCESSIBILITY
                },
                filterOptions: {
                    current: {
                        accessibilityEnabled: false,
                        minQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MIN_QUANTITY,
                        maxQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MAX_QUANTITY
                    },
                    noAccesability: {
                        minQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MIN_QUANTITY,
                        maxQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MAX_QUANTITY
                    },
                    accessibility: {
                        minQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MIN_QUANTITY,
                        maxQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MAX_QUANTITY,
                        companionMinQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MIN_QUANTITY,
                        companionMaxQuantity: CONFIG_TICKETS.FILTER_DEFAULT.MAX_QUANTITY
                    }
                },
                filterSectionOptions: {
                    accessibilityEnabled: false,
                    minQuantity: CONFIG_TICKETS.FILTER_BUNDLE_DEFAULT.MIN_QUANTITY,
                    maxQuantity: CONFIG_TICKETS.FILTER_BUNDLE_DEFAULT.MAX_QUANTITY
                },
                busEvent: new Vue( ),
                loadingTickets: false,
                isEventTicketsMaintenance: false,
                userAnalytics: false,
                lastAppliedFilter: { },
                previousRoute: { },
                isPackageFlow: false
            };
        },
        computed: {
            ...mapState( {
                item:               state => state[STORE_NAME].detail,
                forceDynamicFlow:   state => state.appState.forceDynamicFlow
            } ),
            ...mapGetters( {
                hasPackageByEventId             : `${STORE_NAME_PACKAGES}/hasByEventId`,
                getAvailable                    : `${STORE_NAME_PACKAGES}/getAvailable`,
                loadingSections                 : `${STORE_NAME_PACKAGES}/getLoading`,
                isForcedDynamicFlow             : 'appState/isForcedDynamicFlow'
            } ),
            routeId( ) {
                return this.$route.params.id;
            },
            itemId( ) {
                return this.event.id;
            },
            venueSeatMapUrl( ) {
                if( this.isPackageFlow ) {
                    if( this.selectedSection ) {
                        return this.selectedSection.venueSeatMapUrl;
                    }

                    if( this.highlightedSection ) {
                        return this.highlightedSection.venueSeatMapUrl;
                    }

                    return null;
                }
                if ( this.selectedTicket ) {
                    return this.selectedTicket.venueSeatMapUrl;
                }
                if ( this.highlightedTicket ) {
                    return this.highlightedTicket.venueSeatMapUrl;
                }
                return null;
            },
            noTickets() {
                return '';
            },
            selectedTicketDetailInfo( ) {
                return this.selectedTicket ?  this.getTicketDetailInfo( this.selectedTicket ) : null;
            },
            isMaxQuantityAvailable( ) {
                return this.filterOptions.current.maxQuantity >= CONFIG_TICKETS.FILTER_DEFAULT.MAX_QUANTITY;
            },
            isEventTicketsStatusFewAvailable( ) {
                return this.event.ticketsStatus === eventConstants.TICKETS_STATUS.FEW_AVAILABLE;
            },
            isEventTicketsNotAvailable( ) {
                return !eventUtilsHasTicketAvailable( this.event );
            },
            isEventPackageOffersNotAvailable() {
                return !this.isPackageFlow && !this.loadingSections && !this.isForcedDynamicFlow;
            },
            isEvent( ) {
                return !!this.event.id;
            },
            ticketsWithOffers( ) {
                return this.tickets.filter( ticket => ticket.offers.length );
            },
            hasHealthCheck( ) {
                return !!this.event.healthCheck;
            },
            needToShowConfirmationHealthCheck( ) {
                return this.hasHealthCheck && ( !this.previousRoute || this.previousRoute.name !== 'cartCheckout' );
            },
            componentEventTicketDetailSidebar( ) {
                return () => import( './TheEvent/EventTicketDetailSidebar' );
            },
            isUsingLegacyRoute() {
                return this.$route.name === 'tmEvent';
            },
            filterSections: {
                get( ) {
                    return this.$store.state.packageOffers.filters;
                },
                set( value ) {
                    this.updateFiltersSections( value );
                }
            }
        },
        watch: {
            '$route.params.id': function( ) {
                this.loadData( );
            },
            'sort.value': function ( ) {
                this.loadTickets( true );
            },
            'showAddionalTicketFilters': function ( value ) {
                if ( value && !this.$vuetify.breakpoint.mdAndUp ) {
                    this.openTicketAdditionalFiltersModal( );
                }
            }
        },
        methods: {
            ...mapActions( {
                loadOne                         : `${STORE_NAME}/one`,
                loadOneByLegacy                 : `${STORE_NAME}/oneByLegacy`,
                loadEventTicketsAvailability    : `tickets/availability`,
                loadEventTickets                : 'tickets/get',
                showLoadingOverlay              : 'appState/setLoading',
                addItemToCart                   : 'cart/addItem',
                instantDeleteCurrentCart        : 'cart/instantDeleteCurrentCart',
                initPackageOffers               : `${STORE_NAME_PACKAGES}/init`,
                oneByEventId                    : `${STORE_NAME_PACKAGES}/oneByEventId`,
                loadSectionsByEventId           : `${STORE_NAME_PACKAGES}/getSectionsByEventId`,
                updateFiltersSections           : `${STORE_NAME_PACKAGES}/filters/update`,
                notificationError               : 'notification/error',
                notificationWarning             : 'notification/warning',
            } ),
            async loadData( ) {
                let event, packageDetails;

                this.loading = true;
                await asyncParallel( [
                    async ( ) => { event = !!this._destroyed || await this.loadEvent( ); },
                    async ( ) => {
                        this.initPackageOffers( { eventId: this.itemId } );
                        packageDetails = !!this._destroyed || await this.oneByEventId( this.routeId );
                    },
                ], 2 );
                this.loading = false;

                if ( event && !this.isEventTicketsNotAvailable ) {
                    !this.needToShowConfirmationHealthCheck || this.openHealthCheckConfirmationModal( );
                    const isPackageDetailsAvailable = this.getAvailable( this.itemId );

                    if ( isPackageDetailsAvailable ) {
                        !!this._destroyed || await this.loadSections( );
                        const { eventDetails } = packageDetails.data;
                        this.isPackageFlow = true;

                        if ( !this.venueDetails.mapUrl ) {
                            Vue.set( this.venueDetails, 'mapUrl', eventDetails.venueMapWithLabelsUrl );
                            Vue.set( this.venueDetails, 'mapWithlabelsUrl', eventDetails.venueMapWithLabelsUrl );
                        }
                    } else {
                        if ( this.isEventTicketsStatusFewAvailable ) {
                            this.filter.quantity = 1;
                        }

                        const responseTickets = !!this._destroyed || await this.loadTickets( true );
                        if ( responseTickets.success ) {
                            !!this._destroyed || await this.loadTicketsAvailability( );
                        }
                    }

                    this.addFilterWatchers( );
                } else {
                    this.deferReloadFutureOnSaleDate( );
                }
            },
            getEventData() {
                if ( this.isUsingLegacyRoute ) {
                    return this.loadOneByLegacy( { id: this.routeId } );
                }

                return this.loadOne( this.routeId );
            },
            async loadEvent( ) {
                const responseEvent = await this.getEventData( );

                if ( !responseEvent ) {
                    this._goToNotFoundPage( );
                    return;
                }

                const getMaxPrice = ( maxPrice ) => {
                    const ret = parseFloat( maxPrice );

                    return ret === Math.floor( ret ) ? ret : Math.floor( ret ) + 1;
                };

                this.event = responseEvent;
                this.filter.price.min = 0;
                this.filter.price.max = this.event.maxPrice ? getMaxPrice( this.event.maxPrice ) : 0;
                this.filter.price.range = [ this.filter.price.min, this.filter.price.max ];
                this.filter.price.currency = this.event.currency;

                return this.event;
            },
            async loadTicketsAvailability( ) {
                const response = await this.loadEventTicketsAvailability( { eventId: this.itemId } );

                if ( response.success ) {
                    if ( response.data && response.data.accessibility ) {
                        const { accessibility } = response.data;

                        this.filterOptions.current.accessibilityEnabled         = accessibility.enabled;
                        this.filterOptions.accessibility.minQuantity            = accessibility.minLimit;
                        this.filterOptions.accessibility.maxQuantity            = accessibility.maxLimit;
                        this.filterOptions.accessibility.companionMinQuantity   = accessibility.companionMinLimit;
                        this.filterOptions.accessibility.companionMaxQuantity   = accessibility.companionMaxLimit;
                    }
                }
            },
            async loadTickets( refresh = false ) {
                const clearData = ( ) => {
                    this.tickets = [];
                    this.offersMap = {};
                    this.ticketTypesMap = {};
                    this.highlightedTicket = null;
                    this.selectedTicket = null;
                };

                const getSearchParams = ( ) => {
                    const { price, accessibility, quantity } = this.filter;
                    const ret = {
                        offset: refresh ? 0 : this.tickets.length,
                        limit: CONFIG_TICKETS.LIMIT,
                        sort: this.sort.value.value,
                        quantity,
                    };

                    if ( price.range[0] > price.min || price.range[1] < price.max ) {
                        ret.priceRange = price.range;
                    }
                    if ( accessibility ) {
                        ret.accessibility = accessibility;
                    }

                    return ret;
                };
                const updateDataFromResponse = ( responseTickets, accessibility ) => {
                    const updateFilterPriceRangeFromTicketOffers = ( offers ) => {
                        const getNewMaxPriceFromOffers = ( ) => {
                            return offers.reduce( ( maxPrice, item ) => {
                                let basePrice = parseFloat( item.basePrice );

                                basePrice = basePrice === Math.floor( basePrice ) ? basePrice : Math.floor( basePrice ) + 1;

                                return basePrice > maxPrice ? basePrice : maxPrice;

                            }, this.filter.price.max );
                        };
                        const maxPrice = getNewMaxPriceFromOffers( );
                        if ( maxPrice > this.filter.price.max ) {
                            if ( this.filter.price.max === this.filter.price.range[ 1 ] ) {
                                this.removeFilterWatchers( );
                                this.filter.price.range = [ this.filter.price.range[ 0 ], maxPrice ];
                                this.addFilterWatchers( );
                            }
                            this.filter.price.max = maxPrice;
                        }
                    };
                    const updateFilterQuantityRangeNoAccesibilityFromTicketOffers = ( offers ) => {
                        const getNewMaxQuantityFromOffers = ( ) => {
                            return offers.reduce( ( max, item ) => {
                                let maxLimit = parseFloat( item.limitMax );

                                return maxLimit > max ? maxLimit : max;

                            }, this.filterOptions.noAccesability.maxQuantity );
                        };

                        const maxQuantity = getNewMaxQuantityFromOffers( );
                        if ( maxQuantity > this.filterOptions.noAccesability.maxQuantity ) {
                            this.filterOptions.noAccesability.maxQuantity = maxQuantity;
                            this.filterOptions.current.maxQuantity = maxQuantity;
                        }
                    };

                    this.ticketTypesMap = {
                        ...this.ticketTypesMap,
                        ...( responseTickets.ticketTypes.reduce( ( acc, item ) => {
                            acc[ item.id ] = item;

                            return acc;
                        }, { } ) )
                    };

                    this.offersMap = {
                        ...this.offersMap,
                        ...( responseTickets.offers.reduce( ( acc, { pointsEarned, ...rest } ) => {
                            acc[rest.id] = {
                                ...rest,
                                bonusPoints: pointsEarned || 0,
                                ticketType: rest.id ? this.ticketTypesMap[ rest.id ] : null
                            };

                            return acc;
                        }, { } ) )
                    };



                    this.tickets = [
                        ...this.tickets,
                        ...( responseTickets.tickets.items.map ( item => {
                            return {
                                ...item,
                                offerIds: item.offers,
                                offers: item.offers
                                    .map( offerId => {
                                        const offer = this.offersMap[ offerId ];

                                        if ( !offer ) {
                                            return;
                                        }

                                        return {
                                            ...offer,
                                            ticketType: this.ticketTypesMap[ offer.ticketTypeId ]
                                        };
                                    } )
                                    .filter( offer => offer )
                            };
                        } ) )
                    ];
                    this.totalTickets = responseTickets.tickets.totalCount;

                    updateFilterPriceRangeFromTicketOffers( responseTickets.offers );
                    accessibility || updateFilterQuantityRangeNoAccesibilityFromTicketOffers( responseTickets.offers );
                    if ( !this.venueDetails.mapUrl ) {
                        Vue.set( this.venueDetails, 'mapUrl', responseTickets.eventDetails.venueMapUrl );
                        Vue.set( this.venueDetails, 'mapWithlabelsUrl', responseTickets.eventDetails.venueMapWithLabelsUrl );
                    }
                };

                if ( isEqual ( this.lastAppliedFilter, { ...this.filter, sort: this.sort.value.value } ) && refresh ) {
                    return;
                }

                this.loadingTickets = true;
                !refresh || clearData( );

                this.lastAppliedFilter = cloneDeep( { ...this.filter, sort: this.sort.value.value } );

                const accessibility = this.filter.accessibility;
                const responseTickets = await this.loadEventTickets( {
                    eventId: this.itemId,
                    refresh,
                    search: getSearchParams( ),
                    userAnalytics: this.userAnalytics
                }, );

                if ( responseTickets.success ) {
                    if ( refresh ) {
                        clearData();
                    }

                    updateDataFromResponse ( responseTickets.data, accessibility );
                } else {
                    if ( responseTickets.code && responseTickets.code === apiConstants.ERROR_CODES.EVENT_PROVIDER.SYSTEM_DOWN ) {
                        this.isEventTicketsMaintenance = true;
                    }
                }
                this.loadingTickets = false;
                this.userAnalytics = true;

                return responseTickets;
            },
            async loadSections( ) {
                const sectionsResponse = await this.loadSectionsByEventId( { eventId: this.itemId, guestCount: this.filterSections.quantity } );
                this.sections = sectionsResponse.success ? sectionsResponse.data.sections : [] ;

                return sectionsResponse;
            },
            loadTicketsDebounced: debounce( function( refresh = false ) {
                this.loadTickets( refresh );
            }, listConstants.DEBOUNCE_DELAY ),
            loadSectionDebounced: debounce( function() {
                this.loadSections( );
            }, listConstants.DEBOUNCE_DELAY ),

            getTicketDetailInfo( ticket ) {
                return {
                    ticket: ticket,
                    offers: ticket.offers,
                    event: this.event,
                    quantity: this.filter.quantity,
                };
            },
            openEventTicketDetail( ticket ) {
                this.selectedTicket = ticket;
            },
            closeEventTicketDetail( ) {
                this.selectedTicket = null;
            },
            setHighlightedTicket( ticket ) {
                this.highlightedTicket = ticket;
            },
            setHighlightedSection( section ) {
                this.highlightedSection = section;
            },
            setSelectedSection( section ) {
                this.selectedSection = section;
            },
            closeSelectedSection( ) {
                this.selectedSection = null;
            },
            setSelectedHotelReservation( item ) {
                this.selectedHotelReservation = item;
            },
            openTicketAdditionalFiltersModal( ) {
                this.$modal.showBottom(
                    ( ) => import( './TheEvent/EventTicketFilterModal' ),
                    {
                        value: this.filter,
                        options: this.filterOptions.current,
                        sort : this.sort,
                        busEventParent: this.busEvent
                    },
                    {
                        scrollable: false,
                        fullscreen: false,
                        'hide-overlay': false
                    },
                    {
                        beforeClose: ( ) => {
                            this.showAddionalTicketFilters = false;
                        }
                    }
                );
            },
            openHealthCheckConfirmationModal( ) {
                const { healthCheck } = this.event;
                this.$modal.show(
                    HealthCheckConfirmationModal,
                    {
                        healthCheck
                    },
                    {
                        'no-click-animation': true,
                        scrollable: true,
                        fullscreen: false,
                        persistent: true,
                        'hide-overlay': false,
                        'max-width': 858,
                        'content-class': 'gst-v-dialog',
                    }
                );
            },
            openEventPackageOffersNotAvailableModal( ) {
                this.$modal.show(
                    ( ) => import( './TheEvent/EventPackageOffersNotAvailableModal' ),
                    { },
                    {
                        'max-width': 858
                    },
                    {
                        beforeClose: ( ) => {
                            this.closeSelectedSection( );
                            this.closeEventTicketDetail( );
                            this.loadSections( );
                        }
                    }
                );
            },
            updateFilter( filter ) {
                this.filter = filter;
            },
            resetFilter( ) {
                this.filter.quantity = CONFIG_TICKETS.FILTER_DEFAULT.QUANTITY;
                this.filter.price.range = [ this.filter.price.min, this.filter.price.max ];
                this.filter.accessibility = CONFIG_TICKETS.FILTER_DEFAULT.ACCESSIBILITY;
            },
            removeFilterWatchers( ) {
                !this._watchFilterQuantity || this._watchFilterQuantity( );
                !this._watchFilterPriceRange ||  this._watchFilterPriceRange( );
                !this._watchFilterAccessibility || this._watchFilterAccessibility( );
            },
            updateSort( sort ) {
                this.sort = sort;
            },
            resetSort( ) {
                this.sort.value = this.defaultSort;
            },
            addFilterWatchers( ) {
                const addForQuantity = ( ) => {
                    !this._watchFilterQuantity || this._watchFilterQuantity( );
                    this._watchFilterQuantity = this.$watch( 'filter.quantity', ( ) => {
                        this.selectedHotelReservation = null;
                        this.loadTicketsDebounced( true );
                    } );
                };

                const sectionsAddForQuantity = ( ) => {
                    !this._watchFilterQuantity || this._watchFilterQuantity( );
                    this._watchFilterQuantity = this.$watch( 'filterSections.quantity', ( ) => {
                        this.loadSectionDebounced(  );
                    } );
                };

                const addForPriceRange = ( ) => {
                    !this._watchFilterPriceRange ||  this._watchFilterPriceRange( );
                    this._watchFilterPriceRange = this.$watch( 'filter.price.range', ( newValue, oldValue ) => {
                        if ( newValue[ 0 ] !== oldValue[ 0 ] || newValue[ 1 ] !== oldValue[ 1 ] ) {
                            this.loadTicketsDebounced( true );
                        }
                    } );
                };
                const addForAccessibility = ( ) => {
                    !this._watchFilterAccessibility || this._watchFilterAccessibility( );
                    this._watchFilterAccessibility = this.$watch( 'filter.accessibility', value => {
                        const { current, accessibility, noAccesability } = this.filterOptions;
                        const { quantity } = this.filter;

                        if ( value ) {
                            this.filterOptions.current.minQuantity = accessibility.minQuantity;
                            this.filterOptions.current.maxQuantity = accessibility.maxQuantity;
                        } else {
                            this.filterOptions.current.minQuantity = noAccesability.minQuantity;
                            this.filterOptions.current.maxQuantity = noAccesability.maxQuantity;
                        }
                        if ( quantity >= current.minQuantity && quantity <=current.maxQuantity ) {
                            this.loadTicketsDebounced( true );
                        } else {
                            this.filter.quantity = CONFIG_TICKETS.FILTER_DEFAULT.QUANTITY <= current.maxQuantity ? Math.max( current.minQuantity, CONFIG_TICKETS.FILTER_DEFAULT.QUANTITY ) : current.minQuantity;
                        }
                    } );
                };

                if( this.isPackageFlow ) {
                    sectionsAddForQuantity();
                    return;
                }

                addForQuantity( );
                addForPriceRange( );
                addForAccessibility( );
            },
            deferReloadFutureOnSaleDate( ) {
                const now = new Date( );
                const { onSaleStartDateTimeAt } = this.event;

                if ( onSaleStartDateTimeAt && dateUtilsIsAfter( onSaleStartDateTimeAt, now ) ) {
                    const delay = Math.min( ( dateUtilsDifferenceInSeconds( onSaleStartDateTimeAt, now ) * 1000 ), ( Math.pow( 2, 31 ) - 1 ) );

                    this.deferReload = setTimeout(
                        ( ) => {
                            this.loadData( );
                        },
                        delay
                    );
                }
            },
            async checkout( payload ) {
                const callbackAddItemToCartErrorFn = ( response ) => {
                    const { code } = response;

                    const i18Prefix = '_common:messageServerErrorCodesFromContext.reserve';
                    switch ( code ) {
                        case apiConstants.ERROR_CODES.HOTEL_PROVIDER.PRODUCT_ERROR:
                            this.notificationWarning( {
                                title: this.$t( `${i18Prefix}.${code}.title` ),
                                content: this.$t( `${i18Prefix}.${code}.detail` ),
                                autoDismiss: false
                            } );
                            break;
                        case apiConstants.ERROR_CODES.HOTEL_PROVIDER.INVALID_REQUEST:
                        case apiConstants.ERROR_CODES.HOTEL_PROVIDER.INVALID_DATA:
                        case apiConstants.ERROR_CODES.HOTEL_PROVIDER.SYSTEM_ERROR:
                            this.notificationError( {
                                title: this.$t( `${i18Prefix}.hotelProviderDefault.title` ),
                                content: this.$t( `${i18Prefix}.hotelProviderDefault.detail` )
                            } );
                            break;
                        case apiConstants.ERROR_CODES.PACKAGE_OFFERS_NOT_AVAILABLE:
                            this.openEventPackageOffersNotAvailableModal( );
                            break;
                        default:
                            this.notificationError( notificationUtilsGetFromApiResponse( response ) );
                            this.closeSelectedSection( );
                            this.closeEventTicketDetail( );
                            break;
                    }
                };


                if ( this.selectedHotelReservation ) {
                    this.$router.push( { name: `${this.$route.name}.reservation`, params: { payload, callbackAddItemToCartErrorFn } } );
                } else {
                    this.$modal.show(
                        ( ) => import( './TheEvent/EventCheckoutConfirmationModal' ),
                        {
                            onConfirmFn: ( ) => {
                                this.$router.push( { name: `${this.$route.name}.reservation`, params: { payload, callbackAddItemToCartErrorFn } } );
                            }
                        },
                        {
                            'max-width': 800,
                        }
                    );
                    return;
                }

            },
            onBannerClickBackDo( ) {
                const { selectedTicket, selectedSection } = this;

                if ( selectedTicket ) {
                    return this.closeEventTicketDetail( );
                }
                if ( selectedSection ) {
                    return this.closeSelectedSection( );
                } else {
                    tenantRedirectToHome( );
                }
            }
        },
        async mounted( ) {
            await this.loadData( );
        },
        created( ) {
            this.busEvent.$on( 'reset-filter', this.resetFilter );
            this.busEvent.$on( 'update-filter', this.updateFilter );
            this.busEvent.$on( 'checkout', this.checkout );
            this.busEvent.$on( 'update-sort', this.updateSort );
            this.busEvent.$on( 'reset-sort', this.resetSort );
            this.busEvent.$on( 'set-hotel-reservation', this.setSelectedHotelReservation );
        },
        destroyed( ) {
            this.busEvent.$off( 'reset-filter' );
            this.busEvent.$off( 'update-filter' );
            this.busEvent.$off( 'checkout' );
            this.busEvent.$off( 'update-sort' );
            this.busEvent.$off( 'reset-sort' );
            this.busEvent.$off( 'set-hotel-reservation' );

            ApiCancelService.clear( 'events.one' );
            ApiCancelService.clear( 'packageOffers.oneByEventId' );
            ApiCancelService.clear( 'packageOffers.getSectionsByEventId' );
            ApiCancelService.clear( 'tickets.get' );
            ApiCancelService.clear( 'tickets.availability' );

            this._destroyed = true;
        },
        beforeRouteEnter( to, from, next ) {
            next( ( cmp ) => {
                cmp.previousRoute = from;
            } );
        },
        beforeRouteUpdate( to, from, next ) {
            this.previousRoute = from;
            next( );
        },
    };
</script>

<style scoped lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event {
        height: calc( 100vh - 50px );
    }

    .gst-event-mobile {
        height: 100vh;
    }

    .gst-event__filter {
        padding-top: 12px;
        z-index: 1;

        @include mobile-only {
            padding-top: 16px;
        }
    }
</style>
