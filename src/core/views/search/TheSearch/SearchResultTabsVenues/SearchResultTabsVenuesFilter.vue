<template>
    <v-flex class="gst-search-result-tab-venues-filter d-flex flex-wrap">
        <v-flex class="gst-search-result-tab-venues-filter__city d-flex align-center flex-grow-0">
            <span class="d-inline-flex mr-1">
                <IconLocation class="gst-search-icon-svg" />
            </span>
            <CityStoreDropDown
                v-model="city"
                :data-test-id="$testId('city')"
                :has-current-location-option="true" />
        </v-flex>
    </v-flex>
</template>

<script>
    import CityStoreDropDown from '@core/shared/components/input/CityStoreDropDown.vue';
    import IconLocation from '@core/shared/assets/icons/location.svg';

    export default {
        name: 'SearchResultTabsVenuesFilter',
        components: {
            CityStoreDropDown,
            IconLocation,
        },
        testIdOptions: {
            keyPrefix: 'searchResult.venuesTab.filter'
        },
        computed: {
            city: {
                get() {
                    return this.$store.state.venues.filter.city;
                },
                set( value ) {
                    this.$emit( 'input', { city : value } );
                }
            }
        }
    };
</script>