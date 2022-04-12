<template>
    <v-menu
        ref="menu"
        v-model="isMenuOpen"
        offset-y
        :position-x="menuTargetPositionX"
        :position-y="menuTargetPositionY"
        :close-on-content-click="false"
        :disabled="disabled"
        bottom
        allow-overflow
        content-class="gst-date-dropdown__picker">
        <template v-slot:activator="{ on }">
            <div class="gst-date-dropdown d-inline-block" v-on="on" @click="onClickDo">
                <span
                    ref="menuTarget"
                    class="u-mouse-pointer gst-date-dropdown__target d-inline-block"
                    :class="{
                        'tertiary--text': !isMenuOpen,
                        'primary--text': isMenuOpen
                    }"
                    :data-test-id="$attrs['data-test-id']">
                    {{ fieldValue || $t('placeholder') }}
                </span>
                <i
                    class="u-mouse-pointer gst-icon-svg"
                    :class="{
                        'gst-icon-svg--active u-rotate-180': isMenuOpen
                    }">
                    <IconDropDownArrow class="gst-dropdown-icon-svg" />
                </i>
            </div>
        </template>
        <DatePicker
            v-model="date"
            :modal="false"
            :loading="loading"
            :event-dates="eventDates"
            :is-confirmed="isConfirmed"
            @cancel="onCancel"
            @confirm="onConfirm" />
    </v-menu>
</template>

<script>
    import { endOfWeek, isSunday } from 'date-fns';
    import throttle from 'lodash/throttle';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import DatePicker from '@shared/components/date/DatePicker.vue';

    export default {
        name: 'DateDropDownField',
        components: {
            DatePicker,
            IconDropDownArrow
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.date.datePicker'
        },
        props: {
            value: {
                type: Object,
                default: ( ) => { return { startDate: null, endDate: null }; }
            },
            inputSearchAttrs: {
                type: Object,
                default: () => {
                    return {
                        'single-line': true,
                        solo: true,
                        'hide-details': true,
                        flat: true
                    };
                }
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            eventDates: {
                type: Array,
                default: () => []
            }
        },
        data( ) {
            return {
                date: {
                    startDate: null,
                    endDate: null
                },
                isMenuOpen: false,
                isConfirmed: false,
                menuTargetPositionX: 0,
                menuTargetPositionY: 0
            };
        },
        computed: {
            fieldValue() {
                const saturday = this.$options.filters.date( endOfWeek( new Date(), { weekStartsOn: 0 } ) ),
                      sunday = this.$options.filters.date( endOfWeek( new Date(), { weekStartsOn: 1 } ) ) ;
                let value = this.$options.filters.period( this.date ),
                    isWeekend = false;

                if ( !isSunday ( new Date() ) ) {
                    isWeekend = this.$options.filters.date( this.date.startDate ) === saturday && this.$options.filters.date( this.date.endDate ) == sunday;
                } else {
                    isWeekend = this.$options.filters.date(  this.date.startDate ) === sunday && this.date.endDate === null;
                }

                return isWeekend ? this.$t( 'labels.weekend' ): value;
            },
            modalProps( ) {
                return {
                    value: this.date,
                    loading: this.loading,
                    eventDates: this.eventDates,
                    isConfirmed: this.isConfirmed,
                    onConfirmDo: ( dates ) => {
                        this.onConfirm( { startDate: dates.startDate, endDate: dates.endDate } );
                    }
                };
            }
        },
        watch: {
            'value': {
                handler: function ( ) {
                    this.setDatesFromPropValue();
                },
                deep: true
            },
            'modalProps': {
                handler: function ( newValue ) {
                    this.__hackDynamicModalProp = this.__hackDynamicModalProp || { };

                    Object.assign( this.__hackDynamicModalProp, newValue );
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            onClickDo( ) {
                this.$emit( 'click' );
                if ( this.$vuetify.breakpoint.mdAndUp ) {
                    this.toggleMenu( );
                } else {
                    if ( !this.disabled ) {
                        this.$modal.showBottom(
                            DatePicker,
                            this.__hackDynamicModalProp,
                            {
                                'retain-focus': false,
                                scrollable: true,
                                fullscreen: false,
                                'hide-overlay': false,
                                transition: 'dialog-bottom-transition'
                            }
                        );
                    }
                }
            },
            toggleMenu( ) {
                this.isMenuOpen ? this.closeMenu( ) : this.openMenu( );
            },
            closeMenu( ) {
                this.isMenuOpen = false;
            },
            openMenu( ) {
                const menuTargetPosition = this.$refs.menuTarget.getBoundingClientRect( );

                this.menuTargetPositionX = menuTargetPosition.x;
                this.menuTargetPositionY = menuTargetPosition.y + menuTargetPosition.height;
                this.isMenuOpen = !this.disabled ? true : false;
            },
            onConfirm( value ) {
                this.closeMenu();
                this.$emit( 'input', value );
                this.isConfirmed = true;
            },
            onCancel() {
                this.closeMenu();
            },
            setDatesFromPropValue( ) {
                this.date = {
                    startDate: this.value.startDate ?
                        this.value.startDate :
                        null,
                    endDate: this.value.endDate ?
                        this.value.endDate :
                        null
                };
            },
        },
        created( ) {
            this.setDatesFromPropValue();
        },
        mounted( ) {
            this.throttleMenuClose = throttle( ( ) => {
                this.closeMenu();
            }, 20 );

            window.addEventListener( 'resize', this.throttleMenuClose );
        },
        destroyed( ) {
            window.removeEventListener( 'resize', this.throttleMenuClose );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-date-dropdown__target {
        display: inline-block;
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        text-decoration: underline;
    }

    .gst-date-dropdown__picker {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
        max-width: 300px;
    }

    .gst-date-dropdown__picker_list {
        padding-top: 0;
        padding-bottom: 0;
        min-width: 280px;

        .v-list-item__title {
            font-size: $base-font-size !important;
        }

        .v-list-item__icon {
            margin-right: 16px;
        }
    }

    .gst-btn--cancel.v-btn::before {
        background-color: transparent;
    }

    .gst-date-dropdown {
        .gst-icon-svg {
            .gst-dropdown-icon-svg .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }

        .gst-icon-svg--active {
            .gst-dropdown-icon-svg .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }
</style>
