<template>
    <p class="gst-search-result-no-data">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-search-result-no-data {
        padding: 16px;
        color: theme-color( 'error' );
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'medium' );
        text-align: center;
    }
</style>