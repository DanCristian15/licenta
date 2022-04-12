<template>
    <v-flex class="gst-progress-step-animation d-flex flex-wrap flex-column justify-center">
        <div
            v-for="(label, index) in labels"
            :key="index"
            class="gst-progress-step-animation__step text-center"
            :class="{
                'active': isActive(index),
                'complete': isComplete(index),
                'faster': endingFaster
            }">
            <div class="gst-progress-step-animation__step-icon my-4 mx-auto">
                <IconCircleStrokeDashed v-if="isLoading(index)" class="gst-progress-step-animation__step-svg-loader" />
                <IconProgressStep
                    class="gst-progress-step-animation__step-svg"
                    @animationstart="onIconAnimationStartDo" />
            </div>
            <p
                class="gst-progress-step-animation__step-label mb-4"
                @animationend="onLabelAnimationEndDo(index)">
                {{ label }}
            </p>
            <div
                v-if="!isLast(index)"
                class="gst-progress-step-animation__step-progress-bar"
                @animationend="onProgressBarAnimationEndDo(index)"></div>
        </div>
    </v-flex>
</template>

<script>
    import IconProgressStep from '@core/shared/assets/icons/animation/progress_step.svg';
    import IconCircleStrokeDashed from '@core/shared/assets/icons/circle_stroke_dashed.svg';

    export default {
        name: 'ProgressStepAnimation',
        components: {
            IconProgressStep,
            IconCircleStrokeDashed
        },
        props: {
            labels: {
                type: Array,
                required: true
            },
            busEvent: {
                type: Object,
                required: false,
                default: null
            }
        },
        data() {
            return {
                step: 0,
                activeStep: 0,
                loading: true,
                endingFaster: false
            };
        },
        methods: {
            goToStep( stepIndex ) {
                if ( stepIndex > this.labels.length ) {
                    this.step = this.labels.length;
                } else {
                    this.step = stepIndex;
                }
            },
            nextStep() {
                if ( this.step <= this.labels.length ) {
                    this.step = this.step+1;
                }
            },
            goToEnd() {
                this.endingFaster = true;
                this.step = this.labels.length + 1;
            },
            onProgressBarAnimationEndDo( stepIndex ) {
                this.loading = true;
                this.activeStep = stepIndex+1;
            },
            onLabelAnimationEndDo( stepIndex ) {
                if ( this.isLast( stepIndex ) ) {
                    this.activeStep = stepIndex+1;
                    this.$emit( 'end' );
                }
            },
            onIconAnimationStartDo() {
                this.loading = false;
            },
            isLast( stepIndex ) {
                return !( stepIndex+1 < this.labels.length );
            },
            isLoading( stepIndex ) {
                return this.loading && this.activeStep === stepIndex;
            },
            isActive( stepIndex ) {
                return this.step > stepIndex+1 && this.activeStep >= stepIndex;
            },
            isComplete( stepIndex ) {
                return this.activeStep >= stepIndex+1;
            }
        },
        mounted() {
            !this.busEvent || this.busEvent.$on( 'go-to-step', this.goToStep );
            !this.busEvent || this.busEvent.$on( 'go-to-end', this.goToEnd );
            !this.busEvent || this.busEvent.$on( 'next', this.nextStep );
        },
        destroyed() {
            !this.busEvent || this.busEvent.$off( 'go-to-step' );
            !this.busEvent || this.busEvent.$off( 'go-to-end' );
            !this.busEvent || this.busEvent.$off( 'next' );
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-progress-step-animation {
        .gst-progress-step-animation__step {
            .animation-border {
                animation-name: border;
                animation-duration: 1s;
                animation-fill-mode: forwards;
                animation-delay: 0.5s;
            }

            .animation-circle {
                animation-name: circle;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
                animation-delay: 0.8s;
            }

            .animation-check {
                animation-name: check;
                animation-duration: 0.6s;
                animation-fill-mode: forwards;
                animation-delay: 0.8s;
            }

            .animation-label {
                animation-name: label;
                animation-duration: 0.15s;
                animation-fill-mode: forwards;
                animation-delay: 1.2s;
            }

            .animation-progress {
                animation-name: progress;
                animation-duration: 1.2s;
                animation-fill-mode: forwards;
                animation-delay: 1.2s;
            }

            .animation-loader {
                animation-name: loader;
                animation-duration: 5s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }

            .gst-progress-step-animation__step-icon {
                position: relative;
                height: 20px;
                width: 20px;

                .gst-progress-step-animation__step-svg-loader {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    transform-origin: 50% 50%;

                    @extend .animation-loader;

                    .gst-svg-icon {
                        stroke: theme-color( 'primary' );
                    }
                }

                .gst-progress-step-animation__step-svg {
                    height: 100%;
                    width: 100%;
                }

                .gst-svg-icon-progress-step-circle {
                    fill: theme-color( 'quinary' );
                    transform-origin: 50% 50%;
                    transform: scale( 0.8 );
                }

                .gst-svg-icon-progress-step-check {
                    stroke-opacity: 0;
                    stroke: theme-color( 'white' );
                }

                .gst-svg-icon-progress-step-border {
                    stroke-dasharray: 227;
                    stroke-dashoffset: 227;
                    stroke: theme-color( 'primary' );
                }
            }

            .gst-progress-step-animation__step-label {
                line-height: 14px;
                color: theme-color( 'tertiary' );
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                transition: color 150ms ease-in-out;
            }

            .gst-progress-step-animation__step-progress-bar {
                position: relative;
                height: 45px;
                width: 2px;
                margin: 0 auto;
                background: theme-color( 'quinary' );
                border-radius: border-radius( 'm' );
            }

            .gst-progress-step-animation__step-progress-bar::before {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: theme-color( 'primary' );
                content: "";
                max-height: 0%;
            }
        }

        .gst-progress-step-animation__step.active {
            .gst-svg-icon-progress-step-circle {
                @extend .animation-circle;
            }

            .gst-svg-icon-progress-step-check {
                @extend .animation-check;
            }

            .gst-svg-icon-progress-step-border {
                @extend .animation-border;
            }

            .gst-progress-step-animation__step-label {
                @extend .animation-label;
            }

            .gst-progress-step-animation__step-progress-bar::before {
                @extend .animation-progress;
            }
        }

        .gst-progress-step-animation__step.faster {
            .gst-svg-icon-progress-step-border {
                @extend .animation-border;

                animation-duration: 0.1s;
                animation-delay: 0.01s;
            }

            .gst-svg-icon-progress-step-circle {
                @extend .animation-circle;

                animation-duration: 0.1s;
                animation-delay: 0.11s;
            }

            .gst-svg-icon-progress-step-check {
                @extend .animation-check;

                animation-duration: 0.1s;
                animation-delay: 0.11s;
            }

            .gst-progress-step-animation__step-label {
                @extend .animation-label;

                animation-duration: 0.1s;
                animation-delay: 0.21s;
            }

            .gst-progress-step-animation__step-progress-bar::before {
                @extend .animation-progress;

                animation-duration: 0.1s;
                animation-delay: 0.21s;
            }
        }

        .gst-progress-step-animation__step.complete {
            .gst-svg-icon-progress-step-circle,
            .gst-svg-icon-progress-step-check,
            .gst-svg-icon-progress-step-border,
            .gst-progress-step-animation__step-label,
            .gst-progress-step-animation__step-progress-bar::before {
                animation-duration: 0s;
                animation-delay: 0s;
            }
        }
    }

    @keyframes check {
        0% {
            stroke-opacity: 0;
            stroke-dasharray: 29;
            stroke-dashoffset: 29;
        }

        100% {
            stroke-opacity: 1;
            stroke-dashoffset: 0;
        }
    }

    @keyframes circle {
        0% {
            fill: theme-color( 'white' );
            transform: scale( 0 );
        }

        100% {
            fill: theme-color( 'primary' );
            transform: scale( 1 );
        }
    }

    @keyframes border {
        0% {
            stroke-opacity: 1;
        }

        100% {
            stroke-opacity: 1;
            stroke-dashoffset: 0;
        }
    }

    @keyframes label {
        100% {
            color: theme-color( 'primary' );
        }
    }

    @keyframes progress {
        100% {
            max-height: 100%;
        }
    }

    @keyframes loader {
        0% {
            transform: rotate( 0deg );
        }

        100% {
            transform: rotate( 360deg );
        }
    }
</style>