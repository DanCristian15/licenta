<template>
    <v-menu
        v-model="menuOpened"
        offset-y
        content-class="gst-drop-down__menu"
        :close-on-content-click="false">
        <template v-slot:activator="{ on }">
            <div class="gst-drop-down d-inline-block" v-on="on">
                <span
                    class="u-mouse-pointer"
                    :class="{
                        'tertiary--text': !menuOpened,
                        'primary--text': menuOpened
                    }"
                    :data-test-id="$attrs['data-test-id']">
                    {{ value ? renderItemFn( value ) : $t('_common:terms.all') }}
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
        <v-list
            class="gst-drop-down__list">
            <v-list-item
                v-if="clearable"
                class="gst-drop-down__list-item gst-drop-down__reset"
                :disabled="!value"
                @click="select( null )">
                <v-list-item-title>
                    {{ $t('_common:terms.reset') }}
                </v-list-item-title>
            </v-list-item>
            <v-divider v-if="clearable" />
            <v-list-item
                v-if="i18nKeyAllItemsItem"
                class="gst-drop-down__list-item gst-drop-down__all-items"
                :class="{ 'selected': !value }"
                @click="select( null )">
                <v-list-item-title>
                    {{ $t( i18nKeyAllItemsItem ) }}
                </v-list-item-title>
            </v-list-item>
            <DataLoading v-if="loading" :width="2" />
            <template v-else>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="gst-drop-down__list-item"
                    :class="{ 'selected': value && value[valueProp] === item[valueProp] }"
                    @click="select( item )">
                    <v-list-item-title>
                        <div>{{ renderItemFn( item ) }}</div>
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>

<script>
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'DropDownVariant2',
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
            items: {
                type: Array,
                default: null
            },
            loading: {
                type: Boolean,
                default: false
            },
            valueProp: {
                type: String,
                default: 'id'
            },
            renderItemFn: {
                type: Function,
                default: ( item ) => item.name
            },
            clearable: {
                type: Boolean,
                default: true
            },
            i18nKeyAllItemsItem: {
                type: String,
                default: ''
            }
        },
        data( ) {
            return {
                menuOpened: false
            };
        },
        methods: {
            select( item ) {
                this.$emit( 'input', item );
                this.menuOpened = false;
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

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-favorite-tab-attraction-filter__label {
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
    }

    .gst-drop-down {
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

    .gst-drop-down__menu {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-drop-down__list {
        min-width: 180px;
    }

    .gst-drop-down__list-item {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: font-size( 'l' );
        min-height: 16px;
    }

    .gst-drop-down__list .selected .v-list-item__title,
    .gst-drop-down__list .selected span {
        color: theme-color( 'primary' );
    }

    .gst-drop-down__reset::before {
        opacity: 0 !important;
    }

    .gst-drop-down__reset.v-list-item--disabled,
    .gst-drop-down__reset.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: theme-color( 'primary' ) !important;
    }

    .gst-drop-down__reset.v-list-item--disabled {
        opacity: 0.4;
    }
</style>
