<template>
    <IconStarBorderedSvg class="gst-icon-star-bordered" />
</template>
<script>
    import IconStarBorderedSvg from '@core/shared/assets/icons/star_bordered.svg';

    export default {
        name: 'IconStarBordered',
        components: {
            IconStarBorderedSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-star-bordered .gst-svg-icon {
        fill: theme-color( 'septenary' );
    }
    
    .gst-icon-star-bordered circle {
        stroke: theme-color( 'quinary' );
    }
</style>
