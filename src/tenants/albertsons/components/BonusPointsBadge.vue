<template>
    <v-img :src="imageSrc" flat v-bind="$attrs" />
</template>

<script>
    export default {
        computed: {
            imageSrc() {
                return require( '@tenants/albertsons/assets/bonus_points_badge.png' );
            }
        }
    };
</script>
