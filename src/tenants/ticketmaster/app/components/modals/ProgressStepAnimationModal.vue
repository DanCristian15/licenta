<template>
    <div class="gst-steps-progress">
        <div class="gst-steps-progress__container text-center">
            <h3 v-if="title" class="mb-2">
                {{ title }}
            </h3>
            <p v-if="description" class="mb-2">
                {{ description }}
            </p>
            <v-flex>
                <ProgressStepAnimation 
                    :class="{
                        'pt-16': $vuetify.breakpoint.mdAndUp || !$vuetify.breakpoint.mdAndUp && !description
                    }"
                    :labels="labels" 
                    :bus-event="busEvent" 
                    @end="onEndDo" />
            </v-flex>
        </div>
    </div>
</template>

<script>
    import ProgressStepAnimationModal from '@core/shared/components/modals/ProgressStepAnimationModal';
    import ProgressStepAnimation from '../misc/ProgressStepAnimation.vue';
    
    export default {
        name: 'ProgressStepAnimationModal',
        extends: ProgressStepAnimationModal,
        components: {
            ProgressStepAnimation
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-steps-progress {
        height: 100%;
        width: 100%;
        background-color: theme-color( 'white' );

        .gst-steps-progress__container {
            height: 100%;
            width: 100%;
            padding-top: 170px !important;
        }
    
        .gst-steps-progress__container h3 {
            line-height: 30px;
            color: theme-color( 'quaternary' );
        }
    
        .gst-steps-progress__container p {
            line-height: 30px;
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
            font-weight: normal !important;
            letter-spacing: -0.88px;
        }
    
        @include mobile-only {
            .gst-steps-progress__container {
                padding: 32px 30px 0;
            }
        }
    }
</style>