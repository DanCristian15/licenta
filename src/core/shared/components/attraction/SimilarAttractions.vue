<template>
    <div
        v-if="!userFirstAccessApp"
        class="gst-similar-attractions ">
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div
            v-else-if="items.length"
            class="mr-n4 mr-md-0">
            <v-flex d-flex flex-row class="mx-0 pb-4 pb-lg-6 pr-4 pr-md-0">
                <h4 class="gst-similar-attractions__title flex-grow-1">
                    {{ $t('title') }}
                </h4>
                <v-flex v-if="showNavigationButtons" d-flex flex-row shrink class="gst-similar-attractions__navigation mx-0">
                    <v-btn icon :disabled="isSwiperReachStart" class="mr-6" @click="goToPreviousSlides">
                        <IconBackArrow />
                    </v-btn>
                    <v-btn icon :disabled="isSwiperReachEnd" @click="goToNextSlides">
                        <IconBackArrow class="u-rotate-180" />
                    </v-btn>
                </v-flex>
            </v-flex>
            <swiper
                ref="swiper"
                :key="swiperAllowTouch ? 1 : 2"
                class="gst-similar-attractions__swiper pr-4 pr-md-0"
                :options="swiperOption"
                @slide-change="setSwiperNavigationDebounced"
                @reachBeginning="setSwiperNavigationDebounced"
                @reachEnd="setSwiperNavigationDebounced"
                @resize="setSwiperNavigationDebounced">
                <swiper-slide
                    v-for="( item ) in items"
                    :key="item.id"
                    class="gst-similar-attractions__slide">
                    <AttractionCardVariant4
                        :item="item" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
    import AttractionCardVariant4 from '@shared/components/attraction/AttractionCardVariant4';
    import { mapActions, mapState } from 'vuex';
    import debounce from 'lodash/debounce';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';

    export default {
        name: 'SimilarAttractions',
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
                loading:            state => state.user.analytics.loading
            } ),
            items( ) {
                return this.similarAttractions.slice( 0, 6 );
            },
            visibleNoSlides( ) {
                return this.$vuetify.breakpoint.sm ? 4 : this.$vuetify.breakpoint.md ? 5 : 6;
            },
            showNavigationButtons( ) {
                return this.$vuetify.breakpoint.mdAndDown && !this.$vuetify.breakpoint.xs && this.items.length > this.visibleNoSlides;
            },
            swiperAllowTouch( ) {
                return !this.$vuetify.breakpoint.lgAndUp;
            },
            swiperOption( ) {
                const { thresholds, scrollBarWidth } = this.$vuetify.breakpoint;

                return {
                    slidesPerView: 2.2,
                    centeredSlides: false,
                    freeMode: true,
                    spaceBetween: 16,
                    allowTouchMove: this.swiperAllowTouch,
                    breakpoints: {
                        [ thresholds.xs ]: {
                            slidesPerView: 4,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        },
                        [ thresholds.sm ]: {
                            slidesPerView: 5,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        },
                        [ thresholds.md - scrollBarWidth ]: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        }
                    }
                };
            },
        },
        methods: {
            ...mapActions( {
                getAnalytics: 'user/analytics/get'
            } ),
            goToPreviousSlides( ) {
                const swiper = this.$refs.swiper.$swiper;
                this.setSwiperNavigationDebounced();

                swiper.slidePrev(  );
            },
            goToNextSlides( ) {
                const swiper = this.$refs.swiper.$swiper;
                this.setSwiperNavigationDebounced();

                swiper.slideNext(  );
            },
            setSwiperNavigationDebounced: debounce( function ( ) {
                const swiper = this.$refs.swiper.$swiper;

                this.isSwiperReachStart = swiper.isBeginning;
                this.isSwiperReachEnd = swiper.isEnd;
            }, 50 ),
        },
        mounted( ) {
            this.userFirstAccessApp || this.getAnalytics( );
        }
    };
</script>
<style lang="scss" scope>
    @import "@scssVariables";

    .gst-similar-attractions__title {
        line-height: font-size( 'xxxxl' );
    }

    .gst-similar-attractions__navigation {
        .v-btn {
            height: font-size( 'xxxxl' );
            width: font-size( 'xxxxl' );
        }
    }
</style>
