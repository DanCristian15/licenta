<template>
    <v-card flat color="transparent" class="gst-price-range">
        <v-card-text class="py-0 px-0">
            <v-flex d-flex flex-row align-center class="mb-3">
                <transition name="fade" mode="out-in">
                    <v-flex
                        v-if="!editMinValue"
                        key="1"
                        d-flex
                        align-center
                        justify-center
                        grow
                        class="px-2 gst-price-range__label"
                        @click="toogleEditMinValue( )">
                        {{ minValue | currencyFull( currency ) }}
                    </v-flex>
                    <v-text-field
                        v-if="editMinValue"
                        ref="minValueTextField"
                        key="2"
                        v-model="minValue"
                        :error-messages="priceRangeErrors"
                        type="number"
                        :min="min"
                        :max="value[1]"
                        color="primary"
                        single-line
                        outlined
                        hide-details
                        class="gst-input--secondary gst-price-range__textfield"
                        data-hj-allow
                        @keyup.enter="toogleEditMinValue( )"
                        @blur="toogleEditMinValue( )" />
                </transition>
                <v-flex shrink class="px-2 gst-price-range__separator">
                    -
                </v-flex>
                <transition name="fade" mode="out-in">
                    <v-flex
                        v-if="!editMaxValue"
                        key="1"
                        d-flex
                        align-center
                        justify-center
                        grow
                        class="px-2 gst-price-range__label"
                        @click="toogleEditMaxValue( )">
                        {{ maxValue | currencyFull( currency ) }}
                    </v-flex>
                    <v-text-field
                        v-if="editMaxValue"
                        key="2"
                        ref="maxValueTextField"
                        v-model="maxValue"
                        type="number"
                        :error-messages="priceRangeErrors"
                        :min="value[0]"
                        :max="max"
                        color="primary"
                        single-line
                        outlined
                        hide-details
                        class="gst-input--secondary gst-price-range__textfield"
                        data-hj-allow
                        @keyup.enter="toogleEditMaxValue( )"
                        @blur="toogleEditMaxValue( )" />
                </transition>
            </v-flex>
            <v-flex
                class="gst-price-range__error pl-3">
                {{ priceRangeErrors[0] }}
            </v-flex>
            <v-range-slider
                :value="value"
                :min="min"
                :max="max"
                :step="1"
                color="primary"
                track-color="quinary"
                track-fill-color="primary"
                class="gst-price-range__slide"
                hide-details
                @click="switchToReadRangeValue()"
                @input="onInputChangeDo" />
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'PriceRange',
        props: {
            value: {
                type: Array,
                default: function ( ) { return [ 0, 1000 ]; }
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 5000
            },
            currency: {
                type: String,
                default: ''
            }
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.input.priceRange',
        },
        data() {
            return {
                editMinValue: false,
                editMaxValue: false,
                inputMinValue: this.value[ 0 ],
                inputMaxValue: this.value[ 1 ],
            };
        },
        computed: {
            minValue: {
                get( ) {
                    return this.value[ 0 ];
                },
                set( val ) {
                    const value = parseInt( val || 0 );


                    this.inputMinValue = value;
                    if ( value < this.min || value > this.value[ 1 ] ) {
                        return;
                    } else {
                        this.$emit( 'input', [ value, this.value[ 1 ] ] );
                    }
                }
            },
            maxValue: {
                get( ) {
                    return this.value[ 1 ];
                },
                set( val ) {
                    const value = parseInt( val || 0 );

                    this.inputMaxValue = value;
                    if ( value > this.max || value < this.value[ 0 ] ) {
                        return;
                    } else {
                        this.$emit( 'input', [ this.value[ 0 ], value ] );
                    }
                }
            },
            priceRangeErrors( ) {
                const { editMinValue, editMaxValue, inputMinValue, inputMaxValue } = this;
                let ret = [ ];

                if ( editMinValue ) {
                    if ( inputMinValue < this.min || inputMinValue > this.value[ 1 ] ) {
                        ret.push( this.$t(
                            '_common:formErrors.betweenField',
                            {
                                field: this.$t( 'labels.min' ),
                                min: this.min,
                                max: this.value[ 1 ]
                            },
                        ) );
                    }
                }
                if ( editMaxValue ) {
                    if ( inputMaxValue > this.max || inputMaxValue < this.value[ 0 ] ) {
                        ret.push( this.$t(
                            '_common:formErrors.betweenField',
                            {
                                field: this.$t( 'labels.max' ),
                                min: this.value[ 0 ],
                                max: this.max
                            },
                        ) );
                    }
                }

                return ret;
            }
        },
        watch: {
            'value': {
                handler: function( value ) {
                    this.inputMinValue = value[ 0 ];
                    this.inputMaxValue = value[ 1 ];
                },
                deep: true
            },
            'priceRangeErrors': {
                handler: function( value, oldValue ) {
                    if ( value.length !== oldValue.length ) {
                        this.$emit( 'validation-change', !value.length );
                    }
                },
                deep: true
            }
        },
        methods: {
            onInputChangeDo( value ) {
                if ( value[ 0 ] !== this.value[0] || value[ 1 ] !== this.value[ 1 ] ) {
                    this.$emit( 'input', value );
                }
            },
            switchToReadRangeValue( ) {
                this.editMinValue = false;
                this.editMaxValue = false;
            },
            toogleEditMinValue( ) {
                if ( !this.editMinValue ) {
                    this.editMinValue = true;
                    setTimeout( ( ) => {
                        this.$refs.minValueTextField.focus( );
                    }, 200 );
                } else {
                    this.editMinValue = false;
                    this.inputMinValue = this.value[ 0 ];
                }
            },
            toogleEditMaxValue( ) {
                if ( !this.editMaxValue ) {
                    this.editMaxValue = true;
                    setTimeout( ( ) => {
                        this.$refs.maxValueTextField.focus( );
                    }, 200 );
                } else {
                    this.editMaxValue = false;
                    this.inputMaxValue = this.value[ 1 ];
                }
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-price-range {
        .gst-price-range__label {
            height: 60px;
            background-color: theme-color( 'quinary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.47px;
            border-radius: border-radius( 'm' ) !important;
            min-width: 155px;
            border-color: theme-color( 'septenary' );
            border-width: 1px;
            border-style: solid;
        }

        .gst-price-range__textfield {
            height: 60px;
            border-radius: border-radius( 'm' ) !important;
            min-width: 155px;

            .v-input__control,
            .v-input__slot {
                height: 100%;
            }
        }

        .gst-price-range__separator {
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
        }

        .gst-price-range__error {
            line-height: line-height( 'xxs' );
            color: theme-color( 'error' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
            min-height: font-size( 'xxs' );
        }

        .gst-price-range__slide {
            .v-slider__thumb {
                left: -13px;
            }

            .v-slider--horizontal {
                margin-right: 0;
                margin-left: 0;
            }

            .v-slider__track-container {
                height: 6px !important;
            }

            .v-slider__thumb.primary {
                height: 28px !important;
                width: 28px !important;
                background: theme-color( 'white' ) !important;
                border-style: solid;
                border-width: 2px;
                box-shadow: 0 2px 4px 0 theme-color( 'shadow' );
            }

            .v-slider__thumb.primary::before {
                display: none;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.1s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
