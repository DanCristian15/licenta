<template>
    <v-card class="pt-0 pb-4 event-ticket-filter-modal rounded-t-lg">
        <HeaderVariant2 
            @close="$emit( 'close' )">
            <v-btn
                text
                small
                class="text-capitalize gst-btn--reset px-0 ml-1"
                color="primary"
                @click="reset">
                {{ $t('_common:buttons.resetFilters') }}
            </v-btn>
        </HeaderVariant2>
        <v-card-text class="px-4">
            <div class="py-4">
                <SectionTitleSmall class="pb-4 event-ticket-filter-modal__section-title" width="100%">
                    {{ $t('_common:labels.priceRange') }}
                </SectionTitleSmall>
                <PriceRange
                    v-model="priceRange"
                    :min="filter.price.min"
                    :max="filter.price.max"
                    :currency="filter.price.currency"
                    class="event-ticket-filter-modal__price-range"
                    @validation-change="onPriceRangeValidationChangeDo" />
            </div>
            <v-divider />
            <div class="py-4">
                <SectionTitleSmall class="pb-4 event-ticket-filter-modal__section-title" width="100%">
                    {{ $t('_common:labels.additionalFilters') }}
                </SectionTitleSmall>
                <v-flex d-flex flex-row align-center>
                    <IconAccessibility :disabled="!options.accessibilityEnabled" class="mr-2 event-ticket-filter-modal_icon-accessibility" />
                    <span class="mr-2" :disabled="!options.accessibilityEnabled">{{ $t('shared:components.ticket.accessibility') }}</span>
                    <v-spacer />
                    <v-switch v-model="accessibility" :disabled="!options.accessibilityEnabled" hide-details class="ma-0 pa-0 gst-switch" />
                </v-flex>
            </div>
            <v-divider />
            <div class="text-center pt-4">
                <v-btn
                    text
                    small
                    :disabled="!isModified || !isValid"
                    class="text-capitalize gst-btn--apply px-0 mr-3"
                    color="primary"
                    @click="apply">
                    {{ $t('_common:buttons.applyFilters') }}
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import SectionTitleSmall from '@core/shared/components/misc/SectionTitleSmall';
    import PriceRange from '@core/shared/components/input/PriceRange';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2';
    import IconAccessibility from '@core/shared/assets/icons/accessibility.svg';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';

    export default {
        name: 'EventTicketFilterModalContent',
        components: {
            IconAccessibility,
            SectionTitleSmall,
            PriceRange,
            HeaderVariant2
        },
        mixins: [ CloseModalOnBreakpointChangeMixin ],
        props: {
            filter: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                required: true
            },
            busEventParent: {
                type: Object,
                required: true
            }
        },
        data( ) {
            return {
                priceRange: [ ...this.filter.price.range ],
                accessibility: this.filter.accessibility,
                isValid: true,
            };
        },
        computed: {
            isModified( ) {
                const { range } = this.filter.price;
                const { priceRange } = this;


                return ( this.priceRange[0] !== range[0] ||
                    priceRange[1] !== range[1] ||
                    this.filter.accessibility !== this.accessibility );
            }
        },
        methods: {
            apply( ) {
                this.busEventParent.$emit( 'update-filter', {
                    ...this.filter,
                    accessibility: this.accessibility,
                    price: {
                        ...this.filter.price,
                        range: this.priceRange
                    }
                } );
                this.$emit( 'close' );
            },
            reset( ) {
                this.busEventParent.$emit( 'reset-filter' );
                this.$emit( 'close' );
            },
            onPriceRangeValidationChangeDo( value ) {
                this.isValid = value;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .event-ticket-filter-modal_icon-accessibility {
        .gst-svg-icon {
            fill: theme-color( 'tertiary' );
        }
    }

    .event-ticket-filter-modal__section-title {
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'bold' );
        letter-spacing: 0;
    }
</style>

<style lang="scss">
    @import "@scssVariables";

    .event-ticket-filter-modal__price-range.gst-price-range {
        .gst-price-range__label {
            width: 155px;
            color: theme-color( 'quaternary' );
        }

        .gst-price-range__textfield {
            width: 155px;
        }

        .gst-price-range__slide {
            margin: 0 12px;
        }
    }

    .event-ticket-filter-modal .gst-switch {
        .v-input--selection-controls__input {
            margin-right: 0;
        }
    }

    .event-ticket-filter-modal {
        .gst-btn--reset,
        .gst-btn--apply {
            letter-spacing: 0;
        }
    }
</style>
