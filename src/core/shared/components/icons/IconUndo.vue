<template>
    <IconUndoSvg class="gst-icon-undo" />
</template>
<script>
    import IconUndoSvg from '@core/shared/assets/icons/undo.svg';

    export default {
        name: 'IconClose',
        components: {
            IconUndoSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-undo .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
