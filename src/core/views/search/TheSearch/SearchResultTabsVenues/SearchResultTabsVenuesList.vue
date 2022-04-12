<template>
    <v-list class="pt-0">
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="px-0 py-2 gst-tabs-item_item"
            :to="{ name:'venue', params: { id: item.id } }">
            <VenueCardSmall :venue="item" class="u-background-transparent u-width-100" />
        </v-list-item>
    </v-list>
</template>

<script>
    import VenueCardSmall from '@core/shared/components/venue/VenueCardSmall.vue';

    export default {
        name: 'SearchResultTabsVenuesList',
        components: {
            VenueCardSmall
        },
        props: {
            items: {
                type: Array,
                default: null
            }
        }
    };
</script>