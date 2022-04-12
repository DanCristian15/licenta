<template>
    <v-flex class="gst-event"
        :class="{'gst-event-mobile': !$vuetify.breakpoint.mdAndUp}">
        <EventHeader />
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <v-flex v-else d-flex flex-column class="u-height-100">
            <EventBanner :item="event" />
            <EventVenueImage :loading-tickets="loadingTickets" :tickets="tickets" :venue-details="venueDetails" />
            <EventTicketFilter v-model="filter" :options="filterOptions.current" :disabled="isEventTicketsNotAvailable" class="gst-event__filter" @reset="resetFilter" />
            <div :style="{'flex': 1, display: 'flex', 'min-height':0}">
                <v-flex d-flex xs12 md4 :style="{flex: 1}" class="u-position-relative">
                    <EventAttractionList v-if="isEventTicketsNotAvailable" :event="event" />
                    <EventTicketList
                        v-else
                        :event="event"
                        :tickets="tickets"
                        :total-tickets="totalTickets"
                        :tickets-with-offers="ticketsWithOffers"
                        :loading-tickets="loadingTickets"
                        :selected-ticket="selectedTicket"
                        :selected-ticket-detail-info="selectedTicketDetailInfo"
                        :sort="sort"
                        :show-tickets-few-available-warning="showEventTicketsStatusFewAvailableWarning"
                        :bus-event-parent="busEvent"
                        @hightlight-ticket="setHighlightedTicket"
                        @click-item="openEventTicketDetail"
                        @load-more="loadTicketsDebounced"
                        @close-ticket="selectedTicket = null"
                        @open-filter-modal="openTicketFilterModal"
                        @close-tickets-few-available-warning="showEventTicketsStatusFewAvailableWarning=false" />
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.mdAndUp" md8 :style="{flex: 1}">
                    <EventTicketImage
                        :loading-tickets="loadingTickets"
                        :tickets="tickets"
                        :venue-details="venueDetails"
                        :venue-seat-map-url="venueSeatMapUrl"
                        :show-tickets-few-available-warning="showEventTicketsStatusFewAvailableWarning"
                        @close-tickets-few-available-warning="showEventTicketsStatusFewAvailableWarning=false" />
                </v-flex>
            </div>
            <EventTicketMaintenanceOverlay v-if="!loading && isEventTicketsMaintenance" />
            <EventSimilarAttractions />
        </v-flex>
        <router-view />
    </v-flex>
</template>

