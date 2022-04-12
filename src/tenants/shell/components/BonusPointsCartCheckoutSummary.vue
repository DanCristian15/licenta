<template>
    <div v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary">
        <v-card class="gst-bonus-points-cart-checkout-summary__card d-flex mx-auto gst-bp u-box-shadow pa-0">
            <Logo class="gst-bp__badge" />
            <v-card-text class="gst-bp__headline full-height pa-2 d-flex align-center justify-center">
                <div class="gst-bonus-points-cart-checkout-summary__card-content text-center">
                    <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                        {{ $t("title") }}
                    </span>
                    <span class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
                    </span>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Logo from '../assets/logo.svg';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        components: {
            Logo,
        },
        props: {
            points: {
                type: Number,
                required: true,
                default: 0
            },
            currency: {
                type: String,
                required: true,
                default: ''
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn'
            } ),
            pointsFormated( ) {
                if ( this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$options.filters.currencyFull( this.points, this.currency );
                }

                return this.$options.filters.bonusPoints( this.points );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-bonus-points-cart-checkout-summary__card {
        position: relative;
        width: 100%;
        padding: 10px 0;
        background-color: theme-color( 'secondary' );
        border-radius: border-radius( 'm' );
        min-height: 48px;
        overflow: hidden;

        .gst-bp__headline {
            border-radius: border-radius( 'none' ) !important;
            z-index: 1;
        }

        .gst-bonus-points-cart-checkout-summary__card-content {
            max-width: calc( 100% - 60px );
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            vertical-align: middle;
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'bold' );
            vertical-align: middle;
        }

        .gst-bp__badge {
            position: absolute;
            top: 50%;
            left: 16px;
            height: 24px;
            width: 26px;
            transform: translateY( -50% );
        }
    }

    .gst-bonus-points-cart-checkout-summary_card.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bonus-points-cart-checkout-summary__title {
                font-size: font-size( 's' );
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-size: font-size( 'xxxl' );
                font-weight: font-weight( 'black' );
            }

            .gst-bp__badge {
                left: 8px;
                height: 18px;
                width: 20px;
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-detail-content__bonus-points-banner.gst-bonus-points-cart-checkout-summary {
        .gst-bonus-points-cart-checkout-summary__title {
            font-size: font-size( 'xxs' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            font-size: font-size( 'l' );
        }
    }

</style>
