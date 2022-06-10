<template>
    <div class="gst-checkout">
        <HeaderWithCountDown :date-time-till="cart.expireAt" @click-logo="leave( true )" @finish="expire()" />
        <div v-if="cart && cart.id && !loading" class="row">
            <div class="col col-12 col-md-8 no-gutters py-0 px-4 pl-md--6 px-8 py-8">
                <PaymentProviderDownContainer
                    v-if="showPaymentProviderDownContainer"
                    @back="leave"
                    @reload="onReloadPaymentProviderDo" />
                <div v-else>
                    <template v-if="!$vuetify.breakpoint.mdAndUp">
                        <EventTicketContainer
                            v-bind="propsEventTicket" />
                        <HotelReservationContainer v-if="!hasTicketsOnly" v-bind="propsHotelReservation" class="mt-4" />
                    </template>
                    <DetailFieldset
                        v-if="!hasTicketsOnly"
                        :customer-model="customerModel"
                        :validation="$v"
                        :extract-validations-messages-fn="_extractValidationsMessages" />
                    <PaymentFieldsetTicketsOnly
                        v-if="hasTicketsOnly"
                        :customer-model="customerModel"
                        :payment-client-model="paymentClientModel"
                        :validation="$v"
                        :extract-validations-messages-fn="_extractValidationsMessages"
                        :use-payment-client="usePaymentClient"
                        @instancePaymentClientComputed="value => instancePaymentClient = value"
                        @updatePaymentFieldsValidity="value => validProviderPaymentFields = value" />
                    <PaymentFieldsetHotelAndTickets
                        v-else
                        :customer-model="customerModel"
                        :payment-model="paymentModel"
                        :payment-client-model="paymentClientModel"
                        :use-payment-client="usePaymentClient"
                        :validation="$v"
                        :extract-validations-messages-fn="_extractValidationsMessages"
                        @instancePaymentClientComputed="value => instancePaymentClient = value"
                        @updatePaymentFieldsValidity="value => validProviderPaymentFields = value" />
                    <ShipmentFieldset
                        :has-tickets-only="hasTicketsOnly"
                        :shipping-model="shippingModel"
                        :validation="$v"
                        :extract-validations-messages-fn="_extractValidationsMessages" />
                </div>
            </div>
            <div class="gst-checkout__cart-info col col-12 col-md-4 py-0 px-4 pr-md-8 py-8">
                <template v-if="!$vuetify.breakpoint.mdAndUp">
                    <EventHealthCheckContainer v-if="eventHealthCheck" :health-check="eventHealthCheck" />
                </template>
                <Action
                    :agree-model="agreeModel"
                    :order="order"
                    :cart-collections="cartCollections"
                    :shipping-model="shippingModel"
                    :validation="$v"
                    :extract-validations-messages-fn="_extractValidationsMessages"
                    :instance-payment-client="instancePaymentClient"
                    :use-payment-client="usePaymentClient"
                    :total-price="totalPrice"
                    :event-health-check="eventHealthCheck"
                    :has-tickets-only="hasTicketsOnly"
                    :is-payment-provider-down="isPaymentProviderDown"
                    :is-package-offer="isPackageOffer"
                    class="mb-2"
                    @cancel="leave"
                    @submit="save" />
                <template v-if="$vuetify.breakpoint.mdAndUp">
                    <EventTicketContainer class="mt-4" v-bind="propsEventTicket" />
                    <HotelReservationContainer v-if="!hasTicketsOnly" v-bind="propsHotelReservation" class="mt-4" />
                    <EventHealthCheckContainer v-if="hasTicketsOnly && eventHealthCheck" :health-check="eventHealthCheck" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters, mapState, mapActions } from 'vuex';
    import { redirectToHome  } from '@tenant/app/utils/tenantUrlslUtils';
    import ticketConstants from '@core/utils/constants/ticket';
    import productsConstants from '@core/utils/constants/products';
    import apiConstants from '@core/utils/constants/api';
    import { getFromApiResponse as notificationUtilsGetFromApiResponse } from '@core/utils/notificationUtils';
    import apiServicePayments from '@core/api/apiServicePayments';
    import statesStoreModule from '@core/store/modules/states';
    import countriesStoreModule from '@core/store/modules/countries';
    import LogService from '@/core/services/LogService.js';
    import WarnBeforeLeave from '@core/mixins/WarnBeforeLeave';
    import zIndex from '@scss/mixins/_z-index-export-js.scss';
    import DynamicStoreModule from '@/core/mixins/DynamicStoreModule';
    import { getCardProvider } from '@/tenants/ticketmaster/app/utils/cardUtils';
    import FormMixin from './TheCheckoutFormMixin.js';
    import HeaderWithCountDown from './TheCheckout/HeaderWithCountDown.vue';
    import Action from './TheCheckout/Action.vue';
    import DetailFieldset from './TheCheckout/Fieldsets/DetailFieldset.vue';
    import PaymentFieldsetHotelAndTickets from './TheCheckout/Fieldsets/PaymentFieldsetHotelAndTickets.vue';
    import PaymentFieldsetTicketsOnly from './TheCheckout/Fieldsets/PaymentFieldsetTicketsOnly.vue';
    import ShipmentFieldset from './TheCheckout/Fieldsets/ShipmentFieldset.vue';
    import EventHealthCheckContainer from './TheCheckout/Containers/EventHealthCheckContainer.vue';
    import EventTicketContainer from './TheCheckout/Containers/EventTicketContainer.vue';
    import HotelReservationContainer from './TheCheckout/Containers/HotelReservationContainer.vue';
    import PaymentProviderDownContainer from './TheCheckout/Containers/PaymentProviderDownContainer.vue';

    const STORE_NAME = 'cart';
    const STORE_COUNTRIES = 'countries';

    export default {
        name: 'TheCheckout',
        components: {
            HeaderWithCountDown,
            Action,
            DetailFieldset,
            PaymentFieldsetHotelAndTickets,
            PaymentFieldsetTicketsOnly,
            ShipmentFieldset,
            EventTicketContainer,
            HotelReservationContainer,
            EventHealthCheckContainer,
            PaymentProviderDownContainer
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout'
        },
        testIdOptions: {
            keyPrefix: 'checkout'
        },
        mixins:[
            FormMixin,
            WarnBeforeLeave,
            DynamicStoreModule
        ],
        data( ) {
            return {
                loading: true,
                currentStep: 0,
                busEvents: new Vue( ),
                busEventProgressStep: new Vue( ),
                paymentClientModel: {
                    token: null,
                    providerId: null,
                    errorContacting: false,
                },
                /**
                 * checkoutResponse is the order object
                 */
                checkoutResponse: false,
                testEventId: 106710000,
                hasTicketsOnly: true,
                instancePaymentClient: {},
                cardInfo: {},
                validProviderPaymentFields: false,
            };
        },
        computed: {
            ...mapGetters( {
                isCartExpired: `${STORE_NAME}/isExpired`,
                isCartSubmitted: `${STORE_NAME}/isSubmitted`,
                userIsAuth: 'user/profile/isAuth',
                userBalance: 'user/profile/balance'
            } ),
            ...mapState( {
                cart:   state => state[STORE_NAME].current,
                countries: state => state[STORE_COUNTRIES].list
            } ),
            routeCartId( ) {
                return this.$route.params.cartId;
            },
            cartCollections( ) {
                return this.cart.collections;
            },
            tickets( ) {
                return this.cartCollections
                    .filter( item => item.productTypeId === productsConstants.TYPES.TICKET );
            },
            ticket( ) {
                return this.tickets[ 0 ];
            },
            ticketItem( ) {
                return this.ticket.items[0];
            },
            order( ) {
                return this.cart.order;
            },
            currency( ) {
                return this.order.currency;
            },
            hasResaleItems( ) {
                return !!this.tickets.find( item => item.selection === ticketConstants.TYPES.RESALE );
            },
            hotelReservation( ) {
                return this.cartCollections
                    .find( item => item.productTypeId === productsConstants.TYPES.HOTEL_RESERVATION );
            },
            eventHealthCheck( ) {
                return this.ticket.info.healthCheck;
            },
            propsEventTicket( ) {
                const { ticket, ticketItem, cart } = this;
                const { info } = ticket;

                return {
                    eventName: info.name,
                    eventAddress: {
                        venueName: info.venueName,
                        city: info.venueCity,
                        stateCode: info.venueStateCode,
                        street: info.venueStreet,
                        countryCode: info.venueCountryCode
                    },
                    eventStartDate: info.startDateTime,
                    eventEndDate: info.endDateTime,
                    bannerImage: info.imageUrl,
                    ticketItem: ticketItem,
                    venueSeatMapUrl: cart.venueSeatMapUrl
                };
            },
            propsHotelReservation( ) {
                const { hotelReservation } = this;

                return {
                    accommodation: hotelReservation.accommodation,
                    hotel: {
                        name: hotelReservation.hotel.name,
                        image: hotelReservation.hotel.image,
                        address: hotelReservation.hotel.address,
                        policy: hotelReservation.hotel.policy,
                        roomRate: hotelReservation.totalPrice
                    },
                    room: {
                        name: hotelReservation.hotel.room.name,
                        mealPlan: hotelReservation.hotel.room.rate.mealPlan,
                        cancellationPolicies: hotelReservation.hotel.room.rate.cancellationPolicies
                    },
                    currency: this.order.currency,
                    isPackageOffer: this.isPackageOffer
                };
            },
            totalPrice( ) {
                const { shippingModel, order } = this;
                const delivery = shippingModel.options.find( value => value.id === shippingModel.optionId );
                const totalWithoutDelivery = order.totalPrice - order.totalDelivery;

                if ( !delivery ) {
                    return totalWithoutDelivery;
                }
                return totalWithoutDelivery + delivery.totals.fee;
            },
            isPackageOffer( ) {
                return !!this.ticket.packageOfferId;
            },
            usePaymentClient( ) {
                const { hasTicketsOnly, isPackageOffer } = this;
                return hasTicketsOnly || isPackageOffer;
            },
            showPaymentProviderDownContainer( ) {
                const { usePaymentClient, paymentClientModel, loading } = this;
                if ( usePaymentClient ) {
                    return paymentClientModel.errorContacting && !loading;
                }

                return false; //TODO: here need to be handle payment provider down for tickets & hotel
            },
            isPaymentProviderDown( ) {
                const { paymentClientModel, usePaymentClient } = this;
                if ( usePaymentClient ) {
                    return paymentClientModel.errorContacting;
                }

                return false; //TODO: here need to be handle payment provider down for tickets & hotel
            }
        },
        watch: {
            customerModel: {
                deep: true,
                handler: function ( newValue ) {
                    this.saveModelOnStore( {
                        customerModel: JSON.parse( JSON.stringify( newValue ) )
                    } );
                }
            },
            'customerModel.country': {
                handler: function ( value, oldValue ) {
                    if ( value ) {
                        if ( value !== oldValue ) {
                            this.loadShippingOptionsForCountry( );
                        }
                    } else {
                        this.clearShippingOptions( );
                    }
                },
                deep: true
            },
        },
        methods: {
            ...mapActions( {
                notificationWarning: 'notification/warning',
                notificationError:          'notification/error',
                showLoadingOverlay:         'appState/setLoading',
                checkoutCart:               'cart/checkout',
                instantDeleteCurrentCart:   'cart/instantDeleteCurrentCart',
                saveModelOnStore:           'cart/setCheckoutWizard',
                clearCart:                  'cart/clear',
                addShippingOption:          'cart/addShippingOption',
                getShippingOptions:         'cart/getShippingOptions',
                getCart:                    'cart/get',
                getCountries:               `${STORE_COUNTRIES}/get`
            } ),
            expire( ) {
                this.unbindWarnBeforeYouLeaveMixin( );
                this.showExpireErrorMessage( );
                redirectToHome();
            },
            leave( goToHome = false ) {
                this.$modal.show(
                    ( ) => import( './TheCheckout/ConfirmLeaveModal' ),
                    {
                        onConfirmFn: ( ) => {
                            this.unbindWarnBeforeYouLeaveMixin( );
                            this.instantDeleteCurrentCart();
                            if ( goToHome ) {
                                redirectToHome( );
                            } else {
                                this.$router.back( );
                            }
                        }
                    },
                    {
                        'max-width': 800,
                        persistent: true,
                        'no-click-animation': true
                    }
                );
                return;
            },
            async requestPayment( ) {
                return new Promise( ( resolve ) => {
                    const getCardInfo = ( payload ) => {
                        return payload ? {
                            'token': payload.nonce,
                            'expireMonth': parseInt( payload.details.expirationMonth ),
                            'expireYear': parseInt( payload.details.expirationYear ),
                            'type': payload.details.cardType,
                            'lastFour': payload.details.lastFour,
                        } : null;
                    };

                    if ( this.usePaymentClient ) {
                        this.instancePaymentClient.requestPaymentMethod ( ( error, payload ) => {
                            resolve ( {
                                fnPayment: ( callback ) => {
                                    callback( error, getCardInfo( payload ) );
                                }
                            } );
                        } );
                    } else {
                        resolve ( {
                            fnPayment: ( callback ) => {
                                callback( false, null );
                            }
                        } );
                    }
                } );
            },
            async save( ) {
                this.$v.$touch();
                if ( this.usePaymentClient && !this.validProviderPaymentFields ) {
                    this.requestPayment( );
                }

                if ( this.$v.$invalid
                    || ( this. usePaymentClient && !this.validProviderPaymentFields ) ) {
                    return;
                }

                const getPayload = ( card ) => {
                    const { firstName, lastName, email, address, zip, city, state, country, phone } = this.customerModel;
                    const { cardCVV, cardNumber, cardExpire } = this.paymentModel;
                    const [ cardExpirationMonth, cardExpirationYear ] = cardExpire.split( '/' );
                    const formattedCardNumber = cardNumber.replace( /\s/g, '' );
                    const cardProvider = getCardProvider( formattedCardNumber );

                    const cardInfo = card ? {
                        ...card,
                        paymentType: this.paymentClientModel.providerId
                    } : {
                        expireMonth: Number( cardExpirationMonth ),
                        expireYear: Number( `20${cardExpirationYear}` ),
                        type: cardProvider,
                        number: formattedCardNumber,
                        cvv: cardCVV
                    };

                    return {
                        user:{
                            firstName,
                            lastName,
                            email,
                            phone
                        },
                        address: Object.assign( {
                            street: address,
                            city,
                            zip,
                            countryCode: country,
                            stateCode: state
                        }, this.hasResaleItems ? { phone } : null ),
                        card: cardInfo,
                        redeem: {
                            money: this.totalPrice,
                            points: 0
                        }
                    };
                };

                const onCheckoutErrorDo = async ( response ) => {
                    const hotelProviderRelatedErrorCodes = Object.values( apiConstants.ERROR_CODES.HOTEL_PROVIDER );
                    const { code } = response;

                    const i18Prefix = '_common:messageServerErrorCodesFromContext.purchase';

                    if ( !hotelProviderRelatedErrorCodes.includes( code ) ) {
                        await this.initPaymentClient( );
                        this.busEventProgressStep.$emit( 'go-to-end' );
                    } else {
                        this.unbindWarnBeforeYouLeaveMixin( );
                        this.instantDeleteCurrentCart();
                        this.$router.back( );
                    }

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
                        default:
                            this.notificationError( notificationUtilsGetFromApiResponse( response ) );
                            break;
                    }
                };

                this.$modal.show(
                    import ( '@tenants/ticketmaster/app/components/modals/ProgressStepAnimationModal.vue' ),
                    {
                        title: this.$t( 'progressStepAnimationModal.title' ),
                        description: this.$t( 'progressStepAnimationModal.description' ),
                        labels: [
                            this.$t( `progressStepAnimationModal.labels.${this.hasTicketsOnly ? 'ticketsOnly' : 'hotelAndTickets'}.step1Verifying` ),
                            this.$t( `progressStepAnimationModal.labels.${this.hasTicketsOnly ? 'ticketsOnly' : 'hotelAndTickets'}.step2Processing` ),
                            this.$t( `progressStepAnimationModal.labels.${this.hasTicketsOnly ? 'ticketsOnly' : 'hotelAndTickets'}.step3Finalizing` )
                        ],
                        busEvent: this.busEventProgressStep,
                        endOnRouteChange: false
                    },
                    {
                        style: `z-index: ${zIndex.highest}`,
                        'no-click-animation': true,
                        persistent: true,
                        scrollable: false,
                        fullscreen: true,
                        'hide-overlay': true
                    },
                    {
                        open: async ( ) => {
                            await this.saveShippingOption( );
                            const { fnPayment } = await this.requestPayment( );

                            fnPayment( ( error, cardInfo ) => {
                                if ( error ) {
                                    this.busEventProgressStep.$emit( 'close' );
                                    this.notificationError( this.$t( 'messages.formHasError' ) );

                                    return;
                                } else {
                                    this.busEventProgressStep.$emit( 'go-to-step', 3 );
                                    const data = getPayload ( cardInfo );
                                    this.cardInfo = { ...data };

                                    this.checkoutCart( { id: this.cart.id, data } )
                                        .then( response => {
                                            if ( response.success ) {
                                                this.checkoutResponse = response;
                                                this.busEventProgressStep.$emit( 'go-to-end' );
                                                this.unbindWarnBeforeYouLeaveMixin( );
                                            } else {
                                                onCheckoutErrorDo( response );
                                            }
                                        } ).catch( ( e ) => {
                                            LogService.error( e.message );
                                            this.busEventProgressStep.$emit( 'close' );
                                            this.notificationError( this.$t( 'messages.formHasError' ) );
                                        } );
                                }
                            } );
                        },
                        beforeClose: ( ) => {
                            if ( this.checkoutResponse ) {
                                this.openConfirmationModal ( this.checkoutResponse );
                            }
                        }
                    }
                );
            },
            openConfirmationModal( order ) {
                this.$modal.show(
                    ( ) => import( './TheCheckout/OrderConfirmationModal.vue' ),
                    {
                        order
                    },
                    {
                        scrollable: false,
                        fullscreen: true,
                        persistent: true
                    },
                    {
                        beforeClose: ( ) => {
                            redirectToHome();
                        }
                    }
                );
            },
            showExpireErrorMessage( ) {
                this._cartExpiredErrorShowed || this.notificationError( this.$t( '_common:messages.cartExpired' ) );
                this._cartExpiredErrorShowed = true;
            },
            onLoadingPaymentProviderError( ) {
                this.showLoadingOverlay( false );
                this.unbindWarnBeforeYouLeaveMixin( );
                this.notificationError( this.$t( '_common:messages.apiPaymentClientContactingError' ) );
                redirectToHome();
            },
            async onReloadPaymentProviderDo( ) {
                this.showLoadingOverlay( true );
                await this.initPaymentClient( );
                this.showLoadingOverlay( false );
            },
            async saveShippingOption() {
                const { optionId, lastSubmittedOptionId } = this.shippingModel;
                const selectedShipping = this.shippingModel.options.find( option => option.id === optionId );

                if ( optionId !== lastSubmittedOptionId ) {
                    this.showLoadingOverlay( true );
                    const responseAddShippingOption = await this.addShippingOption( { id: this.cart.id, data: selectedShipping } );
                    if ( responseAddShippingOption ) {
                        this.shippingModel.lastSubmittedOptionId = this.shippingModel.optionId;
                    }
                }

                if ( this.paymentClientModel.errorContacting ) {
                    this.showLoadingOverlay( true );
                    !this.usePaymentClient || await this.initPaymentClient( );
                }

                this.showLoadingOverlay( false );
            },
            async initPaymentClient( ) {
                if ( !await apiPaymentClient.loadClient( ) ) {
                    this.paymentClientModel.errorContacting = true;
                    return this.paymentClientModel;
                }
                const api = await apiServicePayments( '' );
                const paymentClientResponse = await api.payments.getClientToken( );
                if ( !paymentClientResponse.success ) {
                    this.paymentClientModel.errorContacting = true;
                    return this.paymentClientModel;
                }
                this.paymentClientModel.token       = paymentClientResponse.data.clientToken;
                this.paymentClientModel.providerId  = paymentClientResponse.data.providerId;
                this.paymentClientModel.errorContacting = false;

                return this.paymentClientModel;
            },
            async loadCart() {
                await this.getCart( { id: this.cart.id } );
            }
        },
        async created( ) {
            this.registerStoreModule( 'states', statesStoreModule );
            this.registerStoreModule( 'countries', countriesStoreModule );

            const checkCart = ( ) => {
                if ( !this.cart.id || this.routeCartId != this.cart.id || this.isCartSubmitted ) {
                    return;
                }

                if ( this.isCartExpired( ) ) {
                    this.showExpireErrorMessage( );
                    return;
                }
                return true;
            };

            this.showLoadingOverlay( true );
            this.forceWarnBeforeLeaveMixin( );
            if ( !checkCart( ) ) {
                this.unbindWarnBeforeYouLeaveMixin( );
                this.showLoadingOverlay( false );
                redirectToHome();
                return;
            }
            this.getCountries( );
            await this.loadCart( );
            this.hasTicketsOnly = !this.hotelReservation;
            !this.usePaymentClient || await this.initPaymentClient( );
            this.updateFormModelAfterLoadingCart( );
            await this.loadShippingOptionsForCountry( );
            this.showLoadingOverlay( false );
            this.loading = false;
        }
    };
</script>

<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    @include mobile-only {
        .gst-checkout {
            .gst-checkout__cart-info {
                padding: theme-spacing( 0, 8, 1, 8 ) !important;
                margin-top: theme-spacing( n4 ) !important;
            }
        }
    }
</style>
