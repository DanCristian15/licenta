
<template>
    <v-card
        class="gst-card-icon-container"
        :outlined="outlined"
        flat>
        <slot></slot>
    </v-card>
</template>
<script>
    export default {
        name: 'IconForCard',
        props: {
            outlined: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-card-icon-container {
    &.v-card {
        height: auto;
        width: 51px;
        background: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
        text-align: center;
        border-color: theme-color( 'quinary' );
    }
}
</style>
