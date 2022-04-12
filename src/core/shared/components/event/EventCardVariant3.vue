<template>
    <v-card
        :to="to"
        :data-test-id="$attrs['data-test-id']"
        class="gst-event-card gst-event-card-variant-3 mx-auto u-box-shadow"
        @mouseenter="hover=true"
        @mouseleave="hover=false">
        <v-img
            :src="imageSrc"
            :height="height"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @error="errorLoadingImage = true">
            <v-flex class="d-flex flex-column fill-height">
                <v-flex d-flex flex-column class="pa-2">
                    <v-flex
                        d-flex
                        wrap>
                        <v-flex align-self-start shrink>
                            <DateIcon :start-date="item.startDateTime" :end-date="item.endDateTime" />
                        </v-flex>
                        <v-flex grow align-self-start text-right class="">
                            <v-fade-transition>
                                <v-btn
                                    v-if="hover"
                                    text
                                    icon
                                    class="gst-event-card-variant-3__cancel-button"
                                    @click="onClickRemoveDo"
                                    @mousedown.stop>
                                    <v-icon
                                        size="24"
                                        class="gst-event-card-variant-3__cancel-button-icon"
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
                                class="gst-event-card-variant-3__title hyphens clamp">
                                {{ item.name }}
                            </VClamp>
                            <VClamp
                                v-if="eventDateTime"
                                autoresize
                                :max-lines="1"
                                class="gst-event-card-variant-3__time hyphens clamp">
                                {{ eventDateTime }}
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
    import { mapActions } from 'vuex';
    import categoriesConstants from '@core/utils/constants/categories';
    import entityConstants from '@core/utils/constants/entity';
    import DateIcon from '@core/shared/components/event/DateIcon.vue';

    export default {
        name: 'EventCardVariant3',
        components: {
            DateIcon,
            VClamp
        },
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
                errorLoadingImage: false,
                hover: false
            };
        },
        computed: {
            imageSrc() {
                const { errorLoadingImage, fallbackSrc } = this;
                const { imageUrl } = this.item;

                if ( errorLoadingImage ) {
                    return this.fallbackSrc;
                } else {
                    return imageUrl || fallbackSrc;
                }
            },
            fallbackSrc() {
                let found = categoriesConstants.LIST.find( item => item.ID === this.item.classificationSegmentId );
                return found ? found.FALLBACK : categoriesConstants.DEFAULT_FALLBACK ;
            },
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'event', params: { id: item.id } } : null;
            },
            eventDateTime( ) {
                if ( this.item.startDateTime ) {
                    return this.item.hasStartTime ? this.$options.filters.time( this.item.startDateTime ) : '';
                }
                return this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
        },
        methods: {
            ...mapActions( {
                deleteUsetBrowsingHistoryEntity: 'user/browsingHistory/deleteEntity',
            } ),
            onClickRemoveDo( e ) {
                e.preventDefault( );
                this.$emit( 'remove', { entityType: entityConstants.TYPES.EVENT, entityId: this.item.id } );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-event-card-variant-3 {
        position: relative;
        max-width: 100%;

        .gst-event-card-variant-3__cancel-button {
            margin-top: -7px;
            margin-right: -7px;
        }

        .gst-event-card-variant-3__title {
            font-size: font-size( 'l' );
            font-weight: font-weight( 'bold' );
            letter-spacing: -0.25px;
            -webkit-hyphens: initial;
            -ms-hyphens: initial;
            hyphens: initial;
        }

        .gst-event-card-variant-3__time {
            font-size: font-size( 'l' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.88px;
            -webkit-hyphens: initial;
            -ms-hyphens: initial;
            hyphens: initial;
        }
    }

    .gst-event-card-variant-3.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }
</style>

<style lang="scss">
    .gst-event-card-variant-3__cancel-button-icon:hover {
        svg > path {
            fill-opacity: 1;
        }
    }
</style>
