<template>
    <div class="gst-no-filtered-data text-center">
        <v-icon class="gst-no-filtered-data__icon" v-text="'$vuetify.icons.searchFavoriteData'" />
        <div class="gst-no-filtered-data__content mt-6 mb-8">
            <p v-if="message" class="mb-0">
                {{ message }}
            </p>
            <p class="mb-0">
                {{ $t('_common:messages.noFilterDataPrefix') }}
                <a href="#" class="d-inline-block" @click="onResetFilterClickDo">
                    {{ $t("_common:buttons.resetFilters").toLowerCase( ) }}
                </a>.
            </p>
        </div>
        <ResetFiltersButton @click="onResetFilterClickDo" />
    </div>
</template>

<script>
    import ResetFiltersButton from '@core/shared/components/buttons/ResetFiltersButton.vue';

    export default {
        name: 'NoFilteredData',
        i18nOptions:{
            namespaces: 'shared',
            keyPrefix: 'components.misc.noFilteredData'
        },
        components: {
            ResetFiltersButton
        },
        props: {
            message: {
                type: String,
                default: null
            },
            iconVText: {
                type: String,
                default: ''
            },
        },
        methods: {
            onResetFilterClickDo( ) {
                this.$emit( 'reset-filters' );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-no-filtered-data__content {
        line-height: line-height( 'xxxl' );
        color: theme-color( 'tertiary' );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'medium' );
    }
</style>
