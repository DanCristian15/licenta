<template>
    <v-menu
        v-model="menuOpened"
        offset-y
        content-class="gst-city-search-store-dropdown__menu"
        :close-on-content-click="false"
        :disabled="disabled">
        <template v-slot:activator="{ on }">
            <span
                class="gst-city-search-store-dropdown__target primary--text u-mouse-pointer"
                :data-test-id="$attrs['data-test-id']"
                v-on="on">
                {{ selectValueLabel }}
            </span>
            <i
                :class="{'u-rotate-180': menuOpened }"
                class="u-mouse-pointer gst-icon-svg"
                v-on="on">
                <IconDropDownArrow class="gst-dropdown-icon-svg" />
            </i>
        </template>
        <v-list>
            <v-list-item>
                <v-text-field
                    ref="inputSearch"
                    v-model="searchValue"
                    :placeholder="$t('inputPlaceholder')"
                    color="primary"
                    class="gst-search-input pt-0"
                    hide-details=""
                    data-hj-allow>
                    <template slot="prepend-inner" class="text-primary">
                        <IconSearch class="gst-search-icon-svg" />
                    </template>
                </v-text-field>
            </v-list-item>
            <v-list-item v-if="canFindMyLocation && hasCurrentLocationOption" key="gps" class="gst-search-city-menu__current-location" @click="findMyLocation">
                <v-list-item-icon>
                    <IconGPS />
                </v-list-item-icon>
                <v-list-item-title>
                    <v-flex class="d-flex flex-row justify-center">
                        {{ $t('_common:terms.useMyCurrentLocation') }}
                        <data-loading v-if="loadingCurrentLocation" :width="2" :size="20" class="ml-1" />
                    </v-flex>
                </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="clearable" class="gst-city-search-store-dropdown__clear" @click="select( { } )">
                <v-list-item-title>
                    <div>{{ $t('labels.clear') }}</div>
                </v-list-item-title>
            </v-list-item>
            <DataLoading v-if="loading" :width="2" />
            <template v-else>
                <p v-if="!cities.length" class="gst-city-search-store-dropdown__no-data">
                    {{ $t('messages.noData') }}
                </p>
                <SearchCityList class="gst-city-search-store-dropdown__list" :items="cities" :highlight="searchValue" @select="select" />
            </template>
        </v-list>
    </v-menu>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import debounce from 'lodash/debounce';
    import listConstants from '@core/utils/constants/list';
    import {
        hasLocation as cityObjectUtilsHasLocation,
        hasCurrentLocation as cityObjectUtilsHasCurrentLocation
    } from '@utils/cityObjectUtils';
    import IconSearch from '@core/shared/assets/icons/search.svg';
    import IconGPS from '@core/shared/assets/icons/gps.svg';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import SearchCityList from '@core/shared/components/search/SearchCityList.vue';

    const STORE_NAME = 'cities';
    const CONFIG = {
        MAX_RESULTS: 5
    };

    export default {
        name: 'CitySearchStoreDropDown',
        inheritsAttribute: true,
        components: {
            IconGPS,
            IconSearch,
            IconDropDownArrow,
            DataLoading,
            SearchCityList
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.input._common.cityDropDown',
        },
        props: {
            value: {
                type: Object,
                default: ( ) => { return { name: '' }; }
            },
            showIcon: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            hasCurrentLocationOption: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data( ) {
            return {
                loadingCurrentLocation: false,
                menuOpened: false,
                searchValue: ''
            };
        },
        computed: {
            ...mapState( {
                cities:     state => state[STORE_NAME].list,
                loading:    state => state[STORE_NAME].loading
            } ),
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
            'menuOpened': function ( newValue ) {
                if ( newValue ) {
                    this.unwatchSearchValProp = this.$watch( 'searchValue', (  ) => {
                        this.loadDataDebouced( );
                    } );
                    setTimeout( ( ) => {
                        !this.$refs.inputSearch || this.$refs.inputSearch.focus( );
                    }, 100 );
                    this.$emit( 'open' );
                } else {
                    !this.unwatchSearchValPropAfterValueChange || this.unwatchSearchValPropAfterValueChange( );
                }
            }
        },
        methods: {
            ...mapActions( {
                loadCities: `${STORE_NAME}/get`,
                getCurrentLocation: 'user/location/getCurrentLocation',
            } ),
            getHTMLCity( item ) {
                const regex = new RegExp( `(${this.searchValue })`, 'gi' );

                return {
                    ...item,
                    name: item.name.replace( regex, '<mark>$1</mark>' )
                };
            },
            select( value ) {
                this.$emit( 'input', value );
                this.menuOpened = false;
            },
            loadDataDebouced: debounce( function ( ) {
                this.loadCities( { refresh: true, search: { keyword: this.searchValue, limit: CONFIG.MAX_RESULTS, offset: 0 } } );
            }, listConstants.DEBOUNCE_DELAY ),
            async findMyLocation( ) {
                if ( !this.loadingCurrentLocation ) {
                    this.loadingCurrentLocation = true;
                    const location = await this.getCurrentLocation( { showMessage: false, refresh: true } );

                    if ( location && location.position ) {
                        this.select( {
                            ...location.city,
                            location: {
                                current: true,
                                ...location.position
                            }
                        } );
                    }
                    this.loadingCurrentLocation = false;
                }
            }
        },
        mounted( ) {
            this.unwatchSearchValPropOnStart =  this.$watch( 'menuOpened', ( newValue ) => {
                if ( newValue ) {
                    this.loadCities( { refresh: true, search: { keyword: this.searchValue, limit: CONFIG.MAX_RESULTS, offset: 0 } } );
                    this.unwatchSearchValPropOnStart( );
                }
            } );
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-city-search-store-dropdown__menu {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-city-search-store-dropdown__target {
        display: inline-block;
        line-height: 0.85;
        border-bottom: 1px solid currentColor;
    }

    .gst-city-search-store-dropdown__clear {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: font-size( 'l' );
        min-height: 16px;
    }

    .gst-search-city-menu__current-location {
        padding-top: 8px;
        padding-bottom: 8px;
        min-height: 16px;

        .v-list-item__icon {
            margin-top: 0;
            margin-bottom: 0;
            margin-right: 8px !important;

            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }

    .gst-city-search-store-dropdown__list .v-list-item {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: font-size( 'l' );
        min-height: 16px;
    }

    .gst-city-search-store-dropdown__list .v-list-item div mark {
        background-color: transparent;
        font-weight: font-weight( 'medium' );
    }

    .gst-city-search-store-dropdown__no-data {
        padding: 16px;
        color: theme-color( 'error' );
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'medium' );
        text-align: center;
    }
</style>
