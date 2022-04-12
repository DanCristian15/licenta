<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-layout wrap class="u-height-100">
            <v-flex xs12 align-self-center>
                <v-card-text class="gst-bp__headline d-flex justify-center">
                    <TenantBonusPointsBadge
                        class="gst-bp__badge gst-bp__badge-primary"
                        :width="this.$vuetify.breakpoint.mdAndUp ? 69 : 77"
                        :height="this.$vuetify.breakpoint.mdAndUp ? 103 : 114"
                        variant="primary" />
                    <div class="d-inline-block">
                        <p class="mb-0">
                            {{ $t("title") }}
                        </p>
                        <h4 class="d-inline-block">
                            {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ).toLowerCase() }}
                        </h4>
                    </div>
                    <TenantBonusPointsBadge
                        v-if="this.$vuetify.breakpoint.mdAndUp"
                        class="gst-bp__badge gst-bp__badge-secondary d-flex align-center"
                        width="48"
                        height="44"
                        variant="secondary" />
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
        background: theme-color( 'home-banner-gradient-end' );

        .layout {
            min-height: inherit;
        }

        h4 {
            line-height: 27px;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'bold' ) !important;
            letter-spacing: -0.35px;
            text-transform: capitalize;
        }

        .gst-bp__badge-primary {
            position: absolute;
            top: 0;
            left: 47px;
            max-height: 100%;
            overflow: hidden;

            ::v-deep .gst-bonus-points-badge__primary {
                position: relative;
                top: -3px;
            }
        }

        .gst-bp__badge-secondary {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translateY( -50% );
        }

        .gst-bp__headline {
            padding: 0 67px;
            text-align: left;
            margin-left: 0%;

            > * {
                color: white;
                vertical-align: middle;
            }

            p {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 's' );
            }
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'xxs' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            height: 68px;

            h4 {
                line-height: line-height( 'xxxxl' );
                font-size: font-size( 'xxxl' );
                letter-spacing: -0.35px;
            }

            .gst-bp__headline {
                padding: 0 10px 0 50px;
            }

            .gst-bp__badge-primary {
                left: 16px;
            }
        }
    }
</style>
