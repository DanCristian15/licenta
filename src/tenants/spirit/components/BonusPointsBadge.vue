<template>
    <BonusPointsBadgePrimary v-if="variant === 'primary'" />
    <BonusPointsBadgeSecondary v-else-if="variant === 'secondary'" />
</template>

<script>
    import BonusPointsBadgePrimary from '@tenants/spirit/assets/bonus_points_badge.svg';
    import BonusPointsBadgeSecondary from '@tenants/spirit/assets/bonus_points_badge_secondary.svg';

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
