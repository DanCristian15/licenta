<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-layout wrap class="u-height-100">
            <v-flex
                xs4
                sm3
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge
                    class="gst-bp__badge py-2"
                    :width="this.$vuetify.breakpoint.mdAndUp ? 120 : 87"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 69 : 50"
                    variant="tertiary" />
            </v-flex>
            <v-flex xs8 sm9 align-self-center>
                <v-card-text class="gst-bp__headline pa-0">
                    <p class="mb-0">
                        {{ $t("title") }}
                    </p>
                    <h4 class="d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ).toLowerCase() }}
                    </h4>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';

    export default {
        name: 'BonusPointsCardCheckoutConfirmation',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutConfirmation'
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
            imageSrc() {
                const device = this.$vuetify.breakpoint.xsOnly ? 'MOBILE' : 'DESKTOP';
                return   imageConstants.BONUS_POINTS[device].CHECKOUT_CONFIRMATION;
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

    .gst-bp {
        height: 84px;
        padding: 10px 0;
        background: theme-color( 'primary' );

        .layout {
            min-height: inherit;
        }

        h4 {
            line-height: line-height( 'xxxxxl' );
            font-size: font-size( 'xxxxl' );
            font-family: 'Noa LT Std', sans-serif;
            letter-spacing: -0.35px;
            text-transform: capitalize;
        }

        .gst-bp__headline > * {
            color: white;
            vertical-align: middle;
        }

        .gst-bp__headline {
            text-align: center;
            margin-left: -18%;

            p {
                font-size: font-size( 's' );
            }
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            h4 {
                line-height: line-height( 'xxxxl' );
                font-size: font-size( 'xxxl' );
                letter-spacing: -0.35px;
            }

            .gst-bp__headline {
                padding-left: 5px !important;
                margin-left: 0;
                text-align: left;
            }
        }
    }
</style>
