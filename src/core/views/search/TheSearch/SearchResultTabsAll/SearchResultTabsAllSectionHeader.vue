<template>
    <v-flex class="d-flex flex-column">
        <v-flex class="gst-search-result-tabs-all-section-header d-flex align-center justify-space-between pt-4 pb-2">
            <h4>
                {{ title }}
            </h4>
            <router-link
                v-if="showButton"
                class="d-flex align-center gst-btn--see-all"
                :to="to">
                <span>{{ textButton }}</span>
                <i class="gst-icon-svg u-rotate-90-n">
                    <IconDropDownArrow />
                </i>
            </router-link>
        </v-flex>
    </v-flex>
</template>
<script>
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'SearchResultTabsAllSection',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs'
        },
        components: {
            IconDropDownArrow
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            to: {
                type: Object,
                default: () => ( {} )
            },
            textButton: {
                type: String,
                default: ''
            },
            showButton: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-search-result-tabs-all-section-header {
        h4 {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' );
            font-weight: font-weight( 'medium' );
        }

        .gst-btn--see-all {
            .gst-icon-svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' ) !important;
                }
            }
        }
    }
</style>
