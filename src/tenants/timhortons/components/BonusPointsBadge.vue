<template>
    <component :is="bonusPointsBadge" class="gst-bp" />
</template>

<script>
    import BonusPointsBadgePrimary from '@tenants/timhortons/assets/bonus_points_badge.svg';
    import BonusPointsBadgeSecondary from '@tenants/timhortons/assets/bonus_points_badge_secondary.svg';
    import BonusPointsBadgeTertiary from '@tenants/timhortons/assets/bonus_points_badge_tertiary.svg';
    import BonusPointsBadgeQuaternary from '@tenants/timhortons/assets/bonus_points_badge_quaternary.svg';

    export default {
        components: {
            /* eslint-disable */
            BonusPointsBadgePrimary,
            BonusPointsBadgeSecondary,
            BonusPointsBadgeTertiary,
            BonusPointsBadgeQuaternary
            /* eslint-enable */
        },
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        },
        computed: {
            bonusPointsBadge( ) {
                const { variant } = this;
                if ( variant === 'primary' ) {
                    return 'BonusPointsBadgePrimary';
                } else if ( variant === 'secondary' ) {
                    return 'BonusPointsBadgeSecondary';
                } else if ( variant === 'tertiary' ) {
                    return 'BonusPointsBadgeTertiary';
                }

                return 'BonusPointsBadgeQuaternary';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-bp {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
</style>
