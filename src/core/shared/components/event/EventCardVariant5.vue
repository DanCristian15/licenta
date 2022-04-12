<template>
    <v-card 
        :to="to" 
        :title="item.name"
        :data-test-id="$attrs['data-test-id']"
        flat
        class="gst-event-card gst-event-card-variant-5 px-0"
        :class="{
            'gst-event-card-variant-5--not-favorite': !isFavorite,
            'gst-event-card--cancelled': isStatusCancelled
        }">
        <v-layout align-md-center>
            <v-flex class="gst-event-card-variant-5__content d-flex flex-no-wrap">
                <v-flex shrink class="d-flex align-start align-md-center">
                    <DateIcon outlined :start-date="item.startDateTime" :end-date="item.endDateTime" />
                </v-flex>
                <v-flex class="pl-4 xs12 d-flex flex-column align-md-center flex-md-row">
                    <v-flex
                        :class="{
                            'pr-0 pr-md-10': hasPriceIcon && hasTicketAvailable
                        }">
                        <h5 class="d-flex flex-row">
                            <VClamp
                                autoresize
                                :max-lines="1"
                                class="gst-event-card-variant-5__title hyphens clamp">
                                {{ item.name }}
                            </VClamp>
                        </h5>
                        <v-flex class="d-flex align-center">
                            <VenueInfo 
                                class="gst-event-card-variant-5__venue gst-event-card__venue flex-grow-1 hyphens clamp mb-md-1"
                                :item="venueInfoLocation">
                                <template slot="before">
                                    <EventStatusChip 
                                        class="mr-1" 
                                        :status="item.eventStatus" />
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
                            :price="item.minPrice" 
                            :points="offerPoints" 
                            :currency="currency"
                            :loyalty-currency="loyaltyCurrency"
                            :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney" 
                            :is-starting-price="item.minPrice !== item.maxPrice" />
                    </v-flex>
                </v-flex>
            </v-flex>
            <v-flex
                class="flex-grow-0 pl-2 pl-md-4 mt-2 mt-md-0"
                d-flex
                wrap>
                <v-flex
                    grow
                    align-self-start
                    text-right>
                    <FavoriteEntityButton 
                        class="gst-event-card-variant-5__favorite-button" 
                        :entity-type="entityType" 
                        :entity-id="item.id"
                        variant="variant2" />
                </v-flex>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import { mapGetters } from 'vuex';
    import eventConstants from '@core/utils/constants/event';
    import entityConstants from '@core/utils/constants/entity';
    import {
        hasTicketAvailable as eventUtilsHasTicketAvailable
    } from '@core/utils/eventUtils';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';
    import EventStatusChip from '@core/shared/components/event/EventStatusChip.vue';
    import FavoriteEntityButton from '@core/shared/components/buttons/FavoriteEntityButton.vue';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'EventCardVariant5',
        components: {
            DateIcon,
            FavoriteEntityButton,
            VClamp,
            EventStatusChip,
            VenueInfo
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            withTo: {
                type: Boolean,
                default: true
            },
            withPriceIcon: {
                type: Boolean,
                default: false
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            ...mapGetters( 'user/favoriteEntities', {
                isEntityFavorite: 'isFavorite'
            } ),
            hasPriceIcon() {
                return this.withPriceIcon;
            },
            offerPoints( ) {
                return this.item.bonusPoints;
            },
            eventDateTime( ) {
                if ( this.item.startDateTime ) {
                    return this.item.hasStartTime ? this.$options.filters.time( this.item.startDateTime ) : '';
                }
                return this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            entityType() {
                return entityConstants.TYPES.EVENT;
            },
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name: 'event', params: { id: item.id } } : null;
            },
            isFavorite( ) {
                const { entityType, item } = this;

                return this.isEntityFavorite( entityType, item.id );
            },
            isStatusCancelled() {
                return this.item.eventStatus === eventConstants.EVENT_STATUS.CANCELLED;
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.item;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };
            },
            hasTicketAvailable( ) {
                return eventUtilsHasTicketAvailable( this.item );
            },
            currency( ) {
                const { item } = this;
                return item.currency;
            },
            loyaltyCurrency( ) {
                const { item } = this;
                return item.loyaltyCurrency;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-event-card-variant-5 {
    position: relative;
    max-width: 100%;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;

    .gst-event-card-variant-5__title {
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.47px;
    }

    .gst-event-card-variant-5__price,
    .gst-event-card-variant-5__venue {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
    }

    .gst-event-card-variant-5__price {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );

        .price {
            color: theme-color( 'primary' );
            font-weight: font-weight( 'bold' );
        }
    }
}

.gst-event-card-variant-5.gst-event-card-variant-5--not-favorite {
    .gst-event-card-variant-5__content {
        opacity: 0.2;
    }
}

@include mobile-only {
    .gst-event-card-variant-5 {
        .gst-card-icon-container.gst-ticket-offer-price-icon {
            width: auto;
            min-width: 196px;
        }
    }
}
</style>
