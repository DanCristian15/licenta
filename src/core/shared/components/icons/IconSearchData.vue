<template>
    <IconSearchDataSvg class="gst-icon-search-data" />
</template>
<script>
    import IconSearchDataSvg from '@core/shared/assets/icons/search_data.svg';

    export default {
        name: 'IconSearchData',
        components: {
            IconSearchDataSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-search-data .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
