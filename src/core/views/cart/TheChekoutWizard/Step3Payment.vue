<template>
    <v-card flat class="d-flex flex-column gst-checkwiz-step-payment">
        <DataLoadingOverlay
            :show="shippingModel.loading"
            :color="'white'">
            <PaymentProviderDownWarningContainer
                v-if="showPaymentProviderDownWarningContainer"
                class="gst-checkwiz-step-payment__payment-provider-down-warning-container"
                :button-label="$t( '_common:buttons.back' )"
                @close="$emit( 'back' )" />
            <template v-else>
                <v-card-text lass="flex-grow-0 py-0 px-0">
                    <v-radio-group
                        v-show="hasSplitPayment"
                        v-model="paymentMethod">
                        <v-radio
                            :disabled="!canBuyOnlyWithPoints"
                            :label="labelOnlyPointsRadio"
                            :value="paymentMethods.POINTS"
                            off-icon="$vuetify.icons.checkboxRoundUnchecked"
                            on-icon="$vuetify.icons.checkboxRoundChecked" />
                        <v-radio
                            :disabled="!canPayWithCard"
                            :label="$t('labels.radio2')"
                            :value="paymentMethods.CARD"
                            off-icon="$vuetify.icons.checkboxRoundUnchecked"
                            on-icon="$vuetify.icons.checkboxRoundChecked" />
                        <!-- GL-1548 - Split is disabled except test event id 106710000 ( mihai 2021.09.08 ) -->
                        <v-radio
                            v-if="showSplitPayment"
                            :label="$t('labels.radio3')"
                            :value="paymentMethods.SPLIT"
                            :disabled="!userIsAuth"
                            off-icon="$vuetify.icons.checkboxRoundUnchecked"
                            on-icon="$vuetify.icons.checkboxRoundChecked" />
                    </v-radio-group>
                    <Step3PaymentSplit
                        v-show="paymentMethod === paymentMethods.SPLIT"
                        v-model="paymentModelComputed"
                        :bonus-points-rate="bonusPointsRate"
                        :max-points="maxBonusPointsRedeemForSplit"
                        :max-amount="paymentModel.total"
                        :currency="currency"
                        class="mb-4" />
                    <div v-show="paymentMethod !== paymentMethods.POINTS">
                        <template v-if="canPayWithCard">
                            <v-flex d-flex flex-row align-center class="px-2 mb-0 gst-checkwiz-step-payment__info-secure u-alpha-background">
                                <IconSecure class="gst-checkwiz-step-payment__icon-secure mr-2" />
                                {{ $t('info.security') }}
                            </v-flex>
                            <v-flex d-flex flex-row align-center class="py-3 mb-0 gst-checkwiz-step-payment__info-card">
                                <IconCheckCircle class="gst-checkwiz-step-payment__icon-check mr-2" />
                                {{ $t('info.card') }}
                            </v-flex>
                        </template>
                        <div :id="paymentClientContainerId"></div>
                    </div>
                </v-card-text>
                <v-card-actions class="px-0">
                    <v-flex d-flex flex-column flex-md-row justify-center>
                        <ButtonBack
                            v-if="$vuetify.breakpoint.mdAndUp"
                            :placeholder="$t( '_common:buttons.back' )"
                            @click="$emit( 'back' )" />
                        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
                        <ButtonNext
                            :placeholder="$t( '_common:buttons.placeOrder' )"
                            :width="!$vuetify.breakpoint.mdAndUp ? '100%' : ''"
                            :disabled="isDisabledNextButton"
                            @click="createPayment" />
                        <div v-if="!$vuetify.breakpoint.mdAndUp" xs12 class="gst-checkwiz-step-payment__total mt-4 d-flex flex-wrap flex-column">
                            {{ $t('total', { amount: $options.filters.currencyFull( paymentModel.amount, currency ) } ) }}
                            <v-btn
                                class="gst-btn--see-details text-none mt-2"
                                text
                                height="auto"
                                color="primary"
                                :ripple="false"
                                @click="openPaymentOrderDetailsModal">
                                {{ $t( 'buttons.seeDetails' ) }}
                            </v-btn>
                        </div>
                    </v-flex>
                </v-card-actions>
            </template>
        </DataLoadingOverlay>
    </v-card>
