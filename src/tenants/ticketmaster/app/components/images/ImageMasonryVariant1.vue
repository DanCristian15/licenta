<template>
    <div
        class="gst-image-masonry-variant-1"
        :class="{
            'u-mouse-pointer': canOpenFullScreen
        }"
        @click="openFullScreenGallery">
        <BaseImage v-if="layout0" />
        <div v-if="layout1" class="gst-image-masonry-variant-1_layout_one">
            <BaseImage
                :src="imagesToDisplay[0]"
                :cover="true" />
        </div>

        <div v-if="layout2" class="gst-image-masonry-variant-1_layout_two">
            <BaseImage
                v-for="source in imagesToDisplay"
                :key="source"
                class="gst-image-masonry-variant-1__image"
                :src="source"
                :cover="true" />
        </div>

        <div v-if="layout3" class="gst-image-masonry-variant-1_layout_three">
            <BaseImage
                :src="imagesToDisplay[0]"
                :cover="true"
                class="gst-image-masonry-variant-1__image" />
            <div class="gst-image-masonry-variant-1_layout_three__right">
                <BaseImage :src="imagesToDisplay[1]"
                    :cover="true"
                    class="gst-image-masonry-variant-1__image" />
                <BaseImage :src="imagesToDisplay[2]"
                    :cover="true"
                    class="gst-image-masonry-variant-1__image" />
            </div>
        </div>

        <div v-if="layout4" class="gst-image-masonry-variant-1_layout_four">
            <BaseImage
                :src="imagesToDisplay[0]"
                :cover="true"
                class="gst-image-masonry-variant-1__image" />
            <div class="gst-image-masonry-variant-1_layout_four__right">
                <div class="gst-image-masonry-variant-1_layout_four__top-right">
                    <BaseImage
                        :src="imagesToDisplay[1]"
                        :cover="true"
                        class="gst-image-masonry-variant-1__image" />
                    <BaseImage
                        :src="imagesToDisplay[2]"
                        :cover="true"
                        class="gst-image-masonry-variant-1__image" />
                </div>
                <div class="gst-image-masonry-variant-1_layout_four__bottom-right">
                    <BaseImage
                        :src="imagesToDisplay[3]"
                        :cover="true"
                        class="gst-image-masonry-variant-1__image" />
                </div>
            </div>
        </div>

        <div v-if="layout5" class="gst-image-masonry-variant-1_layout_five">
            <BaseImage
                :src="imagesToDisplay[0]"
                :cover="true"
                aspect-ratio="1"
                class="gst-image-masonry-variant-1__image" />
            <div class="gst-image-masonry-variant-1_layout_five__right">
                <BaseImage
                    v-for="(image, index) in imagesToDisplay.slice(1)"
                    :key="index"
                    aspect-ratio="1"
                    :src="image"
                    :cover="true"
                    class="gst-image-masonry-variant-1__image" />
            </div>
        </div>
    </div>
</template>

