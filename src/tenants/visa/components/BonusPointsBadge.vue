<template>
    <div>
        <BonusPointsBadgePrimary v-if="variant === 'primary'" />
        <BonusPointsBadgeSecondary v-else-if="variant === 'secondary'" />
        <BonusPointsBadgeTertiary v-else-if="variant === 'tertiary'" />
    </div>
</template>

<script>
    import BonusPointsBadgePrimary from '@tenants/visa/assets/bonus_points_badge_primary.svg';
    import BonusPointsBadgeSecondary  from '@tenants/visa/assets/bonus_points_badge_secondary.svg';
    import BonusPointsBadgeTertiary  from '@tenants/visa/assets/bonus_points_badge_tertiary.svg';

    export default {
        components: {
            BonusPointsBadgePrimary,
            BonusPointsBadgeSecondary,
            BonusPointsBadgeTertiary
        },
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-bpb {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
</style>