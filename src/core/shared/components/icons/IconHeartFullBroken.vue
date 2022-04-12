<template>
    <IconHeartFullBrokenSvg class="gst-icon-heart-full-broken" />
</template>
<script>
    import IconHeartFullBrokenSvg from '@core/shared/assets/icons/heart_full_broken.svg';

    export default {
        name: 'IconHeartFullBroken',
        components: {
            IconHeartFullBrokenSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-heart-full-broken {
        .gst-svg-icon {
            fill: theme-color( 'favorite-unmarked' );
        }

        .gst-svg-icon-2 {
            fill-opacity: 1 !important;
            fill: theme-color( 'favorite-marked' );
        }
    }
</style>
