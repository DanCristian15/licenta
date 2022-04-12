<template>
    <v-layout
        v-if="$vuetify.breakpoint.mdAndUp"
        row
        wrap
        class="ma-0 mt-4 mx-n2">
        <v-flex
            v-for="(item, i) in items"
            :key="i"
            class="pa-2"
            md2>
            <AttractionCardVariant6
                :item="item"
                with-to />
        </v-flex>
    </v-layout>
    <v-layout
        v-else
        row
        wrap
        class="ma-0 mt-4">
        <v-list class="py-0 u-width-100">
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="{ name: 'attraction', params: { id: item.id } }"
                class="px-0 gst-user-favorite-tab-attraction-list__item">
                <AttractionCardVariant7
                    :item="item"
                    class="u-background-transparent u-width-100 py-2" />
            </v-list-item>
        </v-list>
    </v-layout>
</template>

<script>
    import AttractionCardVariant6 from '@shared/components/attraction/AttractionCardVariant6';
    import AttractionCardVariant7 from '@shared/components/attraction/AttractionCardVariant7';

    export default {
        name: 'UserFavoritesTabsAttractions',
        components: {
            AttractionCardVariant6,
            AttractionCardVariant7,
        },
        props: {
            items: {
                type: Array,
                default: null
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import "@scssVariables";
    
    .gst-user-favorite-tab-attraction-list__item {
        border-bottom: 1px solid theme-color( 'quinary' );
    }
</style>

