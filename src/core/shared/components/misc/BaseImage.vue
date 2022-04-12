<template>
    <v-img v-if="!errorImage || !$slots.fallback"
        ref="image"
        :src="imageSrc"
        class="white--text"
        :gradient="gradient"
        v-bind="$attrs"
        @load="onLoad"
        @error="onError">
        <template v-if="hasPlaceholder" v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center">
                <DataLoading />
            </v-row>
        </template>
        <slot name="content"></slot>
    </v-img>
    <div v-else>
        <slot name="fallback"></slot>
    </div>
</template>
<script>
    import {
        hasIncorrectContentSize as imageUtilsHasIncorrectContentSize
    } from '@core/utils/imageUtils';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';

    export default {
        name: 'BaseImage',
        inheritsAttribute: true,
        components: {
            DataLoading
        },
        props: {
            src: {
                type: String,
                default: null
            },
            fallbackSrc: {
                type: String,
                default: null
            },
            gradient: {
                type: String,
                default: null
            },
            hasPlaceholder: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: null
            },
            validateSrcContentSize: {
                type: Boolean,
                default: false
            }
        },
        data: () => ( {
            errorImage: false
        } ),
        computed: {
            imageSrc( ) {
                const { src, fallbackSrc, errorImage } = this;

                if ( !src && !fallbackSrc ) {
                    this.onError( );
                    return;
                }
                return ( errorImage || !src ) ? fallbackSrc : src;
            },
            hasSlotFallback( ) {
                return !!this.$slots.fallback;
            }
        },
        watch: {
            'src': function ( newValue ) {
                this.errorImage = newValue && this.fallbackSrc;
            }
        },
        methods: {
            onError() {
                this.errorImage = true;
                this.$emit( 'error' );
            },
            onLoad() {
                if ( this.validateSrcContentSize ) {
                    if ( this.src === this.imageSrc ) {
                        this.errorImage = imageUtilsHasIncorrectContentSize( this.$refs.image.image );
                    }
                } else {
                    this.errorImage = false;
                }
                this.$emit( 'load' );
            }
        }
    };
</script>
