<template>
    <div class="gst-order-confirmation-modal-header d-flex flex-row justify-center justify-md-start">
        <div class="d-flex align-center mr-5 u-mouse-pointer">
            <LogoIcon class="gst-order-confirmation-modal-header__logo" @click.native="$emit('close')" />
        </div>
    </div>
</template>
<script>
    import LogoIcon from '@tenant/app/components/LogoIcon';

    export default {
        name: 'HeaderWithCountDown',
        components: {
            LogoIcon,
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-order-confirmation-modal-header {
        padding: theme-spacing( 3, 6, 3, 6 );
        background: linear-gradient( 91.84deg, #012DA1 1.55%, #1574DE 50%, #012DA1 95.92% );
        color: theme-color( 'white' );
        border-bottom: none !important;
    }

    @include mobile-only {
        .gst-order-confirmation-modal-header {
            padding: theme-spacing( 4, 4, 4, 4 );
        }
    }
</style>