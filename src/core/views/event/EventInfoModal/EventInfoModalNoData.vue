<template>
    <div class="gst-event-info-modal__no-data d-flex flex-column align-center justify-center">
        <v-icon v-if="icon" class="gst-event-info-modal__no-data-icon mb-2" v-text="icon" />
        <p v-if="content" class="gst-event-info-modal__no-data-content mb-0">
            {{ content }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'EventInfoModalNoData',
        props: {
            icon: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal__no-data {
        .gst-event-info-modal__no-data-icon .v-icon__component {
            height: auto;
            width: auto;
        }

        .gst-event-info-modal__no-data-content {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
        }
    }
</style>