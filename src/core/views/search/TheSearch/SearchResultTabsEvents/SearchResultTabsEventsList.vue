<template>
    <v-list class="pt-0">
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="px-0 py-2 gst-tabs-item_item"
            :to="{ name: 'event', params: { id: item.id } }">
            <EventCardVariant1 
                :with-price-icon="true" 
                :event="item"
                :content-max-lines="2"
                :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney" 
                class="u-background-transparent u-width-100" />
        </v-list-item>
    </v-list>
</template>

<script>
    import { mapGetters } from 'vuex';
    import EventCardVariant1 from '@core/shared/components/event/EventCardVariant1.vue';

    export default {
        name: 'SearchResultTabsEventsList',
        components: {
            EventCardVariant1
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