<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex flex-row align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
        <TenantBonusPointsBadge class="gst-bp__image" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
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
                required: true
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

    .gst-bonus-points-cart-checkout-summary {
        position: relative;
        width: 100%;
        padding: 10px 0;
        background-color: theme-color( 'white' );
        overflow: hidden;
        min-height: 48px;

        .gst-bp__image {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 85px;
            z-index: 1;
        }

        .gst-bp__headline {
            padding-right: 85px !important;
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'bold' );
            letter-spacing: -0.25px;
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-size: font-size( 'l' );
            font-weight: font-weight( 'black' );
            letter-spacing: -0.35px;
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            min-height: 48px;

            .gst-bp__image {
                width: 45px;
            }

            .gst-bp__image::before {
                width: 17px;
            }

            .gst-bp__image::after {
                left: -4px;
                width: 17px;
            }

            .gst-bp__headline {
                padding-right: 45px !important;
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-size: font-size( 'xl' ) !important;
            }
        }
    }
</style>
