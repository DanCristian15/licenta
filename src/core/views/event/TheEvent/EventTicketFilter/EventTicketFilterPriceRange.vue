<template>
    <v-flex d-flex flex-row shrink align-center>
        <v-menu
            v-model="menuOpened"
            offset-y
            :close-on-content-click="false"
            content-class="gst-ticket-filter-price-range__menu">
            <template v-slot:activator="{ on }">
                <div v-on="on">
                    <BaseButton
                        class="mr-1 py-0 gst-ticket-filter-price-range__btn"
                        :class="{
                            'gst-ticket-filter-price-range--hover': $vuetify.breakpoint.mdAndUp
                        }">
                        {{ label }}
                    </BaseButton>
                </div>
            </template>
            <v-card class="px-4 pt-4 mt-0" flat :style="{ heigth: '200px'}">
                <v-card-text class="pa-0">
                    <PriceRange
                        v-model="tempValue"
                        :min="min"
                        :max="max"
                        :currency="currency"
                        @validation-change="onPriceRangeValidationChangeDo" />
                </v-card-text>
                <v-card-actions class="px-0">
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
                        :disabled="!isModified || !isValid"
                        class="text-capitalize gst-btn--cancel px-0"
                        color="primary"
                        @click="update">
                        {{ $t('_common:buttons.confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </v-flex>
</template>

<script>
    import PriceRange from '@core/shared/components/input/PriceRange';
    import BaseButton from '@core/shared/components/buttons/BaseButton';

    export default {
        name: 'EventTicketFilterPriceRange',
        components: {
            PriceRange,
            BaseButton
        },
        props: {
            value: {
                type: Array,
                required: true
            },
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                default: ''
            }
        },
        data( ) {
            return {
                tempValue: [ ...this.value ],
                menuOpened: false,
                isValid: true
            };
        },
        computed: {
            label( ) {
                const { value, currency } = this;
                const min = this.$options.filters.currencyFull( value[ 0 ], currency );
                const max = this.$options.filters.currencyFull( value[ 1 ], currency );


                return `${min} - ${max}`;
            },
            isModified( ) {
                const { tempValue, value } = this;

                return tempValue[ 0 ] !== value[ 0 ] || tempValue[1] !== value[ 1 ];
            },
        },
        watch: {
            'value': function ( newValue ) {
                this.tempValue = newValue;
            }
        },
        methods: {
            update( ) {
                this.$emit( 'input', this.tempValue );
                this.menuOpened = false;
            },
            cancel( ) {
                this.menuOpened = false;
                this.tempValue = [ ...this.value ];
            },
            onPriceRangeValidationChangeDo( value ) {
                this.isValid = value;
            }
        }
    };
</script>

<style scoped lang="scss">
    $gstEventStartPosition: 60px;
    $gstEventBackgroundColor: theme-color( 'white' );

    @import "@scssMixins";
    @import "@scssVariables";

    .gst-ticket-filter-price-range__menu {
        margin-top: 12px;
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-btn.v-btn.gst-ticket-filter-price-range__btn {
        height: 40px !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        background-color: theme-color( 'quinary' ) !important;
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
        border-color: theme-color( 'septenary' ) !important;
        text-transform: uppercase;

        .gst-btn-icon .gst-svg-icon {
            transition: all 0.5s ease;
        }

        &.v-item--active {
            background-color: theme-color( 'primary' ) !important;
            color: theme-color( 'white' );
            border-color: theme-color( 'primary' ) !important;
        }
    }

    .gst-btn.v-btn.gst-ticket-filter-price-range__btn--hover:hover {
        background-color: theme-color( 'primary' ) !important;
        color: theme-color( 'white' );
        border-color: theme-color( 'primary' ) !important;
    }
</style>
