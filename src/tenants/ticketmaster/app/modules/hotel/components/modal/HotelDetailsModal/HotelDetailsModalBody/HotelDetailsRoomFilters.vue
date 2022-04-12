<template>
    <div
        class="gst-rooms-tabs-filters u-width-100">
        <div class="gst-rooms-tabs-filters__header ">
            <div class="d-flex u-width-100 justify-space-between">
                <div class="gst-rooms-tabs-filters__header__order_summery">
                    <BaseButton large
                        outlined
                        @click="toggleShowExtended">
                        {{ filters.startDateTime | date( 'eee, MMM d, yyyy' ) }}
                    </BaseButton>
                    <BaseButton large
                        outlined
                        @click="toggleShowExtended">
                        {{ filters.endDateTime | date( 'eee, MMM d, yyyy' ) }}
                    </BaseButton>
                    <BaseButton large
                        outlined
                        @click="toggleShowExtended">
                        {{ hotelReservationQuantity }}
                    </BaseButton>
                </div>
                <div v-if="showExtended && $vuetify.breakpoint.mdAndUp" class="gst-rooms-tabs-filters__header__buttons">
                    <BaseButton
                        text
                        color="primary"
                        class="px-0 text-capitalize mr-4"
                        width="auto"
                        @click="onCloseDo">
                        {{ $t('_common:buttons.close') }}
                    </BaseButton>
                    <BaseButton
                        color="primary"
                        class="px-0 text-capitalize mr-4"
                        width="auto"
                        :disabled="!startDate"
                        @click="save">
                        {{ $t('_common:buttons.apply') }}
                    </BaseButton>
                </div>
            </div>
        </div>
        <v-expand-transition>
            <div v-if="showExtended" class="gst-rooms-tabs-filters__extended d-flex">
                <div class="col-12 col-md-6">
                    <BaseDatePicker
                        v-model="datesString"
                        full-width
                        flat
                        range
                        color="primary"
                        :min="minDate"
                        :show-current="datesString[0]"
                        class="gst-rooms-tabs-filters__picker"
                        no-title />
                </div>
                <div class="col-12 col-md-3 d-flex flex-column justify-space-between">
                    <h5 class="gst-rooms-tabs-filters__extended__guests">
                        {{ $t( '_common:terms.guest_plural') }}
                    </h5>
                    <div class="d-flex gst-rooms-tabs-filters__extended__guests-filters pr-sm-0">
                        <p>{{ $t( '_common:terms.adult_plural' ) }}</p>
                        <div>
                            <NumericStep :min="1" :max="99" :value="adultsCount" :icons-attrs="iconsAttrs" @input="updateAdultsCount" />
                        </div>
                    </div>
                    <div class="d-flex gst-rooms-tabs-filters__extended__guests-filters pr-sm-0">
                        <p>
                            {{ $t( '_common:terms.children' ) }}
                            <span>{{ $t('childrenLabel') }}</span>
                        </p>
                        <div>
                            <NumericStep :min="0" :max="99" :value="childrenCount" :icons-attrs="iconsAttrs" @input="updateChildrenCount" />
                        </div>
                    </div>
                    <div class="d-flex gst-rooms-tabs-filters__extended__guests-filters pr-sm-0">
                        <p>{{ $t( '_common:terms.room_plural' ) }}</p>
                        <div>
                            <NumericStep :min="1" :max="adultsCount" :value="roomsCount" :icons-attrs="iconsAttrs" @input="updateRoomsCount" />
                        </div>
                    </div>
                </div>
                <div v-if="$vuetify.breakpoint.smAndDown" class="col-12">
                    <BaseButton
                        color="primary"
                        block
                        class="px-0 text-capitalize mr-4 mb-2"
                        width="auto"
                        :disabled="!startDate"
                        @click="save">
                        {{ $t('_common:buttons.apply') }}
                    </BaseButton>
                    <BaseButton
                        text
                        block
                        color="primary"
                        class="px-0 text-capitalize mr-4"
                        width="auto"
                        @click="onCloseDo">
                        {{ $t('_common:buttons.close') }}
                    </BaseButton>
                </div>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import NumericStep from '@shared/components/input/NumericStep';
    import dateConstants from '@core/utils/constants/date';
    import { addDays, parseDateString } from '@core/utils/dateUtils';
    import BaseDatePicker from '@core/shared/components/date/BaseDatePicker.vue';
    import GuestsModel from '@tenants/ticketmaster/app/models/GuestsModel';

    const STORE_NAME_GLOBAL = 'addHotelReservationState';
    const STORE_NAME_MODAL = `${STORE_NAME_GLOBAL}/modalFilters`;

    export default {
        name: 'HotelDetailsRoomFilters',
        components: {
            BaseDatePicker,
            BaseButton,
            NumericStep
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.modal._components._components.hotelDetailsModalBody._components.hotelDetailsRoomFilters'
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        data( ) {
            return {
                showExtended: false,
                startDate: null,
                endDate: null,
                adultsCount: null,
                childrenCount: null,
                roomsCount: null,
            };
        },
        computed: {
            ...mapState( {
                filters: state => state[STORE_NAME_GLOBAL].filters,
                modalFilters: state => state[STORE_NAME_GLOBAL].modalFilters
            } ),
            isDesktop( ) {
                return  this.$vuetify.breakpoint.mdAndUp;
            },
            minDate() {
                return this.$options.filters.date( new Date(), 'yyyy-MM-dd' );
            },
            iconsAttrs() { return {
                width: this.$vuetify.breakpoint.mdAndUp ? 16 : 21,
                height: this.$vuetify.breakpoint.mdAndUp ? 16 : 21,
            };},
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
            hotelReservationQuantity ( ) {
                const { adultsCount, childrenCount } = this.modalFilters.guests;
                const { roomsCount } = this.modalFilters;
                if( this.$vuetify.breakpoint.mdAndUp ) {
                    return `${this.$t( '_common:terms.roomWithCount', { count: roomsCount } )}, ${this.$t( '_common:terms.guestWithCount', { count: adultsCount + childrenCount } )}`.toLowerCase();
                }
                return `${this.$t( '_common:terms.guestWithCount', { count: adultsCount + childrenCount } )}`.toLowerCase();
            }
        },
        watch: {
            'filters.startDateTime': function ( newValue ) {
                this.startDate = newValue;
            },
            'filters.endDateTime': function ( newValue ) {
                this.endDate = newValue;
            },
            'adultsCount': function ( newValue ) {
                if( newValue < this.roomsCount ) {
                    this.roomsCount = newValue;
                }
            },
            'modalFilters': {
                handler: function ( newFilters ) {
                    this.setModalLocalFilters( newFilters );
                },
                deep: true
            }
        },
        methods: {
            ...mapActions( {
                'updateFilters': `${STORE_NAME_GLOBAL}/filters/update`,
                'loadOne': `${STORE_NAME_GLOBAL}/hotels/loadOne`,
                'updateFiltersModal': `${STORE_NAME_MODAL}/update`
            } ),
            init( ) {
                this.startDate = this.filters.startDateTime;
                this.endDate = this.filters.endDateTime;
                this.setModalLocalFilters( this.modalFilters );
            },
            async save( ) {
                const { startDate, endDate } = this;

                const newGlobalFilters = {
                    ...this.filters,
                    startDateTime: startDate,
                    endDateTime: endDate || addDays( startDate, 1 ),
                };
                const childAges = this.childrenCount ?  new Array( this.childrenCount ).fill( 10 ) : [];
                const guests = new GuestsModel( this.adultsCount, this.childrenCount, childAges );

                this.updateFilters( newGlobalFilters  );
                this.updateFiltersModal( {
                    guests: guests,
                    roomsCount: this.roomsCount
                } );

                this.showExtended = false;
                this.$emit( 'close' );
            },
            onCloseDo( ) {
                this.init( );
                this.toggleShowExtended( );
            },
            toggleShowExtended() {
                this.showExtended = !this.showExtended ;
            },
            updateAdultsCount( value ) {
                this.adultsCount = value;
            },
            updateChildrenCount( value ) {
                this.childrenCount = value;
            },
            updateRoomsCount( value ) {
                this.roomsCount = value ;
            },
            setModalLocalFilters( { guests, roomsCount } ) {
                this.adultsCount = guests.adultsCount;
                this.childrenCount = guests.childrenCount;
                this.roomsCount = roomsCount;
            },

        },
        mounted: async function () {
            this.init( );
        },
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-rooms-tabs-filters {
    @include font-size('s');
    @include font-weight('regular');

    background-color: theme-color( 'white' );

    .gst-rooms-tabs-filters__header {
        padding-left: theme-spacing( 2 );
        margin: theme-spacing( 2, 0 );

        .gst-rooms-tabs-filters__header__order_summery .v-btn {
            @include font-size('s');

            border: 1px solid theme-color-hex( 'primary' );
            margin: theme-spacing( 0, 1 );
            color: theme-color( 'primary' );
            text-transform: none;
            border-radius: 2px;
        }
    }

    .gst-rooms-tabs-filters__extended__guests-filters {
        @include font-size('s');

        padding-right: 120px;
        margin-bottom: theme-spacing( 4 );
        align-items: center;
        justify-content: space-between;

        > p {
            margin: 0;
            color: theme-color( 'primary' );
            min-width: 120px;

            span {
                @include font-size('xxs');

                display: block;
                color: theme-color( 'tertiary' );
            }
        }

        .gst-numeric-step-input__plus-btn,
        .gst-numeric-step-input__minus-btn {
            height: 24px !important;
            width: 24px !important;
            min-width: unset !important;
        }

        .gst-numeric-step-input .gst-numeric-step-input__plus-btn .gst-svg-icon,
        .gst-numeric-step-input .gst-numeric-step-input__minus-btn svg .gst-svg-icon {
            fill: theme-color( 'white' );
        }

        .gst-numeric-step-input {
            .v-btn {
                height: 12px !important;
                width: 12px !important;
                padding: theme-spacing( 3 );
                background-color: theme-color( 'primary' );
                border-radius: 24px;

                &.gst-numeric-step-input__minus-btn--disabled,
                &.gst-numeric-step-input__plus-btn--disabled {
                    background: rgba( theme-color-hex( 'primary' ), 0.3 );
                }

                ::v-deep .v-btn-content {
                    svg {
                        height: 16px !important;
                        width: 16px !important;
                    }
                }
            }

            .gst-numeric-step-input__content {
                @include font-weight( 'regular' );

                border: 0;
                background: none;
                font-size: 22px;
                min-height: 20px;
                min-width: 60px;
                text-align: center;
            }
        }
    }

    .gst-rooms-tabs-filters__picker {
        .gst-rooms-tabs-filters {
            height: auto;
        }

        .v-date-picker-table {
            height: 195px;
        }

        .v-date-picker-table--date .v-btn {
            @include font-size('s');
            @include font-weight('large');

            height: 20px;
            width: 26px;
            border-radius: 2px;
        }

        .v-date-picker-table--month td {
            @include font-size('s');
            @include font-weight('large');

            height: 44px;
        }
    }

    @include mobile-only {
        .gst-rooms-tabs-filters__header {
            padding: theme-spacing( 0, 3 );

            .gst-rooms-tabs-filters__header__order_summery {
                display: flex;
                width: 100%;

                .v-btn {
                    width: auto;
                    padding: 6px;
                    letter-spacing: 0.5px;
                    flex-grow: 1;
                }
            }

            .gst-rooms-tabs-filters__header__buttons {
                width: 100%;
                letter-spacing: 0.5px;
            }
        }

        .gst-rooms-tabs-filters__extended__guests-filters {
            width: 100%;
            padding-right: 0;

            .gst-numeric-step-input__plus-btn,
            .gst-numeric-step-input__minus-btn {
                height: 32px !important;
                width: 32px !important;
                min-width: unset !important;
            }

            .gst-numeric-step-input {
                .v-btn {
                    height: 16px !important;
                    width: 16px !important;
                    padding: 16px;
                    background-color: theme-color( 'primary' );
                    border-radius: 32px;

                    &.gst-numeric-step-input__minus-btn--disabled,
                    .gst-numeric-step-input__plus-btn--disabled {
                        background: rgba( theme-color-hex( 'primary' ), 0.3 );
                    }

                    ::v-deep .v-btn-content {
                        svg {
                            width: 10px !important;
                        }
                    }
                }

                .gst-numeric-step-input__content {
                    @include font-weight('regular');

                    border: 0;
                    background: none;
                    font-size: 22px;
                    min-height: 20px;
                    min-width: 60px;
                    text-align: center;
                }
            }
        }

        .gst-rooms-tabs-filters__extended {
            flex-direction: column !important;

            .gst-rooms-tabs-filters__extended__guests {
                width: 100%;
            }
        }
    }
}

</style>
