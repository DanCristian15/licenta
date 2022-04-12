<template>
    <h5 class="gst-event-not-available__title">
        {{ $t( 'title' ) }}
    </h5>
</template>

<script>
    export default {
        name: 'EventTicketStatusNotAvailableWarningCard',
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventTicketStatus.notAvailable'
        }
    };
</script>