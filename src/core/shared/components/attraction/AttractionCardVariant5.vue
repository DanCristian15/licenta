<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        class="mx-auto gst-attraction-card-variant-5 u-box-shadow">
        <v-img
            ref="image"
            :src="imageSrc"
            :height="height"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @error="errorLoadingImage = true"
            @load="onImageLoadDo">
            <v-flex class="d-flex flex-column fill-height">
                <v-flex d-flex flex-column class="pa-4">
                    <v-flex
                        d-flex
                        wrap>
                        <v-flex
                            grow
                            align-self-start
                            text-right>
                            <FavoriteEntityButton class="gst-attraction-card-variant-5__favorite-button" :entity-type="entityType" :entity-id="item.id" />
                        </v-flex>
                    </v-flex>
                    <v-card-text class="d-flex flex-grow-1 align-end pa-0">
                        <v-flex d-flex flex-column>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                :title="item.name"
                                tag="h2"
                                class="gst-attraction-card-variant-5__title font-weight-bold mb-1 hyphens clamp">
                                {{ item.name }}
                            </VClamp>
                            <VClamp
                                v-if="item.upcomingEvents"
                                autoresize
                                :max-lines="1"
                                :title="item.upcomingEvents"
                                class="gst-attraction-card-variant-5__events hyphens clamp">
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
    import AttractionCardImageMixin from './mixins/AttractionCardImageMixin.js';

    export default {
        name: 'AttractionCardVariant5',
        components: {
            FavoriteEntityButton,
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
        data() {
            return {
                errorLoadingImage: false
            };
        },
        computed: {
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'attraction', params: { id: item.id } } : null;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-attraction-card-variant-5 {
        position: relative;
        max-width: 100%;

        &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            border-radius: border-radius( 'm' ) !important;
        }
    }

    .gst-attraction-card-variant-5:hover {
        border-color: red;
        box-shadow:
            0 0 0 1px rgba( theme-color-hex( 'black' ), 0.05 ),
            0 40px 34px -16px rgba( theme-color-hex( 'black' ), 0.08 ),
            0 6px 4px -4px rgba( theme-color-hex( 'black' ), 0.06 ),
            0 16px 16px -8px rgba( theme-color-hex( 'black' ), 0.12 );
    }

    .gst-attraction-card-variant-5__favorite-button {
        margin-top: -7px;
        margin-right: -7px;
    }

    .gst-attraction-card-variant-5__title {
        line-height: line-height( 'xxxxxxl' );
        font-weight: font-weight( 'bold' );

        .hyphens {
            letter-spacing: -0.25px;
            -webkit-hyphens: initial;
            -ms-hyphens: initial;
            hyphens: initial;
        }
    }

    .gst-attraction-card-variant-5__events {
        line-height: line-height( 'l' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.7px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }
</style>
