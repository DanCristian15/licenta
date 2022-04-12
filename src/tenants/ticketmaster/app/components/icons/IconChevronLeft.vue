<template>
    <DropDownArrow class="gst-icon-chevron-left" />
</template>
<script>
    import DropDownArrow from '@shared/assets/icons/dropdown_arrow.svg';
    
    export default {
        name: 'IconChevronLeft',
        components: {
            DropDownArrow
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-icon-chevron-left {
        transform: rotate( 90deg );
    }

    .gst-icon-chevron-left .gst-svg-icon {
        fill: theme-color( 'tertiary' );
    }
</style>