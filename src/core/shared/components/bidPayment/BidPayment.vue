<template>
    <div class="d-flex flex-column align-center">
        <h1>Payment</h1>
        <div class="bid-payment d-flex pr-10 pt-10 pl-10 flex-column">
            <v-form>
                <div class="bid-payment__name d-flex  flex-column">
                    <label for="">Name on card</label>
                    <v-text-field
                        v-model="name"
                        color="black"
                        dense
                        required
                        outlined
                        placeholder="Card name"
                        :error-messages="[
                        ...requiredError({ field: 'name' }),
                    ]" />
                </div>
                <div class="bid-payment__card__number d-flex flex-column">
                    <label for="">Card number</label>
                    <v-text-field
                        v-model="cardNumber"
                        v-maska="'####-####-####-####'"
                        color="black"
                        dense
                        required
                        outlined
                        placeholder="Card number"
                        @change="cons"
                        :error-messages="[
                        ...requiredError({ field: 'cardNumber' }),
                        ...errorIsValidCardNumber({ field: 'cardNumber' }),
                    ]" />
                </div>
                <div class="d-flex">
                    <div class="d-flex flex-column">
                        <label for="">Expiration date</label>
                            <v-text-field
                                v-model="expirationDate"
                                color="black"
                                v-maska="'##/##'"
                                dense
                                required
                                outlined
                                placeholder="month/year"
                                :error-messages="[
                        ...requiredError({ field: 'expirationDate' }),
                        ...errorIsValidExpirationDate({ field: 'expirationDate' })

                    ]" />
                    </div>
                    <div class="d-flex flex-column ml-2">
                        <label for="">CVV</label>
                        <v-text-field
                            v-model="cvv"
                            v-maska="'###'"
                            color="black"
                            dense
                            required
                            outlined
                            placeholder="Card number"
                            :error-messages="[
                        ...requiredError({ field: 'cvv' })
                    ]" />
                    </div>
                </div>
            </v-form>
            <button @click="validate">submit</button>
            <p> {{ this.$route.params.bid }} </p>
        </div>
    </div>
</template>


<script>
    import { maska } from 'maska';
    import {mapGetters, mapActions} from 'vuex'
    import { required } from 'vuelidate/lib/validators';
    const todayDate = new Date();

    const isValidExpirationDate = ( value ) =>
    ((parseInt(value.slice(0,2))  >= todayDate.getMonth() + 1 ) && parseInt(todayDate.getYear().toString().substring(1)) === parseInt(value.substring(3)) && ['01','02','03','04','05','06','07','08','09','10','11','12'].includes(value.slice(0,2))) ||
    (parseInt(todayDate.getYear().toString().substring(1)) < parseInt(value.substring(3)) && ['01','02','03','04','05','06','07','08','09','10','11','12'].includes(value.slice(0,2)))

    const isValidCardNumber = (value) =>
    ['6011111111111117', '3530111333300000', '5555555555554444', '4111111111111111' ].includes(value.replaceAll('-', ''))

    export default ( {
        name: 'BidPayment',
        directives: {
            maska
        },
        data() {
            return {
                name: '',
                cardNumber: '',
                expirationDate: '',
                cvv: '',
                currentBidAsInt: parseInt(this.$route.params.bid),
                tDate: new Date()
            };
        },
         validations( ) {
            return {
                name: {
                    required
                },
                cardNumber: {
                    required,
                    isValidCardNumber
                },
                cvv: {
                    required,
                },
                expirationDate: {
                    required,
                    isValidExpirationDate
                },
                confirmEmail: {
                    required
                },
            };
        },
        methods: {
            ...mapGetters({
                getLoggedUser: 'user/loggedUser/getLoggedUser'
            }),
             ...mapActions({
                commitSetProductBid: 'addProduct/commitSetProductBid',
                commitSetLastBidder: 'addProduct/commitSetLastBidder',
                notificationSuccess: 'notification/success',
            }),
            cons() {
                console.log( this.name, this.cardNumber, this.cvv, this.month, this.year );
            },
            requiredError( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].required   && errors.push ( `The ${[ field ]} is required`  );
                return errors;
            },
            errorIsValidExpirationDate( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].isValidExpirationDate  && errors.push( 'Not a valid expiration date' );
                return errors;
            },
            errorIsValidCardNumber( { field } ) {
                let errors = [];
                if ( !this.$v[field].$dirty ) return errors;
                !this.$v[field].isValidCardNumber  && errors.push( 'Not a valid card number' );
                return errors;
            },
            validate( ) {
                // console.log(this.name)
                this.$v.$touch( );
                console.log(this.$v)
                let val = '05/24'
                let lastBidderPayload = { 'productId': this.$route.params.productId, 'lastBidderId': this.getLoggedUser().id}

                if ( !this.$v.$invalid) {
                    // this.commitSetProductBid(this.$route.params.productId,  this.$route.params.bid )
                    // this.commitAddUser( { name: this.name, password: this.password, email: this.email, username: this.username } );
                    // // this.$router.push( { name: 'home' } );
                    // this.notificationSuccess( this.$t( 'alerts.successfullyRegistered' ) );

                }
                else {
                    this.commitSetProductBid(this.$route.params);
                    this.commitSetLastBidder(lastBidderPayload);
                    this.notificationSuccess( 'Your bid was registered');
                }
            }
        },
        computed: {
             ...mapGetters( {
                getProducts: 'addProduct/getProducts',
            } ),
        },
        mounted() {
            // console.log(this.getProducts)
            console.log(this.$route);
            // console.log( typeof(this.currentBidAsInt) );
        }
    } );
</script>


<style lang="scss" scoped>
.bid-payment {
    border-radius: 10px !important;
    border: 1px solid #e2cece;
    margin-top: 70px;
    height: 37vh;
    width: 61%;
    background: #F3F3F3;
}
</style>