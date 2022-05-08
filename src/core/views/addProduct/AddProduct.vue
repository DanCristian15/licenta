<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-form class="d-flex flex-column justify-center align-center">
            <h2>Add product</h2>
            <div>
                <label for="name">Name</label>
                <v-text-field
                    v-model="productName"
                    class="text-field"
                    color="purple darken-2"
                    required
                    placeholder="Product name"
                    :error-messages="[
                        ...requiredError({ field: 'productName' }),
                    ]" />
                <label for="Condition">Condition</label>
                <v-text-field
                    v-model="condition"
                    :error-messages="[
                        ...requiredError({ field: 'condition' }),
                    ]"
                    placeholder="Condition" />
                <label for="geographicOrigin">Geographic origin</label>
                <v-text-field
                    v-model="geographicOrigin"
                    :error-messages="[
                        ...requiredError({ field: 'geographicOrigin' })

                    ]"
                    placeholder="Geographic origin" />
                <label for="years">Year/s</label>
                <v-text-field
                    v-model="years"
                    :error-messages="[
                        ...requiredError({ field: 'years' })
                    ]"
                    placeholder="Year/years" />

                <label>
                    Start bid
                    (All the prices will be condidered in USD)
                </label>
                <v-text-field
                    v-model="lastBid"
                    :error-messages="[
                        ...requiredError({ field: 'lastBid' })
                    ]"
                    placeholder="Start bid" />

                <label for="categories">Categories</label>
                <v-select
                    v-model="category"
                    :items="categories"
                    label="Choose a category" />
                <label for="description">Description (optional) </label>
                <v-textarea
                    v-model="description"
                    placeholder="Description"
                    hint="Hint text" />
            </div>
            <BaseButton block :placeholder="$t('subscribeButton')" @click="validate" />
            <!-- <div> {{ getUsers() }} </div> -->
        </v-form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';
    import { categories } from '@core/shared/mockdata/categories.js';

    export default ( {
        name: 'AddProduct',
        components: {
            BaseButton
        },
        data() {
            return {
                productName: '',
                condition: '',
                geographicOrigin: '',
                years: '',
                lastBid: '',
                category: '',
                description: '',
                categories: categories,
                seller: ''
            };
        },
        validations( ) {
            return {
                productName: {
                    required,
                },
                condition: {
                    required,
                },
                geographicOrigin: {
                    required,
                },
                years: {
                    required,
                },
                lastBid: {
                    required,
                },
                category: {
                    required,
                }
            };
        },
        computed: {
            ...mapGetters( {
                getUsers: 'user/signUp/getUsers',
                getLoggedUser: 'user/loggedUser/getLoggedUser'

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
                let i = 100;

                if ( !this.$v.$invalid ) {


                    console.log( this.$data, this.productName, this.category, this.years, this.description );
                    this.commitAddProduct( {
                        productName: this.productName,
                        condition: this.condition,
                        years: this.years,
                        geographicOrigin: this.geographicOrigin,
                        lastBid: this.lastBid,
                        category: this.category,
                        description: this.description,
                        sellerEmail: this.getLoggedUser.email,
                        sellerName: this.getLoggedUser.name


                    } );

                    this.notificationSuccess( this.$t( 'alerts.successfullyRegistered' ) );
                }
            },
        }
    } );
</script>
