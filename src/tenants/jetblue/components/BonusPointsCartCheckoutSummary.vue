<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex align-center mx-auto gst-bp u-box-shadow pa-0">
        <v-card-text class="gst-bp__headline pa-2 d-flex flex-column flex-sm-row flex-wrap align-start align-sm-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
        <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-primary" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'BonusPointsCardSmall',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        props: {
            points: {
                type: Number,
                required: true,
                default: 0
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

    .gst-bp {
        position: relative;
        width: 100%;
        padding: 10px 0;
        background-color: theme-color( 'primary' );
        min-height: 48px;

        .gst-bp__headline {
            padding-left: 125px !important;
        }

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
        }

        .gst-bp__badge {
            position: absolute;
            top: -1px;
            left: -1px;
            height: calc( 100% + 1px );
            width: 125px;
            background: theme-color( 'white' );
            border-radius: border-radius( 'm' );
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            min-height: 68px;

            .gst-bp__headline {
                left: 0;
                height: 100%;
                padding-left: 98px !important;
            }

            .gst-bp__badge {
                width: 90px;
            }
        }
    }
</style>
