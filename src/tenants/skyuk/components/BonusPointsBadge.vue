<template>
    <v-img
        v-bind="$attrs"
        :src="imageSrc"
        class="gst-bp__image_bonus align-center"
        flat />
</template>

<script>
    export default {
        computed: {
            imageSrc() {
                return require( '@tenants/skyuk/assets/bonus_badge.png' );
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-bp__image_bonus {
        height: 25px !important;
        width: 25px !important;
        margin-top: 10px;
    }

    @include mobile-only {
        .gst-bp__image_bonus {
            height: 28px !important;
            width: 29px !important;
            margin-top: 10px;
        }
    }
</style>