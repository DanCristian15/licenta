<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <BonusPointsBadge class="gst-bp__badge" />
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex flex-row align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BonusPointsBadge from './BonusPointsBadge';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        components: {
            BonusPointsBadge
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
        background: linear-gradient( 270deg, theme-color( 'primary' ) 0%, theme-color( 'secondary' ) 100% );
        overflow: hidden;
        min-height: 48px;

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'white' ) !important;
            font-weight: font-weight( 'bold' );
            text-transform: lowercase;
        }

        ::v-deep .gst-bp__badge {
            position: absolute;
            top: 50%;
            left: 24px;
            height: auto;
            max-width: 38px;
            transform: translateY( -50% );

            .gst-svg-icon {
                fill: theme-color( 'white' );
            }
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            ::v-deep .gst-bp__badge {
                left: 16px;
            }
        }
    }
</style>
