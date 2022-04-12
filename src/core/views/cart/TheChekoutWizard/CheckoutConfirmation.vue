<template>
    <v-card flat>
        <v-toolbar flat class="flex-grow-0 gst-checkout-confirmation__header text-center">
            <v-container>
                <IconBackArrow class="u-mouse-pointer mr-2 gst-checkout-confirmation__icon-back" @click="$emit('close')" />
                <TenantLogo :with-redirect="false" class="gst-checkout-confirmation__icon-logo" />
            </v-container>
        </v-toolbar>
        <v-card-text class="flex-grow-0 pt-0 px-4">
            <div class="gst-checkout-confirmation__container">
                <p class="text-center mt-6 mt-md-10 mb-4 gst-checkout-confirmation__title">
                    {{ $t('title') }}
                </p>
                <!-- eslint-disable-next-line vue/no-v-html  -->
                <h6 class="text-center tertiary--text gst-checkout-confirmation__subtitle mb-4 px-5" v-html="subtitle"></h6>
                <TenantBonusPointsCartCheckoutConfirmation
                    :points="bonusPointsEarn"
                    :currency="loyaltyCurrency || currency"
                    :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                    class="mt-md-6 mb-4" />
                <ticket-preview-image class="mb-4"
                    :image-props="{
                        src: cartCollection.info.imageUrl,
                        width: '100%',
                        height: '90px',
                        gradient: gradient
                    }"
                    :text="cartCollection.info.name" />
                <ticket-date-icon :start-date-time="cartCollection.info.startDateTime" :end-date-time="cartCollection.info.endDateTime" class="mb-2" />
                <ticket-location-icon
                    :venue="venueInfoLocation"
                    class="mb-4" />
                <ticket-card-variant-two
                    :ticket="ticket"
                    :outlined="true"
                    class="u-width-100 u-background-transparent mb-4 gst-checkout-confirmation__ticket-card" />
                <container-item-price-detail-card
                    :cart-collection="cartCollection"
                    :order="order"
                    :payment-model="paymentModel"
                    :shipping-model="{ options: [ shippingOption ] }" />
            </div>
        </v-card-text>
        <v-card-actions v-if="isElectronicTicketItem">
            <div class="gst-checkout-confirmation__container">
                <BaseButton
                    :style="{width: '100%'}"
                    :placeholder="$t('buttons.download')"
                    :href="downloadUrl" />
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { isElectronicTicketItem as shippingOptionsUtilsIsElectronicTicketItem } from '@/core/utils/shippingOptionsUtils';
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';
    import TicketDateIcon from '@core/shared/components/ticket/TicketDateIcon.vue';
    import TicketLocationIcon from '@core/shared/components/ticket/TicketLocationIcon.vue';
    import TicketPreviewImage from '@core/shared/components/ticket/TicketPreviewImage.vue';
    import TicketCardVariantTwo from '@core/shared/components/ticket/TicketCardVariantTwo.vue';
    import IconBackArrow from '@core/shared/assets/icons/back_arrow.svg';
    import ContainerItemPriceDetailCard from './ContainerItemPriceDetailCard';

    export default {
        name: 'CheckoutConfirmation',
        components: {
            ContainerItemPriceDetailCard,
            IconBackArrow,
            TicketDateIcon,
            TicketLocationIcon,
            TicketPreviewImage,
            TicketCardVariantTwo,
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.checkoutConfirmation'
        },
        props: {
            cartCollections: {
                type: Array,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            bonusPointsEarn: {
                type: Number,
                required: true
            },
            paymentModel: {
                type: Object,
                required: true
            },
            downloadUrl: {
                type: String,
                required: true
            },
            shippingOption: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                gradient: 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)',
            };
        },
        computed: {
            ...mapGetters( {
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            cartCollection() {
                return this.cartCollections[ 0 ];
            },
            ticket() {
                return {
                    section: this.cartCollection.items[0].section,
                    seats: this.cartCollection.items[0].seats,
                    row: this.cartCollection.items[0].row
                };
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
            },
            isElectronicTicketItem( ) {
                return shippingOptionsUtilsIsElectronicTicketItem( this.shippingOption );
            },
            subtitle( ) {
                return this.isElectronicTicketItem ? this.$t( 'subtitle.elecTicket' ) : this.$t( 'subtitle.noElecTicket' );
            },
            currency( ) {
                const { order } = this;
                return order.currency;
            },
            loyaltyCurrency( ) {
                const { order } = this;
                return order.loyaltyCurrency;
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import "@scssVariables";

    .gst-checkout-confirmation__header {
        border-bottom: 1px solid  theme-color( 'quinary' );
    }

    .gst-checkout-confirmation__icon-back {
        float: left;
        margin-left: -20px;
    }

    .gst-checkout-confirmation__icon-logo {
        margin: 0 auto;
    }

    .gst-checkout-confirmation__title {
        color: theme-color( 'quaternary' );
        font-size: font-size( "xxxxxl" );
        font-weight: font-weight( 'bold' );
    }

    .gst-checkout-confirmation__subtitle {
        line-height: line-height( 'xxxl' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
    }

    .gst-checkout-confirmation__ticket-card {
        padding: 12px;
    }

    .gst-checkout-confirmation__container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        max-width: 600px;
    }
</style>
