<template>
    <div class="gst-user-menu">
        <v-menu
            v-model="menuOpened"
            :close-on-content-click="false"
            :rounded="'0'">
            <template v-slot:activator="{ on }">
                <v-btn
                    v-if="!menuOpened"
                    ref="button"
                    text
                    outlined
                    depressed
                    :class="['gst-user-menu__activator', menuOpened && 'gst-user-menu__activator--active']"
                    v-on="on">
                    <v-flex d-flex wrap align-center flex-row class="gst-user-menu__activator-content">
                        <v-flex d-flex shrink class="mr-1">
                            <IconUser class="gst-user-menu__icon" />
                        </v-flex>
                        <v-flex d-flex flex-column align-start shrink>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                class="gst-user-menu__name">
                                {{ fullName }}
                            </VClamp>
                            <VClamp
                                v-if="showUserBalance"
                                autoresize
                                :max-lines="1"
                                :style="stylePoints"
                                class="gst-user-menu__points"
                                @clampchange="onPointsClampChangeDo">
                                {{ $t("_common:terms.bonusPointWithCount", { count: userDetail.balance, formattedCount: pointsFormated } ) }}
                            </VClamp>
                        </v-flex>
                    </v-flex>
                </v-btn>
                <v-btn
                    v-else
                    text
                    small
                    class="text-capitalize gst-user-menu__close px-0 float-right ml-auto"
                    color="white">
                    <IconClose />
                </v-btn>
            </template>
            <BaseBanner class="gst-user-menu__banner">
                <template v-slot:gst-banner-content>
                    <div class="text-center">
                        <p class="name">
                            {{ userDetail.firstName + " " + userDetail.lastName }}
                        </p>
                        <div v-if="showUserBalance">
                            <p class="mb-0">
                                •
                            </p>
                            <h3 class="gst-user-menu__banner-points">
                                {{ $t("_common:terms.bonusPointWithCount", { count: userDetail.balance, formattedCount: pointsFormated} ) }}
                            </h3>
                        </div>
                    </div>
                </template>
            </BaseBanner>
            <v-list class="gst-user-menu__list">
                <v-list-item
                    :key="0"
                    class="gst-menu-list__item gst-menu-list__item--id py-2">
                    <v-flex>
                        <TenantLogoLoyaltyPartnerIcon class="d-inline-block mr-2 u-align-vertical-middle" />
                        <v-list-item-title class="d-inline-block u-align-vertical-middle">
                            {{ userDetail.memberId }}
                        </v-list-item-title>
                    </v-flex>
                </v-list-item>
                <v-list-item
                    :key="1"
                    class="gst-menu-list__item py-3 mt-4"
                    :to="{name:'userTickets'}"
                    @click="menuOpened = false">
                    <v-list-item-title class="gst-user-menu__link">
                        {{ $t( '_common:pages.myTickets.menu') }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    :key="2"
                    class="gst-menu-list__item py-3"
                    :to="{name:'userFavorites'}"
                    @click="menuOpened = false">
                    <v-list-item-title class="gst-user-menu__link">
                        {{ $t( '_common:pages.myFavorites.menu') }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    :key="3"
                    class="py-3">
                    <v-list-item-title class="gst-user-menu__link u-mouse-pointer" @click="onClickLogout">
                        {{ $t( '_common:terms.logout') }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
    import VClamp from 'vue-clamp';
    import IconClose from '@core/shared/assets/icons/close.svg';
    import BaseBanner from '@core/shared/components/misc/BaseBanner.vue';
    import UserMenuMixin from '@mixins/menus/UserMenuMixin';

    export default {
        name: 'UserMobileMenu',
        components: {
            BaseBanner,
            IconClose,
            VClamp
        },
        mixins: [ UserMenuMixin ],
        data( ) {
            return {
                pointsClamped: false,
            };
        },
        computed: {
            stylePoints( ) {
                if ( this.pointsClamped ) {
                    return {
                        height: 0,
                        width: 0
                    };
                }
                return { };
            }
        },
        watch: {
            menuOpened( val ) {
                if ( val ) {
                    this.$emit( 'expand' );
                } else {
                    this.$emit( 'collapse' );
                }
            }
        },
        methods: {
            onPointsClampChangeDo( value ) {
                this.pointsClamped = value;
            }
        },
        beforeDestroy( ) {
            this.$emit( 'collapse' );
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .v-menu__content {
        top: 59px !important;
        left: 0;
        height: calc( 100% - 59px );
        width: 100%;
        background-color: theme-color( 'white' );
        max-width: 100%;
        box-shadow: none;
        border-radius: border-radius( 'none' );
    }

    .gst-user-menu {
        position: relative;

        .v-btn.v-btn--outlined.v-btn--text.gst-user-menu__activator,
        .v-btn.v-btn--outlined.v-btn--text.gst-user-menu__activator:focus {
            height: 42px;
            width: auto;
            padding-right: 8px;
            padding-left: 8px;
            border: 1px solid theme-color( 'primary' );
            background-color: transparent;
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'bold' );
            border-radius: border-radius( 'm' ) !important;
            min-width: unset;
            text-transform: none;
            transition: border 0.3s ease;

            svg {
                transition: all 0.3s ease;
                margin-left: -3px;
            }

            .gst-user-menu__activator-content {
                white-space: initial;
                max-width: 120px;
            }

            .gst-user-menu__icon .gst-svg-icon {
                fill: theme-color( 'primary' );
            }

            .gst-user-menu__points {
                color: theme-color( 'primary' );
                text-transform: lowercase;
            }

            &:hover::before {
                background-color: transparent;
            }
        }

        .v-btn.v-btn--outlined.v-btn--text.gst-user-menu__activator--active {
            border: 1px solid theme-color( 'primary' );
            background: transparent;
            color: theme-color( 'white' );
            transition: border 0.3s ease, background-color 0.3s ease;

            &::before {
                background-color: theme-color( 'primary' );
                opacity: 1;
            }

            .gst-user-menu__icon .gst-svg-icon {
                fill: theme-color( 'white' );
            }

            .gst-user-menu__points {
                color: theme-color( 'white' );
            }
        }
    }

    .gst-user-menu__list {
        padding-top: 0;
        text-align: center;

        .gst-menu-list__item::before {
            background-color: transparent;
        }

        .gst-menu-list__item--id {
            background-color: theme-color( 'primary-darken-1' );
            font-size: font-size( "l" );

            .v-list-item__title {
                color: theme-color( 'white' );
            }
        }
    }

    .gst-user-menu__close.v-btn {
        min-width: auto;
    }

    .gst-user-menu__link {
        display: inline-block;
        position: relative;
        margin: 0 auto;
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxl' );

        &:hover {
            color: theme-color( 'primary' );

            svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' );
                }
            }
        }

        .gst-user-menu__link--white {
            color: theme-color( 'white' );
        }

        svg {
            .gst-svg-icon {
                fill: theme-color( 'quaternary' );
                transition: all 0.5s ease;
            }
        }
    }

    .gst-user-menu__banner {
        @include linear-gradient(to right, theme-color('home-banner-gradient-start') 0%, theme-color('home-banner-gradient-end') 100%);

        padding: 38px 0;
        margin: 0;
        color: theme-color( 'white' );

        @include mobile-only {
            padding: 50px 0;
        }

        .name {
            font-size: font-size( 'xxxl' );
        }

        .gst-user-menu__banner-points {
            text-transform: lowercase;
        }
    }
</style>
