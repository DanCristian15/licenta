<template>
    <IconInfoBorderedSvg class="gst-icon-info-bordered" />
</template>
<script>
    import IconInfoBorderedSvg from '@core/shared/assets/icons/info_bordered.svg';

    export default {
        name: 'IconInfoBordered',
        components: {
            IconInfoBorderedSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-info-bordered .gst-svg-icon {
        fill: theme-color( 'septenary' );
    }

    .gst-icon-info-bordered circle {
        stroke: theme-color( 'quinary' );
    }
</style>
