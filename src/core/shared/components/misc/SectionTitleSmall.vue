<template>
    <p class="gst-section-title pa-0">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-section-title {
        padding: 16px;
        padding-bottom: 0;
        margin-bottom: 0;
        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'medium' );
        letter-spacing: 1px;
        text-transform: uppercase;
    }
</style>
