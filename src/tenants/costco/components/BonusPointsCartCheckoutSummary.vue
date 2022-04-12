<template>
    <div v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary">
        <v-card class="gst-bonus-points-cart-checkout-summary__card d-flex mx-auto gst-bp u-box-shadow pa-0">
            <BannerStar class="gst-bp__badge" />
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
        <div class="gsp-bp__divider"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BannerStar from '@tenants/costco/assets/banner-star.svg';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        components: {
            BannerStar
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
        background-color: #EEEEEE;
        min-height: 48px;
        overflow: hidden;

        .gst-bp__headline {
            border-radius: border-radius( 'none' ) !important;
        }

        .gst-bonus-points-cart-checkout-summary__card-content {
            max-width: calc( 100% - 60px );
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            vertical-align: middle;
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-weight: font-weight( 'bold' );
            vertical-align: middle;
        }

        .gst-bp__badge {
            position: absolute;
            top: 50%;
            left: 8px;
            height: 25px;
            width: 26px;
            transform: translateY( -50% );
        }
    }

    .gsp-bp__divider {
        height: 2px;
        width: 100%;
        background-color: theme-color( 'secondary' );
    }

    .gst-bonus-points-cart-checkout-summary_card.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-weight: font-weight( 'bold' );
            }

            .gst-bp__badge {
                left: 8px;
                height: 15px;
                width: 16px;
            }
        }
    }
</style>
