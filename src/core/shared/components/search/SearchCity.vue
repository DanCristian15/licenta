<template>
    <v-menu
        v-model="isMenuOpen"
        :position-x="menuTargetPositionX"
        :position-y="menuTargetPositionY"
        :close-on-content-click="false"
        bottom
        absolute
        allow-overflow
        content-class="gst-search-city-menu">
        <template v-slot:activator="{ on }">
            <v-text-field
                ref="inputSearch"
                :value="isFocused ? searchValue : ''"
                :placeholder="!isFocused ? selectValueLabel : ''"
                class="mx-1 pt-0 mr-3 gst-search-input gst-search-city-menu__input-search"
                v-bind="inputSearchAttrs"
                autocomplete="off"
                data-hj-allow
                @click="toggleMenu"
                @input="onInputInputSearch"
                @blur="onBlurInputSearch"
                @focus="onFocusInputSearch"
                @keydown.tab="onTabKeyDo">
                <template slot="prepend-inner" class="text-primary">
                    <IconLocation
                        class="gst-search-icon-svg"
                        :class="{
                            'gst-search-icon-svg-focused': isFocused
                        }"
                        @click="toggleMenu" />
                </template>
                <template v-if="!isFocused" slot="label">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="gst-search-label" v-html="$options.filters.cityHTML( value, { country: true } )"></span>
                </template>
                <template slot="append" class="text-primary">
                    <data-loading v-if="loadingCurrentLocation" :width="2" :size="20" class="d-flex align-self-center justify-center" />
                    <IconCancel v-if="searchValue && clearable" class="gst-search-icon-cancel-svg u-mouse-pointer" @click="searchValue = ''" />
                </template>
            </v-text-field>
            <v-btn class="d-none" v-on="on" />
        </template>
        <v-list class="gst-search-city-menu__list">
            <template v-if="canFindMyLocation">
                <v-list-item key="gps" @click="findMyLocation">
                    <v-list-item-icon>
                        <IconGPS class="gst-search-city-menu__item-icon" />
                    </v-list-item-icon>
                    <v-list-item-title>
                        {{ $t('_common:terms.useMyCurrentLocation') }}
                    </v-list-item-title>
                </v-list-item>
                <v-divider />
            </template>
            <template v-if="showRecentCities">
                <SectionTitleSmall class="px-5 pt-4">
                    {{ $t('labels.recent') }}
                </SectionTitleSmall>
                <SearchResultNoData v-if="!historyCities.length">
                    {{ $t('labels.noRecent') }}
                </SearchResultNoData>
                <SearchCityList class="gst-search-city-menu__list" :items="historyCities" @select="selectCity">
                    <template v-slot:icon>
                        <v-list-item-icon>
                            <IconHistory class="gst-search-city-menu__item-icon" />
                        </v-list-item-icon>
                    </template>
                </SearchCityList>
            </template>
            <template v-if="showFilteredCities">
                <DataLoading v-if="!!loading" :width="2" class="gst-search-city-menu__loading" />
                <template v-else>
                    <SectionTitleSmall class="px-5 pt-4">
                        {{ $t('labels.results') }}
                    </SectionTitleSmall>
                    <SearchResultNoData v-if="!cities.length">
                        {{ $t('labels.noResults') }}
                    </SearchResultNoData>
                    <SearchCityList :items="cities" :highlight="searchValue" @select="selectCity">
                        <template v-slot:icon>
                            <v-list-item-icon>
                                <IconLocation class="gst-search-city-menu__item-icon" />
                            </v-list-item-icon>
                        </template>
                    </SearchCityList>
                </template>
            </template>
        </v-list>
    </v-menu>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import throttle from 'lodash/throttle';
    import debounce from 'lodash/debounce';
    import {
        hasLocation as cityObjectUtilsHasLocation,
        hasCurrentLocation as cityObjectUtilsHasCurrentLocation
    } from '@utils/cityObjectUtils';
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import IconHistory from '@core/shared/assets/icons/history.svg';
    import IconGPS from '@core/shared/assets/icons/gps.svg';
    import IconCancel from '@core/shared/assets/icons/cancel.svg';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import SearchResultNoData from './common/SearchResultNoData.vue';
    import SectionTitleSmall from '../misc/SectionTitleSmall.vue';
    import SearchCityList from './SearchCityList.vue';

    const STORE_NAME = 'cities';
    const CONFIG = {
        MAX_RESULTS: 3
    };

    export default {
        name: 'SeachCity',
        components: {
            IconCancel,
            IconLocation,
            IconHistory,
            IconGPS,
            DataLoading,
            SectionTitleSmall,
            SearchResultNoData,
            SearchCityList
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.search.searchCity'
        },
        props: {
            value: {
                type: Object,
                default: ( ) => { return { name: '' }; }
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
            clearable: {
                type: Boolean,
                default: true
            }
        },
        data( ) {
            return {
                searchValue: '',
                isSearching: false,
                isFocused: false,
                isMenuOpen: false,
                menuTargetPositionX: 0,
                menuTargetPositionY: 0,
                loadingCurrentLocation: false,
                cities: [],
                loading: 0
            };
        },
        computed: {
            ...mapState( {
                historyCities: state => state.user.browsingHistory.cities
            } ),
            showRecentCities( ) {
                return !this.isSearching;
            },
            showFilteredCities( ) {
                return this.isSearching;
            },
            canFindMyLocation( ) {
                return !!navigator.geolocation;
            },
            selectValueLabel( ) {
                const { value } = this;
                const cityLabel = this.$options.filters.city( value, { country: true } );

                if ( cityLabel ) {
                    return cityLabel;
                }

                if ( cityObjectUtilsHasLocation ( value ) ) {
                    if ( cityObjectUtilsHasCurrentLocation( value ) ) {
                        return this.$t( '_common:terms.myCurrentLocation' );
                    } else {
                        return this.$t( '_common:terms.location' );
                    }
                }
                return this.$t( 'placeholder' );
            }
        },
        watch: {
            'searchValue': function ( newValue ) {
                if ( !newValue ) {
                    this.$emit( 'input', { name: '' } );
                }
            },
            'value': function ( newValue ) {
                this.searchValue = newValue.name || '';
                this.isSearching = false;
                !this.unwatchSearchValPropAfterValueChange || this.unwatchSearchValPropAfterValueChange( );
                this.unwatchSearchValPropAfterValueChange = this.$watch( 'searchValue', ( newVal ) => {
                    if( newVal ) {
                        this.isSearching = true;
                        this.unwatchSearchValPropAfterValueChange( );
                    }
                } );
            },
        },
        methods: {
            ...mapActions( {
                searchCities: `${STORE_NAME}/searchList`,
                getCurrentLocation: 'user/location/getCurrentLocation',
                notificationError: 'notification/error',
            } ),
            async findMyLocation( ) {
                this.loadingCurrentLocation = true;
                const location = await this.getCurrentLocation( { showMessage: true, refresh: true } );
                if ( location && location.position ) {
                    this.selectCity( {
                        ...location.city,
                        location: {
                            current: true,
                            ...location.position
                        }
                    } );
                }
                this.loadingCurrentLocation = false;
            },
            selectCity( city ) {
                this.isSearching = false;
                this.$emit( 'input', city );
                this.isMenuOpen = false;
            },
            onInputInputSearch( value ) {
                this.searchValue = value;
                this.openMenu( );
            },
            onBlurInputSearch( ) {
                setTimeout( ( ) => {
                    this.searchValue = this.value.name || '';
                    this.isFocused = false;
                    this.closeMenu( );
                }, 200 );
            },
            onFocusInputSearch( ) {
                this.isFocused = true;
            },
            toggleMenu( ) {
                this.isMenuOpen ? this.closeMenu( ) : this.openMenu( );
            },
            closeMenu( ) {
                this.isMenuOpen = false;
            },
            openMenu( ) {
                const menuTargetPosition = this.$refs.inputSearch.$el.getBoundingClientRect( );

                this.menuTargetPositionX = menuTargetPosition.x;
                this.menuTargetPositionY = menuTargetPosition.y + menuTargetPosition.height;
                this.isMenuOpen = true;
            },
            loadDataDebouced: debounce( async function ( ) {
                this.loading = this.loading + 1;
                this.cities = await this.searchCities( { refresh: true, search: { keyword: this.searchValue, limit: CONFIG.MAX_RESULTS, offset: 0 } } ) || [ ];
                this.loading = this.loading - 1;
            }, 500 ),
            onTabKeyDo() {
                this.$emit( 'tab-keydown' );
            },
        },
        created( ) {
            this.searchValue = this.value.name;
            this.$watch( 'searchValue', ( newVal ) => {
                if( newVal && newVal !== this.value.name ) {
                    this.isSearching = true;
                    this.loadDataDebouced( );
                }
            } );
        },
        mounted( ) {
            this.throttleMenuClose = throttle( ( ) => {
                this.isMenuOpen = false;
            }, 20 );

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

    .gst-search-city-menu {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-search-city-menu__loading {
        padding: 16px;
    }

    .gst-search-city-menu__list {
        padding-top: 0;
        padding-bottom: 0;
        min-width: 280px;

        .v-list-item__title {
            font-size: $base-font-size !important;
        }

        .v-list-item__icon {
            margin-right: 16px;
        }
    }

    .gst-search-city-menu__item-icon {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }
</style>
