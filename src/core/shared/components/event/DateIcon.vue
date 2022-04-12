<template>
    <CardIconContainer
        :outlined="outlined"
        class="gst-date-card"
        flat>
        <p class="gst-date-card__month">
            {{ dateMonth }}
        </p>
        <h5 class="gst-date-card__day-nr">
            {{ dateDay }}
        </h5>
        <template v-if="startDate">
            <p v-if="isDatesFromAnotherYear" class="gst-date-card__year">
                {{ dateYear }}
            </p>
            <p v-else class="gst-date-card__day">
                {{ dateDayOfWeek }}
            </p>
        </template>
    </CardIconContainer>
</template>
<script>
    import {
        isSameDay as dateUtilsIsSameDay,
        isSameMonth as dateUtilsIsSameMonth,
        isSameYear as dateUtilsIsSameYear,
        isThisYear as dateUtilsIsThisYear
    } from '@core/utils/dateUtils';
    import CardIconContainer from '@core/shared/components/misc/CardIconContainer.vue';

    export default {
        name: 'DateIcon',
        components: {
            CardIconContainer
        },
        props: {
            startDate: {
                type: [ Date, Object ],
                default: null
            },
            endDate: {
                type: [ Date, Object ],
                default: null
            },
            outlined: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isSameDay() {
                const { startDate, endDate } = this;
                return dateUtilsIsSameDay( startDate, endDate );
            },
            isSameMonth() {
                const { startDate, endDate } = this;
                return dateUtilsIsSameMonth( startDate, endDate );
            },
            isSameYear() {
                const { startDate, endDate } = this;
                return dateUtilsIsSameYear( startDate, endDate );
            },
            dateMonth() {
                const { startDate, endDate } = this;

                if ( startDate ) {
                    const startDateMonth = this.$options.filters.dateMonth( startDate );

                    if ( endDate ) {
                        const endDateMonth = this.$options.filters.dateMonth( endDate );
                    
                        return this.isSameMonth ? startDateMonth : `${startDateMonth}-${endDateMonth}`;
                    }

                    return startDateMonth;
                }

                return '-';
            },
            dateDay() {
                const { startDate, endDate } = this;

                if ( startDate ) {
                    const startDateDay = this.$options.filters.dateDay( startDate );

                    if ( endDate ) {
                        const endDateDay = this.$options.filters.dateDay( endDate );

                        return this.isSameDay ? startDateDay : `${startDateDay}-${endDateDay}`;
                    }

                    return startDateDay;
                }

                return this.$t( '_common:terms.toBeDetermined_abv' );
            },
            dateYear() {
                const { startDate, endDate } = this;
                const startDateYear = startDate.getFullYear( );
                    
                if ( endDate ) {
                    const endDateYear = endDate.getFullYear( ).toString( ).substr( 2, 4 );
                    
                    return this.isSameYear ? startDateYear : `${startDateYear}-${endDateYear}` ;
                }

                return startDateYear;
            },
            dateDayOfWeek() {
                const { startDate, endDate } = this;

                const startDateDayOfWeek = this.$options.filters.dateDayOfWeek( startDate );

                if ( endDate ) {
                    const endDateDayOfWeek = this.$options.filters.dateDayOfWeek( endDate );

                    return this.isSameDay ? startDateDayOfWeek : `${startDateDayOfWeek}-${endDateDayOfWeek}`;
                }

                return startDateDayOfWeek;
            },
            isDatesFromAnotherYear( ) {
                const { startDate, endDate } = this;

                if ( startDate ) {
                    const isStartDateThisYear = dateUtilsIsThisYear( startDate );
                    const isEndDateThisYear = endDate ? dateUtilsIsThisYear( endDate ) : dateUtilsIsThisYear( new Date( ) );

                    return !isStartDateThisYear || !isEndDateThisYear ? true : false;
                }

                return false;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-date-card {
    min-height: 55px;

    > p {
        margin-bottom: 0;
    }

    .gst-date-card__month {
        line-height: 11px;
        padding: 3px 0;
        background: theme-color( 'calendar' );
        color: theme-color( 'white' );
        font-size: font-size( 'xxxxxs' );
        font-weight: font-weight( 'black' );
        letter-spacing: 0.9px;
        text-transform: uppercase;
    }

    .gst-date-card__day-nr {
        line-height: 18px;
        padding: 3px 0 0;
        font-size: font-size( 'l' );
        font-weight: font-weight( 'black' );
    }

    .gst-date-card__day,
    .gst-date-card__year {
        color: theme-color( 'tertiary' );
        font-size: font-size( 'xxxxs' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.3px;
    }
}
</style>
