<template>
    <IconHeartHoverBorderedSvg class="gst-icon-heart-hover-bordered" />
</template>
<script>
    import IconHeartHoverBorderedSvg from '@core/shared/assets/icons/heart_hover_bordered.svg';

    export default {
        name: 'IconHeartHoverBordered',
        components: {
            IconHeartHoverBorderedSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-heart-hover-bordered .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
