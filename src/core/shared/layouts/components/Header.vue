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
        <TenantLogo />
        <v-fade-transition v-if="$vuetify.breakpoint.mdAndUp">
            <SearchKeywordWithAutocomplete
                v-if="withSearch || isSearchFocused"
                v-model="keyword"
                redirect-to-search-on-enter
                class="ml-4 mr-0 gst-header__search-keyword-with-autocomplete"
                :style="{'minWidth':'310px'}"
                @focus="onFocusSearchDo"
                @blur="onBlurSearchDo" />
        </v-fade-transition>
        <v-spacer />
        <template v-if="$vuetify.breakpoint.mdAndUp">
            <MainMenu v-if="showMainMenu" />
            <LoginButtonVariant1 v-if="!userIsAuth" :data-test-id="$testId('login')" @click.native="showModal" />
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

    export default {
        name: 'TheHeader',
        components: {
            BurgerMenu,
            MainMenu,
            LoginButtonVariant1,
            SearchKeywordWithAutocomplete
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
            isSearchFocused: false
        } ),
        computed: {
            ...mapGetters( {
                userIsAuth: 'user/profile/isAuth',
                userDetail: 'user/profile/getDetail'
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
            ...mapActions( {
                updateSearch: 'searchState/update'
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
        }
    };
</script>
<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-header {
        background: linear-gradient( to right, #FFFFFF 0%, #000000 100% ) !important;

        .gst-header__logo {
            svg {
                @include mobile-only {
                    max-width: 158px;
                }
            }
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