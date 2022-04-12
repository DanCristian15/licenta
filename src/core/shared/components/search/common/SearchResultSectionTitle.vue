<template>
    <p class="gst-search-result-section-title pa-0">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-search-result-section-title {
        padding: 16px;
        padding-bottom: 0;
        margin-bottom: 0;
        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'medium' );
        text-transform: uppercase;
    }
</style>
