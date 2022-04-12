<template>
    <v-card v-if="qaItems.length" flat outlined class="pa-4 gst-faq-card">
        <p class="font-weight-bold mb-2">
            {{ $t("title") }}
        </p>
        <v-expansion-panels accordion>
            <ExpansionPanel v-for="(item,i) in qaItems" :key="i">
                <template slot="header">
                    {{ item.question }}
                </template>
                <template slot="content">
                    {{ item.answer }}
                </template>
            </ExpansionPanel>
        </v-expansion-panels>
    </v-card>
</template>
<script>
    import i18next from 'i18next';
    import { mapState } from 'vuex';
    import ExpansionPanel from '@core/shared/components/misc/ExpansionPanel.vue';

    export default {
        name: 'SidebarFaqCard',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.sidebar.faqCard'
        },
        components: {
            ExpansionPanel
        },
        computed: {
            ...mapState( {
                language:  state => state.appState.language
            } ),
            qaItems() {
                const lngResouce = i18next.getResource( this.language, this._i18nOptions.namespaces[ 0 ], this._i18nOptions.keyPrefix );

                if ( lngResouce && lngResouce.items ) {
                    return Object.values( lngResouce.items ).filter( item => item.answer && item.question );
                }
                return [ ];
            }
        }
    };
</script>
<style  lang="scss">
    @import "@scssVariables";

    .gst-faq-card.v-sheet {
        border-radius: border-radius( 'm' ) !important;
        border-color: theme-color( 'quinary' ) !important;
    }
</style>
