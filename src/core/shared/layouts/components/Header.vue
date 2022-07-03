<template>
    <v-app-bar
        height="60"
        app
        flat
        class="gst-header">
        <BurgerMenu
            v-if="!$vuetify.breakpoint.mdAndUp"
            @expand="menuExpanded=true"
            @collapse="menuExpanded=false" />
        <TenantLogo class="gst-header__logo"/>

        <v-spacer />
        <template v-if="$vuetify.breakpoint.mdAndUp">
            <div @click="goToNotificationsPage" class="mr-auto" :class="getLoggedUser.purchasedProducts.length - this.openedNotifications !== 0  && getIsLogged ? 'gst-pulse-animation': ''" >
                <IconBell1  class="icon-bell mr-4"/>
                 <div v-if="openedNotifications === 0 || !getIsLogged" class="gst-notifications-number">0</div>
                 <div v-else class="gst-notifications-number">{{getLoggedUser.purchasedProducts.length - this.openedNotifications}}</div>
                 </div>

            <!-- <MainMenu v-if="showMainMenu" /> -->
            <LoginButtonVariant1 v-if="!userIsAuth" :data-test-id="$testId('login')" @click="showModal" />
            <TenantUserDropdownMenu v-if="userIsAuth && userDetail" :user-detail="userDetail" />
        </template>
        <template v-else>
            <LoginButtonVariant1 v-if="!userIsAuth" :data-test-id="$testId('login')" @click.native="showModal" />
            <TenantUserMobileMenu v-if="userIsAuth && userDetail"
                :user-detail="userDetail"
                @expand="userMenuExpanded=true"
                @collapse="userMenuExpanded=false" />
        </template>
    </v-app-bar>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import debounce from 'lodash/debounce';
    import BurgerMenu from '@core/shared/components/menu/BurgerMenu.vue';
    import MainMenu from '@core/shared/components/menu/MainMenu.vue';
    import LoginButtonVariant1 from '@core/shared/components/buttons/LoginButtonVariant1.vue';
    import SearchKeywordWithAutocomplete from '@core/shared/components/search/SearchKeywordWithAutocomplete.vue';
    import LoginModal from '@core/shared/components/modals/LoginModal.vue';
    import IconBell1 from '@core/shared/components/icons/IconBell1.vue';
    import {findProductsByUsername} from '@core/services/userService.js'

    export default {
        name: 'TheHeader',
        components: {
            BurgerMenu,
            MainMenu,
            LoginButtonVariant1,
            SearchKeywordWithAutocomplete,
            IconBell1
        },
        testIdOptions: {
            keyPrefix: 'layout.default.theHeader'
        },
        props: {
            withSearch: {
                type: Boolean,
                default: true
            },
            showMainMenu: {
                type: Boolean,
                default: true
            }
        },
        data: () => ( {
            menuExpanded: false,
            userMenuExpanded: false,
            isSearchFocused: false,
            openedNotifications: 0
        } ),
        computed: {
            ...mapGetters( {
                userIsAuth: 'user/profile/isAuth',
                userDetail: 'user/profile/getDetail',
                getProducts: 'addProduct/getProducts',
                getLoggedUser: 'user/loggedUser/getLoggedUser',
                getToken: 'user/loggedUser/getToken',
                getPurchasedProducts: 'user/loggedUser/getPurchasedProducts',
                getIsLogged: 'user/loggedUser/getIsLogged'
            } ),
            keyword: {
                get( ) {
                    return this.$store.state.searchState.current.keyword;
                },
                set( value ) {
                    this.updateSearch( { keyword : value } );
                }
            }
        },
        watch: {
            menuExpanded( val ) {
                this.toggleBodyScroll( val );
            },
            userMenuExpanded( val ) {
                this.toggleBodyScroll( val );
            }
        },
        methods: {

            goToNotificationsPage() {
                this.openedNotifications = this.getPurchasedProducts.length
                this.$router.push({name: 'notifications'});

            },
            ...mapActions( {
                commitSetLoggedUserPurchasedProducts: 'user/loggedUser/commitSetLoggedUserPurchasedProducts',
                updateSearch: 'searchState/update',
                commitSetUserPurchasedProducts: 'user/signUp/commitSetUserPurchasedProducts'
            } ),
            showModal() {
                this.$modal.show(
                    LoginModal,
                    { },
                    {
                        'no-click-animation': true,
                        scrollable: true,
                        fullscreen: false,
                        'hide-overlay': false,
                        'max-width': 500,
                        'content-class': 'gst-v-dialog',
                    }
                );
            },
            toggleBodyScroll( val ) {
                if ( val ) {
                    const disableBodyScroll = debounce( () => {
                        document.querySelector( 'body' ).classList.add( 'u-prevent-scroll' );
                    }, 50 );
                    disableBodyScroll();
                } else {
                    document.querySelector( 'body' ).classList.remove( 'u-prevent-scroll' );
                }
            },
            onFocusSearchDo() {
                this.isSearchFocused = true;
            },
            onBlurSearchDo() {
                this.isSearchFocused = false;
            }
        },
        created() {

            setInterval(()=> {
                findProductsByUsername(this.getLoggedUser.username, this.getToken)
                    .then((resp) => {
                        // console.log(this.getPurchasedProducts.length)
                        this.commitSetLoggedUserPurchasedProducts(resp.data)

                    })
            }, 5000)
        }
    };
</script>
<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    @keyframes pulseAnimation {
    0% {
        transform: scale( 1 );
    }

    50% {
        transform: scale( 1.12 );
    }

    100% {
        transform: scale( 1 );
    }
}

    .gst-header {
        background: linear-gradient( to right, #FFFFFF 0%, #000000 100% ) !important;

        .gst-header__logo {
            svg {
                margin-top: -17px;
                @include mobile-only {
                    max-width: 158px;
                }
            }
        }

        .gst-notifications-number {
            color: white;
            background-color: red;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            bottom: 24px;
            position: relative;
            left: 12px;
        }

        .gst-pulse-animation {
            animation: 0.75s pulseAnimation ease-out infinite;
        }

        .icon-bell {
            fill: #f5f5cb;
            top: 13px;
            position: relative;
        }

        .icon-bell:hover {
            fill: #eded73;
            cursor: pointer;
        }

        .gst-header__search-keyword-with-autocomplete {
            .v-text-field--solo > .v-input__control {
                border-radius: border-radius( 'm' ) !important;
                min-height: 40px;
            }

            .v-text-field--solo > .v-input__control > .v-input__slot {
                background-color: theme-color( 'quinary' );
            }
        }
    }
</style>