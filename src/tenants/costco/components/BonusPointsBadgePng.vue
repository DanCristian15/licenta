<template>
    <div>
        <v-img 
            :src="imageCartBottomSrc"
            class="bonus-point-badge__bottom-card"
            contain />
        <v-img
            :src="imageCartTopSrc" 
            class="bonus-point-badge__top-card"
            contain />
    </div>
</template>

<script>
    export default {
        computed: {
            imageCartBottomSrc() {
                return require( '@tenants/costco/assets/goldstar-card.png' );
            },
            imageCartTopSrc() {
                return require( '@tenants/costco/assets/executive-card.png' );
            }
        }
    };
</script>

<style lang="scss" scoped>
    .bonus-point-badge__bottom-card {
        position: absolute;
        top: 0;
        right: 0;
        height: 70%;
        width: 68%;
    }

    .bonus-point-badge__top-card {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 70%;
        width: 68%;
    }
</style>
