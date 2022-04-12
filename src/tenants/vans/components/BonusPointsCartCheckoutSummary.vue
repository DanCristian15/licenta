<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <TenantBonusPointsBadge v-if="this.$vuetify.breakpoint.mdAndUp" class="gst-bp__badge" />
        <BadgeSecondaryIcon v-else class="gst-bp__badge" />
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
        <BadgeSecondaryIcon class="gst-bp__badge__secondary" />
        <BadgeSecondaryIcon class="gst-bp__badge__secondary2" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BadgeSecondaryIcon from '../assets/bonus_points_badge__secondary.svg';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        components: {
            BadgeSecondaryIcon
        },
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
        position: relative;
        height: 48px;
        width: 100%;
        padding: 10px 0;
        background-color: theme-color( 'quaternary' );
        overflow: hidden;

        .gst-bp__badge {
            position: absolute;
            top: 0;
            left: -20px;
            height: 110px;
            width: 100px;
        }

        .gst-bp__badge__secondary {
            position: absolute;
            top: 22px;
            right: -20px;
            height: 50px;
            width: 50px;
            transform: scale( 2.5 );
        }

        .gst-bp__badge__secondary2 {
            position: absolute;
            top: 12px;
            right: 22px;
            height: 80px;
            width: 80px;
            transform: scale( 1.1 );
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'bonus-points-chip-bg-color' ) !important;
            font-weight: font-weight( 'bold' );
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp__badge {
            top: -12px !important;
            left: -10px !important;
            transform: scale( 0.8 );
        }

        .gst-bp__badge__secondary {
            top: 15px !important;
            right: -20px;
            transform: scale( 1.4 ) !important;
        }

        .gst-bp__badge__secondary2 {
            top: 2px !important;
            right: -2px !important;
            transform: scale( 0.6 ) !important;
        }
    }
</style>
