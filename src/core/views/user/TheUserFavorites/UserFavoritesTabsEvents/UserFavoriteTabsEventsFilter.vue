<template>
    <v-flex d-flex flex-row class="gst-user-favorite-tab-events-filter">
        <v-flex class="gst-user-favorite-tab-events-filter__city d-flex align-center">
            <span class="d-inline-flex mr-1">
                <IconLocation class="gst-search-icon-svg" />
            </span>
            <CityStoreDropDown
                v-model="filter.city"
                :data-test-id="$testId('cityFilter')"
                :only-favourite="true" />
        </v-flex>
    </v-flex>
</template>

<script>
    import CityStoreDropDown from '@core/shared/components/input/CityStoreDropDown.vue';
    import IconLocation from '@core/shared/assets/icons/location.svg';

    export default {
        name: 'UserFavoriteTabsEventsFilter',
        components: {
            CityStoreDropDown,
            IconLocation
        },
        testIdOptions: {
            keyPrefix: 'userFavorites.eventsTab.filter'
        },
        props: {
            filter: {
                type: Object,
                default: null
            }
        }
    };
</script>