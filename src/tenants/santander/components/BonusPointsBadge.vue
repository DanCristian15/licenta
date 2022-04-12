<template>
    <BonusPointsBadge class="gst-bpb" />
</template>

<script>
    import BonusPointsBadge from '@tenants/santander/assets/bonus_points_badge.svg';

    export default {
        components: {
            BonusPointsBadge
        }
    };
</script>

<style lang="scss" scoped>
    .gst-bpb {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
</style>