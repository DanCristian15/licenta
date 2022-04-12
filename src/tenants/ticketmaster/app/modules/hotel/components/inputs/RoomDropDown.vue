<template>
    <div>
        <v-menu
            v-model="menuOpened"
            offset-y
            content-class="gst-room-dropdown__menu px-5"
            :close-on-content-click="false"
            :close-on-click="$vuetify.breakpoint.mdAndUp"
            :min-width="250"
            :disabled="disabled">
            <template v-slot:activator="{ }">
                <div class="gst-room-dropdown d-flex flex-row align-center" @click="onClickDo">
                    <span class="gst-room-dropdown__target u-mouse-pointer d-inline-block">
                        {{ value | roomName }}
                    </span>
                    <IconDropDownArrow
                        :class="{
                            'u-rotate-180': menuOpened
                        }"
                        class="gst-dropdown-icon-svg u-mouse-pointer gst-icon-svg" />
                </div>
            </template>
            <div v-if="$vuetify.breakpoint.mdAndUp" class="gst-room-dropdown__slider d-flex flex-row align-center">
                <div
                    v-if="items.length > 3"
                    v-ripple="!isSwiperReachStart"
                    :class="{
                        'gst-room-dropdown__slider-icon--disabled': isSwiperReachStart,
                        'u-mouse-pointer': !isSwiperReachStart
                    }"
                    class="gst-room-dropdown__slider-icon gst-room-dropdown__slider-icon-left d-flex align-center"
                    @click="goToPreviousSlides">
                    <IconChevronLeft />
                </div>
                <div class="gst-room-dropdown__slider-inner" @scroll="setSwiperNavigationDebounced" @resize="setSwiperNavigationDebounced">
                    <div
                        :style="sliderStyle"
                        class="gst-room-dropdown__slider-content d-flex flex-row">
                        <RoomCardVariant1
                            v-for="item in items"
                            :key="item.id"
                            v-ripple
                            :item="item"
                            :bundle-products="bundleProducts"
                            :class="{
                                'gst-room-dropdown__slider-card--selected': item === value
                            }"
                            class="gst-room-dropdown__slider-card flex-grow-0 flex-shrink-0"
                            @click="select( item )" />
                    </div>
                </div>
                <div
                    v-if="items.length > 3"
                    v-ripple="!isSwiperReachEnd"
                    :class="{
                        'gst-room-dropdown__slider-icon--disabled': isSwiperReachEnd,
                        'u-mouse-pointer': !isSwiperReachEnd
                    }"
                    class="gst-room-dropdown__slider-icon gst-room-dropdown__slider-icon-right  d-flex align-center"
                    @click="goToNextSlides">
                    <IconChevronRight />
                </div>
            </div>
        </v-menu>
        <div
            v-if="!$vuetify.breakpoint.mdAndUp">
            <BaseBottomModal v-model="menuOpened" :retain-focus="false" overlay-opacity="0.8" content-class="gst-room-dropdown__modal flex">
                <div class="flex flex-column">
                    <HeaderVariant1 :title="$t( '_common:terms.chooseRoom' )" class="flex-grow-0" @close="menuOpened = false" />
                    <div class="gst-room-dropdown__modal-list flex-grow-1 u-overflow-auto-y">
                        <RoomCardVariant1
                            v-for="item in items"
                            :key="item.id"
                            v-ripple
                            :item="item"
                            :bundle-products="bundleProducts"
                            :class="{
                                'gst-room-dropdown__modal-card--selected': item === value
                            }"
                            class="gst-room-dropdown__modal-card mb-2"
                            @click="select( item )" />
                    </div>
                </div>
            </BaseBottomModal>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import HeaderVariant1 from '@tenant/app/components/modals/HeaderVariant1';
    import BaseBottomModal from '@core/shared/components/modals/BaseBottomModal';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import IconChevronRight from '@core/shared/components/icons/IconChevronRight.vue';
    import IconChevronLeft from '@core/shared/components/icons/IconChevronLeft.vue';
    import HotelRoom from '@/tenants/ticketmaster/app/models/HotelReservationRoomModel';
    import RoomCardVariant1 from '../cards/RoomCardVariant1';


    export default {
        name: 'RoomDropDown',
        components: {
            IconDropDownArrow,
            IconChevronRight,
            IconChevronLeft,
            RoomCardVariant1,
            HeaderVariant1,
            BaseBottomModal
        },
        props: {
            value: {
                type: Object,
                default: function ( ) {
                    return new HotelRoom( );
                }
            },
            items: {
                type: Array,
                required: true
            },
            showIcon: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            bundleProducts: {
                type: Object,
                required: true
            },
        },
        data( ) {
            return {
                menuOpened: false,
                isSwiperReachStart: true,
                isSwiperReachEnd: false,
                startX: 0
            };
        },
        computed: {
            cardWidth( ) {
                return 260;
            },
            widthScroll( ) {
                return ( this.cardWidth + 8 ) * 3;
            },
            totalWidthScroll( ) {
                return ( this.cardWidth + 8 ) * ( this.items.length - 3 );
            },
            sliderStyle( ) {
                return {
                    transform: `translateX(-${this.startX}px)`,
                };
            }
        },
        methods: {
            select( value ) {
                this.$emit( 'input', value );
                this.menuOpened = false;
            },
            onClickDo( ) {
                this.$emit( 'click' );
                this.menuOpened = true;
            },
            goToPreviousSlides( ) {
                this.startX = Math.max( this.startX - this.widthScroll, 0 );
            },
            goToNextSlides( ) {
                this.startX = Math.min( this.startX + this.widthScroll, this.totalWidthScroll );
            },

            setSwiperNavigationDebounced: debounce( function ( ) {
                const swiperEl = this.$refs.swiper;

                if ( swiperEl ) {
                    this.isSwiperReachStart = !swiperEl.scrollLeft;
                    this.isSwiperReachEnd = !( swiperEl.scrollWidth - swiperEl.scrollLeft - swiperEl.offsetWidth );
                }
            }, 50 )
        },
        unmounted( ) {
            this.unwatchMenuOpened( );
        }
    };
