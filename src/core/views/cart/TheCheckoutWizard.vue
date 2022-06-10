<template>
    <v-flex class="gst-checkout">
        <HeaderWithCountDown :date-time-till="cart.expireAt" @finish="expire()" />
        <v-flex v-if="cart && cart.id" class="content-max-width px-2">
            <div>
                <WizardIndicator
                    :steps="steps"
                    :current-step="currentStep"
                    @go-to-step="busEventsWizard.$emit('go-to-step', $event )" />
            </div>

            <v-row v-if="!loading" class="d-flex flex-row">
                <v-col xs="12" md="7" class="mb-4 d-flex flex-column">
                    <TenantBonusPointsCartCheckoutSummary
                        :points="bonusPointsEarn"
                        :currency="loyaltyCurrency || currency"
                        :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                        class="mb-4" />
                    <WizardControl
                        :steps="steps"
                        :bus-events="busEventsWizard"
                        :control-by-route="false"
                        :destroy-steps="false"
                        @change-index="currentStep=$event">
                        <Step1Summary
                            slot="step0"
                            :step="steps[0]"
                            :cart-collections="cartCollections"
                            :order="order"
                            :payment-model="paymentModel"
                            :has-health-check="hasHealthCheck"
                            :shipping-model="shippingModel"
                            @next="busEventsWizard.$emit('next')" />
                        <Step2Delivery
                            slot="step1"
                            :step="steps[1]"
                            :customer-model="customerModel"
                            :shipping-model="shippingModel"
                            :agree-model="agreeModel"
                            :has-health-check="hasHealthCheck"
                            :countries="countries"
                            @back="busEventsWizard.$emit('back')"
                            @next="onNextStep2DeliveryDo" />
                        <Step3Payment
                            slot="step2"
                            :step="steps[2]"
                            :bus-events-parent="busEvents"
                            :payment-client-model="paymentClientModel"
                            :cart-collection="cartCollections[0]"
                            :order="order"
                            :payment-model="paymentModel"
                            :shipping-model="shippingModel"
                            :bonus-points-rate="bonusPointsRedeemRate"
                            :total-bonus-points-reddem="bonusPointsRedeem"
                            :user-bonus-points-current="userBonusPointsCurrent"
                            :show-split-payment="showSplitPayment"
                            :current-step="currentStep"
                            :bus-event-progress-step="busEventProgressStep"
                            @input="updatePaymentModel"
                            @loading-payment-provider-error="onLoadingPaymnentProviderError"
                            @back="busEventsWizard.$emit('back')"
                            @next="save" />
                    </WizardControl>
                </v-col>
                <v-col v-if="$vuetify.breakpoint.mdAndUp" xs="12" md="5" class="d-flex flex-column">
                    <Sidebar
                        :current-step="currentStep"
                        :cart-collections="cartCollections"
                        :order="order"
                        :payment-model="paymentModel"
                        :shipping-model="shippingModel"
                        :has-health-check="hasHealthCheck" />
                </v-col>
            </v-row>
        </v-flex>
        <PaymentProviderDownOverlay
            v-if="paymentClientModel.errorContacting"
            class="" />
    </v-flex>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters, mapState, mapActions } from 'vuex';
    import ticketConstants from '@core/utils/constants/ticket';
    import { calculateBonusPointsEarn as bonusPointsUtilsCalculateBonusPointsEarn } from '@core/utils/bonusPointsUtils';
    import {
        sort as shippingOptionsUtilsSort,
        findOneElectronicTicketItem as shippingOptionsUtilsFindOneElectronicTicketItem
    } from '@core/utils/shippingOptionsUtils';

    import statesStoreModule from '@core/store/modules/states';
    import countriesStoreModule from '@core/store/modules/countries';
    import WizardControl from '@core/shared/components/wizard/Control.vue';
    import WizardIndicator from '@core/shared/components/wizard/Indicator.vue';
    import PaymentProviderDownOverlay from '@core/shared/components/overlays/PaymentProviderDownOverlay.vue';
    import WarnBeforeLeave from '@core/mixins/WarnBeforeLeave';
    import zIndex from '@scss/mixins/_z-index-export-js.scss';
    import DynamicStoreModule from '@/core/mixins/DynamicStoreModule';
    import {
        HeaderWithCountDown,
        Sidebar,
        Step1Summary,
        Step2Delivery,
        Step3Payment,
        CheckoutConfirmation
    } from './TheChekoutWizard/index';

    const STORE_NAME = 'cart';
    const STORE_COUNTRIES = 'countries';

    export default {
        name: 'TheCheckoutWizard',
        components: {
            HeaderWithCountDown,
            Sidebar,
            Step1Summary,
            Step2Delivery,
            Step3Payment,
            WizardControl,
            WizardIndicator,
            PaymentProviderDownOverlay
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard'
        },
        testIdOptions: {
            keyPrefix: 'checkoutWizard'
        },
        mixins:[
            WarnBeforeLeave,
            DynamicStoreModule
        ],
        data( ) {
            const steps = [
                {
                    hidden: false,
                    labelIndicator: this.$t( 'indicator.labels.step1Summary' )
                },
                {
                    hidden: false,
                    labelIndicator: this.$t( 'indicator.labels.step2Delivery' )
                },
                {
                    hidden: false,
                    labelIndicator: this.$t( 'indicator.labels.step3Payment' )
                }
            ].map ( ( item, index ) => {
                item.index = index ;
                item.slot = 'step'+index;
                return item;
            } );

            return {
                loading: true,
                steps: steps,
                currentStep: 0,
                busEventsWizard: new Vue( ),
                busEvents: new Vue( ),
                busEventProgressStep: new Vue( ),
                customerModel: Object.assign(
                    {
                        firstName: '',
                        lastName: '',
                        address: '',
                        city: '',
                        zip: '',
                        state: '',
                        country: 'CA',
                        phone: '',
                        email: ''
                    },
                    JSON.parse( JSON.stringify( this.$store.state['cart'].checkoutWizardData.customerModel || { } ) )
                ),
                shippingModel: {
                    loading: true,
                    optionId: null,
                    options: [ ],
                    lastSubmittedOptionId: null
                },
                agreeModel: {
                    terms: false,
                    healthCheck: true
                },
                paymentClientModel: {
                    token: null,
                    providerId: null,
                    errorContacting: false,
                },
                paymentModel: {
                    points: 0,
                    amount: 0,
                    shippingFee: 0,
                    shippingTax: 0,
                    total: 0,
                },
                totals: {
                    bonusPointsEarnWithShipping: 0,
                    bonusPointsReddemWithShipping: 0,
                },
                checkoutResponse: false,
                testEventId: 106710000
            };
        },
        computed: {
            ...mapGetters( {
                isCartExpired: `${STORE_NAME}/isExpired`,
                isCartSubmitted: `${STORE_NAME}/isSubmitted`,
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney',
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
            order( ) {
                return this.cart.order;
            },
            currency( ) {
                const { order } = this;
                return order.currency;
            },
            loyaltyCurrency( ) {
                const { order } = this;
                return order.loyaltyCurrency;
            },
            hasResaleItems( ) {
                return !!this.cartCollections.find( collection => collection.items[0].selection === ticketConstants.TYPES.RESALE );
            },
            hasHealthCheck( ) {
                return !!this.cartCollections[0].info.healthCheck;
            },
            cartShippingOptionId( ) {
                return this.cartCollections[0] ? this.cartCollections[0].shippingId : null;
            },
            bonusPoints( ) {
                return this.cartCollections[0].bonusPoints;
            },
            bonusPointsRedeem( ) {
                return this.totals.bonusPointsReddemWithShipping ? this.totals.bonusPointsReddemWithShipping : this.cartCollections[0].bonusPointsRedeem;
            },
            totalBasePrice( ) {
                return this.order.price ? this.order.price.basePrice : 0;
            },
            totalFeePrice( ) {
                return Math.round( ( ( this.order.totalPrice - this.totalBasePrice ) * 100 ) ) / 100;
            },
            bonusPointsRedeemRate( ) {
                return this.bonusPointsRedeem / Math.round( this.total );
            },
            bonusPointsEarnRate( ) {
                return this.bonusPoints / Math.round( this.totalBasePrice );
            },
            userBonusPointsCurrent( ) {
                return this.userIsAuth ? this.userBalance : 0;
            },
            bonusPointsEarn( ) {
                const { bonusPointsEarnWithShipping } = this.totals;

                if ( !this.paymentModel.points ) {
                    return bonusPointsEarnWithShipping ? bonusPointsEarnWithShipping : this.bonusPoints;
                }
                return bonusPointsUtilsCalculateBonusPointsEarn( this.paymentModel.amount, this.totalTaxes, this.bonusPointsEarnRate );
            },
            totalTaxes() {
                const items = [
                    this.totalFeePrice,
                    this.shipping.total
                ];

                return items.reduce( ( total, currentValue ) => total + currentValue );
            },
            total( ) {
                const { order, shipping, cartShippingOptionId } = this;
                if ( order ) {
                    const totalWithoutShipping = order.totalPrice - order.totalDelivery;

                    if ( this.currentStep === 0 && !cartShippingOptionId ) {
                        return totalWithoutShipping;
                    }
                    return totalWithoutShipping + shipping.total;
                }
                return 0;
            },
            shipping() {
                const { fee, tax } = this.selectedShippingOption ? this.selectedShippingOption.totals : { fee: 0, tax: 0 };
                const total = fee + tax;

                return {
                    fee,
                    tax,
                    total
                };
            },
            selectedShippingOption( ) {
                const { shippingModel } = this;
                return shippingModel.options.find( value => value.id === shippingModel.optionId );
            },
            showSplitPayment() {
                return this.cartCollections[0].productId === this.testEventId;
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
            'total': {
                handler: function ( newValue ) {
                    if ( newValue ) {
                        this.paymentModel.total = this.total;
                        this.paymentModel.amount = this.total;
                    }
                },
                deep: true
            },
            'shipping': {
                handler: function ( newValue ) {
                    if ( newValue ) {
                        this.paymentModel.shippingFee = this.shipping.fee;
                        this.paymentModel.shippingTax = this.shipping.tax;
                    }
                },
                deep: true
            }
        },

        methods: {
            ...mapActions( {
                notificationError:      'notification/error',
                showLoadingOverlay:     'appState/setLoading',
                checkoutCart:           'cart/checkout',
                saveModelOnStore:       'cart/setCheckoutWizard',
                clearCart:              'cart/clear',
                addShippingOption:      'cart/addShippingOption',
                getShippingOptions:     'cart/getShippingOptions',
                getCart:                'cart/get',
                getCountries:           `${STORE_COUNTRIES}/get`
            } ),
            expire( ) {
                this.unbindWarnBeforeYouLeaveMixin( );
                this.showExpireErrorMessage( );
                this.$router.replace( { name: 'home' } );
            },
            updatePaymentModel( value ) {
                this.paymentModel.points = value.points;
                this.paymentModel.amount = value.amount;
            },
            async save( { fnPayment, callback, isSplitPaymentMethod } ) {
                const cartCollections = [ ...( this.cart.collections ) ];
                const order = { ...( this.cart.order ) };
                const paymentModel = { ...( this.paymentModel ) };
                const bonusPointsEarn = this.bonusPointsEarn;

                const getPayload = ( card ) => {
                    const { firstName, lastName, email, address, zip, city, state, country, phone } = this.customerModel;

                    return {
                        items: this.cartCollections.map( ( item ) => {
                            return { totalPrice: item.totalPrice, productId: item.productId };
                        } ),
                        user:{
                            firstName,
                            lastName,
                            email
                        },
                        address: Object.assign( {
                            street: address,
                            city,
                            zip,
                            countryCode: country,
                            stateCode: state
                        }, this.hasResaleItems ? { phone } : null ),
                        card: card ? {
                            ...card,
                            paymentType: this.paymentClientModel.providerId
                        } : null,
                        redeem: {
                            money: !isSplitPaymentMethod ? paymentModel.amount : paymentModel.amount ? paymentModel.total : 0,
                            points: !isSplitPaymentMethod ? paymentModel.points : paymentModel.amount ? 0 : paymentModel.points
                        }
                    };
                };

                this.$modal.show(
                    import ( '@core/shared/components/modals/ProgressStepAnimationModal.vue' ),
                    {
                        title: this.$t( 'progressStepAnimationModal.title' ),
                        description: this.$t( 'progressStepAnimationModal.description' ),
                        labels: [
                            this.$t( 'progressStepAnimationModal.labels.step1Verifying' ),
                            this.$t( 'progressStepAnimationModal.labels.step2Processing' ),
                            this.$t( 'progressStepAnimationModal.labels.step3Finalizing' )
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
                            fnPayment( ( error, cardInfo ) => {
                                this.busEventProgressStep.$emit( 'go-to-step', 3 );
                                if ( error ) {
                                    this.busEventProgressStep.$emit( 'close' );
                                    callback( );
                                    this.notificationError( this.$t( '_components.step3Payment.messages.formHasError' ) );
                                } else {
                                    this.busEventProgressStep.$emit( 'go-to-step', 3 );

                                    this.checkoutCart( { id: this.cart.id, data: getPayload ( cardInfo ) } )
                                    .then( response => {
                                        if ( response ) {
                                            this.checkoutResponse = response;
                                            this.busEventProgressStep.$emit( 'go-to-end' );
                                            this.unbindWarnBeforeYouLeaveMixin( );
                                        } else {
                                            this.busEventProgressStep.$emit( 'close' );
                                            callback( );
                                            this.busEventsWizard.$emit( 'back' );
                                            this.busEvents.$emit( 'save-error' );
                                        }
                                    } ).catch( ( ) => {
                                        this.busEventProgressStep.$emit( 'close' );
                                        callback( );
                                        this.notificationError( this.$t( '_components.step3Payment.messages.formHasError' ) );
                                    } );
                                }
                            } );
                        },
                        beforeClose: ( ) => {
                            if ( this.checkoutResponse ) {
                                const ticketRedemptionUrl = this.checkoutResponse.items[ 0 ].redemptionUrl;

                                this.$router.replace( { name: 'home' }, () => {
                                    this.openConfirmationModal ( ticketRedemptionUrl, cartCollections, order, paymentModel, bonusPointsEarn, this.selectedShippingOption );
                                } );
                            }
                        }
                    }
                );
            },
            openConfirmationModal(  downloadUrl = 'http://', cartCollections, order, paymentModel, bonusPointsEarn, shippingOption ) {
                this.$modal.showBottom(
                    CheckoutConfirmation,
                    {
                        cartCollections,
                        order,
                        paymentModel,
                        shippingOption,
                        bonusPointsEarn,
                        downloadUrl: downloadUrl,
                    },
                    {
                        scrollable: true,
                        fullscreen: true,
                    }
                );
            },
            showExpireErrorMessage( ) {
                this._cartExpiredErrorShowed || this.notificationError( this.$t( '_common:messages.cartExpired' ) );
                this._cartExpiredErrorShowed = true;
            },
            onLoadingPaymnentProviderError( ) {
                this.showLoadingOverlay( false );
                this.unbindWarnBeforeYouLeaveMixin( );
                this.notificationError( this.$t( '_common:messages.apiPaymentClientContactingError' ) );
                this.$router.replace( { name: 'home' } );
            },
            async loadShippingOptionsForCountry( ) {
                this.shippingModel.loading = true;
                this.shippingModel.optionId = null;
                const items = await this.getShippingOptions( { id: this.cart.id, data: { countryCode: this.customerModel.country } } );
                this.shippingModel.options = shippingOptionsUtilsSort ( items || [ ] );
                const firstElectronicOption = shippingOptionsUtilsFindOneElectronicTicketItem( this.shippingModel.options );
                const isCartShippingOptionInList = this.shippingModel.options.find( value => value.id === this.cartShippingOptionId );

                if ( this.cartShippingOptionId && isCartShippingOptionInList ) {
                    this.shippingModel.optionId = this.cartShippingOptionId;
                } else {
                    if ( firstElectronicOption ) {
                        this.shippingModel.options = [ firstElectronicOption ];
                    }

                    if ( this.shippingModel.options.length === 1 ) {
                        this.shippingModel.optionId = this.shippingModel.options[0].id;
                    }
                }

                this.shippingModel.loading = false;
            },
            clearShippingOptions( ) {
                this.shippingModel.options = [ ];
            },
            async onNextStep2DeliveryDo() {
                const { optionId, lastSubmittedOptionId } = this.shippingModel;
                const selectedShipping = this.shippingModel.options.find( option => option.id === optionId );

                if ( optionId !== lastSubmittedOptionId ) {
                    this.showLoadingOverlay( true );
                    const responseAddShippingOption = await this.addShippingOption( { id: this.cart.id, data: selectedShipping } );
                    if ( responseAddShippingOption ) {
                        this.shippingModel.lastSubmittedOptionId = this.shippingModel.optionId;
                        this.totals.bonusPointsEarnWithShipping = responseAddShippingOption.order.earnPoints;
                        this.totals.bonusPointsReddemWithShipping = responseAddShippingOption.order.redeemPoints;

                        this.busEventsWizard.$emit( 'next' );
                    }
                }
                if ( this.paymentClientModel.errorContacting ) {
                    this.showLoadingOverlay( true );
                    await this.initPaymentClient( );
                }
                this.showLoadingOverlay( false );
                this.busEventsWizard.$emit( 'next' );
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
            this.getCountries( );
            this.forceWarnBeforeLeaveMixin( );
            if ( !checkCart( ) ) {
                this.unbindWarnBeforeYouLeaveMixin( );
                this.showLoadingOverlay( false );
                this.$router.replace( { name: 'home' } );
                return;
            }
            await this.loadCart( );
            await this.initPaymentClient( );
            await this.loadShippingOptionsForCountry( );
            if ( !this.hasResaleItems ) {
                Vue.delete( this.customerModel, 'phone' );
            }
            if ( this.cartShippingOptionId ) {
                Vue.set( this.shippingModel, 'lastSubmittedOptionId', this.cartShippingOptionId );
            }
            this.showLoadingOverlay( false );
            this.loading = false;
        }
    };
</script>
<style scoped lang="scss">

</style>
