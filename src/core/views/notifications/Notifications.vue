<template>
    <div>
        <h1>Notifications</h1>
       <div class="notification" v-for="product in this.getLoggedUser().purchasedProducts">
           You have won the auction for the <b> <router-link :to="{ name: 'productDetailsPage', params: { product: product, productId: product.productId } }"> {{product.productName}} </router-link> </b> product, with the price of <b> {{product.lastBid}}$ </b>

       </div>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default ({
   name: 'Notifications',

   methods: {
       ...mapGetters({
            getLoggedUser: 'user/loggedUser/getLoggedUser'
        }),
   }
})
</script>

<style lang="scss" scoped>
    .notification {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 18px;

    }
</style>