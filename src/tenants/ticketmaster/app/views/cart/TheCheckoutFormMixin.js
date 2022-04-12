import Vue from 'vue';
import {
    required,
    email,
    numeric,
    minLength,
    maxLength,
    sameAs,
} from 'vuelidate/lib/validators';
import {
    phoneNumber as validateUtilsPhoneNumber,
    zipCA as validateUtilsZipCA,
    cardNumber as validateCreditCardNumber,
    cardExpirationDate as validateExpirationDate
} from '@core/utils/validate';
import {
    sort as shippingOptionsUtilsSort,
    findOneElectronicTicketItem as shippingOptionsUtilsFindOneElectronicTicketItem
} from '@core/utils/shippingOptionsUtils';


import VuelidateMessages from '@core/mixins/forms/VuelidateMessages';

const ZIP_MIN_LENGTH_US = 5;

export default {
    mixins: [ VuelidateMessages ],
    data( ) {
        return {
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
                    email: '',
                    confirmEmail: '',
                    hotelRequest: '',
                },
                JSON.parse( JSON.stringify( this.$store.state['cart'].checkoutWizardData.customerModel || { } ) ),
                {
                    confirmEmail: '',
                    hotelReservationRequest: ''
                }
            ),
            shippingModel: {
                loading: true,
                optionId: '',
                options: [ ],
                lastSubmittedOptionId: null
            },
            agreeModel: {
                termsEventTicket: false,
                termsHotelReservation: false,
                termsEventHealthCheck: true
            },
            paymentModel: {
                cardNumber: '',
                cardExpire: '',
                cardCVV: ''
            }
        };
    },
    validations() {
        const ret = {
            customerModel: {
                firstName: {
                    required,
                    maxLength: maxLength( 30 )
                },
                lastName: {
                    required,
                    maxLength: maxLength( 30 )
                },
                address: {
                    required,
                    maxLength: maxLength( 100 )
                },
                city: {
                    required,
                    maxLength: maxLength( 100 )
                },
                zip: {
                    required,
                    numeric,
                    minLength: minLength( ZIP_MIN_LENGTH_US )
                },
                state: {
                    required
                },
                country: {
                    required,
                    requiredShippingOptions: function( ) {
                        return this.hasShippingOptions;
                    }
                },
                phone: {
                    required,
                    phoneNumber: validateUtilsPhoneNumber
                },
                email: {
                    required,
                    maxLength: maxLength( 255 ),
                    email
                },
                confirmEmail: {
                    required,
                    sameAs: sameAs( ( ) => this.customerModel.email )
                },
                hotelReservationRequest: {
                    maxLength: maxLength( 500 )
                }
            },
            shippingModel : {
                optionId: {
                    requiredShippingOptions: function ( ) {
                        return !!( this.hasShippingOptions && this.shippingModel.optionId );
                    }
                }
            },
            agreeModel: {
                termsEventTicket: {
                    checked( val ) {
                        return val;
                    }
                },
                termsHotelReservation: {
                    checked( val ) {
                        return val;
                    }
                },
                termsEventHealthCheck: {
                    checked( val ) {
                        return val;
                    }
                }
            },
            paymentModel: {
                cardNumber: {
                    required,
                    validCreditCardNumber: validateCreditCardNumber
                },
                cardExpire: {
                    required,
                    validExpirationDate: validateExpirationDate
                },
                cardCVV: {
                    required,
                    minLength: minLength( 3 ),
                }
            }
        };

        if ( this.customerModel.country && this.customerModel.country === 'CA' ){
            const zipValidationsCA = {
                required,
                minLength: minLength( 6 ),
                zip: validateUtilsZipCA
            };
            Object.assign( ret.customerModel, { zip: zipValidationsCA } );
        }

        if ( this.hasTicketsOnly ) {
            delete ret.customerModel.confirmEmail;
            delete ret.agreeModel.termsHotelReservation;
            delete ret.paymentModel;
        }

        if ( !this.hasTicketsOnly && this.usePaymentClient ) {
            delete ret.paymentModel;
        }

        if ( !this.eventHealthCheck ) {
            delete ret.agreeModel.termsEventHealthCheck;
        }

        return ret;
    },
    computed: {
        _validationsMessages( ) {
            return {
                customerModel: {
                    firstName: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', {  field: this.$t( '_components.fieldsets.detailFieldset.labels.firstName' ) } ),
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } )
                    },
                    lastName: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.detailFieldset.labels.lastName' ) } ),
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } )
                    },
                    address: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.address' ) } ),
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } )
                    },
                    city: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.city' ) } ),
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } ),
                    },
                    zip: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.zip' ), interpolation : { escapeValue: false } } ),
                        minLength: ( field, params ) => this.$t( '_common:formErrors.minLength', { length: params.min } ),
                        zip:( ) => this.$t( '_common:formErrors.zip' )
                    },
                    state: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.state' ), interpolation : { escapeValue: false } } ),
                    },
                    country: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.country' ) } ),
                        requiredShippingOptions:( ) => this.$t( '_components.fieldsets.paymentFieldset.errors.noShippingOptionsForCountry' )
                    },
                    phone: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.phone' ) } ),
                        phoneNumber: ( ) => this.$t( '_common:formErrors.phone' )
                    },
                    email: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.detailFieldset.labels.email' ) } ),
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } ),
                        email: ( field, params ) => this.$t( '_common:formErrors.email', { length: params.max } )
                    },
                    confirmEmail: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.detailFieldset.labels.emailConfirm' ) } ),
                        sameAs: ( ) => this.$t( '_common:formErrors.matchFields', { fields: this.$t( '_common:terms.email_plural' ) } ),
                    },
                    hotelReservationRequest: {
                        maxLength: ( field, params ) => this.$t( '_common:formErrors.maxLength', { length: params.max } ),
                    },
                },
                shippingModel: {
                    optionId: {
                        requiredShippingOptions: ( ) => this.$t( '_components.fieldsets.shippingFieldset.errors.requireShippingOptions' )
                    }
                },
                agreeModel: {
                    termsEventTicket: {
                        checked: ( ) => this.$t( '_components.fieldsets.action.errors.requireTerms' )
                    },
                    termsHotelReservation: {
                        checked: ( ) => this.$t( '_components.fieldsets.action.errors.requireTerms' )
                    },
                    termsEventHealthCheck: {
                        checked: ( ) => this.$t( '_components.fieldsets.action.errors.requireHealthCheck' )
                    }
                },
                paymentModel: {
                    cardNumber: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.cardNumber' ) } ),
                        validCreditCardNumber: () => this.$t( '_common:formErrors.invalidCardNumber' )
                    },
                    cardExpire: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.cardExpire' ) } ),
                        validExpirationDate: () => this.$t( '_common:formErrors.invalidCardExpire' )
                    },
                    cardCVV: {
                        required: ( ) => this.$t( '_common:formErrors.requiredField', { field: this.$t( '_components.fieldsets.paymentFieldset.labels.cardCVV' ) } ),
                        minLength: () => this.$t( '_common:formErrors.invalidCardCVV' )
                    }
                },
            };
        },
        hasShippingOptions() {
            return !!this.shippingModel.options.length;
        }
    },
    methods: {
        async loadShippingOptionsForCountry( ) {
            this.shippingModel.loading = true;
            this.shippingModel.optionId = null;
            const items = await this.getShippingOptions( { id: this.cart.id, data: { countryCode: this.customerModel.country } } );
            this.shippingModel.options = shippingOptionsUtilsSort ( items || [ ] );

            const firstElectronicOption = shippingOptionsUtilsFindOneElectronicTicketItem( this.shippingModel.options );
            if ( firstElectronicOption ) {
                this.shippingModel.options = [ firstElectronicOption ];
            }

            if ( this.shippingModel.options.length === 1 ) {
                this.shippingModel.optionId = this.shippingModel.options[0].id;
            }
            this.shippingModel.loading = false;
        },
        clearShippingOptions( ) {
            this.shippingModel.options = [ ];
        },
        updateFormModelAfterLoadingCart( ) {
            if ( this.hasTicketsOnly ) {
                Vue.delete( this.customerModel, 'confirmEmail' );
                Vue.delete( this.agreeModel, 'termsHotelReservation' );
            }

            if ( !this.eventHealthCheck ) {
                Vue.delete( this.agreeModel, 'termsEventHealthCheck' );
            }
        }
    }
};
