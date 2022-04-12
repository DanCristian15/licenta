<template>
    <div class="gst-subscribe-form">
        <v-form class="form">
            <p class="form__title">
                {{ $t('title') }}
            </p>
            <!-- eslint-disable vue/no-v-html -->
            <div class="form__paragraph" v-html="$t('subtitle')"></div>
            <!--eslint-enable-->
            <div class="form__container">
                <v-col
                    cols="12"
                    md="3">
                    <div class="form__container-input">
                        <BaseTextfield
                            v-model="name"
                            outlined
                            class="form-input"
                            :placeholder="$t('placeholders.name')"
                            :error-messages="[...requiredError({ field: 'name' })]" />
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    md="3">
                    <div class="form__container-input">
                        <BaseTextfield
                            v-model="email"
                            outlined
                            class="form-input"
                            :error-messages="[
                                ...requiredError({ field: 'email' }),
                                ...emailError({ field: 'email' })
                            ]"
                            :placeholder="$t('_common:form.labels.email')" />
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    md="3">
                    <BaseButton block :placeholder="$t('subscribeButton')" @click="validate" />
                </v-col>
            </div>
        </v-form>
    </div>
</template>

<script>
    import {
        required, email
    } from 'vuelidate/lib/validators';
    import { mapActions } from 'vuex';
    import BaseTextfield from '@/core/shared/components/input/BaseTextfield.vue';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';

    export default {
        name: 'SubscribeForm',
        components: {
            BaseTextfield,
            BaseButton
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.subscribe'
        },
        data( ) {
            return {
                name:'',
                email:''
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
            };
        },
        methods: {
            ...mapActions( {
                notificationSuccess: 'notification/success',
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
            validate( ) {
                this.$v.$touch( );

                if ( !this.$v.$invalid ) {
                    this.notificationSuccess( this.$t( 'alerts.successfullyRegistered' ) );
                }
            },
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-subscribe-form {
        .form {
            display: flex;
            flex-direction: column;
            align-items: center;

            .form__container {
                display: flex;
                width: 708px;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;

                .form__container-input {
                    height: 52px;
                    width: 260px;
                    margin-bottom: theme-spacing( 2 );

                    .form-input {
                        border-radius: border-radius( 'm' );
                    }
                }
            }

            .form__title {
                font-size: font-size( 'xxxxl' );
                font-weight: 900;
            }

            .form__paragraph {
                line-height: line-height( 'xxxxl' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'regular' );
                text-align: center;
                font-style: normal;
            }
        }
    }

    @include mobile-only {
        .gst-subscribe-form {
            .form {
                .form__container {
                    width: 261px;
                    flex-direction: column;

                    .form__container-input {
                        width: 100%;
                    }
                }

                .form__paragraph {
                    height: 100%;
                    width: 252px;
                }
            }
        }
    }

</style>