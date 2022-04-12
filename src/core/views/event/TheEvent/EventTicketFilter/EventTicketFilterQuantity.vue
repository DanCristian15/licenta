<template>
    <v-flex d-flex flex-row shrink align-center>
        <BaseTooltip
            v-for="item in optionsBase"
            :key="item"
            :disabled="isEnabled( item )"
            :text="$t( '_common:messages.ticketsMaximumQuantityWarning')"
            :open-on-hover="false"
            class-content="gst-ticket-filter-quantity__tooltip gst-base-tooltip"
            top>
            <BaseButton
                :placeholder="buttonLabel( item )"
                :disabled="!isEnabled( item )"
                :class="{
                    'gst-ticket-filter-quantity__btn--hover': $vuetify.breakpoint.lgAndUp,
                    'v-btn-active v-item--active': item === value,
                    'gst-btn-disabled-default': !isEnabled( item )
                }"
                class="mr-2 py-0 gst-ticket-filter-quantity__btn"
                @click="selectQuantity( item )" />
        </BaseTooltip>
        <v-menu
            v-if="optionsExtra.length || options.maxQuantity > maxOptionsExtra"
            v-model="menuOpened"
            :disabled="!isOptionsExtraEnabled && options.maxQuantity <= maxOptionsExtra"
            offset-y
            :close-on-content-click="false"
            content-class="gst-ticket-filter-quantity__menu">
            <template v-slot:activator="{ on }">
                <div v-on="on">
                    <BaseButton
                        class="py-0 gst-ticket-filter-quantity__btn gst-ticket-filter-quantity__btn-other"
                        :disabled="!isOptionsExtraEnabled && options.maxQuantity <= maxOptionsExtra"
                        :class="{
                            'v-btn-active v-item--active': optionsExtra.find( item => item === value ) || value > maxOptionsExtra,
                            'gst-ticket-filter-quantity__btn--hover': $vuetify.breakpoint.lgAndUp,
                            'gst-btn-disabled-default': !isOptionsExtraEnabled && options.maxQuantity <= maxOptionsExtra
                        }">
                        <IconDotsHorizontal />
                    </BaseButton>
                </div>
            </template>
            <v-card class="gst-ticket-filter-quantity">
                <v-card flat class="px-4 pb-4">
                    <v-layout wrap>
                        <v-flex
                            v-for="item in optionsExtra"
                            :key="item"
                            class="mt-4"
                            xs6>
                            <BaseButton
                                :key="item"
                                :value="item"
                                :placeholder="buttonLabel( item )"
                                :disabled="!isEnabled( item )"
                                :class="{
                                    'v-btn-active v-item--active': value === item,
                                    'gst-ticket-filter-quantity__btn--hover': $vuetify.breakpoint.lgAndUp,
                                    'gst-btn-disabled-default': !isEnabled( item )
                                }"
                                class="py-0 gst-ticket-filter-quantity__btn gst-ticket-filter-quantity__btn-other"
                                @click="selectQuantity( item )" />
                        </v-flex>
                    </v-layout>
                </v-card>
                <template v-if="options.maxQuantity > maxOptionsExtra">
                    <v-divider v-if="$vuetify.breakpoint.mdAndUp" />
                    <v-card class="px-4 pt-md-4" flat>
                        <v-card-text class="pa-0">
                            <h5 class="gst-ticket-filter-quantity__custom-quantity-label mb-2 text-uppercase">
                                {{ $t( 'titleCustom' ) }}
                            </h5>
                            <transition name="fade" mode="out-in">
                                <v-flex
                                    v-if="!editInputCustomQuantity"
                                    key="1"
                                    :class="{'gst-ticket-filter-quantity__custom-quantity-container--active': customQuantity === value }"
                                    d-flex
                                    align-center
                                    justify-center
                                    grow
                                    class="px-2 gst-ticket-filter-quantity__custom-quantity-container text-lowercase"
                                    data-hj-allow
                                    @click="toogleEditCustomValue( )">
                                    {{ buttonLabel( customQuantity ) }}
                                </v-flex>
                                <v-text-field
                                    v-if="editInputCustomQuantity"
                                    key="2"
                                    ref="customQuantityTextField"
                                    v-model="inputCustomQuantity"
                                    :error-messages="inputCustomQuantityErrors"
                                    type="number"
                                    :min="9"
                                    :max="options.maxQuantity"
                                    color="primary"
                                    single-line
                                    outlined
                                    class="gst-input--secondary gst-ticket-filter-quantity__custom-quantity-textfield"
                                    data-hj-allow
                                    @keyup.enter="toogleEditCustomValue( )"
                                    @blur="toogleEditCustomValue( )" />
                            </transition>
                            <v-slider
                                v-model="customQuantity"
                                :min="maxOptionsExtra+1"
                                :max="options.maxQuantity"
                                :step="1"
                                color="primary"
                                track-color="quinary"
                                track-fill-color="primary"
                                class="pt-2 gst-ticket-filter-quantity__slider"
                                hide-details
                                @click="switchToReadCustomValue()" />
                        </v-card-text>
                        <v-card-actions class="pt-2 px-0">
                            <v-btn
                                text
                                small
                                class="text-capitalize gst-btn--cancel px-0"
                                color="primary"
                                @click="cancel">
                                {{ $t('_common:buttons.cancel') }}
                            </v-btn>
                            <v-spacer />
                            <v-btn
                                text
                                small
                                :disabled="!isModified || !!inputCustomQuantityErrors.length"
                                class="text-capitalize gst-btn--cancel px-0"
                                color="primary"
                                @click="update">
                                {{ $t('_common:buttons.confirm') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-card>
        </v-menu>
    </v-flex>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import {
        generateConsecutive as arrayUtilsGenerateConsecutive
    } from '@core/utils/arrayUtils';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';
    import IconDotsHorizontal from '@core/shared/assets/icons/dots_horizontal.svg';

    export default {
        name: 'EventTicketFilterQuantity',
        components: {
            BaseButton,
            BaseTooltip,
            IconDotsHorizontal
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventTicketFilterQuantity'
        },
        props: {
            value: {
                type: Number,
                required: true
            },
            options: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                menuOpened: false,
                customQuantity: 9,
                editInputCustomQuantity: false,
                inputCustomQuantity: 9
            };
        },
        computed: {
            optionsBase( ) {
                let ret = arrayUtilsGenerateConsecutive( 1, 6 );
                if ( this.$vuetify.breakpoint.mdAndDown ) {
                    ret = arrayUtilsGenerateConsecutive( 1, 5 );
                }
                if ( this.$vuetify.breakpoint.smAndDown ) {
                    ret = arrayUtilsGenerateConsecutive( 1, this.maxOptionsExtra );
                }
                return ret;
            },
            optionsExtra( ) {
                let ret = arrayUtilsGenerateConsecutive( 7, 2 );
                if ( this.$vuetify.breakpoint.mdAndDown ) {
                    ret = arrayUtilsGenerateConsecutive( 6, 3 );
                }
                if ( this.$vuetify.breakpoint.smAndDown ) {
                    ret = [ ];
                }
                return ret;
            },
            maxOptionsExtra( ) {
                return 8;
            },
            minCustomQuantity( ) {
                return this.maxOptionsExtra + 1;
            },
            isOptionsExtraEnabled( ) {
                const { minQuantity, maxQuantity } = this.options;

                return this.optionsExtra.find( item => ( item >= minQuantity && item <= maxQuantity ) );

            },
            isModified( ) {
                const { customQuantity, value } = this;

                return customQuantity !== value;
            },
            inputCustomQuantityErrors( ) {
                const { minCustomQuantity, options } = this;
                const value = parseInt( this.inputCustomQuantity || 0 );

                if ( value < minCustomQuantity || value > options.maxQuantity ) {
                    return [
                        this.$t(
                            '_common:formErrors.betweenField',
                            {
                                field: this.$t( 'labels.custom' ),
                                min: this.minCustomQuantity,
                                max: this.options.maxQuantity
                            },
                        )
                    ];
                }

                return [ ];
            }
        },
        watch: {
            'inputCustomQuantity': function ( newValue ) {
                const { minCustomQuantity, options } = this;
                const value = parseInt( newValue || 0 );

                if ( value >= minCustomQuantity && value <= options.maxQuantity ) {
                    this.customQuantity = value;
                }
            }
        },
        methods: {
            buttonLabel( item ) {
                const l = this.$t( '_common:terms.ticket', { count: item } );

                return `${item} ${ l }`;
            },
            isEnabled( quantity ) {
                const { minQuantity, maxQuantity } = this.options;

                return quantity >= minQuantity && quantity <= maxQuantity;
            },
            toogleEditCustomValue( ) {
                if ( !this.editInputCustomQuantity ) {
                    this.editInputCustomQuantity = true;
                    this.inputCustomQuantity = this.customQuantity;
                    setTimeout( ( ) => {
                        this.$refs.customQuantityTextField.focus( );
                    }, 200 );
                } else {
                    this.editInputCustomQuantity = false;
                    this.inputCustomQuantity = this.customQuantity;
                }
            },
            switchToReadCustomValue( ) {
                this.editInputCustomQuantity = false;
            },
            closeMenu( ) {
                this.menuOpened = false;
            },
            cancel( ) {
                this.closeMenu( );
                this.customQuantity = this.value;
            },
            update( ) {
                this.selectQuantity( this.customQuantity );
                this.closeMenu( );
            },
            selectQuantity( value ) {
                this.$emit( 'input', value );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-ticket-filter-quantity {
        .gst-ticket-filter-quantity__menu {
            margin-top: 12px;
            border-radius: border-radius( 'm' ) !important;
        }

        .gst-ticket-filter-quantity__custom-quantity-container {
            height: 80px;
            background-color: theme-color( 'quinary' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.47px;
            border-radius: border-radius( 'm' ) !important;
            min-width: 155px;
            border-color: theme-color( 'septenary' );
            border-width: 1px;
            border-style: solid;
        }

        .gst-ticket-filter-quantity__custom-quantity-container--active {
            background-color: theme-color( 'primary' );
            color: theme-color( 'white' );
        }

        .gst-ticket-filter-quantity__custom-quantity-label {
            font-size: font-size( 'xxxs' );
            font-weight: font-weight( 'bold' );
        }
    }

    .gst-btn.v-btn.gst-ticket-filter-quantity__btn {
        width: 67px;
        padding: 12px 8px !important;
        background-color: theme-color( 'quinary' ) !important;
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
        border-color: theme-color( 'septenary' ) !important;
        text-transform: lowercase;

        .gst-svg-icon {
            transition: all 0.5s ease;
            fill: currentColor;
        }

        &.v-item--active {
            background-color: theme-color( 'primary' ) !important;
            color: theme-color( 'white' );
            border-color: theme-color( 'primary' ) !important;
        }

        &:disabled {
            .gst-svg-icon {
                fill: theme-color( 'tertiary' ) !important;
            }
        }
    }

    .gst-btn.v-btn.gst-ticket-filter-quantity__btn--hover:hover {
        background-color: theme-color( 'primary' ) !important;
        color: theme-color( 'white' );
        border-color: theme-color( 'primary' ) !important;
    }

    .gst-btn.v-btn.gst-ticket-filter-quantity__btn.gst-ticket-filter-quantity__btn-other {
        width: 40px;
        padding: 8px !important;
        border-color: theme-color( 'septenary' ) !important;
    }
</style>
<style lang="scss">
    @import "@scssVariables";

    .v-btn-toggle:not(.v-btn-toggle--group) .gst-btn.v-btn.gst-ticket-filter-quantity__btn {
        border-color: theme-color( 'septenary' ) !important;
    }

    .gst-ticket-filter-quantity {
        .gst-ticket-filter-quantity__slider {
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

        .gst-ticket-filter-quantity__custom-quantity-textfield {
            height: 80px;
            border-radius: border-radius( 'm' ) !important;
            min-width: 155px;
        }
    }

    .gst-ticket-filter-quantity__tooltip.v-tooltip__content {
        line-height: line-height( 'xxs' );
        padding: 8px !important;
        background: theme-color( 'tertiary' ) !important;
        font-size: font-size( "xxs" );
    }
</style>
