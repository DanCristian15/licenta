<template>
    <div>
        <IconBonusPointsBadge
            v-if="variant === 'primary'"
            :height="height"
            :width="width"
            class="gst-bonus-points-badge gst-bonus-points-badge__primary" />
        <IconBonusPointsBadgeSecondary
            v-if="variant === 'secondary'"
            :height="height"
            :width="width"
            class="gst-bonus-points-badge gst-bonus-points-badge__secondary" />
    </div>
</template>

<script>
    import BonusPointsBadge from '@tenants/flyingblue/assets/bonus_points_badge.svg';
    import BonusPointsBadgeSecondary from '@tenants/flyingblue/assets/bonus_points_badge_secondary.svg';

    export default {
        name: 'BonusPointsBadge',
        components: {
            IconBonusPointsBadge: BonusPointsBadge,
            IconBonusPointsBadgeSecondary: BonusPointsBadgeSecondary
        },
        props: {
            height: {
                type: [ Number, String ],
                default: 70
            },
            width: {
                type: [ Number, String ],
                default: 70
            },
            variant: {
                type: String,
                default: 'primary'
            }
        }
    };
</script>
