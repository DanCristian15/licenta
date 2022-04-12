<template>
    <div class="gst-hotel-reservation d-md-block">
        <div class="gst-hotel-reservation__details d-flex flex-row flex-md-column justify-md-center">
            <div class="gst-hotel-reservation__details__banner u-position-relative d-flex flex-column justify-center d-md-block">
                <BaseImage
                    :src="hotelImageSrc"
                    class="gst-hotel-reservation__image"
                    :cover="$vuetify.breakpoint.mdAndUp"
                    :container="!$vuetify.breakpoint.mdAndUp" />
            </div>
            <div class="gst-hotel-reservation__details__text">
                <h5>{{ hotel.name }}</h5>
                <p>{{ locationFormatted }}</p>
                <p>{{ totalStayText }}</p>
                <p>{{ accommodation.roomsCount }} x {{ room.name }}</p>
            </div>
        </div>
        <div class="gst-hotel-reservation__dates d-flex flex-row">
            <div>
                <span>{{ $t("checkIn") }}</span>
                <span class="date-bold">{{ checkInDateText }}</span>
                <span v-if="checkInTime">{{ checkInTime }}</span>
            </div>
            <div>
                <span>{{ $t("checkOut") }}</span>
                <span class="date-bold">{{ checkOutDateText }}</span>
                <span v-if="checkOutTime">{{ checkOutTime }}</span>
            </div>
        </div>
        <div class="gst-hotel-reservation__services">
            <HotelCancellationPolicy
                v-if="!isPackageOffer && room.cancellationPolicies"
                :cancellation-policies="room.cancellationPolicies"
                :currency="currency"
                :base-price="hotel.roomRate"
                :accomodation-nights="accommodation.nights" />
            <div v-if="room.mealPlan">
                <IconCheckCircle /> {{ room.mealPlan | capitalizeFirst }}
            </div>
        </div>
    </div>
</template>

<script>
    import format from 'date-fns/format';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import IconCheckCircle from '@core/shared/assets/icons/check_circle.svg';
    import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';
    import { getImageByWidth } from '@tenants/ticketmaster/app/utils/imageModelUtils';
    import HotelCancellationPolicy from '../HotelCancellationPolicy';

    export default {
        name: 'HotelReservationContainer',
        components: {
            BaseImage,
            IconCheckCircle,
            HotelCancellationPolicy
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.containers.hotelReservationContainer'
        },
        props: {
            accommodation: {
                type: Object,
                required: true
            },
            hotel: {
                type: Object,
                required: true
            },
            room: {
                type: Object,
                required: true
            },
            currency: {
                type: String,
                required: true
            },
            isPackageOffer: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            totalStayText( ) {
                const stayText = `${this.$t( 'stayLength' )}`;
                const nightWithCount =  this.$t( '_common:terms.nightWithCount', { count: this.accommodation.nights } );
                return `${stayText} ${nightWithCount}`;
            },
            checkInTime () {
                const { checkInDateTime } = this.hotel.policy;

                if ( !checkInDateTime ) {
                    return;
                }
                return `${this.$t( '_common:terms.from' )} ${this.$options.filters.date( checkInDateTime, 'p' ) }`;
            },
            checkOutTime () {
                const { checkOutDateTime } = this.hotel.policy;

                if ( !checkOutDateTime ) {
                    return;
                }
                return `${this.$t( '_common:terms.until' )} ${this.$options.filters.date( checkOutDateTime, 'p' ) }`;
            },
            checkInDateText ( ) {
                const { startDateTime } = this.accommodation;

                return format( startDateTime, 'iiii • MMM dd, yyyy' );
            },
            checkOutDateText ( ) {
                const { endDateTime } = this.accommodation;

                return  format( endDateTime, 'iiii • MMM dd, yyyy' );
            },
            locationFormatted() {
                const { address } = this.hotel;

                return `${address.address},
                        ${address.cityName},
                        ${address.stateCode || ''},
                        ${address.zipCode || ''}`;
            },
            hotelImageSrc( ) {
                return getImageByWidth( IMAGE_SIZE.LARGE, this.hotel.image );
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-reservation {
    @include border-radius('xs');

    padding: theme-spacing( 4 ) theme-spacing( 2 );
    border: 1px solid theme-color( 'septenary' ) !important;

    .gst-hotel-reservation__details__banner {
        margin: theme-spacing( 'n4' ) theme-spacing( 'n2' ) 0;
        flex: 1;

        .gst-hotel-reservation__image {
            max-height: 215px;
        }

        .fallback-image {
            height: 215px;
        }
    }

    .gst-hotel-reservation__details {
        h5 {
            line-height: line-height( 'xxxl' );
            margin-top: theme-spacing( 4 );
            margin-bottom: theme-spacing( 2 );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
        }

        p {
            line-height: line-height( 'xl' );
            margin-bottom: theme-spacing( 1 );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }
    }

    .gst-hotel-reservation__dates {
        margin-top: theme-spacing( 6 );

        > div {
            flex: 1;

            span {
                display: block;
                width: 100%;
                margin-bottom: theme-spacing( 1 );
                color: theme-color( 'tertiary' );
            }

            .date-bold {
                color: theme-color( 'quaternary' );
                font-weight: font-weight( 'bold' );
            }
        }
    }

    .gst-hotel-reservation__services {
        margin-top: theme-spacing( 4 );

        > div {
            display: flex;
            color: theme-color( 'success' );
            font-size: font-size( 'xxs' );
            align-items: center;

            svg {
                margin-right: theme-spacing( 4 );

                .gst-svg-icon {
                    fill: theme-color( 'success' );
                }
            }
        }
    }

    @include mobile-only {
        padding: theme-spacing( 4 ) theme-spacing( 2 );

        .gst-hotel-reservation__details {
            .gst-hotel-reservation__details__banner {
                margin: 0 theme-spacing( 4 ) 0 0;
                max-width: 30%;

                .fallback-image {
                    height: 100%;
                }
            }

            h5 {
                line-height: line-height( 'xl' );
                margin-top: 0;
                margin-bottom: theme-spacing( 1 );
                font-size: font-size( 's' );
            }

            p {
                line-height: line-height( 'm' );
                font-size: font-size( 'xxs' );
            }
        }

        .gst-hotel-reservation__dates,
        .gst-hotel-reservation__services {
            padding-left: theme-spacing( 3 );
        }

        .gst-hotel-reservation__dates {
            div {
                span {
                    font-size: font-size( 'xxs' );
                }
            }
        }
    }
}
</style>
