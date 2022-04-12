<template>
    <div class="gst-ticket-detail-offer-form-input d-flex flex-row align-center u-width-100 pl-2 pr-4">
        <TicketOfferTypeIconVariant1
            :type="ticket.selection"
            :offer-name="item.offer.name"
            class="gst-ticket-detail-offer-form-input__ticket-offer-item flex-grow-1" />
        <div class="flex-shrink">
            <NumericStep
                v-if="isMultipleOffers"
                v-model="item.quantity"
                :min="0"
                :max="maxQuantity"
                :values="item.offer && item.offer.ticketType && item.offer.ticketType.sellableQuantities ? item.offer.ticketType.sellableQuantities : [ ]" 
                class="gst-ticket-detail-offer-form-input__input" />
            <div v-else
                class="gst-ticket-detail-offer-form-input__quantity">
                {{ item.quantity }}
            </div>
        </div>
    </div>
</template>

<script>
    import TicketOfferTypeIconVariant1 from '@tenant/app/components/icons/TicketOfferTypeIconVariant1';
    import NumericStep from '@core/shared/components/input/NumericStep';

    export default {
        name: 'TicketDetailOfferFormInput',
        components: {
            TicketOfferTypeIconVariant1,
            NumericStep
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            ticket: {
                type: Object,
                required: true
            },
            maxQuantity: {
                type: Number,
                required: true
            },
            isMultipleOffers: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            'item.quantity': function ( newValue ) {
                this.item.selected = !!newValue;
            }
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    $section-height: 32px;

    @mixin quantity-content {
        @include font-weight('regular');
        @include line-height('xxxxxxl');

        border: 0;
        background: theme-color( 'white' );
        color: theme-color( 'quaternary' );
        font-size: 26px;
        text-align: center;
    }
    
    .gst-ticket-detail-offer-form-input {
        .gst-ticket-detail-offer-form-input__ticket-offer-item {
            @include font-size('s');
            
            color: theme-color( 'primary' );
        }

        .gst-ticket-detail-offer-form-input__quantity {
            @include quantity-content();
        }

        .gst-ticket-detail-offer-form-input__input {
            height: $section-height;

            .gst-numeric-step-input__content {
                @include quantity-content();

                min-width: 48px;
            }

            .gst-numeric-step-input__minus-btn,
            .gst-numeric-step-input__plus-btn {
                height: 32px !important;
                width: 32px !important;
                border: 1px solid theme-color( 'primary' );
                background: theme-color( 'primary' );
                min-width: 32px !important;
                border-radius: 100%;

                svg {
                    .gst-svg-icon {
                        fill: theme-color( 'white' );
                    }
                }
            }

            .gst-numeric-step-input__minus-btn--disabled,
            .gst-numeric-step-input__plus-btn--disabled {
                border: 1px solid theme-color-hex( 'primary-lighten-3' );
                background: theme-color-hex( 'primary-lighten-3' );

                svg {
                    opacity: 0.4;
                }
            }
        }
    }
</style>