<template>
    <div class="gst-add-hotel-reservation-header">
        <div
            :class="{
                'justify-center': !allowUpdate
            }"
            class="d-flex flex-row px-4 py-3">
            <h6 class="gst-add-hotel-reservation-header__title">
                <slot name="title">
                    {{ $t( '_common:terms.addHotel') }}
                </slot>
            </h6>
            <div class="gst-add-hotel-reservation-header__period">
                ({{ datePeriod }})
            </div>
            <template v-if="allowUpdate">
                <div class="flex-grow-1"></div>
                <div
                    class="gst-add-hotel-reservation-header__date u-mouse-pointer d-flex flex-row"
                    :class="{ 'gst-add-hotel-reservation-header__date--open': showDateFilter }"
                    @click="showDateFilter = !showDateFilter">
                    {{ $t('_common:terms.changeDates') }}
                    <ChevronDownIcon />
                </div>
            </template>
        </div>
        <v-expand-transition v-if="allowUpdate">
            <HeaderDate
                v-if="showDateFilter"
                @close="showDateFilter = false" />
        </v-expand-transition>
    </div>
</template>

<script>
    import ChevronDownIcon from '@shared/assets/icons/chevron_down.svg';
    import HeaderDate from './HeaderDate.vue';

    export default {
        name: 'AddHotelReservationHeader',
        components: {
            HeaderDate,
            ChevronDownIcon
        },
        props: {
            startDateTime: {
                type: Date,
                required: true,
            },
            endDateTime: {
                type: Date,
                required: true,
            },
            allowUpdate: {
                type: Boolean,
                default: true
            },
            value: {
                type: Object,
                default: null
            }
        },
        data( ) {
            return {
                showDateFilter: false
            };
        },
        computed: {
            datePeriod( ) {
                if( this.value ) {
                    return this.$options.filters.reservationDatePeriod( this.value.startDateTime, this.value.endDateTime );
                }
                return this.$options.filters.reservationDatePeriod( this.startDateTime, this.endDateTime );
            }
        },
        watch: {
            'showDateFilter': function onShowDateFilterUpdate() {
                this.$emit( 'date-filter-opened', this.showDateFilter );
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-add-hotel-reservation-header {
        line-height: line-height( 'xxxxl' );
        background-color: theme-color( 'quinary' );
        overflow-y: scroll;

        .gst-add-hotel-reservation-header__title {
            padding-right: theme-spacing( 1 );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'large' );
        }

        .gst-add-hotel-reservation-header__period {
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'regular' );
        }

        .gst-add-hotel-reservation-header__date {
            color: theme-color( 'primary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );

            svg {
                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }

                transition: 0.2s;
            }
        }

        .gst-add-hotel-reservation-header__date--open {
            svg {
                transform: rotate( 180deg );
            }
        }

        @include mobile-only {
            > div {
                flex-wrap: wrap;
            }

            .gst-add-hotel-reservation-header__title {
                padding-right: theme-spacing( 2 );
                font-size: font-size( 's' );
            }

            .gst-add-hotel-reservation-header__period {
                font-size: font-size( 's' );
            }
        }
    }
</style>
