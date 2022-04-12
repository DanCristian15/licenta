<template>
    <v-flex d-flex flex-row align-center class="gst-numeric-step-input">
        <v-btn
            depressed
            outlined
            color="quinary"
            class="gst-numeric-step-input__minus-btn"
            :class="{ 'gst-numeric-step-input__minus-btn--disabled' : !hasPreviousValue }"
            @click="decrement">
            <IconMinus v-bind="iconsAttrs" />
        </v-btn>
        <span class="gst-numeric-step-input__content px-4">
            {{ value }}
        </span>
        <v-btn
            depressed
            outlined
            color="quinary"
            class="gst-numeric-step-input__plus-btn"
            :class="{ 'gst-numeric-step-input__plus-btn--disabled' : !hasNextValue }"
            @click="incredement">
            <IconPlus v-bind="iconsAttrs" />
        </v-btn>
    </v-flex>
</template>

<script>
    import IconMinus from '@shared/assets/icons/minus.svg';
    import IconPlus from '@shared/assets/icons/plus.svg';

    export default {
        name: 'NumericStep',
        components: {
            IconMinus,
            IconPlus
        },
        props: {
            value: {
                type: Number,
                required: true
            },
            min: {
                type: Number,
                required: false,
                default: 0
            },
            max: {
                type: Number,
                required: false,
                default: 50000000
            },
            step: {
                type: Number,
                default: 1
            },
            values: {
                type: Array,
                required: false,
                default: null
            },
            iconsAttrs: {
                type: Object,
                required: false,
                default: () => ( {
                    width: 24,
                    height: 24
                } )
            }
        },
        computed: {
            rangeValues( ) {
                const { values } = this;
                const compareNumbers = ( firstEl, secondEl ) => {
                    return firstEl - secondEl;
                };

                if ( values && values.length ) {
                    return [ 0, ...( values.map( item => item * 1 ) ) ].sort( compareNumbers );
                }
                return [ ];
            },
            hasRangeValues( ) {
                return !!this.rangeValues.length;
            },
            nextValue( ) {
                const { value, max, step } = this;

                if ( this.hasRangeValues ) {
                    const index = this.rangeValues.findIndex( item => item === value );

                    if ( index + step >= this.rangeValues.length || this.rangeValues[ index +1 ] > max ) {
                        return null;
                    }

                    return this.rangeValues[ index + 1 ];
                }

                return ( value + step > max ) ? null :  ( value + step );
            },
            hasNextValue( ) {
                return this.nextValue !== null;
            },
            previousValue( ) {
                const { value, min, step } = this;

                if ( this.hasRangeValues ) {
                    const index = this.rangeValues.findIndex( item => item === value );

                    if ( index - step < 0 || this.rangeValues[ index + 1 ] < min ) {
                        return null;
                    }

                    return this.rangeValues[ index - 1 ];
                }

                return ( value - step < min ) ? null : ( value - step );
            },
            hasPreviousValue( ) {
                return this.previousValue !== null;
            },
        },
        methods: {
            incredement( ) {
                const { hasNextValue, nextValue } = this;

                ( !hasNextValue ) || this.$emit( 'input', nextValue );
            },
            decrement( ) {
                const { hasPreviousValue, previousValue } = this;

                ( !hasPreviousValue ) || this.$emit( 'input', previousValue );
            },
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $section-height: 44px;

    .gst-numeric-step-input {
        height: $section-height;

        .gst-numeric-step-input__content {
            line-height: $section-height - 2;
            border: 1px solid theme-color( 'quinary' );
            background-color: theme-color( 'quinary' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'bold' );
        }

        .gst-numeric-step-input__minus-btn {
            border-radius: border-radius( 'm', 'none', 'none', 'm' );

            svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' );
                }
            }
        }

        .gst-numeric-step-input__plus-btn {
            border-radius: border-radius( 'none', 'm', 'm', 'none' );

            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }

        .gst-numeric-step-input__minus-btn--disabled,
        .gst-numeric-step-input__plus-btn--disabled {
            svg {
                opacity: 0.4;
            }
        }
    }
</style>

<style>
    .gst-numeric-step-input__minus-btn,
    .gst-numeric-step-input__plus-btn {
        height: 44px !important;
        width: 44px !important;
        min-width: 44px !important;
    }
</style>
