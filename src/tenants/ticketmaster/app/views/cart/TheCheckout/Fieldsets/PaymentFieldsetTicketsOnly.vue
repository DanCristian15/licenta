<template>
    <div class="gst-payment-fieldset-tickets-only">
        <div class="header">
            <span class="title">{{ $t('title') }}</span>
            <div class="officials">
                <span>{{ $t('labels.officials') }}</span>
                <TicketmasterLogo class="ticketmaster-logo" />
                <AmericanExpressLogo class="american-express-logo" />
            </div>
        </div>
        <ProvidersLogos class="providers-logos" />
        <div class="row">
            <PaymentProvider
                v-if="usePaymentClient"
                class="col col-12 py-0"
                :payment-client-model="paymentClientModel"
                @updatePaymentFieldsValidity="onUpdatePaymentFieldsValidityDo"
                @instancePaymentClientComputed="onInstancePaymentClientComputedDo" />
            <BaseFormSelect
                v-model="customerModel.country"
                :has-error="countrySelectorHasError"
                :options="countries"
                value-prop="code"
                :label="$t('labels.country')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.country' )"
                class="col col-12 py-0 mt-1 mb-3"
                :data-test-id="$testId('select.country')"
                @focus="validation.customerModel.country.$touch()"
                @input="validation.customerModel.country.$touch()"
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
                class="col col-12 col-md-6 py-0 mt-1"
                :error-messages="extractValidationsMessagesFn( 'customerModel.state' )"
                :data-test-id="$testId('select.state')"
                :show-check-icon="validation.customerModel.state.$dirty"
                @blur="validation.customerModel.state.$touch()" />
            <BaseFormInput
                v-model="customerModel.zip"
                :label="$t('labels.zip')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.zip' )"
                :show-check-icon="validation.customerModel.zip.$dirty"
                :class="{
                    'col-md-6': isPhoneRequired
                }"
                class="col col-12 py-0 mt-1"
                maxlength="10"
                :data-test-id="$testId('input.zip')"
                @blur="validation.customerModel.zip.$touch()" />
            <BaseFormInput
                v-if="isPhoneRequired"
                v-model="customerModel.phone"
                :label="$t('labels.phone')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.phone' )"
                maxlength="20"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.phone')"
                @blur="validation.customerModel.phone.$touch()" />
            <BaseFormInput
                v-model="customerModel.email"
                :label="$t('labels.email')"
                :show-check-icon="validation.customerModel.email.$dirty"
                :error-messages="extractValidationsMessagesFn( 'customerModel.email' )"
                maxlength="255"
                class="col col-12 py-0 mt-1"
                :data-test-id="$testId('input.email')"
                @blur="validation.customerModel.email.$touch()" />
            <div class="warning-info-message col col-12 mt-1">
                <WarningIcon />
                <span>{{ $t('warnings.email') }}</span>
            </div>
            <BaseFormInput
                v-model="customerModel.firstName"
                :label="$t('labels.firstName')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.firstName' )"
                :show-check-icon="validation.customerModel.firstName.$dirty"
                maxlength="30"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.firstName')"
                @blur="validation.customerModel.firstName.$touch()" />
            <BaseFormInput
                v-model="customerModel.lastName"
                :label="$t('labels.lastName')"
                :error-messages="extractValidationsMessagesFn( 'customerModel.lastName' )"
                :show-check-icon="validation.customerModel.lastName.$dirty"
                maxlength="30"
                class="col col-12 col-md-6 py-0 mt-1"
                :data-test-id="$testId('input.lastName')"
                @blur="validation.customerModel.lastName.$touch()" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BaseFormInput from '@tenants/ticketmaster/app/components/inputs/BaseFormInput.vue';
    import BaseFormSelect from '@tenants/ticketmaster/app/components/inputs/BaseFormSelect.vue';
    import TicketmasterLogo from '@tenants/ticketmaster/app/assets/logo-2.svg';
    import AmericanExpressLogo from '@tenants/ticketmaster/app/assets/american-express-logo.svg';
    import WarningIcon from '@tenants/ticketmaster/app/assets/icons/warning.svg';
    import PaymentProvider from '@/tenants/ticketmaster/app/views/cart/TheCheckout/PaymentProvider.vue';
    import ProvidersLogos from '@tenants/ticketmaster/app/assets/providers-logos.svg';

    export default {
        name: 'PaymentFieldsetHotelAndTickets',
        components: {
            BaseFormInput,
            BaseFormSelect,
            TicketmasterLogo,
            AmericanExpressLogo,
            WarningIcon,
            ProvidersLogos,
            PaymentProvider
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.fieldsets.paymentFieldset'
        },
        testIdOptions: {
            keyPrefix: 'checkout.fieldsets.paymentFieldset'
        },
        props: {
            paymentClientModel: {
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
                default: false
            }
        },
        data: function() {
            return {
                countryCode: null,
                stateCode: null,
                states: []
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
            isPhoneRequired() {
                return !!this.customerModel.hasOwnProperty( 'phone' );
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

    #ticketsOnlyPaymentClient {
        margin-top: theme-spacing( 'n3' );
        margin-left: theme-spacing( 'n1' );
    }

    .gst-payment-fieldset-tickets-only {
        @include border-radius ( 'xs' );

        padding: theme-spacing( 4 ) theme-spacing( 6 );
        border: 1px solid theme-color( 'septenary' );

        .providers-logos {
            margin: theme-spacing( 3 ) theme-spacing( 0 );

            @include mobile-only {
                height: 18px !important;
                width: 151px !important;
                margin-top: 0 !important;
            }
        }

        .header {
            display: flex;
            padding: 0 theme-spacing( 1 );
            margin-bottom: theme-spacing( 4 );
            font-family: "Averta Std", sans-serif !important;
            align-items: center;
            justify-content: space-between;

            .title {
                line-height: line-height( 'xxxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'large' );
                font-family: "Averta Std", sans-serif !important;
            }

            .officials {
                span {
                    line-height: line-height( 'xxs' );
                    color: theme-color( 'tertiary' );
                    font-size: font-size( 'xxxxs' );
                    font-weight: font-weight( 'regular' );
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
            }
        }

        .warning-info-message {
            display: flex;
            margin-bottom: theme-spacing( 3 );
            align-items: center;

            span {
                line-height: line-height( 's' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'xxs' );
                font-weight: normal;
            }

            svg {
                position: relative;
                bottom: 2px;
                margin-right: theme-spacing( 1 );
            }
        }

        @include mobile-only {
            margin-top: theme-spacing( 4 );

            .header {
                display: flex;
                padding: 0 theme-spacing( 1 ) !important;
                margin-bottom: theme-spacing( 6 ) !important;
                align-items: center;
                justify-content: space-between;

                .title {
                    line-height: line-height( 'xxxl' ) !important;
                    font-size: font-size( 'l' ) !important;
                }
            }

            .officials {
                display: flex;
                align-items: center;

                span {
                    position: relative !important;
                    top: 1px !important;
                    width: 100% !important;
                    line-height: line-height( 'xxxs' ) !important;
                    font-size: font-size( 'xxxxxs' ) !important;
                    text-align: right !important;
                }

                .american-express-logo {
                    top: 3px !important;
                }
            }

            .warning-info-message {
                span {
                    position: relative !important;
                    right: theme-spacing( 2 ) !important;
                }

                svg {
                    margin-right: 0 !important;
                    min-width: 36px;
                }
            }
        }
    }
</style>
