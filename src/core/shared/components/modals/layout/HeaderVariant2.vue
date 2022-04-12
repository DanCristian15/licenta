<template>
    <v-toolbar
        flat
        class="header-variant-2 flex-grow-0">
        <slot></slot>
        <v-spacer />
        <v-btn
            v-if="showCloseButton"
            text
            small
            class="header-variant-2__icon-close text-capitalize gst-btn--cancel px-0"
            color="primary"
            @click="$emit('close')">
            {{ closeButtonText || $t('_common:buttons.close') }}
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: 'HeaderVariant2',
        props: {
            title: {
                type: String,
                default: ''
            },
            showCloseButton: {
                type: Boolean,
                default: true,
            },
            closeButtonText: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .header-variant-2 {
        border-bottom: 1px solid theme-color( 'quinary' );
    }

</style>

<style lang="scss">
    @import "@scssVariables";

    .header-variant-2__icon-close {
        letter-spacing: 0;
        
        .gst-svg-icon {
            fill: theme-color( 'tertiary' );
        }
    }
</style>
