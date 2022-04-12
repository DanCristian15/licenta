<template>
    <div v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary">
        <v-card class="gst-bonus-points-cart-checkout-summary__card gst-bp u-box-shadow">
            <TenantBonusPointsBadge class="gst-bp__badge" variant="tertiary" />
            <v-card-text class="gst-bp__headline">
                <span class="gst-bonus-points-cart-checkout-summary__title">
                    {{ $t("title") }}
                </span>
                <span class="gst-bonus-points-cart-checkout-summary__bonus-points">
                    {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
                </span>
            </v-card-text>
        </v-card>
    </div>
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

.gst-bonus-points-cart-checkout-summary__card {
    display: flex;
    position: relative;
    width: 100%;
    padding: theme-spacing( 0, 5 );
    margin-right: auto;
    border-radius: border-radius( 'm' ) !important;
    margin-left: auto;
    min-height: 48px;
    overflow: hidden;

    .gst-bp__headline {
        display: flex;
        padding: theme-spacing( 2, 2, 2, 10 );
        align-items: center;
        justify-content: center;
        border-radius: border-radius( 'none' ) !important;
        z-index: 1;

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxxxl' );
            margin-right: theme-spacing( 1 );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'bold' );
        }
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        left: 16px;
        height: 26px;
        width: 40px !important;
        transform: translateY( -50% );
        border-radius: border-radius( 'none' ) !important;
    }
}

.gst-bonus-points-cart-checkout-summary__card.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

.gst-bonus-points-cart-checkout-summary__card.v-card.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0 1px 4px 1px theme-color( 'shadow' );
}

@include mobile-only {
    .gst-bonus-points-cart-checkout-summary {
        .gst-bp__headline {
            padding-left: theme-spacing( 5 ) !important;
            flex-wrap: wrap;

            .gst-bonus-points-cart-checkout-summary__title {
                line-height: line-height( 'xl' );
                font-size: font-size( 's' );
                font-weight: font-weight( 'large' );
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'black' );
            }
        }

        .gst-bp__badge {
            left: 11px;
            height: 19px !important;
            width: 29px !important;
        }
    }
}
</style>
