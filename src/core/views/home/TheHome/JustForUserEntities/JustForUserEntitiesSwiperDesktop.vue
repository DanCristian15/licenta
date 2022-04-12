<template>
    <div>
        <div class="content-max-width px-3">
            <v-flex d-flex flex-row class="mx-0 mb-14">
                <h4 class="gst-just-for-user-entities__title font-weight-bold flex-grow-1">
                    {{ $t('title') }}
                </h4>
                <v-flex v-if="showNavigationButtons" d-flex flex-row align-center shrink class="gst-just-for-user-entities__navigation mx-0">
                    <v-btn icon :disabled="isSwiperReachStart" class="mr-6" @click="goToPreviousSlides">
                        <IconBackArrow />
                    </v-btn>
                    <v-btn icon :disabled="isSwiperReachEnd" @click="goToNextSlides">
                        <IconBackArrow class="u-rotate-180" />
                    </v-btn>
                </v-flex>
            </v-flex>
        </div>
        <swiper
            ref="swiper"
            :key="swiperAllowTouch ? 1 : 2"
            class="gst-just-for-user-entities__swiper pr-4 pr-md-0"
            :options="swiperOption"
            @slide-change="setSwiperNavigationDebounced"
            @resize="setSwiperNavigationDebounced">
            <swiper-slide
                v-for="( chunk, i ) in computedItemsIndexChunks.list"
                :key="i"
                :class="{
                    'content-max-width': items.length <= 4
                }"
                class="gst-just-for-user-entities__slide">
                <v-row no-gutters>
                    <v-col cols="6">
                        <div class="pa-2">
                            <JustForUserEntitiesEntity :item="items[chunk[0]]" height="464" class="u-width-100" />
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <template v-if="!(i % 2)">
                            <v-row no-gutters>
                                <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                    <JustForUserEntitiesEntity :item="items[chunk[1]]" height="224" class="u-width-100" />
                                </div>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                        <JustForUserEntitiesEntity :item="items[chunk[2]]" height="224" class="u-width-100" />
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                        <JustForUserEntitiesEntity :item="items[chunk[3]]" height="224" class="u-width-100" />
                                    </div>
                                </v-col>
                            </v-row>
                        </template>
                        <template v-else>
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                        <JustForUserEntitiesEntity :item="items[chunk[1]]" height="224" class="u-width-100" />
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                        <JustForUserEntitiesEntity :item="items[chunk[2]]" height="224" class="u-width-100" />
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <div class="pa-2 u-width-100 u-box-sizing-border-box">
                                    <JustForUserEntitiesEntity :item="items[chunk[3]]" height="224" class="u-width-100" />
                                </div>
                            </v-row>
                        </template>
                    </v-col>
                </v-row>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import { getNearestUpperMultiple as mathUtilsGetNearestUpperMultiple } from '@utils/mathUtils';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';
    import JustForUserEntitiesEntity from './JustForUserEntitiesEntity.vue';

    const MIN_ENTITIES = 4;

    export default {
        name: 'JustForUserEntitiesSwiperDesktop',
        components: {
            IconBackArrow,
            JustForUserEntitiesEntity
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.home.theHome._components.justForUserEntities',
        },
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                isSwiperReachStart: true,
                isSwiperReachEnd: false,
            };
        },
        computed: {
            computedItemsIndexChunks() {
                const itemsLengthNearestUpperMultiple = mathUtilsGetNearestUpperMultiple( this.items.length, 4 );
                const difference = itemsLengthNearestUpperMultiple - this.items.length;

                const itemsArrayInitialIndexes = Array.from( { length: this.items.length }, ( value, index ) => index );
                const itemsArrayContinuedIndexes = difference ? Array.from( { length: difference }, ( value, index ) => index ) : [];
                const itemsArrayFinalIndexes = itemsArrayInitialIndexes.concat( itemsArrayContinuedIndexes );

                const itemsArrayFinalIndexesChunked = itemsArrayFinalIndexes.reduce( ( all, one, i ) => {
                    const chunk = Math.floor( i/4 );
                    all[chunk] = [].concat( ( all[chunk]||[] ), one );
                    return all;
                }, [] );

                return {
                    list: itemsArrayFinalIndexesChunked,
                    length: itemsArrayFinalIndexes.length
                };
            },
            showNavigationButtons( ) {
                if ( !this.$vuetify.breakpoint.lgAndDown && this.computedItemsIndexChunks.length === ( MIN_ENTITIES*2 ) )  {
                    return false;
                }
                if ( this.$vuetify.breakpoint.lgAndUp && this.computedItemsIndexChunks.length === ( MIN_ENTITIES*2 ) )  {
                    return false;
                }
                if ( this.$vuetify.breakpoint.mdAndUp && this.computedItemsIndexChunks.length > MIN_ENTITIES ) {
                    return true;
                }
                return false;
            },
            swiperAllowTouch( ) {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            swiperOption( ) {
                const { thresholds, scrollBarWidth } = this.$vuetify.breakpoint;

                let thresholdDefaultOptions, thresholdMdOptions, thresholLgOptions;

                switch ( this.computedItemsIndexChunks.length ) {
                    case MIN_ENTITIES:
                        thresholLgOptions = thresholdMdOptions = thresholdDefaultOptions = {
                            slidesPerView: 1,
                            centeredSlides: true
                        };

                        break;
                    case MIN_ENTITIES * 2:
                        thresholdMdOptions = thresholLgOptions = {
                            slidesPerView: 2,
                            centeredSlides: false
                        };
                        thresholdDefaultOptions = {
                            slidesPerView: 1,
                            centeredSlides: true
                        };

                        break;
                    default:
                        thresholLgOptions = {
                            slidesPerView: 2.5,
                            centeredSlides: false
                        };
                        thresholdMdOptions = {
                            slidesPerView: 1.8,
                            centeredSlides: false
                        };
                        thresholdDefaultOptions = {
                            slidesPerView: 1.2,
                            centeredSlides: false
                        };

                        break;
                }

                return {
                    ...thresholdDefaultOptions,
                    freeMode: false,
                    spaceBetween: 0,
                    allowTouchMove: this.swiperAllowTouch,
                    breakpoints: {
                        [ thresholds.md - scrollBarWidth ]: {
                            spaceBetween: 0,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                            ...thresholdMdOptions
                        },
                        [ thresholds.lg - scrollBarWidth ]: {
                            spaceBetween: 0,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                            ...thresholLgOptions
                        }
                    }
                };
            },
        },
        methods: {
            goToPreviousSlides( ) {
                const swiper = this.$refs.swiper.$swiper;
                swiper.slidePrev(  );
                this.isSwiperReachStart = swiper.isBeginning;
                this.isSwiperReachEnd = swiper.isEnd;
            },
            goToNextSlides( ) {
                const swiper = this.$refs.swiper.$swiper;
                swiper.slideNext(  );
                this.isSwiperReachEnd = swiper.isEnd;
            },
            setSwiperNavigationDebounced: debounce( function ( ) {
                const swiper = this.$refs.swiper.$swiper;
                this.isSwiperReachStart = swiper.isBeginning;
                this.isSwiperReachEnd = swiper.isEnd;
            }, 30 )
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-just-for-user-entities__title {
        line-height: 36px;
        font-size: 34px;
    }
</style>