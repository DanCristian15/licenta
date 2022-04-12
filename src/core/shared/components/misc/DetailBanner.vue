<template>
    <BaseBanner class="gst-banner--detail">
        <template v-slot:gst-banner-content>
            <BaseImage 
                v-bind="imageProps"
                class="gst-banner__image pb-5"
                :class="imgClasses">
                <template v-slot:content>
                    <v-flex d-flex flex-column justify-space-between class="content-max-width u-height-100">
                        <div class="text-right">
                            <slot name="favorite"></slot>
                        </div>
                        <div>
                            <h1 class="d-inline-block u-align-ve">
                                {{ title }}
                            </h1>
                        </div>
                    </v-flex>
                </template>
            </BaseImage>
        </template>
    </BaseBanner>
</template>
<script>
    import BaseImage from '@shared/components/misc/BaseImage.vue';
    import BaseBanner from '@shared/components/misc/BaseBanner.vue';

    export default {
        name: 'DetailBanner',
        components: {
            BaseBanner,
            BaseImage,
        },
        props: {
            fallbackSrc: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: '',
                required: true
            },
            src: {
                type: String,
                default: null
            },
            imgClasses: {
                type: String,
                default: ''
            },
            imgHeight: {
                type: Number,
                default: 180
            }
        },
        data: () => ( {
            gradient: 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
        } ),
        computed: {
            imageProps() {
                return {
                    src: this.src,
                    fallbackSrc: this.fallbackSrc,
                    height: this.imgHeight,
                    gradient: this.gradient,
                    position: 'top center',
                    validateSrcContentSize: true
                };
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-banner--detail {
    .gst-banner__image {
        height: 200px;

        @include mobile-only {
            padding: 0 16px;
        }
    }
}
</style>