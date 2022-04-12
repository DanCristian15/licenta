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
        <v-btn
            v-if="showCloseIcon"
            fab
            text
            x-small
            class="header-variant-1__btn-close text-capitalize px-0"
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
@import "@scssMixins";

.header-variant-1 {
    position: relative;
    border-bottom: 1px solid theme-color( 'quinary' );
}

.header-variant-1.v-sheet {
    background: theme-color( 'primary' ) !important;
}

.header-variant-1__title {
    @include font-size('xxl');

    margin: 0 auto;
    color: theme-color( 'white' );
    font-weight: 600;
    letter-spacing: -0.1px;

    @include line-height('xxxxl');
}

.header-variant-1__btn-close {
    position: absolute;
    right: 21px;
    height: 14px;
    width: 14px;
}

@include mobile-only {
    .header-variant-1__title {
        font-weight: font-weight( 'regular' );
    }
}
</style>

<style lang="scss">
@import "@scssVariables";

.header-variant-1__btn-close .gst-svg-icon {
    fill: theme-color( 'white' );
}
</style>
