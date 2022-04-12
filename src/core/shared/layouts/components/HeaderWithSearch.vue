<template>
    <v-app-bar
        height="60"
        app
        flat
        class="gst-header">
        <div class="d-flex flex-grow-1 align-center mr-5">
            <TenantLogo v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" />
            <div class="u-mouse-pointer" @click="$router.back( )">
                <IconBackArrow />
            </div>
            <slot></slot>
        </div>
        <v-spacer />
        <SearchKeywordWithAutocomplete
            v-if="$vuetify.breakpoint.mdAndUp"
            v-model="keyword"
            :style="{'minWidth':'310px'}" />
    </v-app-bar>
</template>
<script>
    import { mapActions } from 'vuex';
    import SearchKeywordWithAutocomplete from '@core/shared/components/search/SearchKeywordWithAutocomplete.vue';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';

    export default {
        name: 'TheHeader',
        components: {
            IconBackArrow,
            SearchKeywordWithAutocomplete
        },
        computed: {
            keyword: {
                get( ) {
                    return this.$store.state.searchState.current.keyword;
                },
                set( value ) {
                    this.updateSearch( { keyword : value } );
                }
            }
        },
        methods: {
            ...mapActions( {
                updateSearch: 'searchState/update'
            } )
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-header {
    border-bottom: 1px solid theme-color( 'quinary' ) !important;
}
</style>
