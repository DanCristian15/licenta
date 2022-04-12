<template>
    <div 
        class="gst-data-loading-overlay"
        :class="{ 'gst-data-loading-overlay--no-full-page': !fullPage }">
        <slot></slot>
        <v-overlay :absolute="!fullPage" :color="color" :value="show" :opacity="opacity">
            <DataLoading class="mt-5 mb-5 pt-5 pb-5" />
        </v-overlay>
    </div>
</template>

<script>
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';

    export default {
        name: 'DataLoadingOverlay',
        components: {
            DataLoading
        },
        props: {
            fullPage: {
                type: Boolean,
                default: false
            },
            show: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: 'overlay'
            },
            opacity: {
                type: [ Number, String ],
                default: '0.46'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-data-loading-overlay--no-full-page {
        position: relative;
    }
</style>
