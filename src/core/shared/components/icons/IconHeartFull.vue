<template>
    <IconHeartFullSvg class="gst-icon-heart-full" />
</template>
<script>
    import IconHeartFullSvg from '@core/shared/assets/icons/heart_full.svg';

    export default {
        name: 'IconHeartFull',
        components: {
            IconHeartFullSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-heart-full {
        .gst-svg-icon {
            fill: theme-color( 'favorite-unmarked' );
        }

        .gst-svg-icon-2 {
            fill-opacity: 1 !important;
            fill: theme-color( 'favorite-marked' );
        }
    }
</style>
