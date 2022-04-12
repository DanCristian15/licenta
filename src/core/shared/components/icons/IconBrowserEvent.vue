<template>
    <IconBrowserEventSvg class="gst-icon-browser-event" />
</template>
<script>
    import IconBrowserEventSvg from '@core/shared/assets/icons/browser_event.svg';

    export default {
        name: 'IconBrowserEvent',
        components: {
            IconBrowserEventSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-browser-event .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
