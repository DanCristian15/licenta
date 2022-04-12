<template>
    <HealthCheckTextBody
        :health-check="healthCheck"
        class="gst-checkout-health-check-container my-4" />
</template>

<script>
    import HealthCheckTextBody from '@tenants/ticketmaster/app/views/event/TheEvent/HealthCheckTextBody';

    export default {
        name: 'EventHealthCheckContainer',
        components: {
            HealthCheckTextBody
        },
        props: {
            healthCheck: {
                type: Object,
                required: true,
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-checkout-health-check-container {
    padding: theme-spacing( 5, 4, 4, 4 );
    border: 1px solid theme-color( 'septenary' ) !important;
    background-color: theme-color( 'white' ) !important;
    border-radius: theme-spacing( 1 );
    box-shadow: unset !important;

    .gst-heath-check-body__subtitle {
        padding: theme-spacing( 0 );

        h6 {
            padding-left: theme-spacing( 4 );
        }
    }

    .gst-heath-check-body__content {
        padding: theme-spacing( 3, 6, 0, 10 );
        max-width: 100%;
    }

    @include mobile-only {
        .gst-heath-check-body__learn-more-link {
            display: inline !important;
        }
    }
}
</style>
