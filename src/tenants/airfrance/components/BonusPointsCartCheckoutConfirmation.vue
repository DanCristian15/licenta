<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-layout wrap class="u-height-100">
            <v-flex
                xs3
                sm2
                md3
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge
                    class="gst-bp__badge-primary d-flex"
                    :width="this.$vuetify.breakpoint.mdAndUp ? 81 : 68"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 81 : 68" />
            </v-flex>
            <v-flex xs6 sm8 md6 align-self-center>
                <v-card-text class="gst-bp__headline pa-0 pl-4">
                    <p class="mb-0">
                        {{ $t("title") }}
                    </p>
                    <h4 class="d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ).toLowerCase() }}
                    </h4>
                </v-card-text>
            </v-flex>
            <v-flex
                xs3
                sm2
                md3
                d-flex
                align-center
                justify-center
                class="relative">
                <TenantBonusPointsBadge
                    class="gst-bp__badge-secondary d-flex"
                    :width="this.$vuetify.breakpoint.mdAndUp ? 127 : 101"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 84 : 68"
                    variant="secondary" />
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
        padding: 10px 0;
        background-color: theme-color( 'home-banner-gradient-start' );
        min-height: 84px;

        .layout {
            min-height: inherit;
        }

        .gst-bp__headline {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-left: 0;

            > * {
                color: white;
                vertical-align: middle;
            }

            p {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 's' );
            }

            h4 {
                line-height: 27px;
                font-size: font-size( 'xxxl' );
                font-weight: font-weight( 'bold' ) !important;
                letter-spacing: -0.35px;
                text-transform: capitalize;
            }
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            min-height: 68px;

            .gst-bp__badge-secondary {
                position: absolute;
                right: 10px;
            }

            .gst-bp__headline {
                margin-left: 0;
                text-align: left;
            }
        }
    }
</style>
