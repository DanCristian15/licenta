<template>
    <v-menu
        v-model="show"
        class="gst-burger-menu"
        :close-on-content-click="false"
        :rounded="'0'">
        <template v-slot:activator="{ on }">
            <div
                class="gst-burger-menu_activator d-flex flex-wrap justify-center align-center mr-2"
                :class="{ 'open': show }"
                v-on="on">
                <div class="gst-burger-menu_activator-content">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </template>
        <v-list class="gst-burger-menu_list">
            <v-list-item
                class="py-3"
                :class="{ 'animate-fadeInRight': show }"
                :style="{ animationDelay: getAnimationDelay(0) }">
                <router-link
                    class="gst-burger-menu_link d-flex flex-wrap align-center"
                    :to="{ name: 'modalSearch' }"
                    @click.native="show = false">
                    <IconSearch class="gst-search-icon-svg mr-3" />
                    {{ $t('shared:components.buttons.search') }}
                </router-link>
            </v-list-item>
            <v-list-item
                v-for="(route, i) in topMenuRoutes"
                :key="i"
                class="py-3"
                :class="{ 'animate-fadeInRight': show }"
                :style="{ animationDelay: getAnimationDelay(i+1) }">
                <router-link
                    class="gst-burger-menu_link"
                    :to="route"
                    @click.native="show = false">
                    {{ $t(`_common:pages.${route.meta.label}.menu`) }}
                </router-link>
            </v-list-item>
            <v-list-item
                class="py-3"
                :class="{ 'animate-fadeInRight': show }"
                :style="{ animationDelay: getAnimationDelay(topMenuRoutes.length + 1) }">
                <LanguageSelectField class="my-0 mx-auto" />
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
    import IconSearch from '@core/shared/assets/icons/search.svg';
    import LanguageSelectField from '@core/shared/components/input/LanguageSelectField.vue';

    export default {
        name: 'BurgerMenu',
        components: { IconSearch, LanguageSelectField },
        data: () => ( {
            show: false
        } ),
        computed: {
            topMenuRoutes() {
                return this.$router.options.routes.filter( r => r.meta && r.meta.navigation === 'topMenu' );
            }
        },
        watch: {
            show( val ) {
                if ( val ) {
                    this.$emit( 'expand' );
                } else {
                    this.$emit( 'collapse' );
                }
            }
        },
        methods: {
            getAnimationDelay( index ) {
                const delay = Math.round( index * 100 * 0.1 ) / 100;

                return `${delay}s`;
            },
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

.gst-burger-menu {
    position: relative;
}

.gst-burger-menu_activator {
    position: relative;
    height: 24px;
    width: 18px;
    cursor: pointer;

    .gst-burger-menu_activator-content {
        position: relative;
        height: 12px;
        width: 18px;
        transform: rotate( 0deg );
        transition: 0.5s ease-in-out;
    }

    .gst-burger-menu_activator-content span {
        display: block;
        position: absolute;
        left: 0;
        height: 2px;
        width: 100%;
        background: theme-color( 'quaternary' );
        opacity: 1;
        transform: rotate( 0deg );
        transition: 0.25s ease-in-out;
    }

    .gst-burger-menu_activator-content span:nth-child(1) {
        top: 0;
    }

    .gst-burger-menu_activator-content span:nth-child(2),
    .gst-burger-menu_activator-content span:nth-child(3) {
        top: 5px;
    }

    .gst-burger-menu_activator-content span:nth-child(4) {
        top: 10px;
    }

    &.open {
        .gst-burger-menu_activator-content span:nth-child(1) {
            top: 5px;
            left: 50%;
            width: 0%;
        }

        .gst-burger-menu_activator-content span:nth-child(2) {
            transform: rotate( 45deg );
        }

        .gst-burger-menu_activator-content span:nth-child(3) {
            transform: rotate( -45deg );
        }

        .gst-burger-menu_activator-content span:nth-child(4) {
            top: 5px;
            left: 50%;
            width: 0%;
        }
    }
}

.gst-burger-menu_list {
    margin-top: 32px;
    text-align: center;

    .v-list-item {
        position: relative;
        opacity: 0;
        animation-duration: 250ms;
        animation-fill-mode: forwards;
        transition: all 250ms ease-in-out;
    }
}

.gst-burger-menu_link {
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

    .gst-burger-menu_link--white {
        color: theme-color( 'white' );
    }

    svg {
        .gst-svg-icon {
            fill: theme-color( 'quaternary' );
            transition: all 0.5s ease;
        }
    }
}

.animate-fadeInRight {
    animation-name: animate-fadeInRight;
}

@keyframes animate-fadeInRight {
    0% {
        opacity: 0;
        transform: translateX( 100% );
    }

    30% {
        opacity: 0;
        transform: translateX( 30% );
    }

    100% {
        opacity: 1;
        transform: translateX( 0 );
    }
}
</style>
