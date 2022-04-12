<template>
    <v-flex
        class="gst-event-card gst-event-card-variant-6"
        :class="{
            'gst-event-card--cancelled': isStatusCancelled,
            'gst-event-card--expanded': isExpanded,
        }">
        <v-card
            class="gst-event-card-variant-6__content py-2 px-2"
            flat
            :title="event.name"
            :to="to"
            :ripple="!isExpanded">
            <v-layout align-center d-flex flex-wrap>
                <v-flex d-flex>
                    <v-flex shrink class="gst-icon-dropdown d-flex align-start align-md-center pr-2 pt-3 pt-md-0">
                        <IconDropDownArrow
                            class="u-mouse-pointer"
                            :class="{
                                'gst-icon-svg--active u-rotate-180': isExpanded
                            }"
                            @click.prevent="onClickIconDropdownDo" />
                    </v-flex>
                    <v-flex shrink class="d-flex align-start align-md-center">
                        <DateIcon outlined :start-date="event.startDateTime" :end-date="event.endDateTime" />
                    </v-flex>
                    <v-flex class="pl-4 xs12 d-flex flex-column align-md-center flex-md-row">
                        <v-flex class="xs12 md9 pr-md-10">
                            <h5>
                                <VClamp
                                    autoresize
                                    :max-lines="1"
                                    class="gst-event-card-variant-6__title hyphens clamp">
                                    {{ event.name }}
                                </VClamp>
                            </h5>
                            <v-flex class="d-flex align-center">
                                <VenueInfo
                                    :max-lines="contentMaxLines"
                                    class="gst-event-card-variant-6__venue gst-event-card__venue flex-grow-1 hyphens clamp mb-md-1"
                                    :item="venueInfoLocation">
                                    <template slot="before">
                                        <EventStatusChip
                                            class="mr-1"
                                            :status="event.eventStatus" />
                                    </template>
                                    <template v-if="eventDateTime">
                                        {{ eventDateTime }} &#183;
                                    </template>
                                </VenueInfo>
                            </v-flex>
                        </v-flex>
                        <v-flex v-if="hasPriceIcon && hasTicketAvailable" shrink class="mt-3 mt-md-0">
                            <TenantPriceIcon
                                class="d-inline-block"
                                :price="event.minPrice"
                                :points="offerPoints"
                                :currency="currency"
                                :loyalty-currency="loyaltyCurrency"
                                :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                                :is-starting-price="event.minPrice !== event.maxPrice" />
                        </v-flex>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-card>
        <v-expand-transition>
            <EventCardVariant6Details v-if="isExpanded" :event="event" :items="attractions" :loading="loading" />
        </v-expand-transition>
    </v-flex>
</template>
<script>
    import { mapActions } from 'vuex';
    import VClamp from 'vue-clamp';
    import eventConstants from '@core/utils/constants/event';
    import {
        hasTicketAvailable as eventUtilsHasTicketAvailable
    } from '@core/utils/eventUtils';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';
    import EventStatusChip from '@core/shared/components/event/EventStatusChip.vue';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import EventCardVariant6Details from './EventCardVariant6/EventCardVariant6Details.vue';

    export default {
        name: 'EventCardVariant6',
        components: {
            DateIcon,
            VClamp,
            EventStatusChip,
            VenueInfo,
            IconDropDownArrow,
            EventCardVariant6Details
        },
        props: {
            event: {
                type: Object,
                required: true
            },
            withPriceIcon: {
                type: Boolean,
                default: false
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                required: true
            },
            contentMaxLines: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                isExpanded: false,
                loading: true,
                attractions: [ ]
            };
        },
        computed: {
            hasPriceIcon() {
                return this.withPriceIcon;
            },
            offerPoints( ) {
                return this.event.bonusPoints;
            },
            eventDateTime( ) {
                if ( this.event.startDateTime ) {
                    return this.event.hasStartTime ? this.$options.filters.time( this.event.startDateTime ) : '';
                }
                return this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            isStatusCancelled() {
                return this.event.eventStatus === eventConstants.EVENT_STATUS.CANCELLED;
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.event;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };
            },
            hasTicketAvailable( ) {
                return eventUtilsHasTicketAvailable( this.event );
            },
            to( ) {
                return { name: 'event', params: { id: this.event.id } };
            },
            currency( ) {
                const { event } = this;
                return event.currency;
            },
            loyaltyCurrency( ) {
                const { event } = this;
                return event.loyaltyCurrency;
            }
        },
        methods: {
            ...mapActions( {
                loadAttractions: 'attractions/searchByEvent'
            } ),
            async onClickIconDropdownDo( ) {
                this.isExpanded = !this.isExpanded;

                if ( this.isExpanded && !this.attractions.length ) {
                    this.loading = true;
                    const response = await this.loadAttractions( { eventId: this.event.id } );
                    if ( response.success ) {
                        response.data.list.map( item => delete item.upcomingEvents );
                        this.attractions = [ ...response.data.list ];
                    }
                    this.loading = false;
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-event-card-variant-6 {
    position: relative;
    max-width: 100%;

    .gst-event-card-variant-6__content:hover::before {
        opacity: 0.04;
    }

    .gst-event-card-variant-6__content {
        .gst-event-card-variant-6__title {
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.47px;
        }

        .gst-event-card-variant-6__price,
        .gst-event-card-variant-6__venue {
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
        }

        .gst-event-card-variant-6__price {
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );

            .price {
                color: theme-color( 'primary' );
                font-weight: font-weight( 'bold' );
            }
        }

        .gst-icon-dropdown {
            .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }

        .gst-icon-dropdown:hover {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }
}

.gst-event-card-variant-6.gst-event-card--expanded {
    box-shadow: 0 2px 6px 1px rgba( 109, 125, 144, 0.2 ) !important;
    border-radius: border-radius( 'm' );
}

.gst-event-card-variant-6.gst-event-card--expanded .gst-event-card-variant-6__content {
    border-radius: border-radius( 'm', 'm', 'none', 'none' ) !important;
}

.gst-event-card-variant-6.gst-event-card--expanded .gst-event-card-variant-6__content::before {
    opacity: 0;
}

@include mobile-only {
    .gst-event-card-variant-6 {
        .gst-event-card-variant-6__content {
            .gst-card-icon-container.gst-ticket-offer-price-icon {
                width: auto;
                min-width: 196px;
            }
        }
    }

    .gst-event-card-variant-6.gst-event-card--expanded {
        background-color: theme-color( 'quinary' ) !important;
        box-shadow: none !important;
        border-radius: border-radius( 'none' );

        .gst-event-card-variant-6__content {
            background-color: theme-color( 'quinary' ) !important;
            border-radius: border-radius( 'none' ) !important;
        }
    }
}
</style>
