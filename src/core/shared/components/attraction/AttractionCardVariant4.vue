<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        class="mx-auto gst-attraction-card-variant-4 u-box-shadow"
        @mouseenter="hover=true"
        @mouseleave="hover=false">
        <v-img
            ref="image"
            :src="imageSrc"
            :width="width"
            :height="height"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @error="errorLoadingImage = true"
            @load="onImageLoadDo">
            <v-flex class="d-flex flex-column fill-height">
                <v-flex d-flex flex-column class="pa-2">
                    <v-flex
                        d-flex
                        wrap>
                        <v-flex
                            v-if="showRemoveButton"
                            grow
                            align-self-start
                            text-right>
                            <v-fade-transition>
                                <v-btn
                                    v-if="hover"
                                    text
                                    icon
                                    class="gst-attraction-card-variant-4__cancel-button"
                                    @click="onClickRemoveDo"
                                    @mousedown.stop>
                                    <v-icon
                                        :size="24"
                                        class="gst-attraction-card-variant-4__cancel-button-icon"
                                        v-text="'$vuetify.icons.closeRound'" />
                                </v-btn>
                            </v-fade-transition>
                        </v-flex>
                    </v-flex>
                    <v-card-text class="d-flex flex-grow-1 align-end pa-0">
                        <v-flex d-flex flex-column>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                :title="item.name"
                                class="gst-attraction-card-variant-4__title hyphens clamp">
                                {{ item.name }}
                            </VClamp>
                            <VClamp
                                autoresize
                                :max-lines="1"
                                :title="genre"
                                class="gst-attraction-card-variant-4__genre hyphens clamp">
                                {{ genre }}
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
    import entityConstants from '@core/utils/constants/entity';
    import AttractionCardImageMixin from './mixins/AttractionCardImageMixin.js';

    export default {
        name: 'AttractionCardVariant4',
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
            width: {
                type: String,
                default: null
            },
            height: {
                type: String,
                default: '144px'
            },
            showRemoveButton: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                errorLoadingImage: false,
                hover: false
            };
        },
        computed: {
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'attraction', params: { id: item.id } } : null;
            },
            genre( ) {
                const attraction = this.item;

                return attraction.classificationGenre || attraction.classificationSubGenre || attraction.classificationType;
            }
        },
        methods: {
            onClickRemoveDo( e ) {
                e.preventDefault( );
                this.$emit( 'remove', { entityType: entityConstants.TYPES.ATTRACTION, entityId: this.item.id } );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-attraction-card-variant-4 {
        position: relative;
        max-width: 100%;

        &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            border-radius: border-radius( 'm' ) !important;
        }
    }

    .gst-attraction-card-variant-4__cancel-button {
        margin-top: -7px;
        margin-right: -7px;
    }

    .gst-attraction-card-variant-4__title {
        font-size: font-size( 'l' );
        font-weight: font-weight( 'bold' );
        letter-spacing: -0.25px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }

    .gst-attraction-card-variant-4__genre {
        font-size: font-size( 'l' );
        font-weight: font-weight( 'regular' );
        letter-spacing: -0.88px;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
    }
</style>

<style lang="scss">
    .gst-attraction-card-variant-4__cancel-button-icon:hover {
        svg > path {
            fill-opacity: 1;
        }
    }
</style>
