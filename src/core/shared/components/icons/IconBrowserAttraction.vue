<template>
    <IconBrowserAttractionSvg class="gst-icon-browser-attraction" />
</template>
<script>
    import IconBrowserAttractionSvg from '@core/shared/assets/icons/browser_attraction.svg';

    export default {
        name: 'IconBrowserAttraction',
        components: {
            IconBrowserAttractionSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-browser-attraction .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
