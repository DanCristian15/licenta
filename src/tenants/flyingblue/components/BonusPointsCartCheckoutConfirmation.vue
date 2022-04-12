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
                    class="gst-bp__badge d-flex align-center"
                    :width="this.$vuetify.breakpoint.mdAndUp ? 97 : 75"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 61 : 47"
                    variant="secondary" />
            </v-flex>
            <v-flex xs9 sm10 md9 align-self-center>
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
        display: flex;
        height: 84px;
        padding: 10px 0;
        background: #EFEFF9;
        justify-content: center;

        .layout {
            min-height: inherit;
        }

        .gst-bp__headline {
            width: 310px;
            text-align: center;

            > * {
                color: theme-color( 'primary' );
                vertical-align: middle;
            }

            p {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 's' );
                letter-spacing: -0.25px;
            }

            h4 {
                line-height: 27px;
                font-size: font-size( 'xxxl' );
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
            height: 68px;

            .gst-bp__headline {
                width: 70%;
                margin-left: 0;
                text-align: center;
            }
        }
    }
</style>
