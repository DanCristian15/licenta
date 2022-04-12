<template>
    <div class="pl-4 mb-n4">
        <div class="content-max-width">
            <v-flex d-flex flex-row class="mx-0 pb-4">
                <h4 class="gst-just-for-user-entities__title font-weight-bold flex-grow-1">
                    {{ $t('title') }}
                </h4>
            </v-flex>
        </div>
        <swiper
            ref="swiper"
            :key="swiperAllowTouch ? 3 : 4"
            class="gst-just-for-user-entities__swiper pr-4 pr-md-0"
            :options="swiperOption"
            @slide-change="setSwiperNavigationDebounced"
            @resize="setSwiperNavigationDebounced">
            <swiper-slide
                v-for="( item ) in items"
                :key="item.id"
                class="gst-just-for-user-entities__slide mb-4">
                <JustForUserEntitiesEntity :item="item" height="352" class="u-width-100" />
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import entityConstants from '@core/utils/constants/entity';
    import JustForUserEntitiesEntity from './JustForUserEntitiesEntity';

    export default {
        name: 'JustForUserEntitiesSwiperMobile',
        components: {
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
            swiperAllowTouch( ) {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            swiperOption( ) {
                const { thresholds } = this.$vuetify.breakpoint;

                return {
                    slidesPerView: 1.2,
                    centeredSlides: false,
                    freeMode: true,
                    spaceBetween: 16,
                    allowTouchMove: this.swiperAllowTouch,
                    breakpoints: {
                        [ thresholds.xs ]: {
                            slidesPerView: 2.1,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        },
                        [ thresholds.sm ]: {
                            slidesPerView: 2.5,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        }
                    }
                };
            },
        },
        methods: {
            isItemAttraction( { type } ) {
                return type === entityConstants.TYPES.ATTRACTION;
            },
            isItemEvent( { type } ) {
                return type === entityConstants.TYPES.EVENT;
            },
            setSwiperNavigationDebounced: debounce( function ( ) {
                const swiper = this.$refs.swiper.$swiper;

                this.isSwiperReachStart = swiper.isBeginning;
                this.isSwiperReachEnd = swiper.isEnd;
            }, 50 )
        }
    };
</script>
