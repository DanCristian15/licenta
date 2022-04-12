<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary d-flex mx-auto gst-bp u-box-shadow pa-0">
        <v-card-text class="gst-bp__headline full-height pa-0 pa-md-2 d-flex flex-row align-center justify-center">
            <span class="gst-bonus-points-cart-checkout-summary__title mr-1">
                {{ $t("title") }}
            </span>
            <h4 class="gst-bonus-points-cart-checkout-summary__bonus-points d-inline-block">
                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
            </h4>
        </v-card-text>
        <BannerBadge
            :style="{
                maxWidth: $vuetify.breakpoint.mdAndUp ? 113 : 65,
                maxHeight: $vuetify.breakpoint.mdAndUp ? 28 : 15
            }"
            class="gst-bp__image align-center" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BannerBadge from '../assets/banner_badge.svg';

    export default {
        name: 'BonusPointsCartCheckoutSummary',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutSummary'
        },
        components: {
            BannerBadge,
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
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'm' ) !important;
        overflow: hidden;
        min-height: 48px;

        .gst-bp__image {
            position: absolute;
            top: 50%;
            right: 16px;
            z-index: 1;
            transform: translateY( -50% );
            border-radius: border-radius( 'none' ) !important;
        }

        .gst-bonus-points-cart-checkout-summary__title {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'tertiary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.25px;
        }

        .gst-bonus-points-cart-checkout-summary__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'quaternary' ) !important;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'bold' );
            letter-spacing: -0.36px;
            text-transform: lowercase;
        }
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-summary {
            min-height: 48px;
        }
    }
</style>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-ticket-detail-content--sidebar {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bp__image {
                top: 50%;
            }

            @media (max-width: 1279px) {
                .gst-bp__image {
                    top: 55%;
                }
            }

            .gst-bonus-points-cart-checkout-summary__title {
                font-size: font-size( 'xxs' );
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-size: font-size( 'l' );
            }
        }
    }

    .gst-event-ticket-modal {
        .gst-bonus-points-cart-checkout-summary {
            .gst-bonus-points-cart-checkout-summary__title {
                font-size: font-size( 's' ) !important;
            }

            .gst-bonus-points-cart-checkout-summary__bonus-points {
                font-size: font-size( 'xxxl' ) !important;
            }
        }
    }
</style>