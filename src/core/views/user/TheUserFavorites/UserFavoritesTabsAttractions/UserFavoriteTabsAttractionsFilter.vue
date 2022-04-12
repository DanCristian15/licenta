<template>
    <v-flex d-flex flex-row class="gst-user-favorite-tab-attraction-filter">
        <v-flex flex class="flex-grow-1 d-flex justify-md-end mr-md-6">
            <span class="gst-user-favorite-tab-attraction-filter__label mr-1 tertiary--text">
                {{ $t('_common:terms.category') }}:
            </span>
            <StoreDropDown
                v-model="filter.category"
                :data-test-id="$testId('categoryFilter')"
                value-prop="search"
                load-store-action-name="categories/getListForFavoriteAttractions"
                i18n-key-all-items-item="_common:terms.allCategory" />
        </v-flex>
        <v-flex d-flex class="flex-grow-0 flex-md-shrink">
            <span class="gst-user-favorite-tab-attraction-filter__label mr-1 tertiary--text">
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
    import DropDown from '@core/shared/components/input/DropDown.vue';
    import StoreDropDown from '@core/shared/components/input/StoreDropDown.vue';
    
    export default {
        name: 'UserFavoriteTabsAttractionsFilter',
        components: {
            StoreDropDown,
            DropDown,
        },
        props: {
            sort: {
                type: Object,
                default: null,
            },
            filter: {
                type: Object,
                default: null
            }
        },
        testIdOptions: {
            keyPrefix: 'userFavorites.attractionsTab.filter'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-favorite-tab-attraction-filter__label {
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
    }
</style>