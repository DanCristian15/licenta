<template>
    <IconSearchFavoriteDataSvg class="gst-icon-search-favorite-data" />
</template>
<script>
    import IconSearchFavoriteDataSvg from '@core/shared/assets/icons/search_favorite_data.svg';

    export default {
        name: 'IconSearchData',
        components: {
            IconSearchFavoriteDataSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-search-favorite-data .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>
