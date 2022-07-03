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
    import {findProductByCategory} from '@core/services/userService.js'

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
                getProducts: 'addProduct/getProducts',
            } ),
        },
        created: function()  {
            this.category = this.$route.params.category ;
            findProductByCategory(this.$route.params.category).then((res)=>{
                this.products = res.data;
            })
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
