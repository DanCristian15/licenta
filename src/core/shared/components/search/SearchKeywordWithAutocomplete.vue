<template>
    <div class="mx-5">
        <v-text-field
            ref="inputSearch"
            :value="value"
            :placeholder="$t('shared:components.search.searchFieldBanner.placeholder')"
            class="gst-search-input"
            v-bind="inputSearchAttrs"
            clearable
            clear-icon="mdi-clear"
            autocomplete="off"
            data-hj-allow
            @click="toggleMenu"
            @focus="onFocusInputSearchDo"
            @blur="onBlurInputSearchDo"
            @input="onInput"
            @keydown.enter="onEnterKeyDo"
            @keydown.tab="onTabKeyDo">
            <template slot="prepend-inner" class="text-primary">
                <IconSearch
                    class="gst-search-icon-svg"
                    :class="{
                        'gst-search-icon-svg-focused': isFocused
                    }"
                    @click="toggleMenu" />
            </template>
            <template v-if="value !== ''" slot="append" class="text-primary">
                <IconCancel class="gst-search-icon-cancel-svg u-mouse-pointer" @click="onInput('')" />
            </template>
        </v-text-field>
        <v-menu
            v-model="isMenuOpen"
            attach=".gst-search-input"
            min-width="585"
            max-height="580"
            :nudge-left="menuTargetPositionX"
            :nudge-bottom="menuTargetPositionY"
            :close-on-content-click="false"
            absolute
            allow-overflow
            content-class="gst-search-keyword-with-autocomplete__menu">
            <div
                @mouseover="hoverOverMenu = true"
                @mouseleave="hoverOverMenu = false">
                <v-list
                    class="gst-search-keyword-with-autocomplete__menu-content">
                    <SearchResultList
                        v-if="searching"
                        :redirect-to-attraction="redirectToAttraction"
                        :redirect-to-event="redirectToEvent"
                        :redirect-to-venue="redirectToVenue"
                        :see-all-button-route="seeAllButtonRoute"
                        search-keyword-only
                        class="gst-search-keyword-with-autocomplete__list"
                        @select="selectItem" />
                </v-list>
            </div>
        </v-menu>
    </div>
</template>

<script>
    import throttle from 'lodash/throttle';
    import { mapGetters } from 'vuex';
    import IconSearch from '@core/shared/assets/icons/search.svg';
    import IconCancel from '@core/shared/assets/icons/cancel.svg';
    import SearchResultList from './SearchResultList.vue';

    export default {
        name: 'SearchKeywordWithAutocomplete',
        components: {
            IconSearch,
            SearchResultList,
            IconCancel
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.search.searchCity'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            inputSearchAttrs: {
                type: Object,
                default: () => {
                    return {
                        'single-line': true,
                        solo: true,
                        'hide-details': true,
                        flat: true
                    };
                }
            },
            redirectToAttraction: {
                type: Boolean,
                default: true
            },
            redirectToEvent: {
                type: Boolean,
                default: true
            },
            redirectToVenue: {
                type: Boolean,
                default: true
            },
            redirectToSearchOnEnter: {
                type: Boolean,
                default: false
            },
            resultListSeeAllButtonRoute: {
                type: Object,
                default: null
            }
        },
        data( ) {
            return {
                isMenuOpen: false,
                hoverOverMenu: false,
                isFocused: false,
                menuTargetPositionX: 0,
                menuTargetPositionY: 0,
            };
        },
        computed: {
            ...mapGetters( {
                currentQueryObject: 'searchState/currentQueryObject',
                currentQueryObjectOnlyKeyword: 'searchState/currentQueryObjectOnlyKeyword',
            } ),
            searching( ) {
                return this.isValue ( this.value );
            },
            seeAllButtonRoute() {
                return this.resultListSeeAllButtonRoute ? this.resultListSeeAllButtonRoute : { name: 'search', query: this.currentQueryObject };
            }
        },
        watch: {
            '$route': function () {
                this.isMenuOpen = false;
            }
        },
        methods: {
            onInput( value ) {
                this.$emit( 'input', value );
                this.openMenu( value );
            },
            isValue( value ) {
                return !!( value && value.trim( ) !== '' );
            },
            onEnterKeyDo( ) {
                if ( this.redirectToSearchOnEnter && this.value.trim( ) !== '' ) {
                    this.$router.push( {
                        name: 'search',
                        query: {
                            keyword: this.value
                        }
                    } ).catch( err => {
                        if ( err.name != 'NavigationDuplicated' ) {
                            // eslint-disable-next-line no-console
                            console.error( err );
                        }
                    } );
                }
            },
            onTabKeyDo() {
                this.$emit( 'tab-keydown' );
            },
            toggleMenu( ) {
                this.isMenuOpen ? this.closeMenu( ) : this.openMenu( );
            },
            closeMenu( ) {
                setTimeout( ( ) => {
                    this.isFocused = false;
                    this.isMenuOpen = false;
                }, 200 );
            },
            openMenu( val ) {
                const value = val === undefined ? this.value : val;

                if ( !this.isValue( value ) ) {
                    this.isMenuOpen = false;
                    return;
                }
                const menuTargetPosition = this.$refs.inputSearch.$el.getBoundingClientRect( );

                this.menuTargetPositionY = menuTargetPosition.height;
                this.isMenuOpen = true;
            },
            selectItem( value ) {
                if ( !this.redirectToSearchItem ) {
                    this.$emit( 'input', value );
                    this.closeMenu( );
                }
            },
            onFocusInputSearchDo( ) {
                this.isFocused = true;
                this.$emit( 'focus' );
            },
            onBlurInputSearchDo( ) {
                this.hoverOverMenu || this.closeMenu();
                this.$emit( 'blur' );
            }
        },
        mounted( ) {
            this.throttleMenuClose = throttle( this.closeMenu, 20 );
            window.addEventListener( 'resize', this.throttleMenuClose );
        },
        destroyed( ) {
            window.removeEventListener( 'resize', this.throttleMenuClose );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-search-input {
        position: relative;
    }

    .gst-search-keyword-with-autocomplete__menu {
        margin-top: 8px;
        border-radius: border-radius( 'm' ) !important;
        margin-left: -12px;
    }

    .gst-search-keyword-with-autocomplete__menu-content {
        padding: 16px;
    }

    .gst-search-keyword-with-autocomplete__list {
        padding-bottom: 16px;
    }
</style>
