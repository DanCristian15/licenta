<template>
    <v-menu
        v-model="menuOpened"
        offset-y
        content-class="gst-category-store-dropdown__menu"
        :close-on-content-click="false">
        <template v-slot:activator="{ on }">
            <div class="gst-category-store-dropdown d-inline-block" v-on="on">
                <span
                    class="u-mouse-pointer"
                    :class="{
                        'tertiary--text': !menuOpened,
                        'primary--text': menuOpened
                    }"
                    :data-test-id="$attrs['data-test-id']">
                    {{ value && value.name ? value.name : $t('_common:terms.all') }}
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
        <v-list class="gst-category-store-dropdown__list">
            <v-list-item
                class="gst-category-store-dropdown__list-item gst-category-store-dropdown__reset"
                :disabled="!value"
                :ripple="false"
                @click="select( null )">
                <v-list-item-title>
                    {{ $t('_common:terms.reset') }}
                </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item
                class="gst-category-store-dropdown__list-item"
                :class="{ 'selected': !value }"
                @click="select( null )">
                <v-list-item-title>
                    {{ $t('_common:terms.allCategory') }}
                </v-list-item-title>
            </v-list-item>
            <DataLoading v-if="loading" :width="2" />
            <template v-else>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="gst-category-store-dropdown__list-item"
                    :class="{ 'selected': value && value.id === item.id }"
                    @click="select( item )">
                    <v-list-item-title>
                        <div>{{ item.name }}</div>
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import categoriesConstants from '@core/utils/constants/categories';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    const STORE_NAME = 'categories';

    export default {
        name: 'CategoryStoreDropDown',
        inheritsAttribute: true,
        components: {
            DataLoading,
            IconDropDownArrow
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.input.CategoryStoreDropDown',
        },
        props: {
            value: {
                type: Object,
                default: ( ) => { return { name: '' }; }
            },
        },
        data( ) {
            return {
                menuOpened: false
            };
        },
        computed: {
            ...mapState( {
                categories:          state => state[STORE_NAME].list,
                loading:             state => state[STORE_NAME].loading
            } ),
            items( ) {
                return [ ...this.categories ]
                    .map( item => {
                        return {
                            ...item,
                            name: this.$t( this.getKey( item.id ) )
                        };
                    } );
            }
        },
        methods: {
            ...mapActions( {
                loadCategories: `${STORE_NAME}/get`
            } ),
            getKey ( id ) {
                let found = categoriesConstants.LIST.find( item => item.ID === id );
                return found.i18nKey;
            },
            select( item ) {
                this.$emit( 'input', item );
                this.menuOpened = false;
            }
        },

        mounted( ) {
            this.unwatchMenuOpened = this.$watch( 'menuOpened', ( value ) => {
                if ( value ) {
                    this.loadCategories( );
                    this.unwatchMenuOpened( );
                }
            } );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-favorite-tab-attraction-filter__label {
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
    }

    .gst-category-store-dropdown {
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

    .gst-category-store-dropdown__menu {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-category-store-dropdown__list {
        min-width: 180px;
    }

    .gst-category-store-dropdown__list-item {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: font-size( 'l' );
        min-height: 16px;
    }

    .gst-category-store-dropdown__list .selected .v-list-item__title,
    .gst-category-store-dropdown__list .selected span {
        color: theme-color( 'primary' );
    }

    .gst-category-store-dropdown__reset::before {
        opacity: 0 !important;
    }

    .gst-category-store-dropdown__reset.v-list-item--disabled,
    .gst-category-store-dropdown__reset.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: theme-color( 'primary' ) !important;
    }

    .gst-category-store-dropdown__reset.v-list-item--disabled {
        opacity: 0.4;
    }
</style>
