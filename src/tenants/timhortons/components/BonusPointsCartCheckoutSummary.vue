<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary u-box-shadow">
        <div class="gst-bp__badge-container">
            <TenantBonusPointsBadge class="gst-bp__badge" variant="secondary" />
        </div>
        <v-card-text class="gst-bp__headline">
            <span class="gst-bonus-points-cart-checkout-summary__title">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points">
                {{ $t("pointWithCount", { count: points, formattedCount: pointsFormated }) }}
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

    .gst-bonus-points-cart-checkout-summary {
        display: flex;
        position: relative;
        width: 100%;
        padding: 0;
        margin-right: auto;
        background-color: theme-color( 'quinary' );
        margin-left: auto;
        overflow: hidden;
        min-height: 48px;

        .gst-bp__headline {
            display: flex;
            padding: 8px;
            align-items: center;
            justify-content: center;

            .gst-bonus-points-cart-checkout-summary__title {
                line-height: line-height( 'xl' );
                margin-right: 4px;
                color: theme-color( 'tertiary' ) !important;
                font-size: font-size( 's' );
                font-weight: font-weight( 'regular' );
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                display: inline-block;
                line-height: line-height( 'xxxxl' );
                color: theme-color( 'quaternary' ) !important;
                font-weight: font-weight( 'black' );
            }
        }

        .gst-bp__badge-container {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 73px;
            padding: 8px 10px;
            background: theme-color( 'primary' );
            align-items: center;
            justify-content: center;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-right: 3px solid theme-color( 'black' );

            .gst-bp__badge {
                height: auto;
                width: 100%;
            }
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-bonus-points-cart-checkout-summary.v-sheet.v-card:not(.v-sheet--outlined) {
        box-shadow: 0 1px 4px 1px theme-color( 'shadow' );
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bp__badge-container {
                width: 60px;
            }
        }
    }
</style>
