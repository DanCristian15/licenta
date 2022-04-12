<template>
    <h5 class="gst-event-not-available__title">
        {{ $t( 'title' ) }}
    </h5>
</template>

<script>
    export default {
        name: 'EventStateNoDateWarningCard',
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.noDate'
        },
        props: {
            event: {
                type: Object,
                default: null
            }
        }
    };
</script>