</template>
<script>
    import Vue from 'vue';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import {
        calculateAmountRemainingFromTotal as bonusPointsUtilsCalculateAmountRemainingFromTotal
    } from '@core/utils/bonusPointsUtils';
    import paymentConstants from '@utils/constants/payment';
    import apiPaymentClient from '@core/api/apiPaymentClient';
    import DataLoadingOverlay from '@core/shared/components/loading/DataLoadingOverlay.vue';
    import PaymentProviderDownWarningContainer from '@core/shared/components/notifications/PaymentProviderDownWarningContainer.vue';
    import ButtonBack from '@core/shared/components/wizard/step/ButtonBack.vue';
    import ButtonNext from '@core/shared/components/wizard/step/ButtonNext.vue';
    import IconSecure from '@core/shared/assets/icons/secure.svg';
    import IconCheckCircle from '@core/shared/assets/icons/check_circle.svg';
    import Step3PaymentSplit from './Step3PaymentSplit.vue';
    import Step3PaymentOrderDetailsModalContent from './Step3PaymentOrderDetailsModalContent.vue';


    export default {
        name: 'Step3Payment',
        components: {
            ButtonBack,
            ButtonNext,
            IconSecure,
            IconCheckCircle,
            Step3PaymentSplit,
            PaymentProviderDownWarningContainer,
            DataLoadingOverlay
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step3Payment'
        },
        props: {
            step: {
                type: Object,
                required: true
            },
            paymentModel: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            paymentClientModel: {
                type: Object,
                required: true
            },
            busEventsParent: {
                type: Object,
                required: true
            },
            cartCollection: {
                type: Object,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            bonusPointsRate: {
                type: Number,
                required: true
            },
            totalBonusPointsReddem: {
                type: Number,
                required: true
            },
            userBonusPointsCurrent: {
                type: Number,
                required: true
            },
            showSplitPayment: {
                type: Boolean,
                default: false
            },
            currentStep: {
                type: Number,
                required: true
            },
            busEventProgressStep: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                paymentMethod: paymentConstants.METHODS.CARD,
                canPayWithCard: false,
                showPaymentProviderDownWarningContainer: false,
                busEventOrderDetails: new Vue( ),
                loading: false
            };
        },
        computed: {
            ...mapGetters( {
                'isLoyaltyTypeAllowRedeem': 'appTenant/isLoyaltyTypeAllowRedeem',
                'isLoyaltyCurrencyTypeMoney': 'appTenant/isLoyaltyCurrencyTypeMoney',
                userIsAuth: 'user/profile/isAuth',
            } ),
            ...mapState( {
                language: state => state.appState.language
            } ),
            labelOnlyPointsRadio( ) {
                const label = this.$t(
                    'labels.radio1',
                    {
                        bonusPoints: this.$options.filters.bonusPoints ( this.bonusPointsRedeem ),
                        bonusPointsAvailable: this.$options.filters.bonusPoints ( this.userBonusPointsCurrent )
                    }
                );

                if ( this.canBuyOnlyWithPoints ) {
                    return label;
                } else {
                    return `${ label }${this.$t( 'labels.radio1SuffixNotEnoughBonusPoints' )}`;
                }
            },
            paymentClientContainerId( ) {
                return 'paymentClient';
            },
            bonusPointsRedeem( ) {
                return this.totalBonusPointsReddem;
            },
            canBuyOnlyWithPoints( ) {
                return this.userBonusPointsCurrent >= this.bonusPointsRedeem;
            },
            paymentMethods( ) {
                return paymentConstants.METHODS;
            },
            paymentModelComputed: {
                get( ) {
                    return this.paymentModel;
                },
                set( value ) {
                    this.$emit( 'input', value );
                }
            },
            maxBonusPointsRedeemForSplit () {
                return Math.min( this.userBonusPointsCurrent, this.bonusPointsRedeem );
            },
            hasErrors( ) {
                return this.hasBonusPointsMaxError && !this.paymentMethod;
            },
            hasBonusPointsMaxError ( ) {
                return this.paymentModel.points > this.maxBonusPointsRedeem;
            },
            hasSplitPayment() {
                return this.isLoyaltyTypeAllowRedeem;
            },
            currency( ) {
                const { cartCollection } = this;
                return cartCollection.currency;
            },
            isDisabledNextButton() {
                const { paymentMethod, canPayWithCard } = this;
                return ( paymentMethod === paymentConstants.METHODS.CARD && !canPayWithCard ) || !paymentMethod;
            },
            isSplitPaymentMethod() {
                return this.paymentMethod === this.paymentMethods.SPLIT;
            }
        },
        watch: {
            'paymentMethod': function( newValue ) {
                this.updatePaymentModelByPaymentMethod( newValue );
            },
            'paymentModel.total': function( ) {
                this.updatePaymentModelByPaymentMethod( this.paymentMethod );
            },
            'paymentClientModel.token': {
                handler: async function ( value, oldValue ) {
                    if ( !value ) {
                        this.showPaymentProviderDownWarningContainer = !this.canBuyOnlyWithPoints && !this.canPayWithCard;
                    }
                    if ( value && value !== oldValue ) {
                        this.showPaymentProviderDownWarningContainer = false;
                        this.loading = true;
                        await this.openPaymentIframe( );
                        this.initPaymentMethod( );
                        this.updatePaymentModelByPaymentMethod( this.paymentMethod );
                        this.showPaymentProviderDownWarningContainer = !this.canBuyOnlyWithPoints && !this.canPayWithCard;
                        this.loading = false;
                    }
                },
                immediate: true
            },
            'currentStep': function( newValue ) {
                const { step, paymentMethod, isSplitPaymentMethod } = this;
                if ( newValue === step.index && isSplitPaymentMethod ) {
                    this.updatePaymentModelByPaymentMethod( paymentMethod );
                }
            }
        },
        methods: {
            ...mapActions( {
                notificationError: 'notification/error'
            } ),
            createPayment( ) {
                const getCardInfo = ( payload ) => {
                    return payload ? {
                        'token': payload.nonce,
                        'expireMonth': parseInt( payload.details.expirationMonth ),
                        'expireYear': parseInt( payload.details.expirationYear ),
                        'type': payload.details.cardType,
                        'lastFour': payload.details.lastFour,
                    } : null;
                };

                if ( this.hasErrors || this._isSubmiting ) {
                    return;
                }

                this._isSubmiting = true;
                if ( this.paymentModel.amount ) {
                    this.$emit( 'next', {
                        fnPayment: ( callback ) => {
                            this.instancePaymentClient.requestPaymentMethod ( ( error, payload ) => {
                                if ( error ) {
                                    !this.busEventProgressStep || this.busEventProgressStep.$emit( 'close' );
                                    this.notificationError( this.$t( 'messages.formHasError' ) );
                                    this._isSubmiting = false;
                                }

                                callback( error, getCardInfo( payload ) );
                            } );
                        },
                        callback: ( ) => { this._isSubmiting = false; },
                        isSplitPaymentMethod: this.isSplitPaymentMethod
                    } );
                } else {
                    this.$emit( 'next', {
                        fnPayment: ( callback ) => {
                            callback( false, null );
                        },
                        callback: ( ) => { this._isSubmiting = false; },
                        isSplitPaymentMethod: this.isSplitPaymentMethod
                    } );
                }
            },
            hideClientToogle() {
                const sel = document.querySelector( '[data-braintree-id="toggle"]' );

                !sel || sel.click( );
            },
            updatePaymentModelByPaymentMethod( paymentMethod ) {
                switch ( paymentMethod ) {
                    case this.paymentMethods.POINTS:
                        this.$emit( 'input', { points: this.bonusPointsRedeem, amount: 0 } );
                        break;
                    case this.paymentMethods.CARD:
                        this.$emit( 'input', { points: 0, amount: this.paymentModel.total } );
                        break;
                    case this.paymentMethods.SPLIT: {
                        const points = Math.min( this.userBonusPointsCurrent, this.bonusPointsRedeem );
                        const amount = bonusPointsUtilsCalculateAmountRemainingFromTotal( this.paymentModel.total, points, this.bonusPointsRate );

                        this.$emit( 'input', {
                            points,
                            amount
                        } );
                        break;
                    }
                    default:

                }
            },
            openPaymentOrderDetailsModal( ) {
                this.$modal.showBottom(
                    Step3PaymentOrderDetailsModalContent,
                    {
                        cartCollection: this.cartCollection,
                        order: this.order,
                        paymentModel: this.paymentModel,
                        shippingModel: this.shippingModel,
                        busEventsParent: this.busEventOrderDetails
                    },
                    {
                        'content-class': 'v-dialog__height-50 gst-v-dialog',
                        scrollable: true,
                        fullscreen: false,
                        'hide-overlay': false,
                        transition: 'dialog-bottom-transition'
                    }
                );
            },
            async openPaymentIframe( ) {
                const { paymentClientModel, paymentClientContainerId, language } = this;

                return new Promise ( ( resolve ) => {
                    this.canPayWithCard = false;
                    this._isSubmiting = false;
                    apiPaymentClient.openPaymentIFrame(
                        paymentClientModel.token,
                        `#${paymentClientContainerId}`,
                        {
                            locale: language,
                            vaultManager: false,
                            translations: {
                                payWithCard: 'Pay with your PC MasterCard!',
                            },
                            card: {
                                overrides: {
                                    styles: {
                                        input: {
                                            'font-size': '13px',
                                            'font-family': 'sans-serif',
                                            'font-weight': 400
                                        },
                                        '.invalid': {
                                            color: '#C33764'
                                        }
                                    }
                                },
                            }
                        },
                        ( createError, instancePaymentClient ) => {
                            if ( createError ) {
                                resolve( false );
                                return;
                            }
                            this.instancePaymentClient = instancePaymentClient;
                            this.canPayWithCard = true;
                            resolve( true );
                        }
                    );
                } );

            },
            initPaymentMethod( ) {
                this.paymentMethod = null;
                if ( this.canPayWithCard ) {
                    this.paymentMethod = this.paymentMethods.CARD;
                    return;
                }
                if ( this.isLoyaltyTypeAllowEarn && this.canBuyOnlyWithPoints ) {
                    this.paymentMethod = this.paymentMethods.POINTS;
                    return;
                }
            }
        },
        async mounted( ) {
            !this.busEventsParent || this.busEventsParent.$on( 'save-error', this.hideClientToogle );
            !this.busEventOrderDetails || this.busEventOrderDetails.$on( 'next', this.createPayment );
        },
        destroyed( ) {
            !this.busEventsParent || this.busEventsParent.$off( 'save-error' );
            !this.busEventOrderDetails || this.busEventOrderDetails.$off( 'next' );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-checkwiz-step-payment__payment-provider-down-warning-container {
        margin-top: 120px;
    }

    .gst-checkwiz-step-payment__info-secure {
        position: relative;
        line-height: 14px;
        padding-top: 12px;
        padding-bottom: 12px;
        color: theme-color( 'success' );
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'regular' );
        border-radius: border-radius( 'm' ) !important;
        z-index: 0;

        &::after {
            background-color: theme-color( 'background-success' );
            opacity: 0.1;
            border-radius: inherit;
        }
    }

    .gst-checkwiz-step-payment__icon-secure {
        .gst-svg-icon {
            fill: theme-color( 'success' );
        }
    }

    .gst-checkwiz-step-payment__info-card {
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
    }

    .gst-checkwiz-step-payment__icon-check {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-btn--see-details {
        line-height: line-height( 'l' );
        font-size: font-size( 's' );
        letter-spacing: -0.2px;
    }

    .gst-btn--see-details.v-btn::before {
        background-color: transparent;
    }

    @include mobile-only {
        .gst-checkwiz-step-payment__payment-provider-down-warning-container {
            margin-top: 60px;
        }
    }

</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .braintree-sheet {
        border: none;
    }

    .braintree-sheet__header {
        display: none;
    }

    .braintree-methods {
        display: none !important;
    }

    .braintree-placeholder {
        display: none;
    }

    .braintree-sheet__content--form {
        padding: 0;
    }

    .braintree-form__field-group {
        padding: 5px 10px !important;
        border-style: solid;
        border-width: 1px;
        border-color: theme-color( 'quinary' );
        border-radius: border-radius( 'xxs' );

        .braintree-form__label {
            color: theme-color( 'primary' ) !important;
        }
    }

    @media (min-width: 468px) {
        .braintree-form__field-group[data-braintree-id="expiration-date-field-group"] {
            margin-right: 5px !important;
        }
    }

    .braintree-form__hosted-field {
        padding-top: 0 !important;
        padding-left: 0 !important;
        border: none !important;
        margin: 0 !important;
    }

    .gst-checkwiz-step-payment__total {
        width: 100%;
        text-align: center;
    }
</style>
