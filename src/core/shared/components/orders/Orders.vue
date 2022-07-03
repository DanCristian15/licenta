<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-form class="d-flex flex-column justify-center align-center">
            <h2>Orders</h2>
            <div>
                <label for="address">Address</label>
                <v-text-field
                    v-model="address"
                    class="text-field"
                    color="purple darken-2"
                    required
                    placeholder="Address"
                    :error-messages="[
                        ...requiredError({ field: 'address' }),
                    ]" />
                <label for="city">City</label>
                <v-text-field
                    v-model="city"
                    :error-messages="[
                        ...requiredError({ field: 'city' })
                    ]"
                    placeholder="city" />
                <label for="country">Country</label>
                <v-text-field
                    v-model="country"
                    :error-messages="[
                        ...requiredError({ field: 'country' })
                    ]"
                    placeholder="country" />
                <label for="county">County</label>
                <v-text-field
                    v-model="county"
                    :error-messages="[
                        ...requiredError({ field: 'county' })
                    ]"
                    placeholder="county" />
                <label for="postalCode">Postal code </label>
                <v-text-field
                    v-model="postalCode"
                    placeholder="postalCode"
                     :error-messages="[
                        ...requiredError({ field: 'postalCode' })
                    ]"
                    hint="Hint text" />
                <label for="email">Email </label>
                <v-text-field
                    v-model="email"
                    placeholder="email"
                    hint="Hint text"
                     :error-messages="[
                        ...requiredError({ field: 'email' })
                    ]" />
                <label for="phone">Phone number </label>
                <v-text-field
                    v-model="phone"
                    placeholder="phone numeber"
                    hint="Hint text"
                     :error-messages="[
                        ...requiredError({ field: 'phone' })
                    ]" />
            </div>
            <BaseButton block placeholder="Place the order" @click="validate" />
        </v-form>
    </div>
</template>

<script>
    import { required,email } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';
    import { categories } from '@core/shared/mockdata/categories.js';
    import { addProduct } from '@core/services/userService.js'
    import {addOrder} from '@core/services/userService.js'

    export default ( {
        name: 'Orders',
        components: {
            BaseButton
        },
        data() {
            return {
                address: '',
                email: '',
                phone: '',
                postalCode:'',
                country: '',
                county: '',
                city: '',
                username: ''
            };
        },
        validations( ) {
            return {
                address: {
                    required,
                },
                email: {
                    required,
                    email
                },
                phone: {
                    required,
                },
                country: {
                    required,
                },
                county: {
                    required
                },
                city: {
                    required,
                },
                postalCode: {
                    required
                }
            };
        },
        computed: {
            ...mapGetters( {
                getUsers: 'user/signUp/getUsers',
                getLoggedUser: 'user/loggedUser/getLoggedUser',
                getToken: 'user/loggedUser/getToken'

            } ),
        },
        methods: {
            ...mapActions( {
                notificationSuccess: 'notification/success',
                commitAddProduct: 'addProduct/commitAddProduct'
            } ),

            requiredError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].required   && errors.push ( this.$t( '_common:formErrors.requiredField', { field: this.$t( `_common:form.labels.${field}` ), interpolation : { escapeValue: false } } ) );
                return errors;
            },
            validate( ) {
                this.$v.$touch( );
                if ( !this.$v.$invalid ) {
                    this.username = this.getLoggedUser.username;
                    console.log( this.$data );
                    addOrder(this.$data, this.getToken)
                    .then((resp) => {
                    })
                    this.notificationSuccess( 'Order is registered');
                    this.$router.push({name: 'bidPayment', params: {product: this.$route.params.product }});
                }
            },
        }
    } );
</script>