<script>
    import Vue from 'vue';
    import debounce from 'lodash/debounce';
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import { mapActions, mapGetters, mapState } from 'vuex';
    import ticketsConstants from '@core/utils/constants/ticket';
    import entityConstants from '@core/utils/constants/entity';
    import imageConstants from '@core/utils/constants/imagePaths';
    import searchConstants from '@core/utils/constants/search';
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
    import { sortCompare } from '@core/utils/sortCompareUtils';
    import ticketsStoreModule from '@core/store/modules/tickets';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EntityNotFoundRedirect404 from '@core/mixins/EntityNotFoundRedirect404';
    import WarnBeforeLeave from '@core/mixins/WarnBeforeLeave';
    import DynamicStoreModule from '@/core/mixins/DynamicStoreModule';
    import ApiCancelService from '@services/ApiCancelService';
    import { EventTicketDetailModal,
             EventTicketFilter,
             EventTicketFilterModal,
             EventTicketMaintenanceOverlay,
             EventBanner,
             EventHeader,
             EventVenueImage,
             EventTicketImage,
             EventTicketList,
             EventAttractionList,
             EventSimilarAttractions } from './TheEvent/index';
    import { HealthCheckConfirmationModalDesktop, HealthCheckConfirmationModalMobile } from './TheEvent/HealthCheckConfirmationModal';

    const STORE_NAME = 'events';
    const CONFIG_TICKETS = {
        LIMIT: searchConstants.DEFAULT.LIMIT,
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
        }
    };

    export default {
        name: 'TheEvent',
        components: {
            DataLoading,
            EventTicketMaintenanceOverlay,
            EventTicketFilter,
            EventTicketList,
            EventBanner,
            EventHeader,
            EventVenueImage,
            EventTicketImage,
            EventAttractionList,
            EventSimilarAttractions,
            // eslint-disable-next-line vue/no-unused-components
            HealthCheckConfirmationModalDesktop,
            // eslint-disable-next-line vue/no-unused-components
            HealthCheckConfirmationModalMobile
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
            WarnBeforeLeave,
            DynamicStoreModule
        ],
        data( ) {
            const defaultSort = { value: 'price', 'display': this.$t( '_common:terms.price' ) };

            return {
                loading: true,
                tickets: [ ],
                totalTickets: 0,
                offersMap: { },
                ticketTypesMap: { },
                venueDetails: {
                    mapUrl: '',
                    mapWithlabelsUrl: ''
                },
                event: { },
                highlightedTicket: null,
                selectedTicket: null,
                showTicketDetail: false,
                sort: {
                    value: defaultSort,
                    options: [
                        defaultSort,
                        { value: 'quality', 'display': this.$t( '_common:terms.quality' ) },
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
                busEvent: new Vue( ),
                loadingTickets: false,
                isEventTicketsMaintenance: false,
                showEventTicketsStatusFewAvailableWarning: false,
                userAnalytics: false,
                lastAppliedFilter: { },
                previousRoute: { },
            };
        },
        computed: {
            ...mapState( {
                item:                   state => state[STORE_NAME].detail,
            } ),
            ...mapGetters( {
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            itemId( ) {
                return this.$route.params.id;
            },
            venueSeatMapUrl( ) {
                if ( this.selectedTicket ) {
                    return this.selectedTicket.venueSeatMapUrl;
                }
                if ( this.highlightedTicket ) {
                    return this.highlightedTicket.venueSeatMapUrl;
                }
                return null;
            },
            noTickets() {
                return imageConstants.FALLBACKS.NO_TICKETS;
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
            ticketsWithOffers( ) {
                return this.tickets.filter( ticket => ticket.offers.length );
            },
            hasHealthCheck( ) {
                return !!this.event.healthCheck;
            },
            needToShowConfirmationHealtCheck( ) {
                return this.hasHealthCheck && ( !this.previousRoute || this.previousRoute.name !== 'cartCheckout' );
            }
        },
        watch: {
            '$route.params.id': function( ) {
                this.loadData( );
            },
            'sort.value': function ( ) {
                this.loadTickets( true );
            }
        },
        methods: {
            ...mapActions( {
                loadOne                         : `${STORE_NAME}/one`,
                loadEventTicketsAvailability    : `tickets/availability`,
                loadEventTickets                : 'tickets/get',
                addEntityToUserBrowsingHistory  : 'user/browsingHistory/addEntity',
                showLoadingOverlay              : 'appState/setLoading',
                addItemToCart                   : 'cart/addItem',
                instantDeleteCurrentCart        : 'cart/instantDeleteCurrentCart'
            } ),
            async loadData( ) {
                this.loading = true;
                const event = await this.loadEvent( );

                if ( event ) {
                    if ( !this.isEventTicketsNotAvailable ) {
                        this.loading = false;

                        !this.needToShowConfirmationHealtCheck || this.openHealthCheckConfirmationModal( );
                        if ( this.isEventTicketsStatusFewAvailable ) {
                            this.showEventTicketsStatusFewAvailableWarning = true;
                            this.filter.quantity = 1;
                        }


                        const responseTickets = await this.loadTickets( true );

                        if ( responseTickets && responseTickets.success ) {
                            await this.loadTicketsAvailability( );
                        }

                        this.addFilterWatchers( );
                    } else {
                        this.deferReloadFutureOnSaleDate( );
                        this.loading = false;
                    }
                }
            },
            async loadEvent( ) {
                const responseEvent = await this.loadOne( this.itemId );
                const getMaxPrice = ( maxPrice ) => {
                    const ret = parseFloat( maxPrice );

                    return ret === Math.floor( ret ) ? ret : Math.floor( ret ) + 1;
                };

                if ( !responseEvent ) {
                    this._goToNotFoundPage( );
                    return;
                }

                this.event = responseEvent;
                this.filter.price.min = 0;
                this.filter.price.max = this.event.maxPrice ? getMaxPrice( this.event.maxPrice ) : 0;
                this.filter.price.range = [ this.filter.price.min, this.filter.price.max ];
                this.filter.price.currency = this.event.currency;
                this.addEntityToUserBrowsingHistory( { entityType: entityConstants.TYPES.EVENT, data: this.item } );

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


                    const normalizeTicketItem = ( item ) => {
                        const ticket = {
                            ...item,
                            offersIds: item.offers,
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

                        if ( item.selection === ticketsConstants.TYPES.RESALE ) {
                            ticket.offers.sort( ( a, b ) => sortCompare( a.basePrice, b.basePrice ) );
                        }
                        return ticket;
                    };

                    this.tickets = [
                        ...this.tickets,
                        ...( responseTickets.tickets.items.map ( normalizeTicketItem ) )
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

                this.loadingTickets = responseTickets.cancel ? this.loadingTickets : false;
                this.userAnalytics = true;

                return responseTickets;
            },
            loadTicketsDebounced: debounce( function( refresh = false ) {
                this.loadTickets( refresh );
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

                if ( !this.$vuetify.breakpoint.mdAndUp ) {
                    const propsMobile = {
                        'content-class': 'v-dialog__height-98',
                        scrollable: true,
                        fullscreen: false,
                        'hide-overlay': false,
                        transition: 'dialog-bottom-transition'
                    };

                    this.$modal.showBottom(
                        EventTicketDetailModal,
                        {
                            ...this.getTicketDetailInfo( ticket ),
                            busEventParent: this.busEvent
                        },
                        propsMobile,
                        {
                            beforeClose: ( ) => {
                                this.selectedTicket = null;
                            }
                        }
                    );
                }
            },
            setHighlightedTicket( ticket ) {
                this.highlightedTicket = ticket;
            },
            openTicketFilterModal( ) {
                this.$modal.showBottom(
                    EventTicketFilterModal,
                    {
                        filter: this.filter,
                        options: this.filterOptions.current,
                        busEventParent: this.busEvent
                    },
                    {
                        scrollable: false,
                        fullscreen: false,
                        'hide-overlay': false,
                        transition: 'dialog-bottom-transition'
                    }
                );
            },
            openHealthCheckConfirmationModal( ) {
                const { healthCheck } = this.event;
                const propsMobile = {
                    'content-class': 'gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    persistent: true,
                    transition: 'dialog-bottom-transition'
                };
                const propsDesktop = {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    persistent: true,
                    'hide-overlay': false,
                    'max-width': 500,
                    'content-class': 'gst-v-dialog',
                };

                if ( this.$vuetify.breakpoint.mdAndUp  ){
                    this.$modal.show(
                        HealthCheckConfirmationModalDesktop,
                        { healthCheck },
                        propsDesktop
                    );
                } else {
                    this.$modal.showBottom(
                        HealthCheckConfirmationModalMobile,
                        { healthCheck },
                        propsMobile
                    );
                }
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
            addFilterWatchers( ) {
                const addForQuantity = ( ) => {
                    !this._watchFilterQuantity || this._watchFilterQuantity( );
                    this._watchFilterQuantity = this.$watch( 'filter.quantity', ( ) => {
                        this.loadTicketsDebounced( true );
                    } );
                };

                const addForPriceRange = ( ) => {
                    !this._watchFilterPriceRange ||  this._watchFilterPriceRange( );
                    this._watchFilterPriceRange = this.$watch( 'filter.price.range', ( newValue, oldValue ) => {
                        if ( newValue[ 0 ] !== oldValue[ 0 ] || newValue[ 1 ] !== oldValue[ 1 ] ) {
                            this.loadTickets( true );
                        }
                    } );
                };
                const addForAccessibility = ( ) => {
                    !this._watchFilterAccessibility || this._watchFilterAccessibility( );
                    this._watchFilterAccessibility = this.$watch( 'filter.accessibility', ( value ) => {
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
                this.$router.push( { name: 'event.reservation', params: { payload: payload } } );
            }
        },
        async mounted( ) {
            await this.loadData( );
        },
        created( ) {
            this.registerStoreModule( 'tickets', ticketsStoreModule );

            this.busEvent.$on( 'reset-filter', this.resetFilter );
            this.busEvent.$on( 'update-filter', this.updateFilter );
            this.busEvent.$on( 'checkout', this.checkout );
        },
        destroyed( ) {
            this.busEvent.$off( 'reset-filter' );
            this.busEvent.$off( 'update-filter' );
            this.busEvent.$off( 'checkout' );

            ApiCancelService.clear( 'events.one' );
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

    $gstEventStartPosition: 60px;

    .gst-event {
        height: calc( 100vh - 60px );
    }

    .gst-event__filter {
        padding-top: 12px;
        z-index: 1;

        @include mobile-only {
            padding-top: 16px;
        }
    }
</style>