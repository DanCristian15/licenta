<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center" />
        <v-card-text class="gst-bp__headline full-height pa-2 d-flex flex-column flex-md-row align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-0 mr-md-1">
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
            imageSrc() {
                return require( '../assets/banner_top_left.png' );
            },
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
            left: 48px;
            max-width: 40px;
            max-height: 40px;
            z-index: 1;
            transform: translateY( -50% );
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'black' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'black' ) !important;
            font-weight: font-weight( 'medium' );
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

            .gst-bp__image {
                left: 27px;
                max-width: 50px;
                max-height: 50px;
            }
        }
    }
</style>
