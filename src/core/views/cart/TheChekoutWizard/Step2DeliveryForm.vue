<template>
    <v-container class="gst-checkout-step-2-form py-0 px-2">
        <v-row>
            <v-col cols="12" class="pt-0 pb-2">
                <SectionTitleSmall>{{ $t("fieldsets.customerInformation") }}</SectionTitleSmall>
            </v-col>
            <v-col xs="6" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.firstName"
                    :data-test-id="$testId('input.firstName')"
                    color="primary"
                    :label="$t('labels.firstName')"
                    :error-messages="requiredError({model: 'customerModel', field: 'firstName'})"
                    required
                    class="gst-input--secondary gst-input"
                    outlined
                    maxlength="30" />
            </v-col>
            <v-col xs="6" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.lastName"
                    :data-test-id="$testId('input.lastName')"
                    color="primary"
                    :label="$t('labels.lastName')"
                    :error-messages="requiredError({model: 'customerModel', field: 'lastName'})"
                    required
                    class="gst-input--secondary gst-input"
                    outlined
                    maxlength="30" />
            </v-col>
            <v-col cols="12" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.address"
                    :data-test-id="$testId('input.address')"
                    color="primary"
                    :label="$t('labels.address')"
                    :error-messages="requiredError({model: 'customerModel', field: 'address'})"
                    required
                    class="gst-input--secondary gst-input"
                    outlined
                    maxlength="100" />
            </v-col>
            <v-col cols="6" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.city"
                    :data-test-id="$testId('input.city')"
                    color="primary"
                    :label="$t('labels.city')"
                    :error-messages="requiredError({model: 'customerModel', field: 'city'})"
                    required
                    class="gst-input--secondary gst-input"
                    outlined
                    maxlength="100" />
            </v-col>
            <v-col cols="6" class="py-0 px-1">
                <v-select
                    v-model="customerModel.state"
                    :data-test-id="$testId('select.state')"
                    :items="states"
                    item-value="code"
                    item-text="name"
                    :label="$t('labels.state')"
                    color="primary"
                    outlined
                    :error-messages="requiredError({model: 'customerModel', field: 'state'})"
                    class="gst-input--secondary gst-input">
                    <template slot="append">
                        <i class="gst-icon-svg">
                            <IconDropDownArrow class="gst-dropdown-icon-svg" />
                        </i>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="6" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.zip"
                    :data-test-id="$testId('input.zip')"
                    color="primary"
                    :label="$t('labels.zip')"
                    :error-messages="zipCodeErrors"
                    required
                    class="gst-input--secondary gst-input"
                    outlined />
            </v-col>
            <v-col cols="6" class="py-0 px-1">
                <v-select
                    v-model="customerModel.country"
                    :data-test-id="$testId('select.country')"
                    :items="countries"
                    item-value="code"
                    item-text="name"
                    :label="$t('labels.country')"
                    color="primary"
                    outlined
                    :error-messages="[
                        ...requiredError({model: 'customerModel', field: 'country'}),
                        ...countryShippingOptionsError({model: 'customerModel', field: 'country'}),
                    ]"
                    class="gst-input--secondary gst-input"
                    @change="onChangeCountryDo"
                    @blur="onBlurCountryDo">
                    <template slot="append">
                        <i class="gst-icon-svg">
                            <IconDropDownArrow class="gst-dropdown-icon-svg" />
                        </i>
                    </template>
                </v-select>
            </v-col>
            <v-col v-if="isPhoneRequired" cols="6" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.phone"
                    type="tel"
                    :data-test-id="$testId('input.phone')"
                    color="primary"
                    class="gst-input--secondary gst-input"
                    :label="$t('labels.phone')"
                    :error-messages="[
                        ...requiredError({model: 'customerModel', field: 'phone'}),
                        ...phoneNumberError({model: 'customerModel', field: 'phone'}),
                    ]"
                    required
                    outlined />
            </v-col>
            <v-col :cols="isPhoneRequired ? 6 : 12" class="py-0 px-1">
                <v-text-field
                    v-model="customerModel.email"
                    :data-test-id="$testId('input.email')"
                    color="primary"
                    class="gst-input--secondary gst-input"
                    :label="$t('labels.email')"
                    :error-messages="[
                        ...requiredError({model: 'customerModel', field: 'email'}),
                        ...emailError({model: 'customerModel', field: 'email'})
                    ]"
                    required
                    outlined
                    maxlength="255" />
            </v-col>
            <!-- TODO: For now this is static, when integrating loyalty program this should be sent to BE -->
            <v-col cols="12" class="py-0 px-1">
                <v-text-field
                    :data-test-id="$testId('input.loyalty')"
                    color="primary"
                    class="gst-input--secondary gst-input"
                    :label="$t('labels.loyalty')"
                    outlined />
            </v-col>
            <v-col v-if="hasShippingOptions" cols="12" class="pa-0">
                <v-col cols="12" class="pt-0 pb-2">
                    <SectionTitleSmall>{{ $t("fieldsets.deliveryInformation") }}</SectionTitleSmall>
                </v-col>
                <v-col cols="12" class="gst-info pt-0 px-1">
                    <IconWarning class="d-inline-block u-align-vertical-middle" />
                    <span class="d-inline-block u-align-vertical-middle tertiary--text">{{ $t("messages.info") }}</span>
                </v-col>
            </v-col>
            <v-col cols="12"
                sm="8"
                md="8"
                class="py-0 px-1">
                <DataLoadingOverlay
                    :show="shippingModel.loading"
                    :color="'white'">
                    <Step2DeliveryFormShippingOptions
                        :shipping-model="shippingModel"
                        :error-messages="checkboxShippingOptionsError({model: 'shippingModel', field: 'optionId'})" />
                </DataLoadingOverlay>
            </v-col>
            <v-col cols="12" class="py-0 px-1">
                <v-checkbox
                    v-model="agreeModel.terms"
                    off-icon="$vuetify.icons.checkboxUnchecked"
                    on-icon="$vuetify.icons.checkboxChecked"
                    :data-test-id="$testId('checkbox.terms')"
                    class="gst-checkbox gst-checkout-step-2-form__field-terms-conditions d-inline-block u-align-vertical-middle"
                    :class="{ 'mt-0': !hasShippingOptions }"
                    :error-messages="checkboxTermsError({model: 'agreeModel', field: 'terms'})">
                    <template slot="label">
                        <span>
                            {{ $t("labels.agree") }}
                            <a href="#" class="d-inline" @click="openTermsAgreementModal">
                                {{ $t("labels.terms") }}
                            </a>
                        </span>
                    </template>
                </v-checkbox>
            </v-col>
            <v-col v-if="hasHealthCheck" cols="12" class="py-0 px-1">
                <v-checkbox
                    v-model="agreeModel.healthCheck"
                    off-icon="$vuetify.icons.checkboxUnchecked"
                    on-icon="$vuetify.icons.checkboxChecked"
                    :data-test-id="$testId('checkbox.healthCheck')"
                    class="gst-checkbox gst-checkout-step-2-form__field-healthcheck d-inline-block u-align-vertical-middle mt-0"
                    :error-messages="checkboxHealthCheckError({model: 'agreeModel', field: 'healthCheck'})">
                    <template slot="label">
                        <span>
                            {{ $t("labels.healthCheck") }}
                        </span>
                    </template>
                </v-checkbox>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import {
        required,
        email,
        numeric,
        minLength
    } from 'vuelidate/lib/validators';
    import {
        phoneNumber as validateUtilsPhoneNumber,
        zipCA as validateUtilsZipCA
    } from '@core/utils/validate';
    import {
        zipFormat as formatUtilsZipFormat
    } from '@core/utils/formatUtils';
    import IconWarning from '@core/shared/assets/icons/warning.svg';
    import DataLoadingOverlay from '@core/shared/components/loading/DataLoadingOverlay.vue';
    import SectionTitleSmall from '@core/shared/components/misc/SectionTitleSmall.vue';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import Step2DeliveryFormTermsAgreementModalContent from './Step2DeliveryFormTermsAgreementModalContent.vue';
    import Step2DeliveryFormShippingOptions from './Step2DeliveryFormShippingOptions.vue';

    const ZIP_MIN_LENGTH_US = 5;

    export default {
        name: 'Step2DeliveryForm',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step2Delivery.form'
        },
        testIdOptions: {
            keyPrefix: 'checkoutWizard.step2Delivery.form'
        },
        components: {
            IconWarning,
            SectionTitleSmall,
            Step2DeliveryFormShippingOptions,
            IconDropDownArrow,
            DataLoadingOverlay
        },
        props: {
            customerModel: {
                type: Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            agreeModel: {
                type: Object,
                required: true
            },
            hasHealthCheck: {
                type: Boolean,
                default: false
            },
            countries: {
                type: Array,
                default: () => ( [] )
            }
        },
        data() {
            return {
                tooltip: false,
                states: []
            };
        },
        computed: {
            isPhoneRequired() {
                return !!this.customerModel.hasOwnProperty( 'phone' );
            },
            zipCodeErrors() {
                let commonErrors = [
                    ...this.requiredError( { model: 'customerModel', field: 'zip' } ),
                    ...this.minLengthError( { model: 'customerModel', field: 'zip' } ),
                ];

                if ( this.customerModel.country && this.customerModel.country === 'CA' ){
                    return [
                        ...commonErrors,
                        ...this.zipError( { model: 'customerModel', field: 'zip' } )
                    ];
                }

                return [
                    ...commonErrors,
                    ...this.numericError( { model: 'customerModel', field: 'zip' } ),
                ];
            },
            hasShippingOptions() {
                return !!this.shippingModel.options.length;
            }
        },
        watch: {
            'customerModel.country': {
                handler: function ( value ) {
                    if ( value ) {
                        this.loadStates( );
                    } else {
                        this.clearStates( );
                    }
                },
                deep: true,
                immediate: true
            },
            '$v.agreeModel.healthCheck.$invalid': {
                handler: function( value ) {
                    this.$emit( 'healthcheck-validation-error', value );
                },
                deep: true
            }
        },
        validations() {
            const ret = {
                customerModel: {
                    firstName: {
                        required
                    },
                    lastName: {
                        required
                    },
                    address: {
                        required
                    },
                    city: {
                        required
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
                        email
                    },
                },
                shippingModel : {
                    optionId: {
                        requiredShippingOptions: function ( ) {
                            return !!( this.hasShippingOptions && this.shippingModel.optionId );
                        }
                    }
                },
                agreeModel: {
                    terms: {
                        checked( val ) {
                            return val;
                        }
                    },
                    healthCheck: {
                        checked( val ) {
                            return val;
                        }
                    }
                }
            };
            if ( !this.isPhoneRequired ) {
                delete ret.customerModel.phone;
            }

            const zipValidationsCA = {
                required,
                minLength: minLength( 6 ),
                zip: validateUtilsZipCA
            };

            if ( this.customerModel.country && this.customerModel.country === 'CA' ){
                Object.assign( ret.customerModel, { zip: zipValidationsCA } );
            }

            return ret;
        },
        methods: {
            requiredError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].required   && errors.push ( this.$t( '_common:formErrors.requiredField', { field: this.$t( `labels.${field}` ), interpolation : { escapeValue: false } } ) );
                return errors;
            },
            countryShippingOptionsError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].requiredShippingOptions  && errors.push ( this.$t( 'messages.countryShippingOptionsError' ) );
                return errors;
            },
            checkboxTermsError( { model, field }  ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].checked && errors.push( this.$t( 'messages.termsError' ) );
                return errors;
            },
            checkboxShippingOptionsError( { model, field }  ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].requiredShippingOptions && errors.push( this.$t( 'messages.shippingOptionsError' ) );
                return errors;
            },
            checkboxHealthCheckError( { model, field }  ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].checked && errors.push( this.$t( 'messages.healthCheckError' ) );
                return errors;
            },
            numericError( { model, field }  ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                if ( !this.$v[`${model}`][`${field}`].numeric )  return [ this.$t( '_common:formErrors.numeric', { field: this.$t( `labels.${field}` ), interpolation: { escapeValue: false } } ) ];
                return errors;
            },
            minLengthError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].minLength &&  errors.push( this.$t( '_common:formErrors.minLength', { length : this.$v[`${model}`][`${field}`].$params.minLength.min } ) );
                return errors;
            },
            emailError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].email  && errors.push( this.$t( '_common:formErrors.email', { field: this.$t( `labels.${field}` ), interpolation: { escapeValue: false } } ) );
                return errors;
            },
            phoneNumberError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].phoneNumber  && errors.push( this.$t( '_common:formErrors.phone' ) );
                return errors;
            },
            zipError( { model, field } ) {
                let errors = [];
                if ( !this.$v[`${model}`][`${field}`].$dirty ) return errors;
                !this.$v[`${model}`][`${field}`].zip && errors.push ( this.$t( '_common:formErrors.zip' ) );
                return errors;
            },
            validate( ) {
                this.$v.$touch();
                return !this.$v.$invalid;
            },
            clear( ) {
                this.$v.$reset();
            },
            openTermsAgreementModal( event ) {
                event.stopPropagation( );
                const propsMobile = {
                    'content-class': 'v-dialog__height-70 gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    transition: 'dialog-bottom-transition'
                };
                const propsDesktop = {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    'max-width': 500,
                    'content-class': 'gst-v-dialog',
                };

                if ( this.$vuetify.breakpoint.mdAndUp  ){
                    this.$modal.show(
                        Step2DeliveryFormTermsAgreementModalContent,
                        { },
                        this.$vuetify.breakpoint.mdAndUp ? propsDesktop : propsMobile
                    );
                } else {
                    this.$modal.showBottom(
                        Step2DeliveryFormTermsAgreementModalContent,
                        { },
                        this.$vuetify.breakpoint.mdAndUp ? propsDesktop : propsMobile
                    );
                }
            },
            stateFilters() {
                if ( this.customerModel.country ) {
                    return {
                        code: this.customerModel.country
                    };
                }
                return null;
            },
            clearStates( ) {
                this.options = [ ];
            },
            onBlurCountryDo() {
                this.$v.customerModel.zip.$touch( );
                this.formatZipCodeValue( );
            },
            onChangeCountryDo() {
                this.$v.customerModel.country.$touch( );
            },
            formatZipCodeValue() {
                if ( !this.$v.customerModel.zip.$invalid && this.customerModel.country ) {
                    this.customerModel.zip = formatUtilsZipFormat( this.customerModel.zip, this.customerModel.country );
                }
            },
            async loadStates() {
                const { success, data } = await this.$store.dispatch( `states/getRaw`, { filter: this.stateFilters() }  );
                if ( success ) {
                    this.states = [ ...data.list ];
                } else {
                    this.states = [ ];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-checkout-step-2-form {
        .v-card {
            border-radius: border-radius( 'm' ) !important;
            border-color: theme-color( 'quinary' );
        }

        ::v-deep .v-icon__component {
            height: auto;
            width: auto;
        }

        .gst-input {
            .gst-icon-svg {
                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }
        }

        .gst-input.v-select--is-menu-active {
            .gst-icon-svg {
                transform: rotate( 180deg );

                .gst-svg-icon {
                    fill: theme-color( 'primary' );
                }
            }
        }
    }

    .gst-info {
        font-size: font-size( 'xxs' );

        svg .gst-svg-icon {
            fill: theme-color( 'warning' );
        }

        span {
            line-height: 14px;
            padding-left: 8px;
            max-width: 90%;
        }
    }
</style>
