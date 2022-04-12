<template>
    <div v-if="category === product.category" class="product-card" @click="ret">
        <div class="product-card_image-container">
            <img class="product-card_image" :src="product.src" alt="" />
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
                        {{ product.startBid }} $
                    </p>
                </div>
                <div class="product-card-informations_star-rating">
                    <p>Seller rating</p>
                    <StarRating :value="product.sellerRating" />
                </div>
            </div>
            <div class="product-card_remaining-time">
                <p>Remaining time: 23h 00m 01s</p>
            </div>
        </div>
    </div>
</template>

<script>
    import StarRating from '@core/shared/components/misc/StarRating.vue';

    export default ( {
        components: {
            StarRating
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
        methods: {
            ret() {
                this.$router.push( { name: 'productDetailsPage', params: { product: this.product } } );
            }
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