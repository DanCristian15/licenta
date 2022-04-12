<template>
    <div>
        <v-card
            :disabled="disabled"
            :class="{
                'gst-event-ticket-filter--disabled': disabled
            }"
            :outlined="true"
            class="gst-event-ticket-filter pb-2 pt-0 pl-4 pr-2">
            <v-flex d-flex flex-row align-center class="u-width-100 u-height-100 u-overflow-auto-x ">
                <EventTicketFilterQuantity v-model="quantity" :options="options" class="mr-2" />
                <v-flex
                    v-if="!$vuetify.breakpoint.smAndDown"
                    d-flex
                    flex-row
                    align-center>
                    <EventTicketFilterPriceRange
                        v-model="priceRange"
                        :min="value.price.min"
                        :max="value.price.max"
                        :currency="value.price.currency" />
                    <v-flex class="pl-4"
                        d-flex
                        flex-row
                        shrink
                        align-center>
                        <IconAccessibility class="mr-2" color="primary" :disabled="!options.accessibilityEnabled" />
                        <span class="mr-2" :disabled="!options.accessibilityEnabled">{{ $t('_common:terms.accessibility') }}</span>
                        <v-switch v-model="accessibility" :disabled="!options.accessibilityEnabled" hide-details class="ma-0 pa-0 gst-switch" />
                        <v-btn
                            text
                            small
                            class="text-capitalize gst-btn--cancel px-0 ml-2"
                            color="primary"
                            @click="$emit( 'reset' )">
                            {{ $t('_common:buttons.resetFilters') }}
                        </v-btn>
                    </v-flex>
                </v-flex>
                <v-flex v-if="!$vuetify.breakpoint.smAndDown" d-flex flex-row shrink class="pl-4 pr-2">
                    <LogoTicketmaster class="gst-event-ticket-filter__logo-icon" />
                </v-flex>
            </v-flex>
        </v-card>
        <v-divider v-if="$vuetify.breakpoint.mdAndUp" />
    </div>
</template>

<script>
    import IconAccessibility from '@core/shared/assets/icons/accessibility.svg';
    import LogoTicketmaster from '@core/shared/assets/logo_ticketmaster.svg';
    import EventTicketFilterQuantity from './EventTicketFilter/EventTicketFilterQuantity';
    import EventTicketFilterPriceRange from './/EventTicketFilter/EventTicketFilterPriceRange';

    export default {
        name: 'EventTicketFilter',
        components: {
            EventTicketFilterQuantity,
            EventTicketFilterPriceRange,
            IconAccessibility,
            LogoTicketmaster
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                required: true
            },
            disabled: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            quantity: {
                get( ) {
                    return this.value.quantity;
                },
                set( value ) {
                    this.$emit( 'input', {
                        ...this.value,
                        quantity: value
                    } );
                }
            },
            priceRange: {
                get( ) {
                    return this.value.price.range;
                },
                set( value ) {
                    this.$emit( 'input', {
                        ...this.value,
                        price: {
                            ...this.value.price,
                            range: value
                        }
                    } );
                }
            },
            accessibility: {
                get( ) {
                    return this.value.accessibility;
                },
                set( value ) {
                    this.$emit( 'input', {
                        ...this.value,
                        accessibility: value
                    } );
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $gstEventStartPosition: 60px;
    $gstEventBackgroundColor: theme-color( 'white' );

    .gst-event-ticket-filter {
        height: 58px;
        box-shadow: 0 4px 8px -5px theme-color( 'shadow' );
        border-color: transparent;

        svg .gst-svg-icon {
            fill: theme-color( 'tertiary' );
        }

        @include mobile-only {
            box-shadow: none;
        }

        .gst-event-ticket-filter__logo-icon {
            height: auto;
            max-width: 112px;
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $gstEventStartPosition: 60px;
    $gstEventBackgroundColor: theme-color( 'white' );

    .gst-event-ticket-filter.gst-event-ticket-filter--disabled {
        opacity: 0.8;

        .gst-btn.v-btn.gst-ticket-filter-quantity__btn.v-item--active {
            background-color: theme-color( 'quinary' ) !important;
            color: theme-color( 'tertiary' );
            border-color: theme-color( 'septenary' ) !important;
        }
    }
</style>
