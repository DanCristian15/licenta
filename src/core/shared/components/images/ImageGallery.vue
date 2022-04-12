<template>
    <div
        v-if="items.length"
        ref="imageGallery"
        v-resize="calcThumbSize"
        class="gst-image-gallery d-flex flex-column align-center justify-center justify-md-start u-height-100">
        <v-btn
            fab
            text
            x-small
            class="gst-image-gallery-close text-capitalize gst-btn--cancel px-0"
            @click="$emit('close')">
            <IconClose />
        </v-btn>
        <div
            class="u-position-relative u-width-100 my-auto mt-lg-4 mb-lg-0"
            :style="{ 'max-width': carouselMaxWidth }">
            <v-carousel
                v-model="activeItem"
                class="gst-image-gallery__carousel rounded transparent"
                :hide-delimiters="true"
                :continuous="false"
                :show-arrows="false"
                :height="carouselHeight">
                <v-carousel-item
                    v-for="(item, index) in items"
                    :key="index"
                    :src="item" />
            </v-carousel>
            <div class="gst-image-gallery__carousel-navigation">
                <BaseButton
                    class="gst-image-gallery__carousel-navigation-prev"
                    :disabled="isCarouselOnStart"
                    fab
                    small
                    text
                    @click="onClickPrevDo">
                    <ChevronDownIcon class="u-rotate-90" />
                </BaseButton>
                <BaseButton
                    class="gst-image-gallery__carousel-navigation-next"
                    :disabled="isCarouselOnEnd"
                    fab
                    small
                    text
                    @click="onClickNextDo">
                    <ChevronDownIcon class="u-rotate-90-n" />
                </BaseButton>
            </div>
        </div>
        <div class="gst-image-gallery__pagination-index my-8">
            {{ paginationIndex }}
        </div>
        <v-slide-group
            v-model="activeItem"
            :style="thumbListStyle"
            class="gst-image-gallery__thumbs"
            center-active
            mandatory
            :show-arrows="false">
            <v-slide-item
                v-for="(item, index) in items"
                :key="index"
                v-slot="{ active, toggle }"
                class="gst-image-gallery__thumbs-item">
                <v-card
                    :style="thumbItemStyle"
                    class="rounded transparent overflow-hidden"
                    :class="{
                        'gst-image-gallery__thumbs-item-active': active
                    }"
                    elevation="0"
                    @click="toggle">
                    <v-img :src="item" :width="thumbWidth" :height="thumbHeight" />
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import ChevronDownIcon from '@core/shared/assets/icons/chevron_down.svg';
    import IconClose from '@core/shared/assets/icons/close.svg';

    export default {
        name: 'ImageGallery',
        components: {
            ChevronDownIcon,
            BaseButton,
            IconClose
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            carouselMaxWidth: {
                type: String,
                default: '880px'
            },
            carouselHeightDesktop: {
                type: String,
                default: '680px'
            },
            carouselHeightMobile: {
                type: String,
                default: '280px'
            },
            thumbsToShow: {
                type: Object,
                default: () => ( { xs: 3.5, sm: 6, md: 8, lg: 11, xl: 18 } )
            },
            thumbGap: {
                type: String,
                default: '4px'
            }
        },
        data( ) {
            return {
                activeItem: 0,
                thumbWidth: 0,
                thumbHeight: 0,
            };
        },
        computed: {
            paginationIndex( ) {
                return this.$t( '_common:terms.currentOfTotal', { current: this.activeItem + 1, total: this.items.length } );
            },
            isCarouselOnStart( ) {
                return this.activeItem === 0;
            },
            isCarouselOnEnd( ) {
                return this.activeItem === ( this.items.length - 1 );
            },
            carouselHeight( ) {
                return this.$vuetify.breakpoint.smAndUp ? this.carouselHeightDesktop : this.carouselHeightMobile;
            },
            thumbListStyle( ) {
                return { marginLeft: `-${this.thumbGap}`, marginRight: `-${this.thumbGap}` };
            },
            thumbItemStyle( ) {
                return { marginLeft: this.thumbGap, marginRight: this.thumbGap };
            }
        },
        methods: {
            onClickPrevDo( ) {
                this.isCarouselOnStart || ( this.activeItem = this.activeItem - 1 );
            },
            onClickNextDo( ) {
                this.isCarouselOnEnd || ( this.activeItem = this.activeItem + 1 );
            },
            calcThumbSize: debounce( function( ) {
                if ( this.$refs.imageGallery ) {
                    const imageGallery = this.$refs.imageGallery.getBoundingClientRect( );
                    const thumbsToShow = this.thumbsToShow[this.$vuetify.breakpoint.name];
                    const thumbWidth = ( imageGallery.width / thumbsToShow ) - ( 2 * parseInt( this.thumbGap ) );

                    this.thumbWidth = thumbWidth.toFixed( 2 );
                    this.thumbHeight = ( thumbWidth * 0.75 ).toFixed( 2 );
                }
            }, 250 )
        },
        mounted( ) {
            this.calcThumbSize( );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .v-dialog--fullscreen {
        background-color: theme-color( 'black' ) !important;
        opacity: 1 !important;
    }

    .gst-image-gallery {
        .gst-image-gallery-close {
            position: fixed;
            top: 12px;
            right: 12px;

            .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }

        .gst-image-gallery__carousel-navigation {
            .gst-image-gallery__carousel-navigation-prev,
            .gst-image-gallery__carousel-navigation-next {
                position: absolute;
                top: 50%;
                transform: translateY( -50% );

                svg {
                    .gst-svg-icon {
                        fill: theme-color( 'tertiary' );
                    }
                }
            }

            .gst-image-gallery__carousel-navigation-prev {
                left: -60px;
            }

            .gst-image-gallery__carousel-navigation-next {
                right: -60px;
            }

            .gst-image-gallery__carousel-navigation-prev.v-btn--disabled,
            .gst-image-gallery__carousel-navigation-next.v-btn--disabled {
                opacity: 0.4;
            }
        }

        .gst-image-gallery__pagination-index {
            line-height: line-height( 'xl' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
        }

        .gst-image-gallery__thumbs {
            .gst-image-gallery__thumbs-item-active::after {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                border: 2px solid theme-color( 'primary' ) !important;
                background: rgba( theme-color-hex( 'primary' ), 0.4 );
                content: "";
            }

            ::v-deep .v-slide-group__prev,
            ::v-deep .v-slide-group__next {
                display: none;
            }
        }
    }

    @include mobile-only {
        .gst-image-gallery {
            ::v-deep .gst-image-gallery__carousel {
                .v-window-item {
                    display: flex;
                    align-items: center;
                }

                .v-carousel__item {
                    height: auto !important;
                }
            }

            .gst-image-gallery__carousel-navigation {
                .gst-image-gallery__carousel-navigation-prev,
                .gst-image-gallery__carousel-navigation-next {
                    .gst-svg-icon {
                        fill: theme-color( 'white' );
                    }
                }

                .gst-image-gallery__carousel-navigation-prev {
                    left: 0;
                }

                .gst-image-gallery__carousel-navigation-next {
                    right: 0;
                }
            }
        }
    }
</style>
