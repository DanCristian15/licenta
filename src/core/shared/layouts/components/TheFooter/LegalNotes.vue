<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div :class="{'container container--fluid': $vuetify.breakpoint.smAndDown}" class="gst-footer-legal-notes" v-html="$t('content')">
    </div>
</template>
<script>
    export default {
        name: 'LegalNotes',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'layouts.footer._components.legalNotes',
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-footer-legal-notes {
    margin-top: 16px;
    font-size: font-size( 'xxxxs' );
    text-align: left;
}
</style>
