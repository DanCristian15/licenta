<template>
    <div
        class="gst-event-filter-modal d-flex flex-column"
        :class="{
            'rounded-t-1': $vuetify.breakpoint.mdAndUp,
            'rounded-t-lg': !$vuetify.breakpoint.mdAndUp,
        }">
        <HeaderVariant1
            class="flex-grow-0"
            :title="$t( '_common:terms.filter_plural' )"
            @close="$emit('close')" />
        <div class="gst-event-filter-modal__body pa-4">
            <span class="gst-event-filter-modal__sort-title">{{ $t('sortListBy') }}</span>
            <div class="gst-event-ticket-list-sort u-width-100 d-flex flex-row my-2">
                <div
                    v-for="item in sort.options"
                    :key="item.key"
                    v-ripple
                    :class="{
                        'gst-event-ticket-list-sort__item--selected': isItemSelected( item )
                    }"
                    class="gst-event-ticket-list-sort__item u-mouse-pointer flex-grow-1 text-center"
                    @click="selectedSortOption = item">
                    {{ item.display }}
                </div>
            </div>

            <span class="gst-event-filter-modal__sort-title py-4 d-block">{{ $t('pricesAreIn') }} {{ priceFilter.currency }}</span>
            <RangeEditValuesInput
                v-model="priceFilter.range"
                :min="priceFilter.min"
                :max="priceFilter.max">
                <template v-slot:minValueLabel="slotProps">
                    {{
                        slotProps.value | currency( priceFilter.currency, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            currencyDisplay: 'narrowSymbol'
                        } )
                    }}
                </template>
                <template v-slot:maxValueLabel="slotProps">
                    {{
                        slotProps.value | currency( priceFilter.currency, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            currencyDisplay: 'narrowSymbol'
                        } )
                    }}+
                </template>
            </RangeEditValuesInput>
            <div>
                <span class="gst-event-filter-modal__sort-title py-4 d-block">{{ $t('_common:terms.moreFilters') }}</span>
                <AccessibilityToggleFormInput
                    v-model="accessibility"
                    :disabled="!options.accessibilityEnabled" />
            </div>
            <div class="mt-6">
                <v-btn
                    class="mb-4 text-capitalize"
                    block
                    color="primary"
                    @click="updateFilters()">
                    {{ $t('_common:buttons.applyFilters') }}
                </v-btn>
                <v-btn
                    class="text-capitalize"
                    block
                    color="primary"
                    text
                    @click="reset">
                    {{ $t('_common:buttons.reset') }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderVariant1 from '@tenant/app/components/modals/HeaderVariant1';
    import RangeEditValuesInput from '@tenant/app/components/inputs/RangeEditValuesInput';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChange from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import AccessibilityToggleFormInput from './components/formInputs/AccessibilityToggleFormInput';

    export default {
        name: 'EventTicketFilterModal',
        components: {
            HeaderVariant1,
            RangeEditValuesInput,
            AccessibilityToggleFormInput
        },
        mixins: [
            CloseModalOnRouteChangeMixin,
            CloseModalOnBreakpointChange
        ],
        props: {
            value: {
                type: Object,
                required: true
            },
            sort: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                required: true
            },
            busEventParent: {
                type: Object,
                default: null,
                required: false
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventTicketFilterModal'
        },
        data() {
            return {
                selectedSortOption: this.sort.value,
                priceFilter: { 
                    ...this.value.price
                },
                accessibility: this.value.accessibility
            };
        },
        methods: {
            isItemSelected( item ) {
                return item === this.selectedSortOption;
            },
            updateFilters() {
                this.busEventParent.$emit( 'update-filter', {
                    ...this.value,
                    accessibility: this.accessibility,
                    price: {
                        ...this.priceFilter
                    }
                } );
                this.busEventParent.$emit( 'update-sort', {
                    ...this.sort,
                    value: this.selectedSortOption
                } );
                this.$emit( 'close' );
            },
            reset( ) {
                this.busEventParent.$emit( 'reset-filter' );
                this.priceFilter = { 
                    ...this.value.price
                };
                this.selectedSortOption = this.sort.value;
                this.accessibility = this.value.accessibility;
            }
        }
    };
</script>

<style scoped lang="scss">
@import '@scssVariables';
@import '@scssMixins';

.gst-event-filter-modal {
    background-color: theme-color( 'white' );

    .gst-event-filter-modal__sort-title {
        @include font-size('l');

        color: theme-color( 'tertiary' );
    }
}

.gst-event-ticket-list-sort {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: theme-color( 'white' );
    z-index: 1;

    .gst-event-ticket-list-sort__item {
        @include font-size('s');

        height: 48px;
        line-height: 48px;
        border: 1px solid theme-color( 'septenary' );
        background-color: theme-color( 'white' ) !important;
        color: theme-color( 'quaternary' );
        border-radius: 0;
    }

    .gst-event-ticket-list-sort__item--selected {
        border: 0;
        background-color: theme-color( 'primary' ) !important;
        color: theme-color( 'white' );
        border-bottom: 3px solid theme-color( 'primary' );
    }
}
</style>
