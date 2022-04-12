<template>
    <IconBonusPointsBadge 
        :height="height" 
        :width="width" 
        class="gst-bonus-points-badge" />
</template>
<script>
    import BonusPointsBadge from '@shared/assets/bonus_points_badge.svg';
    
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
<style lang="scss" scoped>
    .gst-bonus-points-badge {
        visibility: hidden;
    }
</style>
