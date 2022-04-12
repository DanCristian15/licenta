<template>
    <div class="gst-checkout-action d-flex flex-column">
        <header class="d-flex flex-row justify-center">
            <p class="flex-grow-1">
                {{ title }}
            </p>
            <p>
                {{ totalPrice | currencyFull( order.currency ) }}
            </p>
            <div
                class="u-mouse-pointer"
                :data-test-id="$testId('button.toggleDetails')"
                @click="showFees = !showFees">
                <ChevronDownIcon
                    class="gst-checkout-action__down-icon"
                    :class="{
                        'u-rotate-180': showFees
                    }" />
            </div>
        </header>
        <v-expand-transition>
            <FeesContainer
                v-if="showFees"
                :order="order"
                :cart-collections="cartCollections"
                :shipping-model="shippingModel"
                @cancel="$emit('cancel')" />
        </v-expand-transition>
        <div class="gst-checkout-action__content">
            <label v-if="isPackageOffer" class="d-block mb-6">{{ $t('warning') }}</label>
            <BaseFormCheckbox
                v-model="agreeModel.termsEventTicket"
                :error-messages="extractValidationsMessagesFn( 'agreeModel.termsEventTicket' )"
                :data-test-id="$testId('checkbox.termsEventTicket')"
                class="mb-2">
                <template slot="label">
                    {{ $t( 'labels.termsEventTicket' ) }}
                    <a href="#" class="d-inline" :data-test-id="$testId('button.termsEventTicket')" @click="openTermsAgreementModal">
                        {{ $t('_common:terms.termsOfUse') }}
                    </a>
                </template>
            </BaseFormCheckbox>
            <BaseFormCheckbox
                v-if="!!agreeModel.hasOwnProperty( 'termsHotelReservation' )"
                v-model="agreeModel.termsHotelReservation"
                :error-messages="extractValidationsMessagesFn( 'agreeModel.termsHotelReservation' )"
                :data-test-id="$testId('checkbox.termsHotelReservation')"
                class="mb-2">
                <template slot="label">
                    {{ $t( 'labels.termsHotelReservation' ) }}
                    <a href="#" class="d-inline" :data-test-id="$testId('button.termsHotelReservation')" @click="openTermsAgreementModal">
                        {{ $t('_common:terms.termsAndConditions') }}
                    </a>
                </template>
            </BaseFormCheckbox>
            <BaseFormCheckbox
                v-if="!!agreeModel.hasOwnProperty( 'termsEventHealthCheck' )"
                v-model="agreeModel.termsEventHealthCheck"
                :error-messages="extractValidationsMessagesFn( 'agreeModel.termsEventHealthCheck' )"
                :data-test-id="$testId('checkbox.termsEventHealthCheck')"
                class="mb-2">
                <template slot="label">
                    {{ $t( 'labels.termsEventHealthCheck' ) }}
                    <a :href="eventHealthCheckUrl" target="_blank" class="d-inline">
                        {{ $t('_common:buttons.learnMore') }}
                    </a>
                </template>
            </BaseFormCheckbox>
        </div>
        <BaseButton
            color="success"
            :data-test-id="$testId('button.placeOrder')"
            class="u-width-100 mb-4"
            :disabled="isPaymentProviderDown"
            @click="onClickButtonDo">
            {{ $t( '_common:buttons.placeOrder' ) }}
        </BaseButton>
        <p class="gst-checkout-action__warning">
            {{ `*${$t('exceptionsApplying')}` }}
        </p>
        <p v-if="!hasTicketsOnly" class="gst-checkout-action__warning">
            {{ $t('feesNotIncluded') }}
        </p>
    </div>
</template>

<script>
    import BaseFormCheckbox from '@tenant/app/components/inputs/BaseFormCheckbox';
    import BaseButton from '@shared/components/buttons/BaseButton';
    import ChevronDownIcon from '@core/shared/assets/icons/chevron_down.svg';
    import FeesContainer from './Containers/FeesContainer.vue';

    export default {
        name: 'Action',
        components: {
            BaseButton,
            FeesContainer,
            BaseFormCheckbox,
            ChevronDownIcon
        },
        props: {
            agreeModel: {
                type: Object,
                required: true
            },
            order: {
                type: Object,
                required: true
            },
            cartCollections: {
                type: Array,
                required: true
            },
            shippingModel: {
                type: Object,
                required: true
            },
            validation: {
                type: Object,
                required: true
            },
            extractValidationsMessagesFn: {
                type: Function,
                required: true,
            },
            instancePaymentClient: {
                type: Object,
                required: true
            },
            usePaymentClient: {
                type: Boolean,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            },
            eventHealthCheck: {
                type: Object,
                required: false,
                default: new Object()
            },
            hasTicketsOnly: {
                type: Boolean,
                required: false
            },
            isPaymentProviderDown: {
                type: Boolean,
                default: false
            },
            isPackageOffer: {
                type: Boolean,
                default: false
            }
        },
        data( ) {
            return {
                showFees: false
            };
        },
        computed: {
            eventHealthCheckUrl() {
                return this.eventHealthCheck ? this.eventHealthCheck.learnMoreUrl : '';
            },
            title( ) {
                return this.hasTicketsOnly ? this.$t( 'titleTicketsOnly' ) : this.$t( 'title' );
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.action'
        },
        testIdOptions: {
            keyPrefix: 'checkout._components.action'
        },
        methods: {
            openTermsAgreementModal( ) {
                const propsMobile = {
                    'content-class': 'v-dialog__height-90 gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    transition: 'dialog-bottom-transition',
                };
                const propsDesktop = {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    'max-width': 600,
                    'min-height': 800,
                    'content-class': 'gst-v-dialog gst-v-dialog-terms-agreement',
                };

                if ( this.$vuetify.breakpoint.mdAndUp  ){
                    this.$modal.show(
                        ( ) => import( '@tenant/app/views/cart/TheCheckout/TermsAgreementModal' ),
                        { },
                        propsDesktop
                    );
                } else {
                    this.$modal.showBottom(
                        ( ) => import( '@tenant/app/views/cart/TheCheckout/TermsAgreementModal' ),
                        { },
                        propsMobile
                    );
                }
            },
            onClickButtonDo() {
                this.$emit( 'submit' );
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-checkout-action {
        @include border-radius('xs');

        padding: theme-spacing( 4, 4, 4, 3 );
        border: 1px solid theme-color( 'septenary' );

        header {
            p {
                line-height: line-height( 'xxxxl' );
                font-size: font-size( 'xxxl' );
                font-weight: font-weight( 'large' );
            }

            .gst-checkout-action__down-icon {
                transition: 0.2s;

                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }
        }

        .gst-checkout-action__content {
            line-height: line-height( 'xl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
        }

        .gst-checkout-action__warning {
            line-height: line-height( 'm' );
            margin-bottom: theme-spacing( 2 ) !important;
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
        }
    }
</style>
