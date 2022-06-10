<template>
    <div class="gst-payment-provider">
        <DataLoadingOverlay
            class="gst-payment-provider__loading-overlay"
            :show="isLoading"
            color="white"
            opacity="1">
            <div :id="paymentClientContainerId" :key="paymentClientModel.token"></div>
        </DataLoadingOverlay>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import DataLoadingOverlay from '@/core/shared/components/loading/DataLoadingOverlay.vue';

    export default {
        name: 'PaymentProvider',
        components: {
            DataLoadingOverlay
        },
        props: {
            paymentClientModel: {
                type: Object,
                required: true
            },
            paymentClientContainerId: {
                type: String,
                default: 'paymentClient'
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout'
        },
        data() {
            return {
                isLoading: true
            };
        },
        computed: {
            ...mapState( {
                language: state => state.appState.language,
            } ),
            paymentClientContainerConfig( ) {
                const { language } = this;

                return {
                    locale: language,
                    vaultManager: false,
                    translations: {
                        expirationDateLabelSubheading: null,
                        cvvThreeDigitLabelSubheading: null,
                        cvvLabel: this.$t( '_components.fieldsets.paymentFieldset.labels.cardCVV' )
                    },
                    card: {
                        overrides: {
                            fields: {
                                number: {
                                    placeholder: null
                                },
                                expirationDate: {
                                    placeholder: null
                                },
                                cvv: {
                                    placeholder: null
                                }
                            },
                            styles: {
                                input: {
                                    'font-size': '14px',
                                    'font-weight': 400,
                                    'padding-left': '10px',
                                    'color': '#1F262D',
                                },
                                '.invalid': {
                                    'color': '#C33764'
                                },
                            }
                        },
                    }
                };
            }
        },
        watch: {
            'paymentClientModel.token': {
                handler: async function ( value, oldValue ) {
                    if ( value && value !== oldValue ) {
                        await this.openPaymentIframe( );
                    }
                },
                immediate: true
            }
        },
        methods: {
            async openPaymentIframe( ) {
                const { paymentClientModel, paymentClientContainerId, paymentClientContainerConfig } = this;

                if ( this._instancePaymentClient ) {
                    this._instancePaymentClient.off( 'card:validityChange', this.onCardValidityChangeDo );
                }

                return new Promise ( ( resolve ) => {
                    apiPaymentClient.openPaymentIFrame(
                        paymentClientModel.token,
                        `#${paymentClientContainerId}`,
                        paymentClientContainerConfig,
                        ( createError, instancePaymentClient ) => {
                            this.isLoading = false;

                            if ( createError ) {
                                resolve( false );
                                return;
                            }
                            this._instancePaymentClient = instancePaymentClient;
                            instancePaymentClient.on( 'card:validityChange', this.onCardValidityChangeDo );
                            this.$emit( 'instancePaymentClientComputed', instancePaymentClient );

                            resolve( true );
                        }
                    );
                } );
            },
            onCardValidityChangeDo( event ) {
                const validPaymentFields = Object.values( event.fields ).every( field => field.isValid );

                this.$emit( 'updatePaymentFieldsValidity', validPaymentFields );
            }
        },
        async mounted( ) {
            this._instancePaymentClient = null;
            await apiPaymentClient.loadClient( );
            this.$emit( 'updatePaymentFieldsValidity', false );
        },
        destroyed( ) {
            if ( this._instancePaymentClient ) {
                this._instancePaymentClient.off( 'card:validityChange', this.onCardValidityChangeDo );
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-payment-provider,
    .gst-payment-provider__loading-overlay {
        min-height: 100px;
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .braintree-sheet {
        border: none;
        font-family: "Averta Std", sans-serif !important;
    }

    .braintree-sheet__content--form {
        padding: 0;

        .braintree-form__field-group {
            .braintree-form__label {
                line-height: line-height( 'xl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 's' );
                font-weight: normal;
            }
        }

        .braintree-form__flexible-fields {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;

            .braintree-form__field-group:first-child {
                padding-left: theme-spacing( 0 );
            }

            .braintree-form__field-group {
                margin-top: theme-spacing( 3 );
            }
        }
    }

    .braintree-sheet__header {
        display: none;
    }

    .braintree-placeholder {
        display: none;
    }

    .braintree-form__hosted-field {
        border: 1px solid theme-color( 'septenary' ) !important;
        background: #FFFFFF !important;
        box-sizing: border-box;
        box-shadow: inset 0 2px 4px rgba( 0, 0, 0, 0.1 );
        border-radius: 2px;
        max-height: 36px;

        .braintree-form-expiration {
            max-width: 166px !important;
        }
    }

    .braintree-form__icon-container,
    .braintree-form__icon.braintree-form__field-error-icon {
        display: none !important;
    }

    .braintree-form__field-group[data-braintree-id="number-field-group"].braintree-form__field-group.braintree-form__field-group {
        position: relative;
        padding-left: theme-spacing( 0 );

        .braintree-form__hosted-field {
            padding-left: theme-spacing( 11 );
        }

        .braintree-form__hosted-field::before {
            display: block;
            position: absolute;
            top: 6px;
            left: theme-spacing( 4 );
            height: 24px;
            width: 24px;
            content: ' ';
            background-image: url( '~@tenants/ticketmaster/app/assets/icons/credit-card.png' );
            background-size: 24px 24px;
        }
    }

    .braintree-form__field-group[data-braintree-id="number-field-group"].braintree-form__field-group.braintree-form__field-group--is-focused {
        .braintree-form-number {
            border-color: theme-color( 'primary' ) !important;
        }
    }

    .braintree-form__field-group[data-braintree-id="cvv-field-group"].braintree-form__field-group.braintree-form__field-group {
        .braintree-form__field::before {
            display: block;
            position: absolute;
            top: 10px;
            left: 205px;
            height: 28px;
            line-height: line-height( 'm' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
            font-weight: normal;
            content: '3-digits on back of card';
            background-size: 24px 24px;
            min-width: 165px;

            @include mobile-only {
                top: 45px !important;
                left: unset !important;
                right: 0 !important;
                line-height: line-height( 's' ) !important;
                font-size: font-size( 'xxxs' ) !important;
                text-align: right !important;
            }
        }

        .braintree-form__field::after {
            display: block;
            position: absolute;
            top: 6px;
            left: 175px;
            height: 24px;
            width: 24px;
            content: '';
            background-image: url( '~@tenants/ticketmaster/app/assets/icons/credit-card-cvv.png' );
            background-size: 24px 24px;

            @include mobile-only {
                top: 41px !important;
                left: unset !important;
                right: 125px !important;
                line-height: line-height( 's' ) !important;
                font-size: font-size( 'xxxs' ) !important;
                text-align: right !important;
            }
        }
    }

    .braintree-form__field-group[data-braintree-id="cvv-field-group"].braintree-form__field-group.braintree-form__field-group--has-error {
        .braintree-form__icon-container {
            display: block;
        }

        .braintree-form__field::before {
            @include mobile-only {
                top: theme-spacing( 16 ) !important;
            }
        }

        .braintree-form__field::after {
            @include mobile-only {
                top: theme-spacing( 15 ) !important;
            }
        }
    }

    .braintree-form__field-group[data-braintree-id="number-field-group"].braintree-form__field-group.braintree-form__field-group--has-error,
    .braintree-form__field-group[data-braintree-id="expiration-date-field-group"].braintree-form__field-group.braintree-form__field-group--has-error,
    .braintree-form__field-group[data-braintree-id="cvv-field-group"].braintree-form__field-group.braintree-form__field-group--has-error {
        .braintree-form__hosted-field::after {
            display: block;
            position: absolute;
            top: 8px;
            right: 3px;
            height: 24px;
            width: 24px;
            content: ' ';
            background-image: url( "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath class='gst-svg-icon' d='M10 .833a9.167 9.167 0 1 1 0 18.334A9.167 9.167 0 0 1 10 .833v0ZM10 10.417V6.25M10 14.167v-.834' stroke='%23D93A3A' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" );
            background-size: 18px 18px;
        }

        .braintree-form__label {
            color: #C33764 !important;
        }

        .braintree-form__hosted-field {
            border-color: #C33764 !important;
        }
    }

    .braintree-form__field-group[data-braintree-id="expiration-date-field-group"],
    .braintree-form__field-group[data-braintree-id="cvv-field-group"] {
        margin-top: 6px;
        flex-grow: unset;
        flex-basis: unset;
        max-width: 166px;
    }

    .braintree-form__field-group[data-braintree-id="expiration-date-field-group"] {
        margin-right: 14px;
    }

    .braintree-form__field-group[data-braintree-id="number-field-group"].braintree-form__field-group.braintree-form__field-group,
    .braintree-form__field-group[data-braintree-id="expiration-date-field-group"].braintree-form__field-group.braintree-form__field-group,
    .braintree-form__field-group[data-braintree-id="cvv-field-group"].braintree-form__field-group.braintree-form__field-group {
        .braintree-form__hosted-field.braintree-hosted-fields-valid::after {
            display: block;
            position: absolute;
            top: 8px;
            right: 3px;
            height: 24px;
            width: 24px;
            content: ' ';
            background-image: url( "data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 22C8.06126 22 5.29968 20.856 3.22126 18.7787C1.14284 16.7014 0 13.9387 0 11.0011C0 8.06241 1.144 5.30083 3.22126 3.22241C5.29853 1.144 8.06126 0 11 0C13.9387 0 16.7003 1.144 18.7787 3.22241C20.8572 5.30083 22 8.06241 22 11.0011C22 13.9399 20.856 16.7014 18.7787 18.7787C17.7596 19.8033 16.5473 20.6156 15.212 21.1685C13.8768 21.7214 12.4452 22.004 11 22ZM11 1.15789C5.57295 1.15789 1.15789 5.57294 1.15789 11C1.15789 16.427 5.57295 20.8421 11 20.8421C16.4271 20.8421 20.8421 16.427 20.8421 11C20.8421 5.57294 16.4271 1.15789 11 1.15789Z' fill='%231BAB1E'/%3E%3Cpath d='M8.68379 15.6316C8.53019 15.6316 8.38282 15.5708 8.2739 15.4626L4.80021 11.9889C4.69475 11.8797 4.6364 11.7334 4.63772 11.5816C4.63904 11.4298 4.69992 11.2846 4.80726 11.1773C4.91461 11.07 5.05981 11.0091 5.21161 11.0078C5.36341 11.0064 5.50965 11.0648 5.61884 11.1702L8.68263 14.234L16.378 6.53868C16.4872 6.43322 16.6334 6.37486 16.7852 6.37618C16.937 6.3775 17.0822 6.43839 17.1896 6.54573C17.2969 6.65307 17.3578 6.79828 17.3591 6.95008C17.3604 7.10187 17.3021 7.24812 17.1966 7.35731L9.09137 15.4626C9.03758 15.5164 8.97367 15.559 8.90332 15.5881C8.83297 15.6171 8.75757 15.6319 8.68148 15.6316H8.68379Z' fill='%231BAB1E'/%3E%3C/svg%3E%0A" );
            background-size: 18px 18px;
            fill: theme-color( 'success' );
        }
    }

    .braintree-sheet--has-error {
        .braintree-sheet {
            border: none;
        }

        .braintree-sheet__error {
            display: none;
        }
    }

    .braintree-methods.braintree-methods-initial {
        margin-top: theme-spacing( 2 );
        margin-right: theme-spacing( n1 );

        .braintree-method {
            width: 100%;
            margin-bottom: theme-spacing( 6 );
        }
    }

    .braintree-loaded .braintree-upper-container::before {
        background: theme-color( 'white' );
    }

    .braintree-large-button.braintree-toggle:not(.braintree-hidden) {
        display: inline-flex;
        padding: theme-spacing( 0 );
        margin-bottom: theme-spacing( 5 );
        background: theme-color( 'transparent' );
        color: theme-color( 'primary' );
        font-weight: font-weight( 'large' );

        span {
            border: 0;
        }
    }
</style>