<template>
    <v-card class="gst-login-modal d-flex flex-column" color="text">
        <!-- TODO:  This is a test modal to test out login
            This modal will be updated in another task
         -->
        <HeaderVariant1 class="mb-3" title="Login" @close="$emit('close')" />
        <div class="d-flex align-center ml-6 mb-2">
            <div>
                If you don't have an account please sign up!
            </div>

            <button class="sign-up-button ml-2" @click="goToSignUpPage">
                Sign up
            </button>
        </div>
        <v-card-text class="flex-grow-0 content-max-width px-4 pb-2" :style="{ color:'inherit'}">
            <form>
                <v-text-field
                    v-model="email"
                    :data-test-id="$testId('input.email')"
                    color="black"
                    class="gst-input--secondary gst-input"
                    :label="$t('_common:form.labels.email')"
                    :error-messages="[
                        ...requiredError({ field: 'email'}),
                        ...emailError({ field: 'email'}),
                        ...emailServerError()
                    ]"
                    required
                    outlined />
                <v-text-field
                    v-model="password"
                    class="gst-input--secondary gst-input"
                    type="password"
                    color="black"
                    required
                    outlined
                    placeholder="Password"
                    :error-messages="[
                        ...requiredError({ field: 'password' }),
                        ...emailServerError()
                    ]" />
                <v-btn
                    center
                    text
                    outlined
                    :data-test-id="$testId('button.submit')"
                    class="text-capitalize gst-login-btn float-right"
                    color="#ADACAC"
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
        data: function() {
            return {
                email: '',
                serverError: '',
                password: ''
            };
        },
        validations() {
            const ret = {
                email: {
                    required,
                    email,
                    serverFailed : function() {
                        return !this.serverError.length;
                    }
                },
                password: {
                    required,
                    serverFailed : function() {
                        return !this.serverError.length;
                    }
                },
            };

            return ret;
        },
        computed: {
            ...mapGetters( {
                loadingProfile: 'user/profile/loading',
                getProfileHasError: 'user/profile/hasError',
                getUsers: 'user/signUp/getUsers'
            } )
        },
        watch: {
            'email': function ( ) {
                this.serverError = '';
            },
            'password': function ( ) {
                this.serverError = '';
            }
        },
        methods: {
            ...mapActions( {
                commitSetLoggedUser         : 'user/loggedUser/commitSetLoggedUser',
                userLogin                   : 'user/login',
                showLoadingOverlay          : 'appState/setLoading',
            } ),
            goToSignUpPage() {
                this.$router.push( { name: 'signUp' } );
            },
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
            emailServerError( ) {
                let errors = [];
                if ( this.serverError.length ) {
                    errors.push( this.serverError );
                }
                return errors;
            },
            validate( ) {
                this.$v.$touch();
                let users = this.getUsers;
                let match = false;
                users.forEach( user => {
                    if ( user.email === this.email &&  user.password === this.password ) {
                        match = true;
                        this.commitSetLoggedUser( { name: user.name, password: user.password, username: user.username, email: user.email } );
                    }
                } );

                if ( !match )
                    return this.$v.invalid;
                else
                    return !this.$v.invalid;


            },
            async onLoginSubmit( event ) {
                event.preventDefault();
                event.stopPropagation( );

                if ( this.validate() ) {
                    this.$router.push( { name: 'home' } );
                } else {
                    this.showLoadingOverlay ( false );
                    this.$v.$reset();
                    this.serverError = this.$t( 'messages.noEmail' );
                    this.$v.$touch();
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
        border-color: #ADACAC;
    }

    .sign-up-button {
        height: 30px;
        width: 70px;
        background-color: #ADACAC;
        border-radius: border-radius( 'm' ) !important;
    }
</style>

<style lang="scss">
    @import "@scssVariables";

    .gst-login-modal__icon-close .gst-svg-icon {
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
