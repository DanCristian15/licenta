<template>
    <v-card class="gst-ticket-preview-image__card" flat>
        <BaseImage class="gst-ticket-preview-image" v-bind="imageProps">
            <template v-if="text" v-slot:content>
                <v-row align="end" class="py-2 fill-height">
                    <v-col>
                        <h4 class="px-4">
                            {{ text }}
                        </h4>
                    </v-col>
                </v-row>
            </template>
        </BaseImage>
    </v-card>
</template>

<script>
    import BaseImage from '@core/shared/components/misc/BaseImage.vue';

    export default {
        name: 'TicketPreviewImage',
        components: {
            BaseImage
        },
        props: {
            imageProps: {
                type: Object,
                default: null
            },
            text: {
                type: String,
                default: null
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-ticket-preview-image__card {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-ticket-preview-image {
        min-height: 140px;

        @include mobile-only {
            max-height: 200px;
        }
    }
</style>
