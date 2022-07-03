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
                <label for="year">Year</label>
                <v-text-field
                    v-model="year"
                    :error-messages="[
                        ...requiredError({ field: 'year' })
                    ]"
                    placeholder="Year/year" />

                <label>
                    Start bid
                    (All the prices will be condidered in USD)
                </label>
                <v-text-field
                    v-model="bid"
                    :error-messages="[
                        ...requiredError({ field: 'bid' })
                    ]"
                    placeholder="Start bid" />

                <label for="categories">Categories</label>
                <v-select
                    v-model="category"
                    :items="categories"
                    label="Choose a category"
                    :error-messages="[
                        ...requiredError({ field: 'category' })
                    ]" />
                <label for="description">Description (optional) </label>
                <v-textarea
                    v-model="description"
                    placeholder="Description"
                    hint="Hint text" />
                <input
                type="file"
                @change="saveImage">
            </div>
            <BaseButton block placeholder="Add product" @click="validate" />
            <!-- <div> {{ getUsers() }} </div> -->
        </v-form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapGetters } from 'vuex';
    import BaseButton from '@/core/shared/components/buttons/BaseButton.vue';
    import { categories } from '@core/shared/mockdata/categories.js';
    import { addProduct } from '@core/services/userService.js'

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
                year: '',
                bid: '',
                category: '',
                description: '',
                categories: categories,
                seller: '',
                image: ''
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
                year: {
                    required,
                },
                bid: {
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
                getLoggedUser: 'user/loggedUser/getLoggedUser',
                getToken: 'user/loggedUser/getToken'

            } ),
        },
        methods: {
            ...mapActions( {
                notificationSuccess: 'notification/success',
                commitAddProduct: 'addProduct/commitAddProduct'
            } ),

            saveImage(e) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                     this.image= reader.result;
                };
            },

            requiredError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].required   && errors.push ( this.$t( '_common:formErrors.requiredField', { field: this.$t( `_common:form.labels.${field}` ), interpolation : { escapeValue: false } } ) );
                return errors;
            },
            validate( ) {
                this.$v.$touch( );

                if ( !this.$v.$invalid ) {
                    addProduct({
                        productName: this.productName,
                        condition: this.condition.toUpperCase(),
                        year: this.year,
                        geographicOrigin: this.geographicOrigin,
                        bid: this.bid,
                        category: this.category,
                        description: this.description,
                        ownerUser: this.getLoggedUser.username,
                        imageSrc: this.image
                    }, this.getToken).then((res)=> console.log(res.data))
                    this.notificationSuccess( 'Product successfully added');
                }
            },
        }
    } );
</script>
