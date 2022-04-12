<template>
    <v-flex
        d-flex
        flex-row
        align-center
        class="gst-indicator mt-4">
        <v-flex
            v-for="step in stepsNotHidden"
            :key="step.index"
            :class="{
                'gst-indicator__step--previous': step.index < currentStep,
                'gst-indicator__step--current': step.index === currentStep,
                'gst-indicator__step--next': step.index > currentStep
            }"
            d-flex
            flex-row
            align-center>
            <v-divider class="gst-indicator__step-divider" />
            <v-flex
                d-flex
                flex-column
                align-center
                shrink
                :class="{
                    'u-mouse-pointer': step.index < currentStep
                }"
                @click="onClickStepDo( step )">
                <div class="gst-indicator__step-inner d-flex align-center justify-center">
                    <IconCircle />
                </div>
                <div class="gst-indicator__step-label">
                    {{ step.labelIndicator }}
                </div>
            </v-flex>
        </v-flex>
        <v-divider class="gst-indicator__step-divider" />
    </v-flex>
</template>
<script>
    import IconCircle from '@core/shared/assets/icons/circle.svg';

    export default {
        name: 'Indicator',
        components: {
            IconCircle
        },
        props: {
            steps: {
                type: Array,
                required: true
            },
            currentStep: {
                type: Number,
                required: true
            }
        },
        computed: {
            stepsNotHidden( ) {
                return this.steps.filter( step => !step.hidden );
            }
        },
        methods: {
            onClickStepDo( step ) {
                ( step.index >= this.currentStep ) || this.$emit( 'go-to-step', step.index );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-indicator {
        padding-bottom: 30px;
    }

    .gst-indicator__step-divider {
        border-color: theme-color( 'quinary' );
    }

    .gst-indicator__step-inner svg {
        position: absolute;
        top: 1px;
        left: 1px;
        height: 6px;
        width: 6px;
    }

    .gst-indicator__step--previous {
        .gst-indicator__step-divider {
            border-color: theme-color( 'primary' );
        }

        .gst-indicator__step-inner {
            position: relative;
            height: 8px;
            width: 8px;
            margin: 4px;
            background: theme-color( 'primary' );
            border-radius: border-radius( 'circle' ) !important;
            box-shadow: 0 0 0 4px theme-color( 'primary' );
        }

        .gst-indicator__step-label {
            display: none;
        }

        .gst-indicator__step-inner svg {
            display: none;
        }
    }

    .gst-indicator__step--current {
        .gst-indicator__step-divider {
            border-color: theme-color( 'primary' );
        }

        .gst-indicator__step-inner {
            position: relative;
            height: 8px;
            width: 8px;
            margin: 4px;
            background: theme-color( 'primary' );
            border-radius: border-radius( 'circle' ) !important;
            box-shadow: 0 0 0 4px theme-color( 'primary' );
        }

        .gst-indicator__step-label {
            position: absolute;
            top: 36px;
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'bold' );
            text-transform: uppercase;
            z-index: 1;
        }
    }

    .gst-indicator__step--next {
        .gst-indicator__step-inner {
            position: relative;
            height: 8px;
            width: 8px;
            margin: 4px;
            background: theme-color( 'quinary' );
            border-radius: border-radius( 'circle' ) !important;
            box-shadow: 0 0 0 4px theme-color( 'quinary' );
        }

        .gst-indicator__step-label {
            display: none;
        }
    }
</style>
