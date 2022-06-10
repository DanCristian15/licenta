<template>
    <div class="product-details-page">
        <p class="product-details-page__name">
            {{ this.product.productName }}
        </p>
        <div class="d-flex align-end">
            <div class="product-details-page__container">
                <div class="d-flex align-self-end">
                    <div class="right-characteristic characteristic-container">
                        Condition
                        <p>
                            {{ this.product.condition }}
                        </p>
                    </div>

                    <div class="characteristic-container ml-4">
                        Last bid
                        <p>
                            {{ this.product.bid }} $
                        </p>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="right-characteristic characteristic-container">
                        Year
                        <p>
                            {{ this.product.year }}
                        </p>
                    </div>
                    <div class="characteristic-container ml-4">
                        Geographic origin:
                        <p>
                            {{ this.product.geographicOrigin }}
                        </p>
                    </div>
                </div>
                <img class="product-details-page__image" :src="`data:image/png;base64,${product.imageSrc}`" alt="" />
            </div>
            <div class="product-details-page__additional-informations d-flex flex-column ml-6 align-center align-self-end">
                <div class="product-details-page__additional-informations-timer u-width-100 d-flex justify-center pt-3">
                    <p v-if="product.isProductSoldOut"> Sold Out</p>
                    <p v-else>Remaining time {{this.remainingHours}}:{{this.remainingMinutes}}:{{this.remainingSeconds}} </p>
                </div>
                <div class="product-details-page__additional-informations-seller-profile u-height-100 u-width-100 d-flex flex-column align-center">
                    <div class="product-details-page__seller-profile-informations d-flex flex-column align-center pt-5 pb-5">
                        <h3>Seller profile</h3>
                        <div class="product-details-page__seller-profile-image d-flex align-center mb-3">
                            <img width="50" :src="`data:image/png;base64,${product.imageSrc}`" />
                            <p class="mt-3 ml-2">
                                {{ product.ownerUser.username }}
                            </p>
                        </div>

                        <div class="d-flex align-center">
                            <h5>
                                Seller Rating
                            </h5>
                            <StarRating class="mt-2 ml-2" :value="product.sellerRating" />
                        </div>
                        <div class="d-flex justify-center align-center">
                            <h5>
                                Seller country
                            </h5>
                            <div class="d-flex justify-center align-center ml-1">
                                {{ product.sellerCountry }}
                            </div>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <h5>
                                Verified
                            </h5>
                            <div class="d-flex justify-center align-center ml-1">
                                <IconNotOk v-if="product.isVerified" />
                                <IconOk v-else />
                            </div>
                        </div>
                        <div class="d-flex align-center">
                            <h5>Sold products</h5>
                            <div class="pt-1 pl-2">
                                {{ product.soldProducts }}
                            </div>
                        </div>
                    </div>
                    <h5 class="mt-6 mb-4 ml-10 d-flex align-self-start">
                        Quick bid
                    </h5>
                    <div class="product-details-page__additional-informations-buttons-group u-width-100 d-flex justify-center flex-wrap">
                        <button class="bid-button" @click="goToBidPaymentQuick(5)">
                            5 $
                        </button>
                        <button class="bid-button" @click="goToBidPaymentQuick(10)">
                            10 $
                        </button>
                        <button class="bid-button" @click="goToBidPaymentQuick(50)">
                            50 $
                        </button>
                        <button class="bid-button" @click="goToBidPaymentQuick(100)">
                            100 $
                        </button>
                    </div>
                    <h5 class="mt-6 mb-1 ml-10 d-flex align-self-start">
                        Bid directly
                    </h5>
                    <div class="mb-4 ml-10 d-flex align-self-start">

                            <v-text-field
                                v-model="directlyBid"
                                class="bid-directly-input"
                                color="black"
                                label="Bid"
                                value=""
                                suffix="$" />
                            <button class="bid-directly-button ml-2" @click="goToBidPaymentDirectly(directlyBid)">
                                Place your bid
                            </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import StarRating from '@core/shared/components/misc/StarRating.vue';
    import IconNotOk from '@core/shared/assets/icons/notok.svg';
    import IconOk from '@core/shared/assets/icons/ok.svg';
    import { bidDto } from '@core/services/userService.js'
    import {mapGetters, mapActions} from 'vuex'

    export default ( {
        components: {
            StarRating,
            IconNotOk,
            IconOk
        },
        data() {
            return {
                product: {},
                directlyBid: '',
                remainingTime: {
                    type: Number
                },
                 remainingSeconds: {
                    type: Number
                },
                remainingMinutes: {
                    type: Number
                },
                remainingHours: {
                    type: Number
                }
            };
        },
        computed: {
             ...mapGetters({
                getLoggedUser: 'user/loggedUser/getLoggedUser',
                getToken: 'user/loggedUser/getToken'
            }),
        },
        methods: {
            ...mapActions( {
                notificationSuccess: 'notification/success',
            } ),
           updateRemainingTime() {
                const date = this.product.dateAdded.split('T')[0]
                const time = this.product.dateAdded.split('T')[1].split(':')
                let bidMoment = new Date(this.product.dateAdded.split('T')[0])
                bidMoment.setSeconds(time[2])
                bidMoment.setMinutes(time[1])
                bidMoment.setHours(time[0])
                    setInterval(() => {
                    let thisMoment = new Date();
                    const difference = new Date(thisMoment - bidMoment);
                    this.remainingSeconds =59 - difference.getSeconds();
                    this.remainingMinutes = 59 - difference.getMinutes();
                    this.remainingHours = 23 - difference.getUTCHours();
                    if (this.remainingSeconds === 0 && this.remainingMinutes === 0 && this.remainingHours === 0) {
                        this.isProductSoldOut = true
                        sellProduct(this.product.productId, this.getToken)
                    }
                }, 1000)
            },
            goToBidPaymentQuick( bid ) {
                console.log( 'wtf', this.getLoggedUser.username,this.product.productId,bid)
                bidDto({
                    username: this.getLoggedUser.username,
                    productId: this.product.productId,
                    bid: this.product.bid + parseInt(bid)
                },this.getToken).then(()=> {
                    this.notificationSuccess( 'Bid successfully added');
                    console.log(this.product.bid)
                    this.product.bid = this.product.bid + parseInt(bid)
                    // this.product.dateAdded = new Date().toLocaleString()
                    console.log(this.product.dateAdded)
                })
                // this.notificationSuccess( 'Bid successfully added');
                // console.log( bid );
                // this.$router.push( { name: 'bidPayment', params: { bid: bid, productId: this.product.productId } } );
            },
            goToBidPaymentDirectly( bid ) {
                // console.log( 'wtf', this.getLoggedUser().username,this.product.productId,bid)
                bidDto({
                    username: this.getLoggedUser.username,
                    productId: this.product.productId,
                    bid: this.product.bid + parseInt(bid)
                },this.getToken).then(()=> {
                    this.notificationSuccess( 'Bid successfully added');
                    this.product.bid = this.product.bid + parseInt(bid)
                    this.product.dateAdded = new Date().toLocaleString;
                    console.log(this.product.dateAdded)
                })
                // this.notificationSuccess( 'Bid successfully added');
                // this.$router.push( { name: 'bidPayment', params: { bid: this.directlyBid, productId: this.product.productId  } } );
            }
        },
        created: function()  {
            this.product = this.$route.params.product;
            this.updateRemainingTime()
        }

    } );
