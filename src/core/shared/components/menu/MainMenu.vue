<template>
    <ul class="gst-menu-list">
        <li
            v-for="(route, i) in topMenuRoutes"
            :key="i">
            <router-link
                text
                :class="['gst-menu-link', isFooter && 'gst-menu-link--white']"
                :to="route">
                {{ $t(`_common:pages.${route.meta.label}.menu`) }}
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'MainMenu',
        props: {
            isFooter: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            topMenuRoutes() {
                return this.$router.options.routes.filter( r => r.meta && r.meta.navigation === 'topMenu' );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssMixins";
@import "@scssVariables";

.gst-menu-list {
    display: inline-block;
    padding-left: 0;
    background: transparent;

    li {
        display: inline-block;
        list-style: none;
    }
}

.gst-menu-link {
    margin: 0 20px;
    color: white;
}

.gst-menu-link:hover {
    color: theme-color( 'primary' );
}

.gst-menu-link.gst-menu-link--white {
    color: theme-color( 'white' );
}

.gst-menu-link.gst-menu-link--white:first-of-type {
    margin-left: 0;
}

.gst-menu-link.gst-menu-link--white:hover {
    color: theme-color( 'white' );
}

@include mobile-only {
    .gst-menu-list {
        margin-bottom: 15px;

        li {
            display: block;
        }
    }

    .gst-menu-link.gst-menu-link--white {
        display: inline-block;
        line-height: 48px;
        margin: 0 auto;
        font-size: font-size( 'l' );
    }
}
</style>
