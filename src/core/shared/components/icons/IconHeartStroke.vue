<template>
    <IconHeartStrokeSvg class="gst-icon-heart-stroke" />
</template>
<script>
    import IconHeartStrokeSvg from '@core/shared/assets/icons/heart_stroke.svg';

    export default {
        name: 'IconHeartStroke',
        components: {
            IconHeartStrokeSvg
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-heart-stroke {
        .gst-svg-icon {
            fill: theme-color( 'favorite-unmarked' );
        }
    }

    .active {
        .gst-icon-heart-stroke {
            .gst-svg-icon {
                fill: theme-color( 'favorite-unmarked' );
            }

            .gst-svg-icon-2 {
                fill-opacity: 1 !important;
                fill: theme-color( 'favorite-marked' );
            }
        }
    }
</style>
