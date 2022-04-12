<template>
    <v-card 
        flat 
        class="gst-event-card gst-event-card-variant-1 px-0" 
        :class="{ 'gst-event-card--cancelled': isStatusCancelled }"
        :title="event.name">
        <v-layout align-center>
            <v-flex d-flex>
                <v-flex shrink class="d-flex align-start align-md-center">
                    <DateIcon outlined :start-date="event.startDateTime" :end-date="event.endDateTime" />
                </v-flex>
                <v-flex class="pl-4 xs12 d-flex flex-column align-md-center flex-md-row">
                    <v-flex 
                        :class="{
                            'pr-0 pr-md-10': hasPriceIcon && hasTicketAvailable
                        }">
                        <h5>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                class="gst-event-card-variant-1__title hyphens clamp">
                                {{ event.name }}
                            </VClamp>
                        </h5>
                        <v-flex class="d-flex align-center">
                            <VenueInfo 
                                :max-lines="contentMaxLines"
                                class="gst-event-card-variant-1__venue gst-event-card__venue flex-grow-1 hyphens clamp mb-md-1"
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
</template>
<script>
    import VClamp from 'vue-clamp';
    import eventConstants from '@core/utils/constants/event';
    import {
        hasTicketAvailable as eventUtilsHasTicketAvailable
    } from '@core/utils/eventUtils';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';
    import EventStatusChip from '@core/shared/components/event/EventStatusChip.vue';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'EventCardVariant1',
        components: {
            DateIcon,
            VClamp,
            EventStatusChip,
            VenueInfo
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
            currency( ) {
                const { event } = this;
                return event.currency;
            },
            loyaltyCurrency( ) {
                const { event } = this;
                return event.loyaltyCurrency;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-event-card-variant-1 {
    position: relative;
    max-width: 100%;

    .gst-event-card-variant-1__title {
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.47px;
    }

    .gst-event-card-variant-1__price,
    .gst-event-card-variant-1__venue {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
    }

    .gst-event-card-variant-1__price {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );

        .price {
            color: theme-color( 'primary' );
            font-weight: font-weight( 'bold' );
        }
    }
}

@include mobile-only {
    .gst-event-card-variant-1 {
        .gst-card-icon-container.gst-ticket-offer-price-icon {
            width: auto;
            min-width: 196px;
        }
    }
}
</style>
