<template>
    <v-img :src="imageSrc" flat v-bind="$attrs" />
</template>

<script>
    export default {
        name: 'BonusPointsBadge',
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        },
        computed: {
            imageSrc() {
                return this.variant === 'primary' ? require( '@tenants/emirates/assets/bonus_points_badge.png' ) : require( '@tenants/emirates/assets/bonus_points_badge_mobile.png' );
            }
        }
    };
</script>
