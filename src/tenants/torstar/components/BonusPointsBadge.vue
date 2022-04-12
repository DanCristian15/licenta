<template>
    <div class="gst-bonus-points-badge"></div>
</template>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-bonus-points-badge {
        position: relative;
        background: theme-color( 'primary' );
        border-radius: border-radius( 'none' ) !important;
    }

    .gst-bonus-points-badge::before {
        display: block;
        position: absolute;
        top: 0;
        left: -1px;
        height: 100%;
        width: 25%;
        background: theme-color( 'white' );
        content: "";
        clip-path: polygon( 20% 0, 100% 50%, 20% 100%, 0% 100%, 0 50%, 0% 0% );
        z-index: 1;
    }

    .gst-bonus-points-badge::after {
        display: block;
        position: absolute;
        top: 0;
        left: -5%;
        height: 100%;
        width: 25%;
        background: theme-color( 'primary' );
        content: "";
        clip-path: polygon( 20% 0, 100% 50%, 20% 100%, 0% 100%, 80% 50%, 0% 0% );
        z-index: 2;
    }
</style>
