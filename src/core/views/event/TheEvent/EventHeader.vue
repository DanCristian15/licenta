<template>
    <Header :show-main-menu="false" class="gst-event-header" />
</template>

<script>
    import Header from '@shared/layouts/components/Header';

    export default {
        name: 'EventHeader',
        components: {
            Header
        }
    };
</script>