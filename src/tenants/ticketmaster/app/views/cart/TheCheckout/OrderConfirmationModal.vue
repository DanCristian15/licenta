<template>
    <div class="gst-order-confirmation-modal d-flex">
        <OrderConfirmationModalHeader class="u-width-100" @close="$emit('close')" />
        <div class="gst-order-confirmation-modal__content d-flex">
            <div class="gst-order-confirmation-modal__header-container d-flex">
                <span class="title">{{ title }}</span>
                <span class="subtitle">{{ $t('ticketsOrder') }} #{{ eventTicketOrderNumber }}</span>
                <span v-if="!hasTicketsOnly" class="subtitle hotel-number">{{ $t('hotelOrder') }} #{{ hotelReservationOrderNumber }}</span>
            </div>
            <OrderConfirmationModalTicketsInfo :event="event" :ticket="ticket" />
            <OrderConfirmationModalHotelReservationInfo v-if="!hasTicketsOnly" :event="event" :hotel="hotel" :is-package-offer="isPackageOffer" />
            <OrderConfirmationModalImportantInfo :is-package-offer="isPackageOffer" />
            <div class="safetix-image-container">
                <img :src="safetixImgSrc" />
            </div>
            <OrderConfirmationModalPaymentInfo
                :currency="currency"
                :payment-items="paymentItems"
                :has-tickets-only="hasTicketsOnly"
                :order="order"
                :is-package-offer="isPackageOffer"
                class="gst-order-confirmation-modal__payment-info" />
            <div v-if="showGoMobileSection" class="gst-order-confirmation-modal__go-mobile d-flex">
                <MobileTicket />
                <span>
                    <strong>{{ $t('goMobile') }}</strong>
                    {{ $t('goMobileInfo') }}
                </span>
            </div>
            <div class="gst-order-confirmation-modal__things-to-know d-flex">
                <div class="title">
                    {{ $t('thingsToKnow') }}
                </div>
                <div class="manage-account-container d-flex" @click="onClickManageAccountDo">
                    <div class="manage-account d-flex">
                        <span>{{ $t('manageYourAccount') }}</span>
                        <span><RightArrow /></span>
                    </div>
                    <div class="help-center d-flex">
                        {{ $t('helpCenter') }}
                    </div>
                </div>
            </div>
            <div class="reduced-width-image">
                <img :src="americanExpressImgSrc" />
            </div>
            <div class="reduced-width-image">
                <img :src="fordImgSrc" />
            </div>
        </div>
    </div>
</template>

