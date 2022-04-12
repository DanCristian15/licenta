<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        :class="{
            'gst-attraction-card-variant-6--not-favorite': !isFavorite
        }"
        :title="item.name"
        class="mx-auto gst-attraction-card-variant-6 u-box-shadow u-position-relative">
        <div
            class="gst-attraction-card-variant-6__favorite-button u-position-absolute u-pull-front-main">
            <FavoriteEntityButton
                :entity-type="entityType"
                :entity-id="item.id"
                variant="variant2" />
        </div>
        <v-img
            ref="image"
            :src="imageSrc"
            :height="height"
            class="white--text gst-attraction-card-variant-6__image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @error="errorLoadingImage = true"
            @load="onImageLoadDo">
            <v-flex class="d-flex flex-column fill-height">
                <v-flex d-flex flex-column class="pa-2">
                    <v-card-text class="d-flex flex-grow-1 align-end pa-0">
                        <v-flex d-flex flex-column>
                            <h2 class="gst-attraction-card-variant-6__title font-weight-bold mb-1">
                                <VClamp
                                    autoresize
                                    :max-lines="1"
                                    :title="item.name"
                                    class="hyphens clamp">
                                    {{ item.name }}
                                </VClamp>
                            </h2>
                            <VClamp
                                v-if="item.upcomingEvents"
                                autoresize
                                :max-lines="1"
                                :title="item.upcomingEvents"
                                class="gst-attraction-card-variant-6__events hyphens clamp">
                                {{ $t('_common:terms.upcomingEventWithCount', {count: item.upcomingEvents} ) }}
                            </VClamp>
                        </v-flex>
                    </v-card-text>
                </v-flex>
            </v-flex>
        </v-img>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import FavoriteEntityButton from '@core/shared/components/buttons/FavoriteEntityButton.vue';
    import AttractionCardFavoriteMixin from './mixins/AttractionCardFavoriteMixin.js';

    export default {
        name: 'AttractionCardVariant6',
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

    .gst-attraction-card-variant-6 {
        position: relative;
        border-radius: border-radius( 'm' ) !important;
        max-width: 100%;
        -webkit-transition: opacity 0.5s ease-in-out;
        -moz-transition: opacity 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out;
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
    }

    .gst-attraction-card-variant-6__image {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-attraction-card-variant-6--not-favorite {
        .gst-attraction-card-variant-6__image {
            opacity: 0.2;
        }
    }

    .gst-attraction-card-variant-6__favorite-button {
        top: 7px;
        right: 7px;
    }

    .gst-attraction-card-variant-6__title {
        line-height: line-height( 'xl' );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'regular' );

        .hyphens {
            letter-spacing: -0.8px;
            -webkit-hyphens: initial;
            -ms-hyphens: initial;
            hyphens: initial;
        }
    }

    .gst-attraction-card-variant-6__events {
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.88px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }
</style>
