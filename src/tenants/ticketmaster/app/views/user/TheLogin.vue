<template>
    <div></div>
</template>

<script>
    import LoginModal from '@tenant/app/views/user/TheLogin/LoginModal';
    import { mapGetters } from 'vuex';

    export default {
        name: 'TheLogin',
        computed: {
            ...mapGetters( {
                userIsAuth: 'user/profile/isAuth',
            } ),
        },
        mounted( ) {
            if ( !this.userIsAuth ) {
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
                );
            }
        }
    };
</script>
