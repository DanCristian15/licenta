<template>
    <div class="gst-event-info-modal-no-data d-flex flex-column align-center justify-center my-4 my-md-6">
        <StarOutlined v-if="type === 'star'" class="gst-event-info-modal-no-data__icon mb-2" />
        <InfoOutlined v-else-if="type === 'info'" class="gst-event-info-modal-no-data__icon mb-2" />
        <p v-if="content" class="gst-event-info-modal-no-data__content mb-0">
            {{ content }}
        </p>
    </div>
</template>

<script>
    import StarOutlined from '@tenant/app/assets/icons/star-outlined.svg';
    import InfoOutlined from '@tenant/app/assets/icons/info-outlined.svg';

    export default {
        name: 'EventInfoModalNoData',
        components: {
            StarOutlined,
            InfoOutlined
        },
        props: {
            icon: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal-no-data {
        .gst-event-info-modal-no-data__content {
            @include font-size('s');
            @include line-height('xxxl');

            color: theme-color( 'tertiary' );
        }
    }

    @include mobile-only {
        .gst-event-info-modal-no-data {
            .gst-event-info-modal-no-data__content {
                max-width: 60%;
                text-align: center;
            }
        }
    }
</style>
