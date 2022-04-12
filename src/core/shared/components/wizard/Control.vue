<template>
    <div>
        <transition v-if="destroySteps" name="fade">
            <slot :name="currentSlot"></slot>
        </transition>
        <div v-if="!destroySteps">
            <transition v-for="step in steps" :key="step.index" name="fade">
                <div v-show="currentSlot === step.slot">
                    <slot :name="step.slot"></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            steps: {
                type: Array,
                required: true
            },
            busEvents: {
                type: Object,
                required: false,
                default: null
            },
            controlByRoute: {
                type: Boolean,
                required: false,
                default: false
            },
            routeStepParamName: {
                type: String,
                default: 'step'
            },
            startIndex: {
                type: Number,
                default: 0
            },
            destroySteps: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                currentIndex: this.startIndex,
                maxVisitedStep: 0
            };
        },
        computed: {
            currentSlot() {
                return this.steps[this.currentIndex].slot;
            }
        },
        methods: {
            nextStep( ) {
                let currentIndex = this.currentIndex,
                    steps = this.steps,
                    success = false;

                while ( currentIndex < steps.length && !success ) {
                    currentIndex++;
                    if ( steps[ currentIndex ] && !steps[ currentIndex ].hidden ) {
                        this.maxVisitedStep = Math.max ( this.maxVisitedStep, currentIndex );
                        if ( !this.controlByRoute ) {
                            this.currentIndex = currentIndex;
                            this.$emit( 'change-index', this.currentIndex );
                        } else {
                            let routeParam = {};

                            routeParam[this.routeStepParamName ] = currentIndex;
                            this.$router.push( { name: this.$route.name, params: routeParam } );
                        }
                        success = true;
                    }
                }
            },
            previousStep( ) {
                let currentIndex = this.currentIndex,
                    steps = this.steps,
                    success = false;

                while ( currentIndex > 0 && !success ) {
                    currentIndex--;
                    if ( !steps[ currentIndex ].hidden ) {
                        if ( !this.controlByRoute ) {
                            this.currentIndex = currentIndex;
                            this.$emit( 'change-index', this.currentIndex );
                            success = true;
                        } else {
                            let routeParam = {};
                            routeParam[this.routeStepParamName ] = currentIndex;

                            this.$router.push( { name: this.$route.name, params: routeParam } );
                            break;
                        }
                    }
                }
            },
            goToStep( stepIndex ) {
                const { steps } = this;
                const stepToGo = steps[ stepIndex ];

                if ( stepIndex === this.currentIndex || !stepToGo || stepToGo.hidden ) {
                    return;
                }
                if ( !this.controlByRoute ) {
                    this.currentIndex = stepIndex;
                    this.$emit( 'change-index', this.currentIndex );
                } else {
                    let routeParam = {};
                    routeParam[this.routeStepParamName ] = stepIndex;

                    this.$router.push( { name: this.$route.name, params: routeParam } );
                }

            },
            validateStep( step ) {
                let stepNum = parseInt ( step );

                return !( isNaN( stepNum ) || stepNum > this.maxVisitedStep || this.steps[stepNum].hidden );
            }
        },
        created() {
            !this.busEvents || this.busEvents.$on( 'next', this.nextStep );
            !this.busEvents || this.busEvents.$on( 'back', this.previousStep );
            !this.busEvents || this.busEvents.$on( 'go-to-step', this.goToStep );

            if ( this.controlByRoute ) {
                let routeStepParam = this.$route.params[this.routeStepParamName],
                    routeName = this.$route.name,
                    routeParam = {};

                if ( this.$route.params.rolling )
                    routeParam['rolling'] = this.$route.params.rolling;

                if ( !this.validateStep ( routeStepParam ) ) {
                    routeParam[this.routeStepParamName ] = 0;
                    this.$router.replace( { name: routeName, params: routeParam } );
                }
                this.$watch( '$route', function ( to ) {
                    let routeStepParam = to.params[this.routeStepParamName],
                        routeName = to.name,
                        routeParam = {};

                    if ( !this.validateStep( routeStepParam ) ) {
                        routeParam[this.routeStepParamName ] = this.currentIndex;
                        this.$router.replace( { name: routeName, params: routeParam } );
                    } else{
                        this.currentIndex = parseInt( routeStepParam );
                        this.$emit( 'change-index', this.currentIndex );
                    }
                } );
            }

        },
        destroyed() {
            !this.busEvents || this.busEvents.$off( 'next' );
            !this.busEvents || this.busEvents.$off( 'back' );
            !this.busEvents || this.busEvents.$off( 'go-to-step' );
        },

    };
</script>

<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        height: 0;
        opacity: 0;
    }
</style>
