<template>
    <div
        class="gst-user-dropdown">
        <v-menu
            v-model="menuOpened"
            offset-y
            content-class="gst-user-dropdown-menu"
            :close-on-content-click="true">
            <template v-slot:activator="{ on }">
                <v-btn
                    ref="button"
                    text
                    outlined
                    depressed
                    :class="['gst-user-dropdown__activator', menuOpened && 'gst-user-dropdown__activator--active']"
                    v-on="on">
                    <IconUser class="gst-user-dropdown__icon mr-2" />
                    {{ fullName }}
                    <div v-if="showUserBalance">
                        <span class="divider mx-2">•</span>
                        <span class="points">{{ $t("_common:terms.bonusPointWithCount", {count: userDetail.balance, formattedCount: pointsFormated} ) }}</span>
                    </div>
                    <IconDropDownArrow
                        class="gst-user-dropdown__icon ml-2"
                        :class="{'u-rotate-180': menuOpened }" />
                </v-btn>
            </template>
            <v-list class="gst-menu-list pt-0">
                <v-list-item
                    :key="0"
                    class="gst-menu-list__item gst-menu-list__item--id">
                    <v-list-item-avatar
                        :style="{height: 'auto', width: 'auto', minWidth: 'none'}"
                        class="gst-menu-list__item-icon mr-2">
                        <TenantLogoLoyaltyPartnerIcon />
                    </v-list-item-avatar>
                    <v-list-item-title>
                        {{ userDetail.memberId }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    :key="1"
                    :class="'gst-menu-list__item'"
                    :to="{name:'userTickets'}"
                    @click="menuOpened = false">
                    <v-list-item-title>
                        {{ $t( '_common:pages.myTickets.menu') }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    :key="2"
                    :class="'gst-menu-list__item'"
                    :to="{name:'userFavorites'}"
                    @click="menuOpened = false">
                    <v-list-item-title>
                        {{ $t( '_common:pages.myFavorites.menu') }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    :key="3"
                    class="gst-menu-list__item u-mouse-pointer">
                    <v-list-item-title @click="onClickLogout">
                        {{ $t( '_common:terms.logout') }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import UserMenuMixin from '@mixins/menus/UserMenuMixin';

    export default {
        name: 'UserDropdownMenu',
        i18nOptions: { keyPrefix: 'common', namespaces: 'shared' },
        components: {
            IconDropDownArrow
        },
        mixins: [ UserMenuMixin ]
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-dropdown-menu {
        margin-top: 8px;
        border-radius: border-radius( 'm' ) !important;

        .v-list-item.gst-menu-list__item {
            padding-right: 0;
            min-height: 48px !important;

            &::before {
                background-color: transparent;
            }

            .v-list-item__title {
                line-height: line-height( 'xxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 's' );
                font-weight: font-weight( 'medium' );

                &:hover {
                    color: theme-color( 'primary' ) !important;
                }
            }

            &.gst-menu-list__item--id {
                background-color: theme-color( 'primary-darken-1' );
                color: theme-color( 'white' ) !important;

                &:not(.v-list-item--active):not(.v-list-item--disabled) {
                    color: theme-color( 'white' ) !important;
                }

                .v-list-item__title {
                    color: inherit;

                    &:hover {
                        color: inherit !important;
                    }
                }
            }
        }

        .v-list-item.gst-menu-list__item--active {
            .v-list-item__title {
                color: theme-color( 'primary' ) !important;
            }

            svg .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }

        .v-list-item.gst-menu-list__item--active::before {
            background-color: transparent !important;
        }
    }

    .gst-user-dropdown {
        .v-btn.v-btn--outlined.v-btn--text.gst-user-dropdown__activator {
            height: 42px;
            width: auto;
            padding-right: 4px;
            padding-left: 9px;
            border: 1px solid theme-color( 'primary' );
            font-size: font-size( 'xs' );
            font-weight: font-weight( 'bold' );
            border-radius: border-radius( 'm' ) !important;
            min-width: unset;
            text-transform: none;
            outline: none;
            transition: border 0.3s ease, background-color 0.3s ease;

            &::before {
                top: -1px;
                left: -1px;
                right: -1px;
                bottom: -1px;
                background-color: theme-color( 'primary' );
            }

            &:hover::before {
                border: 1px solid theme-color( 'primary' );
                background-color: theme-color( 'primary' );
                opacity: 0.8;
            }

            &:hover {
                color: theme-color( 'white' );
                border-color: transparent;

                .gst-user-dropdown__icon .gst-svg-icon {
                    fill: theme-color( 'white' );
                }

                .divider,
                .points {
                    color: theme-color( 'white' );
                }
            }

            &:focus::before {
                background-color: theme-color( 'primary' );
            }

            svg {
                transition: all 0.3s ease;
                margin-left: -3px;
            }

            .gst-user-dropdown__icon .gst-svg-icon {
                fill: theme-color( 'primary' );
            }

            .divider {
                color: theme-color( 'senary' );
            }

            .points {
                color: theme-color( 'primary' );
                text-transform: lowercase;
            }
        }

        .v-btn.v-btn--outlined.v-btn--text.gst-user-dropdown__activator--active {
            border: 1px solid theme-color( 'primary' );
            background-color: transparent;
            color: theme-color( 'white' );
            transition: border 0.3s ease, background-color 0.3s ease;

            &::before {
                background-color: theme-color( 'primary' );
                opacity: 1;
            }

            &:hover {
                border-color: theme-color( 'primary' );
            }

            &:hover::before {
                background-color: theme-color( 'primary' );
                opacity: 0.8;
            }

            .gst-user-dropdown__icon .gst-svg-icon {
                fill: theme-color( 'white' );
            }

            .divider,
            .points {
                color: theme-color( 'white' );
            }
        }
    }

    .gst-menu-list {
        min-width: 170px;
    }
</style>
