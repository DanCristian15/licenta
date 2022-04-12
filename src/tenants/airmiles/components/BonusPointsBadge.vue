<template>
    <v-img 
        v-if="variant === 'primary'" 
        :src="imagePrimarySrc" 
        flat />
    <v-img
        v-else-if="variant === 'secondary'"
        :src="imageSecondarySrc" 
        flat />
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
            imagePrimarySrc() {
                return require( '@tenants/airmiles/assets/bonus_points_badge.png' );
            },
            imageSecondarySrc() {
                return require( '@tenants/airmiles/assets/bonus_points_badge_secondary.png' );
            }
        }
    };
</script>
