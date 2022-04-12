<template>
    <router-link :to="{ name:'event', params: { id: event.id } }" :data-test-id="$attrs['data-test-id']">
        <v-card class="gst-event-card gst-event-card-variant-2 mx-auto u-box-shadow">
            <v-img
                :src="imageSrc"
                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="230px"
                @error="errorLoadingImage = true">
                <v-flex class="py-0 fill-height">
                    <v-row class="fill-height">
                        <v-container
                            wrap
                            class="pt-2 pr-2 d-flex">
                            <v-flex class="py-0 px-0" align-self-start shrink>
                                <DateIcon :start-date="event.startDateTime" :end-date="event.endDateTime" />
                            </v-flex>
                            <v-flex
                                d-flex
                                justify-end
                                align-self-start
                                class="gst-event-card-variant-2__bonus-points-chip py-0 pr-0 pl-2">
                                <TenantBonusPointsChip
                                    v-if="hasTicketAvailable"
                                    :points="event.bonusPoints"
                                    :currency="loyaltyCurrency || currency"
                                    :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney" />
                            </v-flex>
                            <v-flex class="gst-event-card-variant-2__fav py-0 px-0" align-self-start shrink>
                                <FavoriteEntityButton :entity-type="entityType" :entity-id="event.id" />
                            </v-flex>
                        </v-container>
                        <v-card-title class="gst-event-card-variant-2__title d-flex align-start justify-end flex-column u-width-100 py-0">
                            <VClamp
                                autoresize
                                :max-lines="2"
                                class="hyphens clamp">
                                {{ event.name }}
                            </VClamp>
                        </v-card-title>
                        <v-card-text class="d-flex flex-grow-0 flex-row pt-0">
                            <v-flex d-flex flex-column justify-end class="px-0 py-0">
                                <VenueInfo
                                    :max-lines="1"
                                    class="hyphens pr-2"
                                    :item="venueInfoLocation">
                                    <template v-if="eventDateTime">
                                        {{ eventDateTime }} &#183;
                                    </template>
                                </VenueInfo>
                            </v-flex>
                            <div
                                v-if="event.minPrice && hasTicketAvailable"
                                class="gst-event-card-variant-2__price text-right">
                                <span class="label">{{ $t('_common:terms.from') }}</span>
                                <br />
                                <span class="price">{{ event.minPrice | currencyFull( event.currency ) }}</span>
                            </div>
                        </v-card-text>
                    </v-row>
                </v-flex>
            </v-img>
        </v-card>
    </router-link>
</template>
<script>
    import VClamp from 'vue-clamp';
    import categoriesConstants from '@core/utils/constants/categories';
    import entityConstants from '@core/utils/constants/entity';
    import {
        hasTicketAvailable as eventUtilsHasTicketAvailable
    } from '@core/utils/eventUtils';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';
    import FavoriteEntityButton from '@core/shared/components/buttons/FavoriteEntityButton.vue';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'EventCardVariant2',
        components: {
            DateIcon,
            FavoriteEntityButton,
            VClamp,
            VenueInfo
        },
        props: {
            event: {
                type: Object,
                required: true
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                errorLoadingImage: false
            };
        },
        computed: {
            imageSrc() {
                const { errorLoadingImage, fallbackSrc } = this;
                const { imageUrl } = this.event;

                if ( errorLoadingImage ) {
                    return this.fallbackSrc;
                } else {
                    return imageUrl || fallbackSrc;
                }
            },
            fallbackSrc() {
                let found = categoriesConstants.LIST.find( item => item.ID === this.event.classificationSegmentId );
                return found ? found.FALLBACK : categoriesConstants.DEFAULT_FALLBACK ;
            },
            entityType() {
                return entityConstants.TYPES.EVENT;
            },
            eventDateTime( ) {
                if ( this.event.startDateTime ) {
                    return this.event.hasStartTime ? this.$options.filters.time( this.event.startDateTime ) : '';
                }
                return this.$t( '_common:terms.dateAndTimeToBeDetermined' );
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

.clamp {
    max-width: 85%;
}

.gst-event-card-variant-2 {
    position: relative;
    max-width: 100%;

    .gst-event-card-variant-2__price {
        .label {
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'black' );
            letter-spacing: 1px;
            text-transform: uppercase;
            opacity: 0.6;
        }

        .price {
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'medium' );
        }
    }

    .gst-event-card-variant-2__bonus-points-chip {
        overflow: hidden;
    }

    .gst-event-card-variant-2__fav {
        margin-top: -7px;
    }

    .gst-event-card-variant-2__title {
        font-size: font-size( 'xxxxxl' );
        font-weight: font-weight( 'bold' );
        letter-spacing: -0.88px;
        min-height: 100px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
        word-break: break-word;
    }
}

.gst-event-card-variant-2.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}
</style>