</script>


<style lang="scss">
    @import "@scssVariables";

    .gst-room-dropdown {
        .gst-room-dropdown__target {
            @include font-size('s');
            @include font-weight('regular');

            color: theme-color( 'primary' );
        }

        .gst-dropdown-icon-svg {
            transition: 0.2s;

            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }

    .gst-room-dropdown__menu {
        background-color: transparent;
        box-shadow: none !important;
        contain: unset !important;
        overflow-x: unset;
        overflow-y: unset;

        .gst-room-dropdown__slider {
            position: relative;
            height: 300px;
            background-color: theme-color( 'white' );
            box-shadow: 0 2px 6px rgba( theme-color( 'black' ), 0.25 );
            max-width: 811px;
            border-radius: 4px;

            .gst-room-dropdown__slider-icon {
                position: absolute;
                height: 34px;
                width: 17px;
                background-color: theme-color( 'white' );
                box-shadow: 0 2px 6px rgba( theme-color( 'black' ), 0.25 );

                svg {
                    .gst-svg-icon {
                        fill: theme-color( 'tertiary' );
                    }
                }
            }

            .gst-room-dropdown__slider-icon--disabled {
                svg {
                    .gst-svg-icon {
                        fill: theme-color( 'septenary' );
                    }
                }
            }

            .gst-room-dropdown__slider-icon-left {
                left: -17px;
                border-bottom-left-radius: 200px;
                border-top-left-radius: 200px;
            }

            .gst-room-dropdown__slider-icon-right {
                right: -17px;
                border-bottom-right-radius: 200px;
                border-top-right-radius: 200px;
            }

            .gst-room-dropdown__slider-inner {
                width: 100%;
                background-color: theme-color( 'white' );
                overflow: hidden;
                z-index: 1;
                border-radius: 4px;
            }

            .gst-room-dropdown__slider-content {
                padding: 8px;
                transition: 0.3s cubic-bezier( 0.25, 0.8, 0.5, 1 );

                div:last-child {
                    margin-right: 0 !important;
                }
            }

            .gst-room-dropdown__slider-card {
                width: 260px;
                padding-top: 18px;
                padding-bottom: 8px;
                margin-right: 8px;
                min-height: 284px;
            }

            .gst-room-dropdown__slider-card--selected {
                width: 259px;
                border: 2px solid theme-color( 'primary' );
                min-height: 284px;
            }
        }
    }

    .gst-room-dropdown__modal {
        background-color: theme-color( 'white' );

        .gst-room-dropdown__modal-list {
            padding: 8px;
            max-height: 80vh;

            .gst-room-dropdown__modal-card {
                padding-top: 18px;
                padding-bottom: 8px;
                min-height: 212px;

                .gst-room-card-variant-1__ameneties {
                    height: 80px;
                }
            }

            .gst-room-dropdown__modal-card--selected {
                border: 2px solid theme-color( 'primary' );
                min-height: 210px;
            }
        }
    }
</style>
