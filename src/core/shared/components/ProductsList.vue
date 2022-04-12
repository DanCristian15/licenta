<template>
    <div class="products-list">
        <p class="products-list_category-name">
            {{ category.toUpperCase() }}
        </p>
        <ProductCard v-for="product in products" :key="product.id" :product="product" :category="category" class="product-card" />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProductCard from '@core/shared/components/cards/ProductCard.vue';


    export default( {
        components: {
            ProductCard
        },
        props: {
            categoryName: {
                type: String,
                default: ''
            }
        },
        data: () => {
            return {
                products: [],
                category: '',
            };
        },
        computed: {
            ...mapGetters( {
                getProducts: 'addProduct/getProducts'

            } ),
        },
        created: function()  {
            this.category = this.$route.params.category ;
            this.products  = this.getProducts;
        }
    } );
</script>

<style lang="scss" scoped>
    .products-list {
        display: flex;
        width: 90%;
        margin: auto;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        .product-card {
            margin-left: 20px;
        }

        .products-list_category-name {
            display: flex;
            width: 100%;
            font-size: 36px;
            align-items: center;
            justify-content: center;
        }
    }
</style>
