<template>
    <v-card flat class="d-flex flex-column gst-checkout-step-1">
        <v-card-text class="flex-grow-0 pt-0 px-0">
            <ticket-preview-image class="mb-4"
                :image-props="{
                    src: cartCollection.info.imageUrl,
                    width: '100%',
                    height: 90,
                    gradient: gradient
                }"
                :text="cartCollection.info.name" />
            <ticket-date-icon :start-date-time="cartCollection.info.startDateTime" :end-date-time="cartCollection.info.endDateTime" class="mb-2 gst-checkout-step-1__date" />
            <ticket-location-icon
                :venue="venueInfoLocation"
                class="mb-4 gst-checkout-step-1__location" />
            <ticket-card-variant-two
                :ticket="ticket"
                class="u-width-100 pl-2 py-5 u-background-transparent mb-0 gst-checkout-step-1__ticket-variant" />
        </v-card-text>
        <container-item-price-detail-card
            v-if="!$vuetify.breakpoint.mdAndUp"
            :cart-collection="cartCollection"
            :order="order"
            :payment-model="paymentModel"
            :shipping-model="shippingModel"
            :show-shipping-fees-section-empty="!shippingModel.lastSubmittedOptionId" />
        <EventHealthCheckWarningCardVariant2
            v-if="hasHealthCheck && !$vuetify.breakpoint.mdAndUp"
            :health-check="cartCollection.info.healthCheck"
            class="mt-4" />
        <v-card-actions
            class="px-0 py-0 mt-4">
            <v-flex d-flex justify-center>
                <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
                <ButtonNext
                    :placeholder="$t( 'buttons.next' )"
                    :width="!$vuetify.breakpoint.mdAndUp ? '100%' : ''"
                    @click="$emit( 'next' )" />
            </v-flex>
        </v-card-actions>
    </v-card>
</template>
<script>
    import ButtonNext from '@core/shared/components/wizard/step/ButtonNext.vue';
    import TicketDateIcon from '@core/shared/components/ticket/TicketDateIcon.vue';
    import TicketLocationIcon from '@core/shared/components/ticket/TicketLocationIcon.vue';
    import TicketPreviewImage from '@core/shared/components/ticket/TicketPreviewImage.vue';
    import TicketCardVariantTwo from '@core/shared/components/ticket/TicketCardVariantTwo.vue';
    import EventHealthCheckWarningCardVariant2 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant2.vue';
    import ContainerItemPriceDetailCard from './ContainerItemPriceDetailCard.vue';

    export default {
        name: 'Step1Summary',
        components: {
            ButtonNext,
            ContainerItemPriceDetailCard,
            TicketDateIcon,
            TicketLocationIcon,
            TicketPreviewImage,
            TicketCardVariantTwo,
            EventHealthCheckWarningCardVariant2
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.step1Summary'
        },
        props: {
            step: {
                type: Object,
                required: true
            },
            cartCollections: {
                type: Array,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            paymentModel: {
                type:Object,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            hasHealthCheck: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                gradient: 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)',
            };
        },
        computed: {
            ticket() {
                return {
                    section: this.cartCollection.items[0].section,
                    seats: this.cartCollection.items[0].seats,
                    row: this.cartCollection.items[0].row,
                    selection: this.cartCollection.items[0].selection
                };
            },
            cartCollection() {
                return this.cartCollections[ 0 ];
            },
            offer() {
                return {
                    name: this.cartCollection.description,
                    bonusPoints: this.cartCollection.bonusPoints
                };
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueStateCode, venueCountryCode } = this.cartCollection.info;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueStateCode,
                    countryCode:   venueCountryCode
                };
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-modal__ticket-variant {
        padding: 12px;
    }

    .gst-event-ticket-modal__date,
    .gst-event-ticket-modal__location {
        color: theme-color( 'quaternary' );
    }
</style>
