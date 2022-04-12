<template>
    <div class="gst-under-construction">
        Under Construction
    </div>
</template>

<script>
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChange from '@core/mixins/modals/CloseModalOnBreakpointChange';

    export default {
        name: 'HealthCheckModalDesktop',
        mixins: [ 
            CloseModalOnRouteChangeMixin,
            CloseModalOnBreakpointChange
        ]
    };
</script>

<style scoped>
    .gst-under-construction {
        background-color: #FFFFFF;
    }
</style>