<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <TenantBonusPointsBadge variant="multiple" class="gst-bp__badge" :class="[!this.$vuetify.breakpoint.mdAndUp && 'mdBreakpoint']" />
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
        height: 48px;
        width: 100%;
        padding: 10px 0;
        background-color: #EAEAEA;
        overflow: hidden;

        .gst-bp__badge {
            position: absolute;
            top: 4px;
            left: 0;
        }

        .gst-bp__badge__right {
            position: absolute;
            top: 4px;
            right: 0;
        }

        .gst-bp__badge__right2 {
            position: absolute;
            top: 22px;
            right: 55px;
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-weight: font-weight( 'bold' );
        }

        @include mobile-only {
            .gst-bonus-points-cart-checkout-summary__title {
                margin-left: 28px !important;
            }

            .gst-bp__badge {
                top: 0 !important;
                left: -10px !important;
                transform: scale( 0.75 ) !important;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-size: font-size( 's' );
            }

            .gst-bp__headline {
                padding-left: 8px !important;
            }
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary__title {
            margin-left: 28px !important;
        }

        .gst-bp__badge {
            top: 0 !important;
            left: -10px !important;
            transform: scale( 0.75 ) !important;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }

        .gst-bp__badge__right,
        .gst-bp__badge__right2 {
            display: none;
        }
    }
</style>
