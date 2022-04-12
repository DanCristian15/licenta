<template>
    <v-toolbar
        flat
        height="55"
        class="header-variant-1">
        <slot></slot>
        <template v-if="!$slots.default">
            <h5 class="header-variant-1__title">
                {{ title }}
            </h5>
        </template>
        <v-spacer />
        <v-btn
            v-if="showCloseIcon"
            fab
            text
            x-small
            class="header-variant-1__icon-close text-capitalize gst-btn--cancel px-0"
            color="white"
            @click="$emit('close')">
            <IconClose />
        </v-btn>
    </v-toolbar>
</template>

<script>
    import IconClose from '@core/shared/assets/icons/close.svg';

    export default {
        name: 'HeaderVariant1',
        components: {
            IconClose
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            showCloseIcon: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .header-variant-1 {
        border-bottom: 1px solid theme-color( 'quinary' );
    }

    .header-variant-1.v-sheet {
        background: #ADACAC;
    }

    .header-variant-1__title {
        line-height: line-height( 'xxxxl' );
        color: theme-color( 'white' );
        font-size: font-size( 'xxxl' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.1px;
    }
</style>

<style lang="scss">
    @import "@scssVariables";

    .header-variant-1__icon-close .gst-svg-icon {
        fill: theme-color( 'white' );
    }
</style>
