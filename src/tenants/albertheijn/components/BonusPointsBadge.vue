<template>
    <BonusPointsBadgePrimary v-if="variant === 'primary'" />
    <BonusPointsBadgeSecondary v-else-if="variant === 'secondary'" />
</template>

<script>
    import BonusPointsBadgeSecondary from '@tenants/albertheijn/assets/bonus_points_badge_secondary.svg';
    import BonusPointsBadgePrimary from '@tenants/albertheijn/assets/bonus_points_badge.svg';

    export default {
        components: {
            BonusPointsBadgePrimary,
            BonusPointsBadgeSecondary
        },
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        }
    };
</script>
