<template>
    <div flat class="gst-step3-payment-split">
        <div
            :class="{
                'gst-step3-payment-split__input--error': hasErrors
            }"
            class="gst-step3-payment-split__input pa-4">
            <v-flex d-flex flex-row align-center class="mb-3">
                <v-flex d-flex :style="{flex: '1 0'}">
                    <transition name="fade" mode="out-in">
                        <v-flex
                            v-if="!editPoints"
                            key="1"
                            d-flex
                            align-center
                            justify-center
                            grow
                            class="px-2 gst-step3-payment-split__label"
                            @click="toogleEditPointsValue( )">
                            {{ $t("_common:terms.bonusPointWithCount", {count: pointsValue, formattedCount: pointsFormated} ) }}
                        </v-flex>
                        <v-text-field
                            v-if="editPoints"
                            ref="pointsTextField"
                            key="2"
                            v-model="pointsValue"
                            type="number"
                            min="0"
                            :max="maxPoints"
                            color="primary"
                            single-line
                            outlined
                            hide-details
                            class="gst-input--secondary gst-step3-payment-split__textfield"
                            @keyup="enforceMinMax( $refs.pointsTextField.$refs.input )"
                            @keyup.enter="toogleEditPointsValue( )"
                            @blur="toogleEditPointsValue( )" />
                    </transition>
                </v-flex>
                <v-flex shrink class="px-2 gst-step3-payment-split__separator">
                    {{ $t('_common:terms.and') }}
                </v-flex>
                <v-flex :style="{flex: '1 0'}">
                    <transition name="fade" mode="out-in">
                        <v-flex
                            v-if="!editAmount"
                            key="1"
                            d-flex
                            align-center
                            justify-center
                            grow
                            class="px-2 gst-step3-payment-split__label"
                            @click="toogleEditAmountValue( )">
                            {{ amountValue | currencyFull( currency ) }}
                        </v-flex>
                        <v-text-field
                            v-if="editAmount"
                            key="2"
                            ref="amountTextField"
                            v-model="amountValue"
                            type="number"
                            min="0"
                            :max="maxAmount"
                            color="primary"
                            single-line
                            outlined
                            hide-details
                            class="gst-input--secondary gst-step3-payment-split__textfield"
                            @keyup="enforceMinMax( $refs.amountTextField.$refs.input )"
                            @keyup.enter="toogleEditAmountValue( )"
                            @blur="toogleEditAmountValue( )" />
                    </transition>
                </v-flex>
            </v-flex>
            <v-slider
                v-model="sliderValue"
                min="0"
                :max="maxPoints"
                color="primary"
                track-color="quinary"
                track-fill-color="primary"
                class="gst-step3-payment-split__slide"
                hide-details
                @click="switchToReadRangeValue()" />
        </div>
        <v-expand-transition>
            <div v-if="hasBonusPointsMaxError" class="v-messages__wrapper error-text pl-4 pt-2">
                <div class="v-messages__message">
                    {{ $t('messages.bonusPointsError' ) }}
                </div>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
    import {
        calculatePointsRemainingFromTotal as bonusPointsUtilsCalculatePointsRemainingFromTotal,
        calculateAmountRemainingFromTotal as bonusPointsUtilsCalculateAmountRemainingFromTotal
    } from '@core/utils/bonusPointsUtils';

    export default {
        name: 'Step3PaymentSplit',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step3Payment'
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            bonusPointsRate: {
                type: Number,
                required: true,
            },
            maxPoints: {
                type: Number,
                required: true
            },
            maxAmount: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                editPoints: false,
                editAmount: false
            };
        },
        computed: {
            pointsValue: {
                get( ) {
                    return this.value.points;
                },
                set( newValue ) {
                    const value = newValue * 1;

                    if ( value != this.value.points ) {
                        this.$emit( 'input', { points: value, amount: this.getAmountsRemaining( value ) } );
                    }
                }
            },
            amountValue: {
                get( ) {
                    return this.value.amount;
                },
                set( newValue ) {
                    const value = newValue * 1;
                    if ( value != this.value.amount ) {
                        this.$emit( 'input', { points: this.getPointsRemaining( value ), amount: value } );
                    }
                }
            },
            sliderValue: {
                get( ) {
                    return this.pointsValue;
                },
                set( newValue ) {
                    const value = newValue * 1;

                    if ( value != this.pointsValue ) {
                        this.$emit( 'input', { points: value, amount: this.getAmountsRemaining( value )  } );
                    }
                }
            },
            pointsFormated( ) {
                return this.$options.filters.bonusPoints( this.pointsValue );
            },
            hasErrors( ) {
                return this.hasBonusPointsMaxError;
            },
            hasBonusPointsMaxError ( ) {
                return this.value.points > this.maxPoints;
            }
        },
        methods: {
            getPointsRemaining( amount ) {
                return bonusPointsUtilsCalculatePointsRemainingFromTotal( this.maxAmount, amount, this.bonusPointsRate );
            },
            getAmountsRemaining ( points ) {
                return bonusPointsUtilsCalculateAmountRemainingFromTotal( this.maxAmount, points, this.bonusPointsRate );
            },
            switchToReadRangeValue( ) {
                this.editPoints = false;
                this.editAmount = false;
            },
            toogleEditPointsValue( ) {
                if ( !this.editPoints ) {
                    this.editPoints = true;
                    setTimeout( ( ) => {
                        this.$refs.pointsTextField.focus( );
                    }, 200 );
                } else {
                    this.editPoints = false;
                }
            },
            toogleEditAmountValue( ) {
                if ( !this.editAmount ) {
                    this.editAmount = true;
                    setTimeout( ( ) => {
                        this.$refs.amountTextField.focus( );
                    }, 200 );
                } else {
                    this.editAmount = false;
                }
            },
            enforceMinMax( el ) {
                if( el.value != '' ) {
                    if( parseInt( el.value ) < parseInt( el.min ) ) {
                        el.value = el.min;
                    }
                    if( parseInt( el.value ) > parseInt( el.max ) ){
                        el.value = el.max;
                    }
                }
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-step3-payment-split {
        .gst-step3-payment-split__input {
            border: 1px solid theme-color( 'quinary' );
            border-radius: border-radius( 'm' ) !important;
        }

        .gst-step3-payment-split__input--error {
            border-color: theme-color( 'error' );
        }

        .gst-step3-payment-split__label {
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

        .gst-step3-payment-split__textfield {
            height: 60px;
            border-radius: border-radius( 'm' ) !important;
            min-width: 155px;

            .v-input__control,
            .v-input__slot {
                height: 100%;
            }
        }

        .gst-step3-payment-split__separator {
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
        }

        .gst-step3-payment-split__slide {
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

        .error-text {
            color: red;
        }
    }

    @include mobile-only {
        .gst-step3-payment-split {
            .gst-step3-payment-split__label {
                min-width: 125px;
            }

            .gst-step3-payment-split__textfield {
                min-width: 125px;
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
