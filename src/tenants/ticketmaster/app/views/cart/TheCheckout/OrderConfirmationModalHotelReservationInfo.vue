<template>
    <div class="gst-order-confirmation-modal__hotel-info">
        <div class="image-container">
            <img :src="hotelImageSrc" />
        </div>
        <div class="info-container">
            <div class="event-title-container">
                <span class="event-title">{{ hotel.name }}</span>
                <StarRating :value="hotel.award.rating" class="event-rating" />
            </div>
            <div class="mb-2">
                <div class="info-container__wrapper-icon d-flex justify-center">
                    <CalendarIcon />
                </div>
                <span class="ml-2">
                    {{ period }}
                </span>
            </div>
            <div class="mb-0">
                <div class="info-container__wrapper-icon d-flex justify-center">
                    <LocationIcon />
                </div>
                <span class="ml-2">
                    {{ hotel.address | fullLocation }}
                </span>
            </div>
            <a :href="directionsUrl" target="_blank" class="directions"><strong>{{ $t('getDirections') }}</strong></a>
            <div class="mt-2 mb-3">
                <HotelCancellationPolicy
                    v-if="!isPackageOffer && hotel.roomCancellationPolicies"
                    :cancellation-policies="hotel.roomCancellationPolicies"
                    :currency="hotel.currency"
                    :base-price="hotel.roomRate"
                    :accomodation-nights="hotel.accommodationNights" />
            </div>
            <div class="amenities">
                <span v-for="(item, idx) in hotel.roomAmenities" :key="`${item}-${idx}`">{{ item | roomAmenity }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLang as documentUtilsGetLang } from '@core/utils/documentUtils';
    import CalendarIcon from '@tenants/ticketmaster/app/assets/icons/calendar.svg';
    import LocationIcon from '@tenants/ticketmaster/app/assets/icons/location.svg';
    import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';
    import { getImageByWidth } from '@tenants/ticketmaster/app/utils/imageModelUtils';
    import StarRating from '@/core/shared/components/misc/StarRating.vue';
    import { getRouteBetweenTwoPoints } from '@/core/utils/locationMapUtils';
    import HotelCancellationPolicy from './HotelCancellationPolicy';

    export default {
        name: 'OrderConfirmationModalHotelReservationInfo',
        components: {
            CalendarIcon,
            LocationIcon,
            StarRating,
            HotelCancellationPolicy
        },
        props: {
            hotel: {
                type: Object,
                required: true
            },
            event: {
                type: Object,
                required: true
            },
            isPackageOffer: {
                type: Boolean,
                default: false
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.orderConfirmationModal'
        },
        computed: {
            period( ) {
                const { accommodation } = this.hotel;
                let period = this.$options.filters.datePeriod(
                    accommodation.startDateTime,
                    accommodation.endDateTime,
                    {
                        full: 'eee • MMM d, yyyy',
                        time: 'p',
                        period: 'eee • MMM d',
                        periodFull: 'eee • MMM d, yyyy'
                    },
                    documentUtilsGetLang( ),
                    false
                );

                return `${period} (${this.$t( '_common:terms.nightStayWithCount', { count: accommodation.nights } ) })`;
            },
            hotelImageSrc( ) {
                return getImageByWidth( IMAGE_SIZE.LARGE, this.hotel.image );
            },
            directionsUrl() {
                const hotelLocation = {
                    street: this.hotel.address.address,
                    cityName: this.hotel.address.cityName,
                    stateCode: this.hotel.address.stateCode,
                    countryCode: this.hotel.address.countryCode,
                };

                const eventLocation = {
                    street: this.event.location.address,
                    cityName: this.event.location.cityName,
                    stateCode: this.event.location.stateCode,
                    countryCode: this.event.location.countryCode,
                };

                const directionsUrl = getRouteBetweenTwoPoints( eventLocation, hotelLocation );

                return directionsUrl;
            }
        }
    };
</script>

<style lang="scss">
@import "@scssMixins";
@import "@scssVariables";

.gst-order-confirmation-modal__hotel-info {
    display: flex;
    width: 80%;
    margin-top: theme-spacing( 8 );
    align-items: center;
    justify-content: center;

    .image-container,
    .info-container {
        flex: 1;
    }

    .image-container {
        img {
            min-height: 200px;
            object-fit: cover;
        }
    }

    .info-container {
        display: flex;
        flex-direction: column;
        margin-left: theme-spacing( 4 );

        div {
            display: flex;
            line-height: line-height( 'm' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxs' );
            align-items: center;

            .info-container__wrapper-icon {
                width: 15px;

                svg {
                    width: 15px;
                }
            }
        }

        .event-title-container {
            margin-bottom: theme-spacing( 2 );

            .event-title {
                line-height: line-height( 'xxl' );
                font-size: font-size( 'm' );
                font-weight: font-weight( 'bold' );
            }

            .event-rating {
                position: relative;
                bottom: 1px;
                margin-left: theme-spacing( 2 );
            }
        }

        button {
            width: 220px;
            padding: theme-spacing( 2 ) theme-spacing( 9 );
            margin-bottom: theme-spacing( 2 );
            background: theme-color( 'primary' );
            color: white;
            font-weight: font-weight( 'large' );
            border-radius: 4px;
        }

        .directions {
            line-height: line-height( 'm' );
            margin-top: theme-spacing( 1 );
            color: theme-color( 'primary' );
            font-size: font-size( 'xxs' );
            margin-left: theme-spacing( 6 );
            cursor: pointer;
        }

        .location-img,
        .tickets-img {
            position: relative;
            left: 2px;
        }

        .check-icon {
            .gst-svg-icon {
                fill: theme-color( 'success' );
            }
        }

        .cancellation-policy-label {
            color: theme-color( 'success' );
        }
    }

    .freeCancellation {
        color: theme-color( 'success' );
    }

    .amenities {
        display: flex;
        margin-bottom: theme-spacing( 3 );
        flex-wrap: wrap;

        span {
            padding: theme-spacing( 1 );
            margin: theme-spacing( 1 );
            background: theme-color( 'background-success' );
            color: theme-color( 'success' );
            border-radius: 4px;
        }
    }

    @include mobile-only {
        width: 90% !important;
        flex-direction: column;

        .info-container {
            width: 100% !important;
        }
    }
}
</style>
