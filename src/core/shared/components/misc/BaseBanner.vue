<template>
    <div class="gst-banner">
        <slot name="gst-banner-content"></slot>
    </div>
</template>
<script>
    export default {
        name: 'BaseBanner',
        props: {
            isHome: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-banner {
    margin: -12px;
}
</style>
