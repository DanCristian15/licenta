<template>
    <div class="boss-div">
        <HomePageBanner class="the-home_page-banner" />
        <button @click="goToAddProduct">
            Add product
        </button>
        <button @click="goToLoggedUserProfile">
            Logged user profile
        </button>
        <p class="the-home_page-description">
           Auction house is a web application that allows anyone to participate in auctions for various antiques, offering a user-friendly interface and a fast bidding process. Access to the application only requires the user to register and log in by filling in simple forms.
        </p>
        <p class="the-home-page__categories-title">
            CATEGORIES
        </p>
        <ImageMasonry />
        <!-- <p class="the-home-page__categories-title2">
            LAST ADDED
        </p> -->

        <!-- <Swiper /> -->
        <!-- <ProductCard />
        <ProductList /> -->
    </div>
</template>

<script>
    import ImageMasonry from '@core/shared/components/images/ImageMasonry.vue';
    import HomePageBanner from '@core/shared/components/banners/HomePageBanner.vue';
    import Swiper from '@core/shared/components/images/Swiper.vue';
    import LoginModal from '@core/shared/components/modals/LoginModal.vue';
    import {mapGetters,mapActions} from 'vuex';


    export default ( {
        components: {
            HomePageBanner,
            ImageMasonry,
            Swiper
        },
        data: () => {
            return {
                images: []
            };
        },

        methods: {
             ...mapGetters( {
                getLoggedUser: 'user/loggedUser/getLoggedUser'
            } ),
            ...mapActions( {
                notificationWarning: 'notification/warning',
            } ),

            goToAddProduct() {
                if ( this.getLoggedUser().email !== '' )
                this.$router.push( { name: 'addProduct' } );
                else
                {
                    this.notificationWarning( 'You should be registered to add a product');
                    this.$modal.show(
                    LoginModal,
                    {
                        redirectRouteToAfterLogin: this.$route.params.redirectRouteToAfterLogin
                    },
                    {
                        'no-click-animation': true,
                        scrollable: true,
                        fullscreen: false,
                        persistent: true,
                        'hide-overlay': false,
                        'max-width': 500,
                        'content-class': 'gst-v-dialog',
                    }
                );}
            },
            goToLoggedUserProfile() {
                this.$router.push( { name: 'loggedUserProfile' } );

            }
        }
    } );
</script>


<style lang="scss" scoped>

    .boss-div {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
    }

    .the-home_page-banner {
        margin: auto;
    }

    .the-home_page-desc {
        width: 80%;
        margin: auto;
        text-align: center;
    }

    .categories {
        margin-top: 40px;
    }

    .the-home-page__categories-title {
        margin-bottom: 26px;
        font-size: 30px;
        font-weight: 100;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        margin-left: 86px;
    }

    .the-home-page__categories-title2 {
        margin-top: 56px;
        margin-bottom: 26px;
        font-size: 30px;
        font-weight: 100;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        margin-left: 86px;
    }

    .the-home_page-description {
        width: 80%;
        margin: auto;
        margin-bottom: 60px;
        font-size: 22px;
        font-weight: 300;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        text-align: center;
    }

</style>