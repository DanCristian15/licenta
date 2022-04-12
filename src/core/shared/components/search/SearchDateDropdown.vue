<template>
    <v-menu
        ref="menu"
        v-model="isMenuOpen"
        offset-y
        :position-x="menuTargetPositionX"
        :position-y="menuTargetPositionY"
        :close-on-content-click="false"
        bottom
        allow-overflow
        content-class="gst-search-date__picker">
        <template v-slot:activator="{ on }">
            <v-text-field
                ref="inputSearch"
                :value="fieldValue"
                :placeholder="$t('placeholder')"
                class="mx-1 pt-0 mr-3 gst-search-input gst-search-date__input"
                v-bind="inputSearchAttrs"
                readonly
                data-hj-allow
                @click="toggleMenu"
                @focus="onFocusInputSearch"
                @blur="onBlurInputSearch"
                @keydown.tab="onTabKeyDo">
                <template slot="prepend-inner" class="text-primary">
                    <IconDate
                        class="gst-search-icon-svg"
                        :class="{
                            'gst-search-icon-svg-focused': isFocused
                        }"
                        @click="toggleMenu" />
                </template>
            </v-text-field>
            <v-btn class="d-none" v-on="on" />
        </template>
        <DatePicker
            v-model="date"
            :modal="false"
            :is-confirmed="isConfirmed"
            @cancel="onCancel"
            @confirm="onConfirm" />
    </v-menu>
</template>

<script>
    import { endOfWeek, isSunday } from 'date-fns';
    import throttle from 'lodash/throttle';
    import IconDate from '@core/shared/assets/icons/date.svg';
    import DatePicker from '@shared/components/date/DatePicker.vue';

    export default {
        name: 'SearchDateDropdown',
        components: {
            DatePicker,
            IconDate
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
            }
        },
        data( ) {
            return {
                date: {
                    startDate: null,
                    endDate: null
                },
                isMenuOpen: false,
                isFocused: false,
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
        },
        watch: {
            'value': function ( ) {
                this.setDatesFromPropValue();
            }
        },
        methods: {
            toggleMenu( ) {
                this.isMenuOpen ? this.closeMenu( ) : this.openMenu( );
            },
            closeMenu( ) {
                this.isMenuOpen = false;
            },
            openMenu( ) {
                const menuTargetPosition = this.$refs.inputSearch.$el.getBoundingClientRect( );

                this.menuTargetPositionX = menuTargetPosition.x;
                this.menuTargetPositionY = menuTargetPosition.y + menuTargetPosition.height;
                this.isMenuOpen = true;
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
            onBlurInputSearch( ) {
                this.isFocused = false;
            },
            onFocusInputSearch( ) {
                this.isFocused = true;
            },
            onTabKeyDo() {
                this.$emit( 'tab-keydown' );
            }
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

    .gst-search-date__input {
        font-size: font-size( 's' );
    }

    .gst-search-date__picker {
        margin-top: 8px;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
        max-width: 300px;
    }

    .gst-search-date__picker__list {
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

    .gst-search-date-menu__item-icon {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }
</style>