<script>
    import { openTicketMasterLoginPage } from '@tenant/app/utils/tenantUrlslUtils';
    import productsConstants from '@core/utils/constants/products';
    import feeConstants from '@core/utils/constants/fee';
    import MobileTicket from '@tenants/ticketmaster/app/assets/icons/mobile_ticket.svg';
    import RightArrow from '@tenants/ticketmaster/app/assets/icons/right_arrow.svg';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import { getRouteToPoint } from '@/core/utils/locationMapUtils';
    import { isMobileTicket } from '@/core/utils/shippingOptionsUtils';
    import OrderConfirmationModalHeader from './OrderConfirmationModalHeader.vue';
    import OrderConfirmationModalTicketsInfo from './OrderConfirmationModalTicketsInfo.vue';
    import OrderConfirmationModalHotelReservationInfo from './OrderConfirmationModalHotelReservationInfo.vue';
    import OrderConfirmationModalImportantInfo from './OrderConfirmationModalImportantInfo.vue';
    import OrderConfirmationModalPaymentInfo from './OrderConfirmationModalPaymentInfo.vue';

    export default {
        name: 'OrderConfirmationModal',
        components: {
            MobileTicket,
            RightArrow,
            OrderConfirmationModalHeader,
            OrderConfirmationModalTicketsInfo,
            OrderConfirmationModalHotelReservationInfo,
            OrderConfirmationModalImportantInfo,
            OrderConfirmationModalPaymentInfo
        },
        mixins: [
            CloseModalOnRouteChangeMixin
        ],
        props: {
            order: {
                type: Object,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.orderConfirmationModal'
        },
        computed: {
            eventTicket( ) {
                return this.order.items
                    .find( item => item.productTypeId === productsConstants.TYPES.TICKET );
            },
            eventTicketItems( ) {
                return this.eventTicket.offers;
            },
            eventTicketOrderNumber( ) {
                return this.eventTicket.orderNumber;
            },
            hotelReservation( ) {
                return this.order.items
                    .find( item => item.productTypeId === productsConstants.TYPES.HOTEL_RESERVATION );
            },
            hotelReservationOrderNumber( ) {
                return this.hotelReservation.orderNumber;
            },
            hasTicketsOnly( ) {
                return !this.hotelReservation;
            },
            title( ) {
                return this.hasTicketsOnly ? this.$t( 'ticketsOnlyTitle' ) : this.$t( 'hotelAndTicketsTitle' );
            },
            event() {
                const { name, imageUrl: image, startDateTime, endDateTime, venueName, address } = this.eventTicket.event;
                const directionsUrl = getRouteToPoint( {
                    street: address.street,
                    cityName: address.cityName,
                    stateCode: address.stateCode,
                    countryCode: address.countryCode,
                } );

                return {
                    name,
                    image,
                    startDateTime,
                    endDateTime,
                    venueName,
                    location: {
                        ...address,
                    },
                    directionsUrl
                };
            },
            ticket() {
                const { eventTicket } = this;
                const { ticket } = eventTicket;
                const { row, section, seats } = ticket;

                return {
                    packageOfferId: eventTicket.packageOfferId,
                    redemptionUrl: eventTicket.redemptionUrl,
                    seat: {
                        row,
                        section,
                        seats
                    }
                };
            },
            hotel() {
                const { hotelReservation } = this;

                if ( !hotelReservation ) {
                    return { };
                }

                const { accommodation, hotel } = hotelReservation;
                const { room } = hotel;


                return {
                    name: hotel.name,
                    address: hotel.address,
                    image: hotel.image,
                    accommodation: accommodation,
                    roomCancellationPolicies: room.rate.cancellationPolicies,
                    roomAmenities: hotel.room.amenities,
                    award: hotelReservation.hotel.award,
                    currency: this.order.currency,
                    roomRate: hotelReservation.basePrice,
                    accommodationNights: hotelReservation.accommodation.nights,
                };
            },
            currency( ) {
                return this.order.currency;
            },
            paymentItems( ) {
                const { eventTicketItems, hasTicketsOnly, hotelReservation } = this;

                const ret = eventTicketItems.reduce( ( acc, item ) => {
                    acc = [
                        ...acc,
                        {
                            name: item.name,
                            quantity: item.quantity
                        }
                    ];

                    return acc;
                }, [] );

                if ( !hasTicketsOnly )  {
                    ret.push( {
                        name: hotelReservation.hotel.room.name.toLowerCase(),
                        quantity: hotelReservation.accommodation.roomsCount
                    } );
                }
                return ret;
            },
            safetixImgSrc() {
                return require( '../../../assets/safetix.png' );
            },
            americanExpressImgSrc() {
                return require( '../../../assets/american-express.png' );
            },
            fordImgSrc() {
                return require( '../../../assets/ford.png' );
            },
            showGoMobileSection() {
                const deliveryInfo = this.eventTicket.charges.find( item => item.type === feeConstants.TYPES.DELIVERY ).info || {};

                return isMobileTicket( deliveryInfo );
            },
            isPackageOffer() {
                return !!this.ticket.packageOfferId;
            }
        },
        methods: {
            onClickManageAccountDo() {
                openTicketMasterLoginPage();
            }
        }
    };
</script>

<style lang="scss">
@import "@scssMixins";
@import "@scssVariables";

.gst-order-confirmation-modal {
    background-color: theme-color( 'white' );
    color: theme-color( 'quaternary' );
    flex-direction: column;
    align-items: center;

    .gst-order-confirmation-modal__content {
        padding: 0 20%;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    .gst-order-confirmation-modal__header-container {
        width: 100%;
        padding: 44px;
        margin-top: theme-spacing( 7 );
        background: #0B309A;
        color: white;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .title {
            line-height: 43px !important;
            margin-bottom: theme-spacing( 3 );
            font-size: 34px !important;
            font-weight: font-weight( 'bold' );
            font-family: "Averta Std", sans-serif !important;
            text-align: center;
        }

        .subtitle {
            line-height: line-height( 'xxl' ) !important;
            font-size: font-size( 'm' ) !important;
            font-weight: font-weight( 'bold' );
            font-family: "Averta Std", sans-serif !important;
            text-align: center;
        }

        .hotel-number {
            margin-top: theme-spacing( 2 );
        }
    }

    .gst-order-confirmation-modal__payment-info {
        width: 80%;
    }

    .gst-order-confirmation-modal__go-mobile {
        width: 80%;
        line-height: line-height( 'xs' );
        padding: theme-spacing( 4 ) theme-spacing( 6 );
        background: theme-color( 'quinary' );
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxs' );
        border-radius: 1px;
        align-items: center;

        span {
            margin-left: theme-spacing( 3 );
        }
    }

    .gst-order-confirmation-modal__things-to-know {
        width: 80%;
        margin-top: theme-spacing( 4 );
        flex-direction: column;

        .title {
            line-height: line-height( 'xxl' ) !important;
            padding: theme-spacing( 4 );
            background: linear-gradient( 270deg, #026CDF 0%, #0150A7 100% );
            color: white;
            font-size: font-size( 'l' ) !important;
            font-weight: font-weight( 'bold' );
            font-family: "Averta Std", sans-serif !important;
        }

        .manage-account-container {
            padding: theme-spacing( 4 );
            border: 1px solid theme-color( 'senary' );
            flex-direction: column;
            border-top: 0;

            .manage-account {
                line-height: line-height( 'm' );
                padding-bottom: theme-spacing( 3 );
                color: #000000;
                font-size: font-size( 'xxs' );
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid theme-color( 'senary' );
                cursor: pointer;
            }

            .help-center {
                line-height: line-height( 'm' );
                padding: theme-spacing( 5 ) 0 theme-spacing( 1 );
                color: theme-color( 'primary' );
                font-size: font-size( 'xxs' );
                font-weight: font-weight( 'bold' );
                align-items: center;
                justify-content: center;
            }
        }
    }

    img {
        width: 100%;
    }

    .reduced-width-image {
        width: 80%;
        margin-top: theme-spacing( 8 );
    }

    .safetix-image-container {
        width: 100%;
        margin-top: theme-spacing( 8 );
    }
}

@include mobile-only {
    .gst-order-confirmation-modal {
        .gst-order-confirmation-modal__content {
            padding: 0 !important;
        }

        .gst-order-confirmation-modal__header-container {
            margin-top: theme-spacing( 2 );

            .title {
                line-height: 30px !important;
                font-size: 24px !important;
            }

            .subtitle {
                line-height: 17px !important;
                font-size: 14px !important;
            }
        }

        .gst-order-confirmation-modal__payment-info,
        .gst-order-confirmation-modal__go-mobile,
        .gst-order-confirmation-modal__things-to-know {
            width: 95% !important;
        }

        .reduced-width-image {
            width: 100% !important;
        }
    }
}
</style>
