<template>
    <div
        v-if="items.length"
        class="gst-recently-viewed-entities mr-n4 mr-md-0">
        <v-flex d-flex flex-row class="mx-0 pb-4 pb-lg-6 pr-4 pr-md-0">
            <h4 class="gst-recently-viewed-entities__title flex-grow-1">
                {{ $t('title') }}
            </h4>
            <v-flex v-if="showNavigationButtons" d-flex flex-row shrink class="gst-recently-viewed-entities__navigation mx-0">
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
            class="gst-recently-viewed-entities__swiper pr-4 pr-md-0"
            :options="swiperOption"
            @slide-change="setSwiperNavigationDebounced"
            @reachBeginning="setSwiperNavigationDebounced"
            @reachEnd="setSwiperNavigationDebounced"
            @resize="setSwiperNavigationDebounced">
            <swiper-slide
                v-for="( item ) in items"
                :key="item.id"
                class="gst-recently-viewed-entities__slide"
                :class="{
                    'gst-recently-viewed-entities__slide--destroy': item === itemForRemove
                }">
                <router-link
                    v-if="isItemEvent( item )"
                    :to="{name: 'event', params: { id: item.data.id} } "
                    :class="{
                        'swiper-no-swiping': !swiperAllowTouch
                    }">
                    <EventCardVariant3
                        :item="item.data"
                        :with-to="false"
                        :show-remove-button="true"
                        @remove="removeEvent( item )" />
                </router-link>
                <router-link
                    v-if="isItemAttraction( item )"
                    :to="{name: 'attraction', params: { id: item.data.id} } "
                    :class="{
                        'swiper-no-swiping': !swiperAllowTouch
                    }">
                    <AttractionCardVariant4
                        :item="item.data"
                        :with-to="false"
                        :show-remove-button="true"
                        @remove="removeAttraction( item )" />
                </router-link>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import debounce from 'lodash/debounce';
    import EventCardVariant3 from '@shared/components/event/EventCardVariant3';
    import AttractionCardVariant4 from '@shared/components/attraction/AttractionCardVariant4';
    import entityConstants from '@core/utils/constants/entity';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';

    export default {
        name: 'RecentlyViewedEntities',
        components: {
            EventCardVariant3,
            AttractionCardVariant4,
            IconBackArrow
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.home.theHome._components.recentlyViewedEntities',
        },
        data() {
            return {
                itemForRemove: null,
                isSwiperReachStart: true,
                isSwiperReachEnd: false,

            };
        },
        computed: {
            ...mapGetters( {
                items:               'user/browsingHistory/entitiesEventsAndAttraction'
            } ),
            visibleNoSlides( ) {
                return this.$vuetify.breakpoint.sm ? 4 : this.$vuetify.breakpoint.md ? 5 : 6;
            },
            showNavigationButtons( ) {
                return this.$vuetify.breakpoint.smAndUp && this.items.length > this.visibleNoSlides;
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
                            slidesPerGroup: 5,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                        },
                        [ thresholds.md - scrollBarWidth ]: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            freeMode: false,
                            allowTouchMove: this.swiperAllowTouch,
                            preventClicks: false,
                            preventClicksPropagation: false
                        }
                    }
                };
            },
        },
        methods: {
            ...mapActions( {
                deleteUserBrowsingHistoryEntity: 'user/browsingHistory/deleteEntity',
            } ),
            isItemAttraction( { type } ) {
                return type === entityConstants.TYPES.ATTRACTION;
            },
            isItemEvent( { type } ) {
                return type === entityConstants.TYPES.EVENT;
            },
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
            removeAttraction ( item ) {
                if ( this.itemForRemove ) {
                    return;
                }
                this.itemForRemove = item;
                setTimeout( ( ) => {
                    this.deleteUserBrowsingHistoryEntity( { entityType: entityConstants.TYPES.ATTRACTION, entityId: item.data.id  } );
                    this.itemForRemove = null;
                }, 500 );
            },
            removeEvent ( item ) {
                if ( this.itemForRemove ) {
                    return;
                }
                this.itemForRemove = item;
                setTimeout( ( ) => {
                    this.deleteUserBrowsingHistoryEntity( { entityType: entityConstants.TYPES.EVENT, entityId: item.data.id  } );
                    this.itemForRemove = null;
                }, 500 );
            }
        }
    };
</script>
<style lang="scss" scope>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-recently-viewed-entities__title {
        line-height: font-size( 'xxxxl' );
    }

    .gst-recently-viewed-entities__navigation {
        .v-btn {
            height: font-size( 'xxxxl' );
            width: font-size( 'xxxxl' );
        }
    }

    .gst-recently-viewed-entities__slide--destroy {
        animation-name: slide-and-fade;
        animation-duration: 500ms;
        animation-fill-mode: forwards;
    }

    @keyframes slide-and-fade {
        0% {
            opacity: 1;
        }

        100% {
            width: 0;
            opacity: 0;
        }
    }
</style>
