<template>
    <v-layout
        row
        wrap
        class="ma-0 mt-4">
        <v-list class="py-0 u-width-100">
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="{ name: 'event', params: { id: item.id } }"
                class="px-0 gst-user-favorite-tab-events-list__item">
                <EventCardVariant5
                    :item="item"
                    :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                    with-price-icon
                    class="u-background-transparent u-width-100 py-2" />
            </v-list-item>
        </v-list>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex';
    import EventCardVariant5 from '@core/shared/components/event/EventCardVariant5.vue';

    export default {
        name: 'UserFavoriteTabsEventsList',
        components: {
            EventCardVariant5
        },
        props: {
            items: {
                type: Array,
                default: null
            }
        },
        computed: {
            ...mapGetters( {
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
        }
    };
</script>


<style lang="scss" scoped>
    @import "@scssVariables";
    
    .gst-user-favorite-tab-events-list__item {
        border-bottom: 1px solid theme-color( 'quinary' );
    }
</style>
