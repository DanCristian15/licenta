<template>
    <v-card flat class="gst-attraction-card-variant-1" :title="item.name">
        <h5>
            <VClamp
                autoresize
                :max-lines="1"
                class="hyphens clamp gst-attraction-card-variant-1__title">
                {{ item.name }}
            </VClamp>
        </h5>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';

    export default {
        name: 'AttractionCardVariant1',
        components: {
            VClamp
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-attraction-card-variant-1 {
    position: relative;
    max-width: 100%;

    h5 {
        font-weight: font-weight( 'medium' );
    }

    a {
        display: inline-block;
    }
}
</style>
