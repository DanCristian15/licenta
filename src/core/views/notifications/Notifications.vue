<template>
    <div>
        <h1>Notifications</h1>
       <div class="notification" v-for="product in purchasedProducts" :key="product.productId">
           You have won the auction for the <b> <router-link :to="{ name: 'productDetailsPage', params: { product: product, productId: product.productId } }"> {{product.productName}} </router-link> </b> product, with the price of <b> {{product.bid}}$ </b>
       </div>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {findProductsByUsername} from '@core/services/userService.js'

export default ({
   name: 'Notifications',
   data() {
       return {
           purchasedProducts: []
       }
   },
   methods: {
       ...mapGetters({
            getLoggedUser: 'user/loggedUser/getLoggedUser',
            getToken: 'user/loggedUser/getToken'
        }),
   },
   created() {
       console.log(this.getLoggedUser().username)
        findProductsByUsername(this.getLoggedUser().username, this.getToken()).then((res) => {
            this.purchasedProducts = res.data;
        })
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