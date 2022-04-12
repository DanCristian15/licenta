<template>
    <DropDownArrow class="gst-icon-chevron-right" />
</template>
<script>
    import DropDownArrow from '@shared/assets/icons/dropdown_arrow.svg';
    
    export default {
        name: 'IconChevronRight',
        components: {
            DropDownArrow
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-icon-chevron-right {
        transform: rotate( -90deg );
    }
    
    .gst-icon-chevron-right .gst-svg-icon {
        fill: theme-color( 'tertiary' );
    }
</style>