<template>
    <v-fade-transition>
        <BaseButton
            v-show="visible"
            :style="`bottom:${bottom};right:${right};position: ${position}`"
            class="u-width-100 gst-back-to-top"
            @click="backToTop">
            <IconDropDownArrow
                class="u-mouse-pointer u-rotate-180" />
        </BaseButton>
    </v-fade-transition>
</template>

<script>
    import debounce from 'lodash/debounce';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';

    export default {
        components: {
            BaseButton,
            IconDropDownArrow
        },
        props: {
            visibleOffset: {
                type: [ String, Number ],
                default: 2000,
            },
            visibleOffsetBottom: {
                type: [ String, Number ],
                default: 0,
            },
            right: {
                type: String,
                default: '30px',
            },
            bottom: {
                type: String,
                default: '91px',
            },
            position: {
                type: String,
                default: 'fixed'
            }
        },
        data () {
            return {
                visible: false
            };
        },
        methods: {
            catchScroll ( ) {
                const pastTopOffset = window.pageYOffset > parseInt( this.visibleOffset );
                const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt( this.visibleOffsetBottom );
                this.visible = parseInt( this.visibleOffsetBottom ) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset;
            },
            catchScrollDebouced: debounce( function ( ) {
                this.catchScroll( );
            }, 50 ),
            backToTop ( ) {
                window.smoothscroll( );
                this.$emit( 'scrolled' );
            }
        },
        mounted () {
            window.smoothscroll = ( ) => {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if ( currentScroll > 0 ) {
                    window.requestAnimationFrame( window.smoothscroll );
                    window.scrollTo( 0, Math.floor( currentScroll - ( currentScroll / 5 ) ) );
                }
            };
            window.addEventListener( 'scroll', this.catchScrollDebouced );
        },
        destroyed () {
            window.removeEventListener( 'scroll', this.catchScrollDebouced );
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    $btn-dimensions: 50px;

    .gst-back-to-top.gst-btn.v-btn {
        height: $btn-dimensions !important;
        width: $btn-dimensions !important;
        color: white !important;
        z-index: $z-index-dialog + 1;
        min-width: $btn-dimensions !important;
        border-radius: $btn-dimensions !important;

        .gst-svg-icon {
            fill: theme-color( 'white' );
        }
    }
</style>