<script>
    import ImageGallery from '@shared/components/images/ImageGallery';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import { getImageByWidth } from '@tenants/ticketmaster/app/utils/imageModelUtils';
    import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';

    export default {
        name: 'HotelDetailsModalGallery',
        components: {
            BaseImage
        },
        props: {
            images: {
                type: Array,
                required: true,
            },
            canOpenFullScreen: {
                type: Boolean,
                default: true
            },
            imagesOnDesktop: {
                type: Number,
                default: 5
            },
            imagesOnMobile: {
                type: Number,
                default: 4
            }
        },
        computed: {
            imagesToDisplay ( ) {
                return this.$vuetify.breakpoint.mdAndUp ?
                    this.images.slice( 0, this.imagesOnDesktop ).map( image => getImageByWidth( IMAGE_SIZE.LARGE, image ) ) :
                    this.images.slice( 0, this.imagesOnMobile ).map( image => getImageByWidth( IMAGE_SIZE.MEDIUM, image ) );
            },
            galleryImages ( ) {
                return this.images.map( ( image ) => getImageByWidth( IMAGE_SIZE.LARGE, image ) );
            },
            layout0( ) {
                return  !this.imagesToDisplay.length;
            },
            layout1( ) {
                return  this.imagesToDisplay.length === 1;
            },
            layout2( ) {
                return  this.imagesToDisplay.length === 2;
            },
            layout3( ) {
                return  this.imagesToDisplay.length === 3;
            },
            layout4( ) {
                return  this.imagesToDisplay.length === 4;
            },
            layout5( ) {
                return  this.imagesToDisplay.length === 5;
            }
        },
        methods: {
            openFullScreenGallery ( ) {
                this.canOpenFullScreen && this.$modal.show(
                    ImageGallery,
                    { items: this.galleryImages },
                    {
                        'no-click-animation': true,
                        scrollable: false,
                        fullscreen: true,
                        persistent: false,
                        'hide-overlay': false,
                        'content-class': 'gst-v-dialog-gallery',
                    }
                );
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-v-dialog-gallery {
    background: theme-color( 'black' ) !important;
    opacity: 1 !important;
}

.gst-image-masonry-variant-1 {
    display: flex;
    padding: theme-spacing( 0, 4 );
    min-height: 380px;

    .gst-image-masonry-variant-1__image {
        border-radius: border-radius( 's' );
    }

    > div {
        display: flex;
        width: 100%;
        max-height: 100%;
    }

    .gst-image-masonry-variant-1_layout_two {
        .gst-image-masonry-variant-1__image {
            width: calc( 50% - 2px );

            &:first-child {
                margin-right: 4px;
            }
        }
    }

    .gst-image-masonry-variant-1_layout_three {
        display: inline-flex;
        width: 100%;

        > .gst-image-masonry-variant-1__image {
            height: auto;
            width: calc( 66.66% - 2px );
            margin-right: 4px;
        }

        .gst-image-masonry-variant-1_layout_three__right {
            display: flex;
            height: auto;
            width: calc( 33.33% - 2px );
            flex-direction: column;

            .gst-image-masonry-variant-1__image {
                height: calc( 50% - 2px );
                width: 100%;

                &:first-child {
                    margin-bottom: 4px;
                }
            }
        }
    }

    .gst-image-masonry-variant-1_layout_four {
        display: flex;
        width: 100%;

        > .gst-image-masonry-variant-1__image {
            height: auto;
            width: calc( 60% - 2px );
            margin-right: 4px;
        }

        .gst-image-masonry-variant-1_layout_four__right {
            display: flex;
            width: calc( 40% - 2px );
            flex-direction: column;
        }

        .gst-image-masonry-variant-1_layout_four__top-right {
            display: flex;
            height: calc( 50% - 2px );
            margin-bottom: 4px;

            .gst-image-masonry-variant-1__image {
                height: 100%;
                width: calc( 50% - 2px );

                &:first-child {
                    margin-right: 4px;
                }
            }
        }

        .gst-image-masonry-variant-1_layout_four__bottom-right {
            display: flex;
            height: calc( 50% - 2px );

            .gst-image-masonry-variant-1__image {
                height: 100%;
                width: 100%;
            }
        }
    }

    .gst-image-masonry-variant-1_layout_five {
        display: flex;
        width: 100%;

        > .gst-image-masonry-variant-1__image {
            height: auto;
            width: auto;
            margin-right: 4px;

            &.fallback-image {
                width: 50%;
            }
        }

        .gst-image-masonry-variant-1_layout_five__right {
            display: flex;
            width: calc( 50% - 4px );
            flex-wrap: wrap;

            .gst-image-masonry-variant-1__image {
                display: flex;
                height: calc( 50% - 2px );
                width: calc( 50% - 2px );

                &:nth-child(2n+1) {
                    margin-right: 4px;
                }

                &:first-child,
                &:nth-child(2) {
                    margin-bottom: 4px;
                }
            }
        }
    }
}

@include mobile-only {
    .gst-image-masonry-variant-1 {
        padding: theme-spacing( 1, 1, 3 ) !important;
        min-height: 350px;

        .gst-image-masonry-variant-1_layout_four {
            flex-direction: column;

            > .gst-image-masonry-variant-1__image {
                height: 50%;
                width: 100%;
            }

            .gst-image-masonry-variant-1_layout_four__right {
                height: 50%;
                width: 100%;
                margin-top: 4px;
                flex-direction: row;

                .gst-image-masonry-variant-1_layout_four__top-right {
                    height: 100%;
                    width: calc( 66.66% - 2px );
                    flex-direction: row;

                    .gst-image-masonry-variant-1__image {
                        width: calc( 50% - 2px );
                    }
                }

                .gst-image-masonry-variant-1_layout_four__bottom-right {
                    height: 100%;
                    width: calc( 33.33% - 2px );
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>
