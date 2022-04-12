<template>
    <div class="event-ticket-filter d-flex flex-column">
        <div class="d-flex flex-row align-stretch pa-4 ">
            <div class="flex-grow-1 d-flex align-stretch u-height-100">
                <BaseFormSelect
                    v-model="value.quantity"
                    v-ripple
                    :options="quantityOptions"
                    :clearable="false"
                    class="event-ticket-filter__quantity-input u-width-100 u-height-100 pl-4" />
            </div>
            <v-btn
                :outlined="!showFilters"
                color="primary"
                class="event-ticket-filter__btn-filter ml-2"
                @click="$emit('click-filter-btn')">
                <FiltersIcon :class="{'event-ticket-filter__btn-filter-icon--active': showFilters }" class="event-ticket-filter__btn-filter-icon mr-2" />
                {{ $t( '_common:buttons.filters') }}
            </v-btn>
        </div>
        <div v-if="$vuetify.breakpoint.mdAndUp" class="px-4 pb-4">
            <RangeEditValuesInput
                v-model="priceRange"
                :min="value.price.min"
                :max="value.price.max">
                <template v-slot:minValueLabel="slotProps">
                    {{ slotProps.value | currency( value.price.currency, { minimumFractionDigits: 0, maximumFractionDigits: 0, currencyDisplay: 'narrowSymbol' } ) }}
                </template>
                <template v-slot:maxValueLabel="slotProps">
                    {{ slotProps.value | currency( value.price.currency, { minimumFractionDigits: 0, maximumFractionDigits: 0, currencyDisplay: 'narrowSymbol' } ) }}+
                </template>
            </RangeEditValuesInput>
        </div>
    </div>
</template>

<script>
    import FiltersIcon from '@tenant/app/assets/icons/filters.svg';
    import RangeEditValuesInput from '@tenant/app/components/inputs/RangeEditValuesInput';
    import BaseFormSelect from '@/core/shared/components/input/BaseFormSelect.vue';

    export default {
        name: 'EventTicketFilter',
        components: {
            BaseFormSelect,
            FiltersIcon,
            RangeEditValuesInput
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                required: true
            },
            showFilters: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            quantityOptions( ) {
                const { maxQuantity, minQuantity } = this.options;

                return new Array( maxQuantity - minQuantity + 1 ).fill( ).map( ( value, key ) => {
                    const q = key + minQuantity;

                    return {
                        id: q,
                        name: this.$t( '_common:terms.ticketWithCount', { count: q } )
                    };
                } );
            },
            priceRange: {
                get( ) {
                    return this.value.price.range;
                },
                set( value ) {
                    this.$emit( 'input', {
                        ...this.value,
                        price: {
                            ...this.value.price,
                            range: value
                        }
                    } );
                }
            },
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .event-ticket-filter {
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );

        .event-ticket-filter__quantity-input {
            @include border-radius('xxs');

            .gst-select__input {
                @include font-size('s');
                @include font-weight('regular');

                height: 100%;
                width: 100%;
                color: theme-color( 'primary' );
            }
        }

        .event-ticket-filter__btn-filter {
            @include border-radius('xxs');

            height: 40px !important;
            border: 1px solid theme-color( 'primary' );
            text-transform: unset;
        }

        .event-ticket-filter__btn-filter-icon {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
                stroke: theme-color( 'primary' );
            }
        }

        .event-ticket-filter__btn-filter-icon--active {
            .gst-svg-icon {
                stroke: theme-color( 'white' );
                fill: theme-color( 'white' );
            }
        }
    }
</style>
