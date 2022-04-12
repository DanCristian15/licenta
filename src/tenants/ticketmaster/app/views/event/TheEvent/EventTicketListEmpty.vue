<template>
    <div class="gst-event-ticket-list-empty text-center">
        <h5 class="mt-9 mx-6 mx-md-10">
            {{ $t('title') }}
        </h5>
        <p class="mt-4 mx-6 mx-md-10">
            {{ $t('message') }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'EventTicketListEmpty',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventTicketListEmpty'
        }
    };
</script>

<style lang="scss" scoped>
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-list-empty {
        h5 {
            @include font-size('xxxxxl');
            @include font-weight('large');
        }

        p {
            @include font-size('l');
            @include font-weight('regular');
        }

        @include mobile-only {
            h5 {
                @include font-size('xxxxl');
                @include font-weight('large');
            }
        }
    }

</style>