</script>

<style lang="scss" scoped>
.product-details-page {
    margin-right: 10%;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-left: 20%;

    .product-details-page__name {
        font-size: 40px;
    }

    .product-details-page__container {
        width: 55%;

        .right-characteristic {
            width: 60%;
            margin-left: 5%;
        }

        .product-details-page__image {
            height: 400px;
            width: 100%;
        }

        .characteristic-container {
            color: grey;
            font-size: 20px;

            p {
                color: black;
                font-size: 24px;
            }
        }
    }

    .product-details-page__additional-informations {
        width: 45%;
        border: 1px solid #E6E4E4;
        align-self: flex-start;
        // background: red;
    }

    .product-details-page__seller-profile-informations {
        height: 100%;
        width: 100%;
        background-color: #ECE5E5;
        // background: chartreuse;
    }

    .product-details-page__additional-informations-timer {
        background: #ECE5E5;
        font-size: 24px;
    }

    .bid-button {
        height: 30px;
        width: 40%;
        margin: 4px;
        background-color: rgb( 82, 79, 79 );
        color: white;
        font-size: 20px;
        font-weight: 600;
        border-radius: 4px;
    }

    .bid-button:hover {
        height: 30px;
        width: 40%;
        margin: 4px;
        background-color: rgb( 32, 31, 31 );
        color: white;
        font-size: 20px;
        font-weight: 600;
    }

    .bid-directly-button {
        height: 30px;
        width: 50%;
        margin: 4px;
        background-color: rgb( 82, 79, 79 );
        color: white;
        font-size: 12px;
        font-weight: 600;
        border-radius: 4px;
    }

    .bid-directly-button:hover {
        height: 30px;
        width: 50%;
        margin: 4px;
        background-color: rgb( 32, 31, 31 );
        color: white;
        font-size: 12px;
        font-weight: 600;
        border-radius: 4px;
    }

    .bid-directly-input {
        width: 70%;
    }
}
</style>
