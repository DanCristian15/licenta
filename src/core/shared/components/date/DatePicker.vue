<template>
    <v-list class="gst-date-picker__list pt-2">
        <DataLoadingOverlay
            :show="loading"
            :color="'white'"
            :opacity="'0.8'">
            <v-list-item key="allDates" link class="py-2 px-4">
                <v-list-item-icon class="my-0 mr-3">
                    <IconDate class="gst-search-date-menu__item-icon" />
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium" @click="selectAllDates">
                    {{ $t("labels.allDates") }}
                </v-list-item-title>
            </v-list-item>
            <v-list-item key="thisWeekend" link class="py-2 px-4">
                <v-list-item-icon class="my-0 mr-3">
                    <IconDate class="gst-search-date-menu__item-icon" />
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium" @click="selectThisWeekend">
                    {{ $t('labels.weekend') }}
                </v-list-item-title>
            </v-list-item>
            <v-divider class="mx-4 my-2" />
            <SectionTitleSmall class="px-4">
                {{ $t('headers.datePicker' ) }}
            </SectionTitleSmall>
            <v-flex class="d-flex px-4">
                <v-col cols="5" class="px-0 flex-column d-flex">
                    <input
                        v-model="startDateValue"
                        class="gst-date-input gst-date-picker__input-date tertiary--text d-inline-block"
                        :placeholder="$t('placeholderStartDate')"
                        readonly
                        data-hj-allow />
                </v-col>
                <v-col cols="1" class="px-0 flex-column d-flex">
                    <span class="tertiary--text">-</span>
                </v-col>
                <v-col cols="5" class="px-0 d-flex flex-column">
                    <input
                        v-model="endDateValue"
                        class="gst-date-input gst-date-picker__input-date tertiary--text"
                        :placeholder="$t('placeholderEndDate')"
                        readonly
                        data-hj-allow />
                </v-col>
            </v-flex>
            <v-divider class="mx-4 my-2" />
            <v-date-picker
                v-model="dates"
                full-width
                flat
                range
                class="gst-date-picker pa-0"
                prev-icon="$vuetify.icons.chevronLeft"
                next-icon="$vuetify.icons.chevronRight"
                :locale="language"
                :min="now | date('yyyy-MM-dd')"
                :events="eventDates"
                event-color="primary"
                no-title />
            <v-flex class="d-flex flex-row pt-0 pa-4">
                <v-btn
                    text
                    small
                    :disabled="!resetButtonEnabled"
                    class="text-capitalize gst-btn--reset px-0"
                    color="primary"
                    @click="onReset">
                    {{ $t('labels.reset') }}
                </v-btn>
                <v-btn
                    text
                    small
                    class="text-capitalize gst-btn--cancel px-0 ml-auto mr-8"
                    color="primary"
                    @click="onCancel">
                    {{ $t('labels.cancel') }}
                </v-btn>
                <v-btn
                    text
                    small
                    :disabled="!confirmButtonEnabled"
                    class="text-capitalize gst-btn--confirm px-0"
                    color="primary"
                    @click="onConfirm">
                    {{ $t('labels.confirm') }}
                </v-btn>
            </v-flex>
        </DataLoadingOverlay>
    </v-list>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    import { endOfWeek, isSunday } from 'date-fns';
    import dateConstants from '@core/utils/constants/date';
    import { parseString as dateUtilsParseString } from '@core/utils/dateUtils';
    import IconDate from '@core/shared/assets/icons/date.svg';
    import SectionTitleSmall from '@core/shared/components/misc/SectionTitleSmall.vue';
    import DataLoadingOverlay from '@core/shared/components/loading/DataLoadingOverlay.vue';

    export default {
        name: 'DatePicker',
        components: {
            IconDate,
            SectionTitleSmall,
            DataLoadingOverlay
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.date.datePicker'
        },
        props: {
            value: {
                type: Object,
                default: ( ) => ( { startDate: null, endDate: null } )
            },
            modal: {
                type: Boolean,
                default: true
            },
            onConfirmDo: {
                type: Function,
                default: () => {}
            },
            loading: {
                type: Boolean,
                default: false
            },
            eventDates: {
                type: Array,
                default: () => []
            },
            isConfirmed: {
                type: Boolean,
                default: false
            }
        },
        data( ) {
            return {
                dates: [],
                sortedDates: [],
                lastAppliedDates: []
            };
        },
        computed: {
            ...mapState( {
                language: state => state.appState.language
            } ),
            confirmButtonEnabled() {
                return this.dates.length || this.lastAppliedDates.length;
            },
            resetButtonEnabled() {
                return this.isConfirmed && this.dates.length || this.lastAppliedDates.length && this.dates.length;
            },
            startDateValue() {
                return this.sortedDates[0] ?
                    this.$options.filters.date( this.sortedDates[0], dateConstants.FORMAT.UI_DATE ) :
                    '';
            },
            endDateValue() {
                return this.sortedDates[1] ?
                    this.$options.filters.date( this.sortedDates[1], dateConstants.FORMAT.UI_DATE ) :
                    '';
            },
            date() {
                return {
                    startDate: this.sortedDates[0] ? dateUtilsParseString( this.sortedDates[ 0 ] ): null,
                    endDate: this.sortedDates[1] ? dateUtilsParseString( this.sortedDates[ 1 ] ): null
                };
            },
            now() {
                return new Date();
            }
        },
        watch: {
            'value': function ( ) {
                this.setDatesFromPropValue();
            },
            dates: function ( newValue ) {
                this.sortedDates = newValue.length > 0 ?
                    this.sortDates( newValue ) :
                    [];
            }
        },
        methods: {
            ...mapActions( {
                updateSearch: 'searchState/update'
            } ),
            sortDates( dates ) {
                return dates.slice().sort();
            },
            onConfirm( ) {
                if ( !this.modal ) {
                    this.$emit( 'confirm', this.date );
                }
                else {
                    this.onConfirmDo( this.date );
                    this.$emit( 'close' );
                }
                this.lastAppliedDates = [ ...this.dates ];
            },
            onCancel( ) {
                this.setDatesFromPropValue();
                this.$emit( this.modal ? 'close' : 'cancel' );
            },
            onReset( ) {
                this.lastAppliedDates = [ ...this.dates ];
                this.dates = [];
            },
            setDatesFromPropValue( ) {
                const newValue = this.value;
                this.dates = [
                    newValue.startDate ? this.$options.filters.date( newValue.startDate, dateConstants.FORMAT.API_DATE ) : null,
                    newValue.endDate ? this.$options.filters.date( newValue.endDate, dateConstants.FORMAT.API_DATE ) : null
                ].filter( item => item );
                this.lastAppliedDates = [ ...this.dates ];
            },
            selectThisWeekend() {
                this.dates =  [
                    !isSunday( new Date() ) ? this.$options.filters.date( endOfWeek( new Date(), { weekStartsOn: 0 } ), dateConstants.FORMAT.API_DATE ) : null,
                    this.$options.filters.date( endOfWeek( new Date(), { weekStartsOn: 1 } ), dateConstants.FORMAT.API_DATE )
                ].filter( item => item );
                this.debounceOnConfirm();
            },
            selectAllDates() {
                this.dates = [];
                this.debounceOnConfirm();
            },
            debounceOnConfirm() {
                setTimeout( () => {
                    this.onConfirm();
                }, 100 );
            }
        },
        created( ) {
            this.setDatesFromPropValue();
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-date-picker.v-picker {
        border: none;
        box-shadow: none;

        .v-date-picker-header {
            padding: 8px 2px;
        }

        .v-date-picker-header__value {
            font-size: font-size( 'l' );
        }

        .v-date-picker-table {
            height: auto;

            .v-btn {
                position: relative;

                .v-date-picker-table__events {
                    display: flex;
                    top: 0;
                    justify-content: flex-start;

                    > div {
                        position: relative;
                        margin: 0;
                    }

                    > div::before {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        height: 100%;
                        width: 100%;
                        border: 1px solid theme-color( 'white' );
                        border-radius: border-radius( 'circle' ) !important;
                        content: "";
                        box-sizing: content-box;
                        transform: translate( -50%, -50% );
                    }
                }
            }
        }
    }

    .gst-date-picker {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
        max-width: 400px;

        @include mobile-only() {
            max-width: 100%;
        }
    }

    .gst-date-picker__list {
        .v-list-item {
            min-height: auto;
        }

        .v-list-item__title {
            font-size: font-size( 'l' );
        }

        .v-list-item__icon {
            margin-right: 16px;
        }
    }

    .gst-date-picker__input-date {
        font-size: font-size( 'l' );
    }

    .gst-date-picker-icon {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-btn--cancel.v-btn::before,
    .gst-btn--confirm.v-btn::before,
    .gst-btn--reset.v-btn::before {
        background-color: transparent;
    }

    .gst-search-date-menu__item-icon {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }
</style>
<style lang="scss">

</style>
