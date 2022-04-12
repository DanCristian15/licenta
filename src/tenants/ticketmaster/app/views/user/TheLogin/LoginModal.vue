<template>
    <v-card class="gst-login-modal d-flex flex-column" color="text">
        <HeaderVariant1 class="mb-3" title="Login" :show-close-icon="false" @close="$emit('close')" />
        <v-card-text class="flex-grow-0 content-max-width px-4 pb-2" :style="{ color:'inherit'}">
            <form>
                <v-text-field
                    v-model="email"
                    :data-test-id="$testId('input.email')"
                    color="primary"
                    class="gst-input--secondary gst-input"
                    :label="( focused || email ) ? $t('_common:form.labels.email') : 'Please enter your email address to proceed to application'"

                    :error-messages="[
                        ...requiredError({ field: 'email'}),
                        ...emailError({ field: 'email'}),
                    ]"
                    required
                    outlined
                    @focus="focused = true"
                    @blur="focused = false" />
                <v-btn
                    center
                    text
                    outlined
                    :data-test-id="$testId('button.submit')"
                    class="text-capitalize gst-login-btn float-right"
                    color="primary"
                    type="submit"
                    v-bind="$attrs"
                    @click.native="onLoginSubmit">
                    {{ $t('_common:buttons.login') }}
                </v-btn>
            </form>
        </v-card-text>
    </v-card>
</template>
<script>
    import { required, email } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';
    import HeaderVariant1 from '@core/shared/components/modals/layout/HeaderVariant1.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';

    export default {
        name: 'LoginModal',
        testIdOptions: {
            keyPrefix: 'shared.components.modals.loginModal'
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.modals.login',
        },
        components: {
            HeaderVariant1
        },
        mixins: [ CloseModalOnRouteChangeMixin ],
        props: {
            redirectRouteToAfterLogin: {
                type: Object,
                default: null
            }
        },
        data: function() {
            return {
                email: '',
                focused: false
            };
        },
        validations() {
            const ret = {
                email: {
                    required,
                    email,
                },
            };

            return ret;
        },
        computed: {
            ...mapGetters( {
                loadingProfile: 'user/profile/loading',
                getProfileHasError: 'user/profile/hasError'
            } )
        },
        watch: {
            'email': function ( ) {
                this.serverError = '';
            }
        },
        methods: {
            ...mapActions( {
                setUserProfileEmail         : 'user/profile/setEmail'
            } ),
            requiredError( { field } ) {
                let errors = [];
                if ( !this.$v[`${field}`].$dirty ) return errors;
                !this.$v[`${field}`].required   && errors.push ( this.$t( '_common:formErrors.requiredField', { field: this.$t( `_common:form.labels.${field}` ), interpolation : { escapeValue: false } } ) );
                return errors;
            },
            emailError( { field } ) {
                let errors = [];
                if ( !this.$v[`${field}`].$dirty ) return errors;
                !this.$v[`${field}`].email  && errors.push( this.$t( '_common:formErrors.email', { field: this.$t( `_common:form.labels.${field}` ), interpolation: { escapeValue: false } } ) );
                return errors;
            },
            validate( ) {
                this.$v.$touch();
                return !this.$v.$invalid;
            },
            async onLoginSubmit( event ) {
                event.preventDefault();
                event.stopPropagation( );
                if ( this.validate() ) {
                    this.setUserProfileEmail( this.email );
                    this.$emit( 'close' );
                    !this.redirectRouteToAfterLogin || this.$router.push( this.redirectRouteToAfterLogin );
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-login-modal__toolbar {
        border-bottom: 1px solid theme-color( 'quinary' );
    }

    .gst-login-modal__title {
        font-weight: font-weight( 'medium' );
    }

    .gst-login-btn.v-btn.v-btn--outlined {
        font-weight: font-weight( 'medium' );
        border-radius: border-radius( 'm' ) !important;
        min-height: 44px;

        &.v-btn--disabled {
            color: theme-color( 'primary' ) !important;
            border-color: theme-color( 'primary' );
            opacity: 0.4;
        }
    }

    .gst-login-btn.v-btn.v-btn--outlined:not([disabled]) {
        border-color: theme-color( 'primary' );
    }
</style>

<style lang="scss">
    @import "@scssVariables";

    .gst-login-modal__icon-close {
        fill: theme-color( 'tertiary' );
    }

    .gst-login-modal__header .v-toolbar__content {
        justify-content: end;
    }

    .gst-login-modal {
        .gst-login-modal__close.v-btn {
            min-width: auto;
        }
    }
</style>
