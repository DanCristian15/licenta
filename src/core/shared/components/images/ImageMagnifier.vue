<template>
    <div
        ref="magnifier"
        v-resize="calcContainerSize"
        class="gst-image-magnifier d-flex justify-center align-center u-height-100">
        <div
            class="gst-image-magnifier__container d-flex align-center"
            :class="{
                'u-width-100': hasMagnifierBiggerSizeThanImage && $vuetify.breakpoint.lgOnly
            }"
            :style="containerStyle"
            @mousemove="onMouseMoveDo">
            <img
                ref="image"
                class="gst-image-magnifier__container-image"
                :class="{
                    'u-height-100': $vuetify.breakpoint.xlOnly
                }"
                :src="src" />
            <span
                class="gst-image-magnifier__container-glass"
                :style="glassStyle"></span>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce';

    export default {
        name: 'ImageMagnifier',
        props: {
            src: {
                type: String,
                default: null
            },
            glassWidth: {
                type: Number,
                default: 150
            },
            glassHeight: {
                type: Number,
                default: 150
            },
            zoom: {
                type: String,
                default: '200%'
            }
        },
        data() {
            return {
                imageBounds: null,
                cursorX: 0,
                cursorY: 0,
                containerHeight: '100%',
                hasMagnifierBiggerSizeThanImage:  false
            };
        },
        computed: {
            glassStyle( ) {
                return {
                    backgroundImage: `url(${this.src})`,
                    backgroundPosition: this.backgroundPosition,
                    backgroundSize: this.backgroundSize,
                    left: `${this.cursorX}px`,
                    top: `${this.cursorY}px`,
                    width: `${this.glassWidth}px`,
                    height: `${this.glassHeight}px`,
                    transform: `translate( ${this.translateValue}px, ${this.translateValue}px )`
                };
            },
            containerStyle( ) {
                return {
                    height: `${this.containerHeight}`
                };
            },
            zoomRatio( ) {
                return parseInt( this.zoom ) / 100;
            },
            backgroundPosition( ) {
                const posX = -1 * ( ( this.cursorX * this.zoomRatio ) - ( this.glassWidth / 2 ) + 3 );
                const posY = -1 * ( ( this.cursorY * this.zoomRatio ) - ( this.glassHeight / 2 ) + 3 );

                return `${posX}px ${posY}px`;
            },
            backgroundSize( ) {
                if ( this.imageBounds ) {
                    const sizeWidth = ( this.imageBounds.width * this.zoomRatio );
                    const sizeHeight = ( this.imageBounds.height * this.zoomRatio );

                    return `${sizeWidth}px ${sizeHeight}px`;
                }
                return '0 0';
            },
            translateValue( ) {
                return ( -1 * this.glassWidth / 2 );
            }
        },
        methods: {
            getCursorPosition( e ) {
                e = e || window.event;
                this.cursorX = this.imageBounds ? e.pageX - this.imageBounds.left : this.cursorX;
                this.cursorY = this.imageBounds ? e.pageY - this.imageBounds.top : this.cursorY;
                this.cursorX = this.cursorX - window.pageXOffset;
                this.cursorY = this.cursorY - window.pageYOffset;

            },
            getImageBounds( ) {
                if ( this.$refs.image ) {
                    let imgElement = this.$refs.image;
                    this.imageBounds = imgElement.getBoundingClientRect();
                }
            },
            onMouseMoveDo( e ) {
                e.preventDefault();
                this.getImageBounds();
                this.getCursorPosition( e );

                if ( this.imageBounds ) {
                    if ( this.cursorX > this.imageBounds.width - ( ( this.glassWidth / 2 ) / this.zoomRatio ) ) {
                        this.cursorX = this.imageBounds.width - ( ( this.glassWidth / 2 ) / this.zoomRatio );
                    }
                    if ( this.cursorX < ( this.glassWidth / 2 ) / this.zoomRatio ) {
                        this.cursorX = ( this.glassWidth / 2 ) / this.zoomRatio;
                    }
                    if ( this.cursorY > this.imageBounds.height - ( ( this.glassHeight / 2 ) / this.zoomRatio ) ) {
                        this.cursorY = this.imageBounds.height - ( ( this.glassHeight / 2 ) / this.zoomRatio );
                    }
                    if ( this.cursorY < ( this.glassHeight / 2 ) / this.zoomRatio ) {
                        this.cursorY = ( this.glassHeight / 2 ) / this.zoomRatio;
                    }
                }
            },
            calcContainerSize: debounce( function( ) {
                this.containerHeight = '100%';
                setTimeout( ( ) => {
                    if ( this.$refs.magnifier && this.$refs.image ) {
                        const magnifierBounds = this.$refs.magnifier.getBoundingClientRect();
                        this.hasMagnifierBiggerSizeThanImage = magnifierBounds.width > this.$refs.image.naturalWidth && magnifierBounds.height > this.$refs.image.naturalHeight;

                        if ( this.hasMagnifierBiggerSizeThanImage && this.$vuetify.breakpoint.xlOnly ) {
                            this.containerHeight = `${magnifierBounds.height}px`;
                        }
                        this.containerHeight = `${this.$refs.image.height}px`;
                    }
                }, 50 );
            }, 250 )
        },
        mounted( ) {
            this.getCursorPosition();
            this.calcContainerSize();
        }
    };
</script>


<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-image-magnifier {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .gst-image-magnifier__container {
        position: relative;
        cursor: crosshair;
        max-width: 100%;

        .gst-image-magnifier__container-image {
            width: 100%;
            opacity: 0;
            max-height: 100%;
            object-fit: contain;
            object-position: center;
        }

        .gst-image-magnifier__container-glass {
            position: absolute;
            border: 5px solid theme-color( 'primary' );
            background: theme-color( 'white' ) no-repeat;
            opacity: 0;
            border-radius: border-radius( 'circle' );
            pointer-events: none;
            box-shadow: inset 0 0 40px 2px rgba( theme-color-hex( 'black' ), 0.25 );
            transition: opacity 0.15s ease-in;
        }
    }
}

.gst-image-magnifier .gst-image-magnifier__container:hover {
    .gst-image-magnifier__container-glass {
        opacity: 1;
    }
}
</style>