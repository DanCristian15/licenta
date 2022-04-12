<template>
    <v-menu
        v-model="menuOpened"
        offset-y
        content-class="gst-city-dropdown__menu"
        :close-on-content-click="false"
        :disabled="disabled">
        <template v-slot:activator="{ on }">
            <div class="gst-city-dropdown d-inline-block" v-on="on" @click="onClickDo">
                <span
                    class="u-mouse-pointer gst-city-dropdown__target d-inline-block"
                    :class="{
                        'tertiary--text': !menuOpened,
                        'primary--text': menuOpened
                    }"
                    :data-test-id="$attrs['data-test-id']">
                    {{ value && value.name ? $options.filters.city( value, { country: true } ) : $t('placeholder') }}
                </span>
                <i
                    class="u-mouse-pointer gst-icon-svg"
                    :class="{
                        'gst-icon-svg--active u-rotate-180': menuOpened
                    }">
                    <IconDropDownArrow class="gst-dropdown-icon-svg" />
                </i>
            </div>
        </template>
        <v-list class="gst-city-dropdown__list">
            <v-list-item v-if="clearable" class="gst-city-dropdown__list-item gst-city-dropdown__reset" :disabled="!value" :ripple="false" @click="select( null )">
                <v-list-item-title>
                    <div>{{ $t('_common:terms.reset') }}</div>
                </v-list-item-title>
            </v-list-item>
            <v-divider v-if="clearable" />
            <v-list-item-group>
                <v-list-item
                    v-if="clearable"
                    class="gst-city-dropdown__list-item"
                    :class="{ 'selected': !value }"
                    @click="select( null )">
                    <v-list-item-title>
                        <div>{{ $t('labels.clear') }}</div>
                    </v-list-item-title>
                </v-list-item>
                <DataLoading v-if="loading" class="mt-1 mb-2" :width="2" />
                <template v-else>
                    <p v-if="!items.length" class="gst-city-dropdown__no-data">
                        {{ $t('messages.noData') }}
                    </p>
                    <SearchCityList class="gst-city-dropdown__search-list" :items="items" :selected="value" @select="select" />
                </template>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import SearchCityList from '@core/shared/components/search/SearchCityList.vue';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'CityDropDown',
        inheritsAttribute: true,
        components: {
            DataLoading,
            SearchCityList,
            IconDropDownArrow
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
            items: {
                type: Array,
                default: null
            },
            showIcon: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            loading: {
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
                menuOpened: false,
            };
        },
        methods: {
            select( value ) {
                this.$emit( 'input', value );
                this.menuOpened = false;
            },
            onClickDo( ) {
                this.$emit( 'click' );
            }
        },
        mounted( ) {
            this.unwatchMenuOpened = this.$watch( 'menuOpened', ( value ) => {
                if ( value ) {
                    this.$emit( 'menu-opened' );
                }
            } );
        },
        unmounted( ) {
            this.unwatchMenuOpened( );
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-city-dropdown__menu {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-city-dropdown {
        span {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            text-decoration: underline;
        }

        .gst-icon-svg {
            .gst-dropdown-icon-svg .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }

        .gst-icon-svg--active {
            .gst-dropdown-icon-svg .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }

    .gst-city-dropdown__list {
        min-width: 180px;
    }

    .gst-city-dropdown__list .v-list-item-group {
        max-height: 195px;
        overflow: auto;
    }

    .gst-city-dropdown__list .v-list-item {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: font-size( 'l' );
        min-height: 16px;
    }

    .gst-city-dropdown__list .v-list-item-group .v-list-item.v-list-item--active::before {
        opacity: 0;
    }

    .gst-city-dropdown__list .v-list-item-group .v-list-item.v-list-item--active:hover::before {
        opacity: 0.04;
    }

    .gst-city-dropdown__reset::before {
        opacity: 0 !important;
    }

    .gst-city-dropdown__reset.v-list-item--disabled,
    .gst-city-dropdown__reset.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: theme-color( 'primary' ) !important;
    }

    .gst-city-dropdown__reset.v-list-item--disabled {
        opacity: 0.4;
    }

    .gst-city-dropdown__no-data {
        padding: 16px;
        color: theme-color( 'error' );
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'medium' );
        text-align: center;
    }
</style>
