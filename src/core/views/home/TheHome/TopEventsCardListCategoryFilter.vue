<template>
    <v-btn-toggle
        :value="value"
        class="gst-btn-clasification__group"
        group
        @change="onChange">
        <CategoryFilterButton
            v-for="( item ) in items"
            :key="item.id"
            :value="item.id"
            :icon="getIcon(item.id)"
            :data-test-id="$testId( `${item.name.toLocaleLowerCase( )}`)"
            :text="$t(`${ getKey(item.id) }`)" />
    </v-btn-toggle>
</template>
<script>
    import CategoryFilterButton from '@core/shared/components/buttons/CategoryFilterButton';
    import categoriesConstants from '@core/utils/constants/categories';

    export default {
        name: 'TopEventsCardListCategoryFilter',
        components: {
            CategoryFilterButton
        },
        testIdOptions: {
            keyPrefix: 'home.topEvents.filter.category'
        },
        props: {
            value: {
                type: String,
                default: null
            },
            items: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            onChange ( value ) {
                this.$emit( 'input', value );
            },
            getIcon ( id ) {
                let found = categoriesConstants.LIST.find( item => item.ID === id );
                return found ? found.ICON : categoriesConstants.DEFAULT_ICON ;
            },
            getKey ( id ) {
                let found = categoriesConstants.LIST.find( item => item.ID === id );
                return found.i18nKey;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .gst-btn-clasification__group.v-btn-toggle--group > .v-btn.v-btn:first-of-type {
        margin-left: 0;
    }
</style>
