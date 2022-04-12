<template>
    <div v-if="show" class="gst-event-similar-attractions py-4 pl-4 pr-0">
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div
            v-else-if="items.length"
            class="mr-n4 mr-md-0">
            <v-flex d-flex flex-row class="mx-0 pb-4 pr-4 pr-4">
                <h5 class="gst-event-similar-attractions__title flex-grow-1">
                    {{ $t('title') }}
                </h5>
                <v-flex v-if="showNavigationButtons" d-flex flex-row shrink class="gst-event-similar-attractions__navigation mx-0">
                    <v-btn ref="previousButton" :disabled="isSwiperReachStart" icon class="mr-6" @click="goToPreviousSlides">
                        <IconBackArrow />
                    </v-btn>
                    <v-btn ref="nextButton" :disabled="isSwiperReachEnd" icon @click="goToNextSlides">
                        <IconBackArrow class="u-rotate-180" />
                    </v-btn>
                </v-flex>
            </v-flex>
            <v-flex
                ref="swiper"
                d-flex
                flex-row
                class="gst-event-similar-attractions__swiper pr-4 pr-md-0"
                @scroll="setSwiperNavigationDebounced"
                @resize="setSwiperNavigationDebounced">
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="gst-event-similar-attractions__slide pr-4">
                    <AttractionCardVariant4
                        :item="item"
                        height="98px"
                        :width="cardWidth+'px'" />
                </div>
            </v-flex>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import debounce from 'lodash/debounce';
    import AttractionCardVariant4 from '@shared/components/attraction/AttractionCardVariant4';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';

    export default {
        name: 'EventSimilarAttractions',
        components: {
            AttractionCardVariant4,
            DataLoading,
            IconBackArrow
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.similarAttractions'
        },
        data() {
            return {
                isSwiperReachStart: true,
                isSwiperReachEnd: false,
            };
        },
        computed: {
            ...mapState( {
                userFirstAccessApp: state => state.user.firstAccess,
                similarAttractions: state => state.user.analytics.similarAttractions,
                loading:            state => state.user.analytics.loading,
                hasSimilarAttractions: state => state.user.analytics.hasSimilarAttractions
            } ),
            items( ) {
                return this.similarAttractions;
            },
            show( ) {
                return this.hasSimilarAttractions && this.$vuetify.breakpoint.xlOnly;
            },
            cardWidth( ) {
                return 123;
            },
            cardWidthForScroll( ) {
                return this.cardWidth + 16;
            },
            showNavigationButtons( ) {
                return !( this.isSwiperReachStart && this.isSwiperReachEnd );
            }
        },
        methods: {
            ...mapActions( {
                getAnalytics: 'user/analytics/get'
            } ),
            goToPreviousSlides( ) {
                const cardWidthForScroll = this.cardWidthForScroll;
                const swiperEl = this.$refs.swiper;
                const scrollLeft = swiperEl.scrollLeft;
                const previousScrollPosition = ( swiperEl.scrollLeft - cardWidthForScroll ) > 0 ? swiperEl.scrollLeft - cardWidthForScroll : 0;
                const previousCard = Math.floor( previousScrollPosition / cardWidthForScroll );

                swiperEl.scrollBy( -( scrollLeft - previousCard * cardWidthForScroll ), 0 );
            },
            goToNextSlides( ) {
                const swiperEl = this.$refs.swiper;

                swiperEl.scrollBy( this.cardWidthForScroll, 0 );
            },
            setSwiperNavigationDebounced: debounce( function ( ) {
                const swiperEl = this.$refs.swiper;

                if ( swiperEl ) {
                    this.isSwiperReachStart = !swiperEl.scrollLeft;
                    this.isSwiperReachEnd = !( swiperEl.scrollWidth - swiperEl.scrollLeft - swiperEl.offsetWidth );
                }
            }, 50 )
        },
        mounted( ) {
            const addEventsAndData = ( ) => {
                this.getAnalytics( );
                this.setSwiperNavigationDebounced( );
                window.addEventListener( 'resize', this.setSwiperNavigationDebounced );
            };

            if ( this.show ) {
                addEventsAndData( );
            } else {
                this._unwatchShow = this.$watch( 'show', function ( newValue ) {
                    if ( newValue ) {
                        addEventsAndData( );
                        this._unwatchShow( );
                    }
                } );
            }
        },
        destroyed( ) {
            window.removeEventListener( 'resize', this.setSwiperNavigationDebounced );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-similar-attractions {
        border-top: 1px solid rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .gst-event-similar-attractions__title {
        line-height: line-height( 'xxxxl' );
        font-size: font-size( 'xxxl' );
        font-weight: font-weight( 'medium' );
    }

    .gst-event-similar-attractions__navigation {
        .v-btn {
            height: font-size( 'xxxxl' );
            width: font-size( 'xxxxl' );
        }
    }

    .gst-event-similar-attractions__swiper {
        scroll-behavior: smooth;
        overflow: hidden;
    }
</style>