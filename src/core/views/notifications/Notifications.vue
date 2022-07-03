<template>
    <div>
        <h1>Notifications</h1>
        <div v-if="purchasedProducts.length > 0">
            <div  class="notification" v-for="product in purchasedProducts[0]" :key="product.productId">
                You have won the auction for the <b> <router-link :to="{ name: 'productDetailsPage', params: { product: product, productId: product.productId } }"> {{product.productName}} </router-link> </b>
                <router-link :to="{ name: 'orders', params: { product: product, productId: product.productId } }"> Place the order </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {findProductsByUsername} from '@core/services/userService.js'


export default ({
   name: 'Notifications',
   data() {
       return {
           purchasedProducts: []
       }
   },
   actions: {

   },
   methods: {
       ...mapGetters({
            getLoggedUser: 'user/loggedUser/getLoggedUser',
            getToken: 'user/loggedUser/getToken'
        }),
        ...mapActions({
            commitSetLoggedUserPurchasedProducts: 'user/loggedUser/commitSetLoggedUserPurchasedProducts',
        })
   },
   mounted() {
    findProductsByUsername(this.getLoggedUser().username, this.getToken())
    .then((resp) => {
        // console.log(resp.data)
        this.purchasedProducts.push(resp.data);
        //console.log(this.purchasedProducts)
        // this.commitSetLoggedUserPurchasedProducts( resp.data )
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