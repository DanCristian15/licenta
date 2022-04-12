<template>
    <div>
        <div class="d-flex items-center justify-center mt-8">
            <v-btn
                color="secondary"
                :to="{name: 'event', params: { id: 106710001 }}"
                height="100"
                class="text-center mr-4">
                Event With <br /> Bundle Products
            </v-btn>
            <v-btn
                color="primary"
                :to="{name: 'event', params: { id: 106710000 }}"
                height="100"
                class="text-center">
                Event Without <br /> Bundle Products
            </v-btn>
        </div>
    </div>
</template>

<script>
    import LoginModal from '@tenant/app/views/user/LoginModal';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            redirectToAfterLogin: {
                type: Object,
                default: null
            }
        },
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
