<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        flat
        class="mx-auto gst-attraction-card-variant-8 u-box-shadow u-position-relative">
        <v-layout align-center>
            <v-flex class="gst-attraction-card-variant-8__content d-flex flex-no-wrap align-center">
                <v-flex shrink>
                    <v-img
                        ref="image"
                        width="42"
                        height="42"
                        :src="imageSrc"
                        class="gst-attraction-card-variant-8__image"
                        flat
                        @error="errorLoadingImage = true"
                        @load="onImageLoadDo" />
                </v-flex>
                <v-flex class="pl-4" xs10>
                    <VClamp
                        autoresize
                        :max-lines="1"
                        tag="h5"
                        class="hyphens clamp gst-attraction-card-variant-8__title">
                        {{ item.name }}
                    </VClamp>
                    <VClamp
                        v-if="item.upcomingEvents"
                        autoresize
                        :max-lines="1"
                        :title="item.upcomingEvents"
                        class="gst-attraction-card-variant-8__events hyphens clamp">
                        {{ $t('_common:terms.upcomingEventWithCount', {count: item.upcomingEvents} ) }}
                    </VClamp>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import AttractionCardImageMixin from './mixins/AttractionCardImageMixin.js';

    export default {
        name: 'AttractionCardVariant8',
        components: {
            VClamp
        },
        mixins: [ AttractionCardImageMixin ],
        props: {
            item: {
                type: Object,
                required: true
            },
            withTo: {
                type: Boolean,
                default: true
            },
            height: {
                type: String,
                default: '144px'
            }
        },
        computed: {
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'attraction', params: { id: item.id } } : null;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-attraction-card-variant-8 {
        position: relative;
        max-width: 100%;
        -webkit-transition: opacity 0.5s ease-in-out;
        -moz-transition: opacity 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out;

        &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            border-radius: border-radius( 'm' ) !important;
        }
    }

    .gst-attraction-card-variant-8__image {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-attraction-card-variant-8__title {
        line-height: line-height( 'l' );
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.47px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }

    .gst-attraction-card-variant-8__events {
        line-height: line-height( 'xxl' );
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.25px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }
</style>
