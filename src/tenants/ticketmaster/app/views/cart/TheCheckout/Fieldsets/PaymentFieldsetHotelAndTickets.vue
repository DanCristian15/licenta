<template>
    <div class="gst-payment-fieldset-hotels-and-tickets">
        <div class="header">
            <span class="title">{{ $t('title') }}</span>
            <div class="officials">
                <span>{{ $t('labels.officials') }}</span>
                <TicketmasterLogo class="ticketmaster-logo" />
                <AmericanExpressLogo class="american-express-logo" />
            </div>
        </div>
        <ProvidersLogos class="providers-logos" />
        <PaymentProvider
            v-if="usePaymentClient"
            class="col col-12 py-0"
            :payment-client-model="paymentClientModel"
            @updatePaymentFieldsValidity="onUpdatePaymentFieldsValidityDo"
            @instancePaymentClientComputed="onInstancePaymentClientComputedDo" />
        <template v-else>
            <BaseFormInput
                v-model="paymentModel.cardNumber"
                v-maska="creditCardMask"
                :has-error="validation.paymentModel.cardNumber.$dirty"
                :error-messages="extractValidationsMessagesFn( 'paymentModel.cardNumber' )"
                :show-check-icon="validation.paymentModel.cardNumber.$dirty"
                :label="$t('labels.cardNumber')"
                :data-test-id="$testId('input.cardNumber')"
                class="col col-12 py-0 my-1"
                @blur="validation.paymentModel.cardNumber.$touch()" />
            <div class="credit-card-row">
                <div class="inputs-container">
                    <BaseFormInput
                        v-model="paymentModel.cardExpire"
                        v-maska="'##/##'"
                        :has-error="validation.paymentModel.cardExpire.$dirty"
                        :error-messages="extractValidationsMessagesFn( 'paymentModel.cardExpire' )"
                        :show-check-icon="validation.paymentModel.cardExpire.$dirty"
                        :label="$t('labels.cardExpire')"
                        :data-test-id="$testId('input.cardExpire')"
                        class="col col-12 col-md-6 py-0 mt-1 expiration-date-input"
                        @blur="validation.paymentModel.cardExpire.$touch()" />
                    <BaseFormInput
                        v-model="paymentModel.cardCVV"
                        v-maska="cvvMask"
                        :has-error="validation.paymentModel.cardCVV.$dirty"
                        :error-messages="extractValidationsMessagesFn( 'paymentModel.cardCVV' )"
                        :show-check-icon="validation.paymentModel.cardCVV.$dirty"
                        :label="$t('labels.cardCVV')"
                        :data-test-id="$testId('input.cardCVV')"
                        class="col col-12 col-md-6 py-0 mt-1 cvv-code-input"
                        @blur="validation.paymentModel.cardCVV.$touch()" />
                </div>
                <div class="info-container">
                    <img :src="creditCardCvv" alt="Credit card CVV" class="cvv-img" />
                    <span class="cvv-info">{{ $t('labels.securityCodeInfo') }}</span>
                </div>
            </div>
        </template>
        <BaseFormSelect
            v-model="customerModel.country"
            :has-error="countrySelectorHasError"
            :options="countries"
            value-prop="code"
            :label="$t('labels.country')"
            :error-messages="extractValidationsMessagesFn( 'customerModel.country' )"
            class="col col-12 py-0 mt-1 mb-3"
            :data-test-id="$testId('select.country')"
            @blur="validation.customerModel.country.$touch()" />
        <BaseFormInput
            v-model="customerModel.address"
            :label="$t('labels.address')"
            :error-messages="extractValidationsMessagesFn( 'customerModel.address' )"
            :show-check-icon="validation.customerModel.address.$dirty"
            maxlength="100"
            class="col col-12 py-0 mt-1"
            :data-test-id="$testId('input.address')"
            @blur="validation.customerModel.address.$touch()" />
        <div class="line-wrapper">
            <BaseFormInput
                v-model="customerModel.city"
                :label="$t('labels.city')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.city' )"
                :show-check-icon="validation.customerModel.city.$dirty"
                maxlength="100"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.city')"
                @blur="validation.customerModel.city.$touch()" />
            <BaseFormSelect
                v-model="customerModel.state"
                :has-error="stateSelectorHasError"
                :options="states"
                value-prop="code"
                :label="$t('labels.state')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.state' )"
                :data-test-id="$testId('select.state')"
                class="col col-12 col-md-6 py-0 mt-1"
                @blur="validation.customerModel.state.$touch()" />
        </div>
        <div class="line-wrapper">
            <BaseFormInput
                v-model="customerModel.zip"
                :label="$t('labels.zip')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.zip' )"
                :show-check-icon="validation.customerModel.zip.$dirty"
                maxlength="10"
                class="col col-12 py-0 mt-1"
                :data-test-id="$testId('input.zip')"
                @blur="validation.customerModel.zip.$touch()" />
            <BaseFormInput
                v-model="customerModel.phone"
                :label="$t('labels.phone')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.phone' )"
                :show-check-icon="validation.customerModel.phone.$dirty"
                maxlength="20"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.phone')"
                @blur="validation.customerModel.phone.$touch()" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { maska } from 'maska';
    import BaseFormInput from '@tenants/ticketmaster/app/components/inputs/BaseFormInput.vue';
    import BaseFormSelect from '@tenants/ticketmaster/app/components/inputs/BaseFormSelect.vue';
    import TicketmasterLogo from '@tenants/ticketmaster/app/assets/logo-2.svg';
    import AmericanExpressLogo from '@tenants/ticketmaster/app/assets/american-express-logo.svg';
    import ProvidersLogos from '@tenants/ticketmaster/app/assets/providers-logos.svg';
    import PaymentProvider from '@/tenants/ticketmaster/app/views/cart/TheCheckout/PaymentProvider.vue';

    export default {
        name: 'PaymentFieldsetHotelAndTickets',
        components: {
            BaseFormInput,
            BaseFormSelect,
            TicketmasterLogo,
            AmericanExpressLogo,
            ProvidersLogos,
            PaymentProvider
        },
        directives: {
            maska
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.fieldsets.paymentFieldset'
        },
        testIdOptions: {
            keyPrefix: 'checkout.fieldsets.paymentFieldset'
        },
        props: {
            paymentModel: {
                type: Object,
                required: true
            },
            customerModel: {
                type: Object,
                required: true,
            },
            validation: {
                type: Object,
                required: true
            },
            extractValidationsMessagesFn: {
                type: Function,
                required: true,
            },
            usePaymentClient: {
                type: Boolean,
                required: true,
            },
            paymentClientModel: {
                type: Object,
                required: true,
            },
        },
        data: function() {
            return {
                countryCode: null,
                stateCode: null,
                states: [],
                cvvMask: [ '###', '####' ]
            };
        },
        computed: {
            ...mapState( {
                language: state => state.appState.language,
                countries: state => state.countries.list
            } ),
            stateSelectorHasError() {
                return this.validation.customerModel.state.$model ? this.validation.customerModel.state.$invalid : this.validation.customerModel.state.$dirty;
            },
            countrySelectorHasError() {
                return this.validation.customerModel.country.$model ? this.validation.customerModel.country.$invalid : this.validation.customerModel.country.$dirty;
            },
            creditCardMask() {
                if ( this.paymentModel.cardNumber?.toString().substring( 0, 2 ) === '32' || this.paymentModel.cardNumber?.toString().substring( 0, 2 ) === '37' ) {
                    return '#### ###### #####';
                }

                return '#### #### #### ####';
            },
            creditCardCvv() {
                return require( '@/tenants/ticketmaster/app/assets/icons/credit-card-cvv.png' );
            }
        },
        watch: {
            'customerModel.country': {
                handler: function( value ) {
                    if ( value ) this.loadStates();
                },
                immediate: true
            }
        },
        methods: {
            stateFilters() {
                if ( this.customerModel.country ) {
                    return {
                        code: this.customerModel.country
                    };
                }
                return null;
            },
            async loadStates() {
                const { success, data } = await this.$store.dispatch( `states/getRaw`, { filter: this.stateFilters() }  );
                if ( success ) {
                    this.states = [ ...data.list ];
                } else {
                    this.states = [ ];
                }
            },
            onUpdatePaymentFieldsValidityDo( validPaymentFields ) {
                this.$emit( 'updatePaymentFieldsValidity', validPaymentFields );
            },
            onInstancePaymentClientComputedDo( instancePaymentClient ) {
                this.$emit( 'instancePaymentClientComputed', instancePaymentClient );
            }
        },
        async mounted( ) {
            await this.loadStates();
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    #hotelAndTicketsPaymentClient {
        margin-left: theme-spacing( 'n1' );
    }

    .gst-payment-fieldset-hotels-and-tickets {
        @include border-radius( 'xs' );

        padding: theme-spacing( 4 ) theme-spacing( 6 );
        border: 1px solid theme-color( 'septenary' );
        margin-top: theme-spacing( 8 );

        .credit-card-row {
            display: flex;
            align-items: center;

            .inputs-container {
                display: flex;
                position: relative;
                bottom: theme-spacing( 1 );
                align-items: center;
                justify-content: flex-start;

                .expiration-date-input,
                .cvv-code-input {
                    max-width: 200px;
                }
            }

            .info-container {
                display: flex;
                position: relative;
                bottom: 2px;
                align-items: center;
                margin-left: theme-spacing( 1 );

                .cvv-img {
                    position: relative;
                    top: 2px;
                }

                .cvv-info {
                    position: relative;
                    top: 2px;
                    line-height: line-height( 'm' );
                    color: theme-color( 'tertiary' );
                    font-size: font-size( 'xxs' );
                    margin-left: theme-spacing( 2 );
                }
            }

            @include mobile-only {
                flex-direction: column;

                .inputs-container {
                    justify-content: space-between;

                    .gst-base-form-input {
                        flex: 1;
                    }
                }

                .info-container {
                    display: flex;
                    position: relative !important;
                    right: theme-spacing( 4 );
                    bottom: theme-spacing( 1 ) !important;
                    width: 100%;
                    justify-content: flex-end;
                }
            }
        }

        .providers-logos {
            padding: theme-spacing( 0 ) theme-spacing( 3 );
            margin: theme-spacing( 3 ) theme-spacing( 0 );

            @include mobile-only {
                height: 18px !important;
                width: 151px !important;
                margin-top: 0 !important;
            }
        }

        .line-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .gst-base-form-input {
                flex: 1;
            }
        }

        .line-wrapper:last-of-type {
            margin-bottom: 6px;
        }

        .header {
            display: flex;
            padding: theme-spacing( 0 ) theme-spacing( 3 );
            margin-bottom: theme-spacing( 4 );
            font-family: "Averta Std", sans-serif !important;
            align-items: center;
            justify-content: space-between;

            .title {
                line-height: line-height( 'xxxxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'xxxl' );
                font-weight: font-weight( 'large' );
                font-family: "Averta Std", sans-serif !important;
            }

            .officials {
                span {
                    line-height: line-height( 'xxs' );
                    color: theme-color( 'tertiary' );
                    font-size: font-size( 'xxxxs' );
                    font-weight: normal;
                    text-transform: uppercase;
                }

                .ticketmaster-logo {
                    position: relative;
                    top: 2px;
                    margin: 0 theme-spacing( 2 );
                }

                .american-express-logo {
                    position: relative;
                    top: 6px;
                }

                @include mobile-only {
                    display: flex;
                    align-items: center;

                    span {
                        position: relative !important;
                        top: 1px !important;
                        width: 100% !important;
                        line-height: line-height( 'xxxs' );
                        font-size: font-size( 'xxxxxs' );
                        text-align: right !important;
                    }

                    .american-express-logo {
                        top: 3px !important;
                    }
                }
            }

            @include mobile-only {
                display: flex;
                margin-bottom: theme-spacing( 6 ) !important;
                align-items: center;
                justify-content: space-between;

                .title {
                    line-height: line-height( 'xxxl' );
                    font-size: font-size( 'l' );
                }
            }
        }

        @include mobile-only {
            padding: theme-spacing( 4 ) !important;
            margin-top: theme-spacing( 4 ) !important;

            .line-wrapper {
                flex-direction: column !important;

                .gst-base-form-input {
                    width: 100% !important;
                    flex: 1;
                }

                .gst-base-form-input:first-of-type {
                    margin-right: theme-spacing( 0 ) !important;
                }
            }
        }
    }
</style>
