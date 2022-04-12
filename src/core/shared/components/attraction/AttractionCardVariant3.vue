<template>
    <div class="gst-attraction-card-variant-3 py-5 px-4 u-width-100">
        <v-card flat class="mx-auto u-background-transparent">
            <v-layout align-middle>
                <v-flex shrink>
                    <v-img
                        ref="image"
                        width="42"
                        height="42"
                        :src="imageSrc"
                        class="gst-attraction-card-variant-3__image"
                        flat
                        @error="errorLoadingImage = true"
                        @load="onImageLoadDo" />
                </v-flex>
                <v-flex class="pl-4" xs10>
                    <h5>
                        <VClamp
                            autoresize
                            :max-lines="1"
                            class="hyphens clamp gst-attraction-card-variant-3__title">
                            {{ item.name }}
                        </VClamp>
                    </h5>

                    <VClamp
                        autoresize
                        :max-lines="1"
                        class="hyphens clamp gst-attraction-card-variant-3__genre">
                        {{ $t('_common:terms.upcomingEventWithCount', {count: item.upcomingEvents} ) }}
                    </VClamp>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>
<script>
    import VClamp from 'vue-clamp';
    import AttractionCardImageMixin from './mixins/AttractionCardImageMixin.js';

    export default {
        name: 'AttractionCardVariant3',
        components: {
            VClamp
        },
        mixins: [ AttractionCardImageMixin ],
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-attraction-card-variant-3 {
    position: relative;
    border: 1px solid theme-color( 'septenary' );
    background-color: theme-color( 'quinary' );
    border-radius: border-radius( 'm' ) !important;
    max-width: 100%;

    a {
        display: inline-block;
    }

    .gst-attraction-card-variant-3__image {
        border: 1px solid theme-color( 'quinary' );
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-attraction-card-variant-3__genre {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
    }
}
</style>
