<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <TenantBonusPointsBadge variant="secondary" class="gst-bp__badge" />
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex align-center justify-center">
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

    $startColor: lighten( desaturate( adjust-hue( theme-color-hex( 'primary' ), -17 ), 16.77 ), 62.16 );
    $endColor: theme-color( 'white' );

    .gst-bonus-points-cart-checkout-summary {
        position: relative;
        width: 100%;
        padding: 10px 0;
        background: linear-gradient( 90.12deg, $startColor 31.82%, $endColor 126.77% );
        overflow: hidden;
        min-height: 48px;

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-weight: font-weight( 'bold' );
        }

        .gst-bp__badge {
            position: absolute;
            top: -23px;
            right: 25px;
            height: 82px;
            width: 82px;
            transform: scale( 1.2 );
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-weight: font-weight( 'black' );
            }

            .gst-bp__badge {
                top: 50%;
                right: 7px;
                height: 60px;
                width: 60px;
                transform: translateY( -50% ) scale( 1.2 );
            }
        }
    }
</style>
