<template>
    <v-flex class="gst-search-result-tab-events-filter d-flex flex-wrap flex-md-row">
        <v-flex class="d-flex flex-row flex-md-wrap align-start">
            <v-flex class="gst-search-result-tab-events-filter__city d-flex align-center flex-grow-0">
                <span class="d-inline-flex mr-1">
                    <IconLocation class="gst-search-icon-svg" />
                </span>
                <CityStoreDropDown
                    v-model="city"
                    :data-test-id="$testId('city')"
                    :has-current-location-option="true" />
            </v-flex>
            <v-flex class="gst-search-result-tab-events-filter__date d-flex align-center flex-grow-0 ml-auto ml-md-5">
                <IconDate class="gst-search-icon-svg mr-1" />
                <span class="inline">
                    <DateDropDownField
                        v-model="date"
                        :data-test-id="$testId('date')" />
                </span>
            </v-flex>
        </v-flex>
        <v-flex class="gst-search-result-tab-events-filter__sort d-flex align-center justify-end xs12 md2 ml-auto mt-6 mt-md-0">
            <span class="d-inline-flex mr-1 tertiary--text">
                {{ $t('_common:terms.sort') }}:
            </span>
            <DropDown
                v-model="sort.value"
                value-prop="value"
                :items="sort.options"
                :render-item-fn="( item ) => item.display"
                :clearable="false"
                :data-test-id="$testId('sort')" />
        </v-flex>
    </v-flex>
</template>

<script>
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import IconDate from '@core/shared/assets/icons/date.svg';
    import DropDown from '@core/shared/components/input/DropDown.vue';
    import CityStoreDropDown from '@core/shared/components/input/CityStoreDropDown.vue';
    import DateDropDownField from '@core/shared/components/input/DateDropDownField.vue';

    export default {
        name: 'SearchResultTabsEventsFilter',
        components: {
            CityStoreDropDown,
            DateDropDownField,
            DropDown,
            IconLocation,
            IconDate
        },
        testIdOptions: {
            keyPrefix: 'searchResult.eventsTab.filter'
        },
        props: {
            sort: {
                type: Object,
                default: null,
            },
        },
        computed: {
            city: {
                get() {
                    return this.$store.state.events.filter.city;
                },
                set( value ) {
                    this.$emit( 'input', { city : value } );
                }
            },
            date: {
                get() {
                    return {
                        startDate: this.$store.state.events.filter.startDate,
                        endDate: this.$store.state.events.filter.endDate
                    };
                },
                set( value ) {
                    this.$emit( 'input', { startDate: value.startDate, endDate: value.endDate } );
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-search-result-tab-events-filter__sort {
        ::v-deep .gst-drop-down {
            display: inline-flex !important;
            align-items: center;
        }
    }
</style>