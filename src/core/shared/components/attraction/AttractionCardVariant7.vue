<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        :class="{
            'gst-attraction-card-variant-7--not-favorite': !isFavorite
        }"
        flat
        class="mx-auto gst-attraction-card-variant-7 u-box-shadow u-position-relative">
        <v-layout align-center>
            <v-flex class="gst-attraction-card-variant-7__content d-flex flex-no-wrap align-center">
                <v-flex shrink>
                    <v-img
                        ref="image"
                        width="42"
                        height="42"
                        :src="imageSrc"
                        class="gst-attraction-card-7__image"
                        flat
                        @error="errorLoadingImage = true"
                        @load="onImageLoadDo" />
                </v-flex>
                <v-flex class="pl-4" xs10>
                    <VClamp
                        autoresize
                        :max-lines="1"
                        tag="h5"
                        class="hyphens clamp gst-attraction-card-variant-7__title">
                        {{ item.name }}
                    </VClamp>
                    <VClamp
                        v-if="item.upcomingEvents"
                        autoresize
                        :max-lines="1"
                        :title="item.upcomingEvents"
                        class="gst-attraction-card-variant-7__events hyphens clamp">
                        {{ $t('_common:terms.upcomingEventWithCount', {count: item.upcomingEvents} ) }}
                    </VClamp>
                </v-flex>
            </v-flex>
            <v-flex
                class="flex-grow-0"
                d-flex>
                <FavoriteEntityButton
                    :entity-type="entityType"
                    :entity-id="item.id"
                    class="gst-attraction-card-variant-7__favorite-button"
                    variant="variant2" />
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import FavoriteEntityButton from '@core/shared/components/buttons/FavoriteEntityButton.vue';
    import AttractionCardFavoriteMixin from './mixins/AttractionCardFavoriteMixin.js';

    export default {
        name: 'AttractionCardVariant7',
        components: {
            FavoriteEntityButton,
            VClamp
        },
        mixins: [ AttractionCardFavoriteMixin ],
        props: {
            height: {
                type: String,
                default: '144px'
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-attraction-card-variant-7 {
        position: relative;
        max-width: 100%;
        -webkit-transition: opacity 0.5s ease-in-out;
        -moz-transition: opacity 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out;

        &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            border-radius: border-radius( 'm' ) !important;
        }
    }

    .gst-attraction-card-variant-7--not-favorite {
        .gst-attraction-card-variant-7__content {
            opacity: 0.2;
        }
    }

    .gst-attraction-card-variant-7__image {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-attraction-card-variant-7__title {
        line-height: line-height( 'xl' );
        color: theme-color( 'quaternary' );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.47px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }

    .gst-attraction-card-variant-7__events {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.25px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }
</style>
