<template>
    <div class=" d-flex flex-column justify-center align-center">
        <v-form class=" signUp-form d-flex flex-column justify-center align-center">
            <h2>Sign Up</h2>
            <div>
                <v-text-field
                    v-model="name"
                    class="text-field"
                    color="purple darken-2"
                    required
                    placeholder="Full name"
                    :error-messages="[
                        ...requiredError({ field: 'name' }),
                    ]" />
                <v-text-field
                    v-model="password"
                    class="text-field"
                    type="password"
                    color="purple darken-2"
                    required
                    placeholder="Password"
                    :error-messages="[
                        ...requiredError({ field: 'password' }),
                        ...minLengthError({field: 'password'}),
                        ...errorNumber({field: 'password'}),
                        ...errorStartsWithCapitalLetter({field: 'password'})
                    ]" />
                <v-text-field
                    v-model="confirmPassword"
                    class="text-field"
                    type="password"
                    color="purple darken-2"
                    required
                    placeholder="Confirm password"
                    :error-messages="[
                        ...requiredError({ field: 'confirmPassword' }),
                        ...errorSameAsRef({field: 'confirmPassword'})
                    ]" />
                <v-text-field
                    v-model="username"
                    class="text-field"
                    color="purple darken-2"
                    required
                    placeholder="Username"
                    :error-messages="[
                        ...requiredError({ field: 'username' }),
                        ...minLengthError({field: 'username'}),
                        ...errorNumber({field: 'username'}),
                        ...errorStartsWithCapitalLetter({field: 'username'})
                    ]" />
                <v-text-field
                    v-model="email"
                    :error-messages="[
                        ...requiredError({ field: 'email' }),
                        ...emailError({ field: 'email' })
                    ]"
                    :placeholder="$t('_common:form.labels.email')" />
                <v-text-field
                    v-model="confirmEmail"
                    :error-messages="[
                        ...requiredError({ field: 'confirmEmail' }),
                        ...emailError({ field: 'confirmEmail' }),
                        ...errorSameAsRef({field: 'confirmEmail'})

                    ]"
                    placeholder="Confirm email" />

                <BaseButton block :placeholder="$t('subscribeButton')" @click="validate" />
                <p> {{ getUsers }} </p>
            </div>
        </v-form>
    </div>
</template>

<script>
    import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';

    const validationNumber = ( value ) => /\d/.test( value );
    const startsWithCapitalLetter = ( value ) => value[0]=== value[0].toUpperCase();



    export default ( {
        name: 'SignUp',
        components: {
            BaseButton
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
                username: '',
                confirmPassword: '',
                confirmEmail: ''
            };
        },
        validations( ) {
            return {
                name: {
                    required,
                },
                email: {
                    required,
                    email
                },
                password: {
                    validationNumber,
                    required,
                    minLength: minLength( 10 ),
                    startsWithCapitalLetter
                },
                username: {
                    validationNumber,
                    required,
                    minLength: minLength( 10 ),
                    startsWithCapitalLetter
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs( () => this.password )
                },
                confirmEmail: {
                    email,
                    required,
                    sameAsPassword: sameAs( () => this.email )
                },
            };
        },
        computed: {
            ...mapGetters( {
                getUsers: 'user/signUp/getUsers'
            } ),
        },
        methods: {
            ...mapActions( {
                notificationSuccess: 'notification/success',
                commitAddUser: 'user/signUp/commitAddUser'
            } ),
            requiredError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].required   && errors.push ( this.$t( '_common:formErrors.requiredField', { field: this.$t( `_common:form.labels.${field}` ), interpolation : { escapeValue: false } } ) );
                return errors;
            },
            emailError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].email  && errors.push( this.$t( '_common:formErrors.email', { field: this.$t( `_common:form.labels.${field}` ), interpolation: { escapeValue: false } } ) );
                return errors;
            },
            minLengthError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].minLength  && errors.push( `The ${[ field ]} should have more than 10` );
                return errors;
            },
            errorNumber( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].validationNumber  && errors.push( `The ${[ field ]} must contain a number` );
                return errors;
            },
            errorStartsWithCapitalLetter ( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].startsWithCapitalLetter  && errors.push( `The ${[ field ]} must starts with a capital letter` );
                return errors;
            },
            errorSameAsRef ( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].sameAsPassword  && errors.push( `The ${[ field ]} must be the same as the field above` );
                return errors;
            },
            validate( ) {
                this.$v.$touch( );
                // console.log( this.getUsers );
                let users = this.getUsers;
                let doesntMatch = true;
                users.forEach( user => {
                    if ( this.email === user.email || this.username === user.username ) {
                        doesntMatch = false;
                    }
                } );

                if ( !this.$v.$invalid && doesntMatch === true ) {

                    this.commitAddUser( { name: this.name, password: this.password, email: this.email, username: this.username } );
                    // this.$router.push( { name: 'home' } );
                    this.notificationSuccess( this.$t( 'alerts.successfullyRegistered' ) );
                }
            },
        }
    } );
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .signUp-form {
        width: 250px;
    }

    .text-field {
        width: 300px !important;
    }

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
