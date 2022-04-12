<template>
    <component :is="bonusPointsBadge" class="gst-bp" />
</template>

<script>
    import BonusPointsBadgePrimary from '@tenants/exxonmobil/assets/bonus_points_badge_primary.svg';
    import BonusPointsBadgePrimaryMobile from '@tenants/exxonmobil/assets/bonus_points_badge_primary_mobile.svg';
    import BonusPointsBadgeSecondary from '@tenants/exxonmobil/assets/bonus_points_badge_secondary.svg';

    export default {
        components: {
            /* eslint-disable */
            BonusPointsBadgePrimary,
            BonusPointsBadgePrimaryMobile,
            BonusPointsBadgeSecondary
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
                    return this.$vuetify.breakpoint.mdAndUp ? 'BonusPointsBadgePrimary' : 'BonusPointsBadgePrimaryMobile';
                }

                return 'BonusPointsBadgeSecondary';
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
