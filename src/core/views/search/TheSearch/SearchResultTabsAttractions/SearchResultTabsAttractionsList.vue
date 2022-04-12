<template>
    <v-list class="pt-0">
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="px-0 py-2 gst-tabs-item_item"
            :to="{name:'attraction', params: { id: item.id } }">
            <AttractionCardVariant2 :item="item" class="u-background-transparent u-width-100" />
        </v-list-item>
    </v-list>
</template>

<script>
    import AttractionCardVariant2 from '@core/shared/components/attraction/AttractionCardVariant2.vue';

    export default {
        name: 'SearchResultTabsAttractionsList',
        components: {
            AttractionCardVariant2
        },
        props: {
            items: {
                type: Array,
                default: null
            }
        }
    };
</script>