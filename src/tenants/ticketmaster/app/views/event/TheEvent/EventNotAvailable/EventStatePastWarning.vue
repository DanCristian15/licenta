<template>
    <h5 class="gst-event-not-available__title">
        {{ $t( 'title' ) }}
    </h5>
</template>

<script>
    export default {
        name: 'EventStatusPastWarningCard',
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventState.past'
        }
    };
</script>

