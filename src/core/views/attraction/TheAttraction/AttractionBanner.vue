<template>
    <BaseBanner 
        class="gst-attraction-banner mb-0 ma-md-0 rounded-lg"
        :class="{ 'rounded-lg': $vuetify.breakpoint.mdAndUp }">
        <template v-slot:gst-banner-content>
            <BaseImage 
                v-bind="imageProps"
                class="gst-banner__image pb-5 pl-4 pr-2 pt-2"
                :class="{ 'rounded-lg': $vuetify.breakpoint.mdAndUp }">
                <template v-slot:content>
                    <v-flex d-flex flex-column justify-space-between class="content-max-width u-height-100">
                        <div class="d-flex flex-wrap justify-end">
                            <FavoriteEntityButton
                                :entity-type="entityType"
                                :entity-id="itemId"
                                class="u-align-vertical-middle px-4" />
                        </div>
                        <div class="d-flex flex-wrap align-center">
                            <h1 class="d-inline-block u-align-ve">
                                {{ title }}
                            </h1>
                            <MusicLinks v-if="showMusicLinks" :item="item" class="ml-auto" />
                        </div>
                    </v-flex>
                </template>
            </BaseImage>
        </template>
    </BaseBanner>
</template>
<script>
    import categoriesConstants from '@core/utils/constants/categories';
    import entityConstants from '@core/utils/constants/entity';
    import BaseImage from '@shared/components/misc/BaseImage.vue';
    import BaseBanner from '@shared/components/misc/BaseBanner.vue';
    import FavoriteEntityButton from '@shared/components/buttons/FavoriteEntityButton.vue';
    import MusicLinks from './AttractionBanner/MusicLinks.vue';

    export default {
        name: 'AttractionBanner',
        components: {
            BaseBanner,
            BaseImage,
            FavoriteEntityButton,
            MusicLinks
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        data: () => ( {
            gradient: 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
        } ),
        computed: {
            itemId( ) {
                return this.$route.params.id;
            },
            fallbackSrc() {
                let found = categoriesConstants.LIST.find( item => item.ID === this.item.classificationSegmentId );
                return found ? found.FALLBACK : categoriesConstants.DEFAULT_FALLBACK ;
            },
            title() {
                return `${this.item.name} ${this.$t( '_common:terms.ticket_plural' )}`;
            },
            imgHeight() {
                return this.$vuetify.breakpoint.mdAndUp ? 312 : 182;
            },
            entityType() {
                return entityConstants.TYPES.ATTRACTION;
            },
            imageProps() {
                return {
                    src: this.item.imageUrl,
                    fallbackSrc: this.fallbackSrc,
                    height: this.imgHeight,
                    gradient: this.gradient,
                    position: 'top center',
                    validateSrcContentSize: true
                };
            },
            showMusicLinks( ) {
                return this.$vuetify.breakpoint.mdAndUp && this.item.classificationSegmentId === categoriesConstants.LIST_ID.CONCERTS;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-attraction-banner {
    .gst-banner__image {
        min-height: 312px;
    }

    h1 {
        line-height: line-height( 'xxxxxl' );
    }
}

@include mobile-only {
    .gst-attraction-banner {
        .gst-banner__image {
            padding: 0 16px;
            min-height: 182px;
        }
    }
}
</style>
