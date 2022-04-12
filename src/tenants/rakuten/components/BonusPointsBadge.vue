<template>
    <IconBonusPointsBadge
        :height="height"
        :width="width"
        class="gst-bonus-points-badge" />
</template>

<script>
    import BonusPointsBadge from '@tenants/rakuten/assets/bonus_points_badge.svg';

    export default {
        name: 'BonusPointsBadge',
        components: {
            IconBonusPointsBadge: BonusPointsBadge,
        },
        props: {
            height: {
                type: [ Number, String ],
                default: 70
            },
            width: {
                type: [ Number, String ],
                default: 70
            }
        }
    };
</script>
