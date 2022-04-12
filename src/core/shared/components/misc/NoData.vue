<template>
    <div class="gst-no-data text-center">
        <slot>
            <div class="my-2">
                <img :src="iconSrc" :width="iconWidthPx" />
            </div>
            <p class="gst-no-data__message">
                {{ msg }}
            </p>
        </slot>
    </div>
</template>

<script>
    import imageConstants from '@core/utils/constants/imagePaths';

    export default {
        name: 'NoData',
        i18nOptions:{
            namespaces: 'shared',
            keyPrefix: 'components.misc.noData'
        },
        props: {
            message: {
                type: String,
                default: null
            },
            iconSrc: {
                type: String,
                default: imageConstants.FALLBACKS.NO_DATA
            },
            iconWidth: {
                type: Number,
                default: 109
            }
        },
        computed: {
            msg( ) {
                return this.message || this.$t( 'message' );
            },
            iconWidthPx() {
                return `${this.iconWidth}px`;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-no-data__message {
        color: theme-color( 'tertiary' );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'large' );
    }
</style>
