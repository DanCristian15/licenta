<template>
    <div
        v-if="items.length > 1"
        :class="['gst-lang-select', isSecondaryType && 'gst-lang-select--secondary']">
        <v-menu
            v-model="menuOpened"
            offset-y
            content-class="gst-city-dropdown__menu gst-lang-dropdown-menu u-box-shadow"
            :close-on-content-click="true">
            <template v-slot:activator="{ on }">
                <v-btn
                    ref="button"
                    text
                    outlined
                    depressed
                    :class="['gst-lang-select__button', menuOpened && 'gst-lang-select__button--active']"
                    v-on="on">
                    {{ defaultSelected.toUpperCase().trim() }}
                    <IconDropDownArrow
                        class="u-mouse-pointer"
                        :class="{'u-rotate-180': menuOpened }" />
                </v-btn>
            </template>
            <v-list class="gst-lang-select__list">
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :class="['gst-lang-select__list-item', defaultSelected === item && 'v-list-item--active gst-lang-select__list-item--active']"
                    @click="changeLanguage( item )">
                    <v-list-item-title class="gst-lang-select__item-title">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        {{ itemNames[item] }}
                    </v-list-item-title>
                    <v-list-item-avatar
                        v-if="defaultSelected === item"
                        :style="{height: 'auto', width: 'auto'}"
                        class="gst-lang-select__item-icon">
                        <IconCheck />
                    </v-list-item-avatar>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
    import i18next from 'i18next';
    import { mapActions, mapState } from 'vuex';
    import IconCheck from '@core/shared/assets/icons/check.svg';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'LanguageSelectField',
        i18nOptions: { keyPrefix: 'common', namespaces: 'shared' },
        components: {
            IconCheck,
            IconDropDownArrow
        },
        props: {
            isSecondaryType: {
                type: Boolean,
                default: false
            }
        },
        data: () => ( {
            items: [],
            menuOpened: false
        } ),
        computed: {
            ...mapState( {
                defaultSelected:  state => state.appState.language
            } ),
            itemNames() {
                const { items } = this;

                return items.reduce( ( acc, item ) => {
                    const translationKey = `shared:common.languages.${item}.name`;
                    const name = i18next.exists( translationKey ) ? this.$t( translationKey ) : item.toUpperCase();
                    acc[item] = name;

                    return acc;
                }, { } );
            }
        },
        methods: {
            ...mapActions( {
                changeLanguage: 'appState/setLanguage'
            } )
        },
        beforeMount( ) {
            this.items = Object.keys( i18next.services.resourceStore.data );
        }
    };
</script>
<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-lang-dropdown-menu {
    border-radius: border-radius( 'm' ) !important;
    max-height: 115px;
}

.gst-lang-select {
    .v-btn.gst-lang-select__button {
        height: 30px !important;
        width: auto;
        padding-right: 4px !important;
        padding-left: 9px !important;
        border: 1px solid theme-color( 'quinary' );
        background: transparent !important;
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'bold' );
        border-radius: border-radius( 'm' ) !important;
        min-width: unset !important;
        border-color: theme-color( 'quinary' );

        svg {
            transition: all 0.5s ease;
            margin-left: -3px;
        }
    }

    .v-btn.gst-lang-select__button--active {
        border: 1px solid theme-color( 'primary' );
        background: theme-color( 'primary' ) !important;
        color: theme-color( 'white' ) !important;

        svg .gst-svg-icon {
            fill: theme-color( 'white' );
        }
    }

    .v-btn::before {
        background-color: transparent;
    }

    &.gst-lang-select--secondary {
        .v-btn.gst-lang-select__button {
            border: 1px solid theme-color( 'white' ) !important;
            color: theme-color( 'white' );

            svg .gst-svg-icon {
                fill: theme-color( 'white' );
            }
        }

        .v-btn.gst-lang-select__button--active {
            border: 1px solid theme-color( 'white' ) !important;
            background: transparent;

            svg .gst-svg-icon {
                fill: theme-color( 'white' );
            }
        }
    }
}

.gst-lang-select__list {
    border-radius: border-radius( 'm' ) !important;
    min-width: 170px;
}

.v-list-item.gst-lang-select__list-item {
    padding-right: 0;
    min-height: 42px !important;

    .gst-lang-select__item-title {
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
    }
}

.v-list-item.gst-lang-select__list-item--active {
    .gst-lang-select__item-title {
        color: theme-color( 'primary' ) !important;
    }

    svg .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
}

.v-list-item.gst-lang-select__list-item--active::before {
    background-color: transparent !important;
}
</style>
