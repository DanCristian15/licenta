<template>
    <v-btn
        center
        text
        outlined
        class="text-capitalize gst-search-all-btn"
        color="primary"
        v-bind="$attrs"
        @click="$emit('click')">
        {{ $t('shared:components.buttons.seeAll') }}
    </v-btn>
</template>
<script>
    export default {
        name: 'SeeAllButton',
        inheritsAttribute: true,
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.buttons'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-search-all-btn.v-btn.v-btn--outlined {
        font-weight: font-weight( 'medium' );
        border-radius: border-radius( 'm' ) !important;
        min-height: 44px;

        &.v-btn--disabled {
            color: theme-color( 'primary' ) !important;
            border-color: theme-color( 'primary' );
            opacity: 0.4;
        }
    }

    .gst-search-all-btn.v-btn.v-btn--outlined:not([disabled]) {
        border-color: theme-color( 'primary' );
    }
</style>
