<template>
    <div>
        <v-tabs
            background-color="transparent"
            color="primary"
            class="gst-tabs"
            :show-arrows="false">
            <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                :to="tab.to"
                exact>
                <span>{{ tab.title }}</span>
                <span v-if="hasTotal( tab.total )" class="ml-1">
                    ({{ tab.total }})
                </span>
            </v-tab>
        </v-tabs>
        <v-tabs-items
            class="gst-tabs-item">
            <router-view />
        </v-tabs-items>
    </div>
</template>
<script>
    export default {
        name: 'SearchResultTabs',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.search.theSearch._components.searchResultTabs'
        },
        props: {
            tabs: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            hasTotal( value ) {
                return value !== undefined ? true : false;
            }
        }
    };
</script>
