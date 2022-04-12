<template>
    <div class="d-flex flex-column align-center">
        <h1>Payment</h1>
        <div class="bid-payment d-flex pr-10 pt-10 pl-10 flex-column">
            <form action="">
                <div class="bid-payment__name d-flex  flex-column">
                    <label for="">Name on card</label>
                    <v-text-field
                        v-model="name"
                        color="black"
                        dense
                        required
                        outlined
                        placeholder="Card name" />
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
                        @change="cons" />
                </div>
                <div class="d-flex justify-center">
                    <div class="d-flex flex-column">
                        <label for="">Expiration date</label>
                        <div class="d-flex mr-16">
                            <v-text-field
                                v-model="name"
                                class="mr-16"
                                color="black"
                                dense
                                required
                                outlined
                                placeholder="Month" />
                            <v-text-field
                                v-model="name"
                                class="ml-2"
                                color="black"
                                dense
                                required
                                outlined
                                placeholder="Year" />
                        </div>
                    </div>

                    <div class="d-flex flex-column ml-2">
                        <label for="">CVV</label>
                        <v-text-field
                            v-model="name"
                            v-maska="'###'"
                            color="black"
                            dense
                            required
                            outlined
                            placeholder="Card number" />
                    </div>
                </div>
            </form>
            <p> {{ this.$route.params.bid }} </p>
        </div>
    </div>
</template>


<script>
    import { maska } from 'maska';
    import { cardNumber } from '@core/utils/validate';

    export default ( {
        name: 'BidPayment',
        directives: {
            maska
        },
        data() {
            return {
                name: '',
                cardNumber: ''
            };
        },
        methods: {
            cons() {
                console.log( this.name );
            }
        },
        mounted() {
            console.log( this.$route.params.bid );
        }
    } );
</script>


<style lang="scss" scoped>
.bid-payment {
    height: 50vh;
    width: 800px;
    background: #F3F3F3;
}
</style>