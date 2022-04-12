<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <BannerHiltonBadge
            class="gst-bp__image gst-bp__image-left align-center"
            :width="$vuetify.breakpoint.mdAndUp ? 54 : 45" />
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex flex-row align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
        <BannerEarnPointsBadge
            v-if="$vuetify.breakpoint.mdAndUp"
            :width="113"
            class="gst-bp__image gst-bp__image-right align-center" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BannerHiltonBadge from '../assets/banner_hilton_badge.svg';
    import BannerEarnPointsBadge from '../assets/banner_earn_points_banner.svg';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        components: {
            BannerHiltonBadge,
            BannerEarnPointsBadge
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
        background-color: theme-color( 'secondary' );
        overflow: hidden;
        min-height: 48px;

        .gst-bp__image {
            position: absolute;
            top: 50%;
            z-index: 1;
            transform: translateY( -50% );
            border-radius: border-radius( 'none' ) !important;
        }

        .gst-bp__image-left {
            left: 16px;
        }

        .gst-bp__image-right {
            right: 16px;
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'white' ) !important;
            font-weight: font-weight( 'bold' );
        }
    }

    .gst-bonus-points-cart-checkout-summary.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            min-height: 68px;

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-weight: font-weight( 'bold' );
            }
        }
    }
</style>
