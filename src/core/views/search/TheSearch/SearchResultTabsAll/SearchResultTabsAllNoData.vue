<template>
    <v-flex class="gst-search-result-tabs-all-no-data pt-10 pb-8">
        <h4 class="pb-2">
            {{ $t('messages.noData.title') }}
        </h4>
        <ul class="pl-8">
            <li class="py-2">
                {{ $t( 'messages.noData.content.text1' ) }}
            </li>
            <li class="py-2">
                {{ $t( 'messages.noData.content.text2' ) }}
            </li>
            <li class="py-2">
                {{ $t( 'messages.noData.content.text3' ) }}
            </li>
            <li class="py-2">
                {{ $t( 'messages.noData.content.text4' ) }}
            </li>
        </ul>
    </v-flex>
</template>
<script>
    export default {
        name: 'SearchResultTabsAllNoData',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs.all'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-search-result-tabs-all-no-data {
        h4 {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' );
            font-weight: font-weight( 'medium' );
        }

        ul {
            list-style: inside;

            li {
                line-height: line-height( 'xxxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'regular' );
                letter-spacing: -0.47px;
            }
        }
    }
</style>
