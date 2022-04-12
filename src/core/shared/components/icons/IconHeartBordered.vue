<template>
    <IconHeartBorderedSvg class="gst-icon-heart-bordered" />
</template>
<script>
    import IconHeartBorderedSvg from '@core/shared/assets/icons/heart_bordered.svg';

    export default {
        name: 'IconHeartBordered',
        components: {
            IconHeartBorderedSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-heart-bordered .gst-svg-icon {
        fill: theme-color( 'septenary' );
    }
</style>
