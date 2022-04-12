<template>
    <v-img v-if="variant === 'primary'" :src="imageSrc" v-bind="$attrs" flat />
    <BonusPointsBadgeSecondary v-else-if="variant === 'secondary'" />
</template>

<script>
    import BonusPointsBadgeSecondary from '@tenants/turkishairlines/assets/bonus_points_badge_secondary.svg';

    export default {
        components: {
            BonusPointsBadgeSecondary
        },
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        },
        computed: {
            imageSrc() {
                return require( '../assets/bonus_points_badge.png' );
            }
        }
    };
</script>
