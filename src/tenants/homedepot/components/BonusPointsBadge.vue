<template>
    <v-img :src="imageSrc" v-bind="$attrs" flat />
</template>

<script>
    export default {
        props: {
            variant: {
                type: String,
                default: 'primary'
            }
        },
        computed: {
            imageSrc() {
                if ( this.variant === 'primary' ) {
                    return require( '../assets/bonus_points_badge_primary.png' );
                } else {
                    return require( '../assets/bonus_points_badge_secondary.png' );
                }
            }
        }
    };
</script>