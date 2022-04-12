
<template>
    <v-flex d-flex flex-row align-center class="gst-range-edit-values-input">
        <div class="d-flex flex-column flex-shrink-1">
            <div 
                v-if="!editMinValue"
                key="1"
                class="gst-range-edit-values-input__label px-1 d-flex align-center justify-center flex-grow-1"
                @click="toogleEditMinValue( )">
                <slot name="minValueLabel" :value="value[ 0 ]">
                    {{ value[ 0 ] }}
                </slot>
            </div>
            <input
                v-if="editMinValue"
                ref="minValueTextField"
                key="2"
                v-model="inputMinValue"
                type="number"
                :min="min"
                :max="value[1]"
                class="gst-range-edit-values-input__input px-4"
                @keyup.enter="onEditMinValueEnterKeyDo"
                @blur="toogleEditMinValue" />
        </div>
        <v-range-slider
            :value="value"
            :min="min"
            :max="max"
            :step="1"
            color="primary"
            track-color="quinary"
            track-fill-color="primary"
            class="gst-range-edit-values-input__slide mx-4"
            hide-details
            @click="switchToReadRangeValue()"
            @input="onSliderInputDo" />
        <div class="d-flex flex-column flex-shrink-1">
            <div
                v-if="!editMaxValue"
                key="3"
                class="gst-range-edit-values-input__label px-1 d-flex align-center justify-center flex-shrink-1"
                @click="toogleEditMaxValue( )">
                <slot name="maxValueLabel" :value="value[ 1 ]">
                    {{ value [ 1 ] }}
                </slot>
            </div>
            <input
                v-if="editMaxValue"
                key="4"
                ref="maxValueTextField"
                v-model="inputMaxValue"
                type="number"
                :min="value[0]"
                :max="max"
                class="gst-range-edit-values-input__input"
                @keyup.enter="onEditMaxValueEnterKeyDo"
                @blur="toogleEditMaxValue" />
        </div>
    </v-flex>
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
            }
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
            onSliderInputDo( value ) {
                if ( value[ 0 ] !== this.value[0] || value[ 1 ] !== this.value[ 1 ] ) {
                    this.$emit( 'input', value );
                }
            },
            switchToReadRangeValue( ) {
                this.editMinValue = false;
                this.editMaxValue = false;
            },
            onEditMinValueEnterKeyDo( ) {
                this.$refs.minValueTextField.blur( );
            },
            toogleEditMinValue( ) {
                if ( !this.editMinValue ) {
                    this.editMinValue = true;
                    this.inputMinValue = this.value[ 0 ];
                    setTimeout( ( ) => {
                        this.$refs.minValueTextField.focus( );
                    }, 200 );
                } else {
                    if ( !this.priceRangeErrors.length ) {
                        this.$emit( 'input', [ this.inputMinValue, this.value[ 1 ] ] );
                    }
                    this.editMinValue = false;
                }
            },
            onEditMaxValueEnterKeyDo( ) {
                this.$refs.maxValueTextField.blur( );
            },
            toogleEditMaxValue( ) {
                if ( !this.editMaxValue ) {
                    this.editMaxValue = true;
                    this.inputMaxValue = this.value[ 1 ];
                    setTimeout( ( ) => {
                        this.$refs.maxValueTextField.focus( );
                    }, 200 );
                } else {
                    if ( !this.priceRangeErrors.length ) {
                        this.$emit( 'input', [ this.value[ 0 ], this.inputMaxValue ] );
                    }
                    this.editMaxValue = false;
                }
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-range-edit-values-input {
        .gst-range-edit-values-input__label {
            @include font-size('l');
            @include font-weight('regular');
            @include border-radius('xxs');

            height: 36px;
            border: 1px solid theme-color( 'tertiary' );
            color: theme-color( 'quaternary' );
            letter-spacing: -0.47px;
            min-width: 90px;
        }

        .gst-range-edit-values-input__input {
            @include border-radius('xxs');

            height: 36px !important;
            padding-left: 4px;
            border: 1px solid theme-color( 'primary' );
            min-width: 90px;
        }

        .gst-range-edit-values-input__error {
            @include line-height('xxs');
            @include font-size('xxs');
            @include font-weight('regular');

            color: theme-color( 'error' );
            min-height: font-size( 'xxs' );
        }

        .gst-range-edit-values-input__slide {
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
                border-width: 0;
                box-shadow: 0 2px 6px rgba( theme-color( 'black' ), 0.25 );
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
