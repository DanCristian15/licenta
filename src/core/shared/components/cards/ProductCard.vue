<template>
    <div v-if="category === product.category" class="product-card" :disabled="product.isProductSoldOut" :class="isProductSoldOut ? 'disabled' : ''"  @click="ret">
        <div class="product-card_image-container">
            <img class="product-card_image" :src="`data:image/png;base64,${product.imageSrc}`" alt="" />
        </div>
        <div class="product-card_name">
            <p>
                {{ product.productName }}
            </p>
        </div>
        <div>
            <div class="product-card-informations">
                <div class="product-card-informations_price ">
                    <p>Current bid</p>
                    <p>
                        {{ product.bid }}
                    </p>
                </div>
                <div class="product-card-informations_star-rating">
                    <p>Seller rating</p>
                    <StarRating value="2" />
                </div>
            </div>
            <div class="product-card_remaining-time">

                <p v-if="isProductSoldOut" class="soldOut"> Sold Out</p>
                <p v-else>Remaining time {{this.remainingHours}}:{{this.remainingMinutes}}:{{this.remainingSeconds}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import StarRating from '@core/shared/components/misc/StarRating.vue';
    import Timer from '@core/shared/components/timer/Timer.vue'
    import { mapActions, mapGetters} from 'vuex';
    import {sellProduct} from '@core/services/userService.js'

    export default ( {
        data() {
            return {
                remainingSeconds: {
                    type: Number
                },
                remainingMinutes: {
                    type: Number
                },
                remainingHours: {
                    type: Number
                },
                isProductSoldOut: false
            }
        },
        components: {
            StarRating,
            Timer
        },
        props: {
            product: {
                type: Object,
                default: () => {}
            },
            category: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters({
                getProductById: 'addProduct/getProductById',
                getToken: 'user/loggedUser/getToken'
            }),

        },
        methods: {
             ...mapActions({
                commitSetProductBid: 'addProduct/commitSetProductBid',
                commitSetLastBidder: 'addProduct/commitSetLastBidder'
            }),
            updateRemainingTime() {
                const date = this.product.dateAdded.split('T')[0]
                const time = this.product.dateAdded.split('T')[1].split(':')
                let bidMoment = new Date(this.product.dateAdded.split('T')[0])
                bidMoment.setSeconds(time[2])
                bidMoment.setMinutes(time[1])
                bidMoment.setHours(time[0])
                console.log(bidMoment)
                    setInterval(() => {
                    let thisMoment = new Date();
                    const difference = new Date(thisMoment - bidMoment);
                    this.remainingSeconds =59 - difference.getSeconds();
                    this.remainingMinutes = 59 - difference.getMinutes();
                    this.remainingHours = 23 - difference.getUTCHours();
                    console.log(this.getToken)
                    if (this.remainingSeconds === 0 && this.remainingMinutes === 0 && this.remainingHours === 0) {
                        this.isProductSoldOut = true

                        sellProduct(this.product.productId,this.getToken)
                    }
                }, 1000)
            },
            ret() {
                this.$router.push( { name: 'productDetailsPage', params: { product: this.product, productId: this.product.productId } } )
                console.log(this.product)
            }
        },
         created: function()  {
             console.log(this.product)
            this.updateRemainingTime()
        }
    } );
</script>


<style lang="scss" scoped>
.product-card {
    display: flex;
    height: 500px;
    width: 22%;
    border: 1px solid #E0E4E4;
    margin-top: 30px;
    background-color: #F1F1EE;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    flex-direction: column;
}

.disabled {
    pointer-events: none;

    .soldOut {
        color: red
    }

    p {
        color: red;
    }
}

.product-card:hover {
    box-shadow: rgba( 0, 0, 0, 0.15 ) 0 5px 15px 0;
    cursor: pointer;
}

.product-card_image-container {
    height: 65%;
    width: 100%;
    border-bottom: 1px solid #D7DEDE;
}

.product-card_image {
    height: 100%;
    width: 100%;
}

.product-card-informations {
    display: flex;

    .product-card-informations_price {
        display: flex;
        width: 50%;
        line-height: 0.4;
        margin-top: 12px;
        color: #6B6666;
        font-size: 16px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        flex-direction: column;
        align-items: center;
    }

    .product-card-informations_star-rating {
        display: flex;
        width: 50%;
        line-height: 0.4;
        margin-top: 12px;
        color: #6B6666;
        font-size: 16px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        flex-direction: column;
        align-items: center;
    }
}

.product-card_name {
    height: 70px;
    width: 100%;
    padding: 5px 10px;
    // background-color: rgba( 34, 32, 32, 0.39 );
    font-size: 20px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    overflow: hidden;
    text-align: center;
}

.product-card_remaining-time {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

</style>