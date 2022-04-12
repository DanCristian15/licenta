<template>
    <div v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary">
        <v-card class="gst-bonus-points-cart-checkout-summary__card gst-bp u-box-shadow">
            <TenantBonusPointsBadge class="gst-bp__badge" />
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
    padding: 0;
    margin-right: auto;
    background-color: #030E2F;
    border-radius: border-radius( 'm' ) !important;
    margin-left: auto;
    min-height: 48px;
    overflow: hidden;

    .gst-bp__headline {
        display: flex;
        padding: 8px 8px 8px 40px;
        align-items: center;
        justify-content: center;
        border-radius: border-radius( 'none' ) !important;
        z-index: 1;

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxxxl' );
            margin-right: 4px;
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'bold' );
        }
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        left: 16px;
        height: auto;
        width: 31px;
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
            flex-wrap: wrap;

            .gst-bonus-points-cart-checkout-summary__title {
                line-height: line-height( 'xl' );
                font-size: font-size( 's' );
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'l' );
                font-weight: font-weight( 'black' );
            }
        }

        .gst-bp__badge {
            left: 8px;
            max-width: 24px;
        }
    }
}
</style>
