<template>
    <v-card flat>
        <v-toolbar flat class="flex-grow-0 gst-steps-progress__header">
            <TenantLogo :with-redirect="false" class="gst-steps-progress__icon-logo" />
        </v-toolbar>
        <v-card-text>
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
        </v-card-text>
    </v-card>
</template>

<script>
    import ProgressStepAnimation from '@core/shared/components/misc/ProgressStepAnimation.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    
    export default {
        name: 'ProgressStepAnimationModal',
        components: {
            ProgressStepAnimation
        },
        mixins: [ CloseModalOnRouteChangeMixin ],
        props: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            labels: {
                type: Array,
                required: true
            },
            busEvent: {
                type: Object,
                required: false,
                default: null
            },
            endOnRouteChange: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'close' );
            },
            onEndDo() {
                this.busEvent.$emit( 'end' );
                this.$emit( 'close' );
            }
        },
        mounted() {
            !this.busEvent || this.busEvent.$on( 'close', this.closeModal );
            if ( this.endOnRouteChange ) {
                this.$watch( '$route', ( ) => {
                    this.busEvent.$emit( 'go-to-end' );
                } );
            }
        },
        destroyed() {
            !this.busEvent || this.busEvent.$off( 'close' );
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-steps-progress__header {
        border-bottom: 1px solid theme-color( 'quinary' );
    }

    .gst-steps-progress__container {
        width: 100%;
        padding-top: 140px;
    }

    .gst-steps-progress__container h3,
    .gst-steps-progress__container p {
        color: theme-color( 'black' );
    }

    .gst-steps-progress__container h3 {
        line-height: 30px;
    }

    .gst-steps-progress__container p {
        line-height: 30px;
        font-size: 20px;
        font-weight: normal;
        letter-spacing: -0.88px;
    }

    @include mobile-only {
        .gst-steps-progress__container {
            padding: 32px 30px 0;
        }
    }
</style>