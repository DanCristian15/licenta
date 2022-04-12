<template>
    <IconLogo class="gst-svg-icon" />
</template>

<script>
    import Logo from '@tenants/delta/assets/logo.svg';

    export default {
        components: {
            IconLogo: Logo,
        }
    };
</script>

<style lang="scss" scoped>
    .gst-svg-icon {
        max-width: 150px;
    }
</style>
