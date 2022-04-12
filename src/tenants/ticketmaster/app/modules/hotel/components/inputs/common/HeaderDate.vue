<template>
    <div
        v-if="$vuetify.breakpoint.mdAndUp"
        class="gst-add-hotel-reservation-header-date u-width-100">
        <BaseDatePicker
            v-model="datesString"
            :weekday-format="formatCalendarDay"
            full-width
            flat
            range
            color="primary"
            :min="now | date('yyyy-MM-dd')"
            :show-current="datesString[0]"
            class="gst-add-hotel-reservation-header-date__picker"
            no-title />
        <div class="gst-add-hotel-reservation-header-date__footer d-flex flex-column">
            <div class="gst-add-hotel-reservation-header-date__buttons d-flex flex-row pb-3">
                <div class="flex-grow-1"></div>
                <BaseButton
                    text
                    color="tertiary"
                    class="px-0 text-capitalize"
                    width="auto"
                    @click="$emit('close')">
                    {{ $t('_common:buttons.close') }}
                </BaseButton>
                <BaseButton
                    text
                    color="primary"
                    class="px-0 text-capitalize mr-4"
                    width="auto"
                    :disabled="!startDate"
                    @click="save">
                    {{ $t('_common:buttons.confirm') }}
                </BaseButton>
            </div>
            <div class="selected-dates d-block">
                <span :class="{'no-selection': !startDate}">
                    {{ startDateSelection }}
                </span>
                -
                <span :class="{'no-selection': !endDate}">
                    {{ endDateSelection }}
                </span>
                {{ daysStay }}
            </div>
        </div>
    </div>
    <BaseBottomModal
        v-else
        v-model="showModal"
        overlay-opacity="0.8"
        content-class="gst-add-hotel-reservation-header-date">
        <HeaderVariant1
            class="flex-grow-0"
            :title="$t( '_common:terms.changeDate' )"
            @close="$emit('close')" />
        <div class="u-width-100">
            <BaseDatePicker
                v-model="datesString"
                full-width
                flat
                range
                :weekday-format="formatCalendarDay"
                color="primary"
                :min="now | date('yyyy-MM-dd')"
                :show-current="datesString[0]"
                class="gst-add-hotel-reservation-header-date__picker"
                no-title />
            <div class="gst-add-hotel-reservation-header-date__footer px-4 pt-3 pb-8">
                <p>
                    <span :class="{'no-selection': !startDate}">
                        {{ startDateSelection }}
                    </span>
                    -
                    <span :class="{'no-selection': !endDate}">
                        {{ endDateSelection }}
                    </span>
                    {{ daysStay }}
                </p>
                <div class="gst-add-hotel-reservation-header-date__buttons">
                    <BaseButton
                        color="primary"
                        :disabled="!startDate"
                        class="text-capitalize"
                        width="90%"
                        @click="save">
                        {{ $t('_common:buttons.confirm') }}
                    </BaseButton>
                </div>
            </div>
        </div>
    </BaseBottomModal>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import HeaderVariant1 from '@tenant/app/components/modals/HeaderVariant1';
    import BaseButton from '@shared/components/buttons/BaseButton';
    import BaseBottomModal from '@shared/components/modals/BaseBottomModal';
    import { format } from 'date-fns';
    import dateConstants from '@core/utils/constants/date';
    import { differenceInDays, addDays, parseDateString } from '@core/utils/dateUtils';
    import BaseDatePicker from '@shared/components/date/BaseDatePicker.vue';

    const STORE_NAME = 'addHotelReservationState';

    export default {
        name: 'AddHotelReservationHeaderDate',
        components: {
            BaseDatePicker,
            BaseBottomModal,
            BaseButton,
            HeaderVariant1
        },
        data( ) {
            return {
                showModal: false,
                startDate: null,
                endDate: null,
            };
        },
        computed: {
            ...mapState( {
                filters: state => state[STORE_NAME].filters
            } ),
            isDesktop( ) {
                return  this.$vuetify.breakpoint.mdAndUp;
            },
            now() {
                return new Date();
            },
            datesString: {
                get( ) {
                    const { startDate, endDate } = this;

                    return [
                        startDate ? this.$options.filters.date( startDate, dateConstants.FORMAT.API_DATE ) : '',
                        endDate ? this.$options.filters.date( endDate, dateConstants.FORMAT.API_DATE ) : ''
                    ].filter( item => item );
                },
                set( value ) {
                    const dates = [ ...new Set( value ) ]
                        .map( ( item ) => item ? parseDateString ( item ) : null  )
                        .sort( ( a, b )=> a.getTime( ) - b.getTime( ) );

                    this.startDate = dates[ 0 ];
                    this.endDate = dates[ 1 ];
                }
            },
            startDateSelection ( ) {
                const { startDate } = this;
                return !startDate ?
                    `${this.$t( '_common:terms.selectDate' )}` :
                    `${this.$options.filters.date( startDate, 'eee, MMM d, yyyy' )}`;
            },
            endDateSelection ( ) {
                const { endDate } = this;
                return !endDate ?
                    `${this.$t( '_common:terms.selectDate' )}` :
                    `${this.$options.filters.date( endDate, 'eee, MMM d, yyyy' )}`;
            },
            daysStay ( ) {
                const { startDate, endDate } = this;
                if ( startDate && endDate ) {
                    const diff = differenceInDays( endDate, startDate );
                    return ` (${this.$t( '_common:terms.nightStayWithCount', { count: diff } )})`;
                }
                return '';
            }
        },
        watch: {
            'showModal': function ( value ) {
                if ( !value && !this.isDesktop ) {
                    this.$emit( 'close' );
                }
            },
            'isDesktop': function ( value ) {
                this.showModal = !value;
            }
        },
        methods: {
            ...mapActions( {
                'updateFilters': `${STORE_NAME}/filters/update`
            } ),
            save( ) {
                const { startDate, endDate } = this;

                this.updateFilters( {
                    startDateTime: startDate,
                    endDateTime: endDate ? endDate : addDays ( startDate, 1 )
                } );
                this.$emit( 'close' );
            },
            formatCalendarDay ( date ) {
                return format( new Date( date ), 'EEEEEE' );
            }
        },
        mounted( ) {
            this.startDate = this.filters.startDateTime;
            this.endDate = this.filters.endDateTime;
            this.showModal = !this.isDesktop;
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-add-hotel-reservation-header-date {
        @include font-size( 's' );
        @include font-weight( 'regular' );

        background-color: theme-color( 'white' );

        .gst-add-hotel-reservation-header-date__picker {
            .v-date-picker-header {
                justify-content: space-evenly;

                .v-date-picker-header__value {
                    flex: unset;
                }
            }

            .gst-add-hotel-reservation-header-date {
                height: auto;
            }

            .v-date-picker-table {
                height: 195px;
            }

            .v-date-picker-table--date .v-btn {
                @include font-size( 's' );
                @include font-weight( 'large' );

                height: 20px;
                width: 26px;
                border-radius: 2px;
            }

            .v-date-picker-table--month td {
                @include font-size( 's' );
                @include font-weight( 'large' );

                height: 44px;
            }
        }

        .gst-add-hotel-reservation-header-date__footer {
            background-color: theme-color( 'quinary' );
            text-align: center;

            .selected-dates {
                margin: theme-spacing( 3 ) theme-spacing( 2 );
                font-size: font-size( 'm' );
            }

            .gst-add-hotel-reservation-header-date__buttons {
                background-color: theme-color( 'white' );

                .v-btn {
                    font-weight: font-weight( 'large' );
                }
            }
        }

        @include mobile-only {
            .gst-add-hotel-reservation-header-date__picker {
                .v-date-picker-header__value {
                    font-size: font-size( 'm' );
                }
            }

            .gst-add-hotel-reservation-header-date__footer {
                p {
                    font-size: font-size( 's' );

                    .no-selection {
                        color: theme-color( 'tertiary' );
                    }
                }

                .gst-add-hotel-reservation-header-date__buttons {
                    background-color: theme-color( 'quinary' );

                    .v-btn {
                        letter-spacing: normal;
                    }
                }
            }
        }
    }
</style>
