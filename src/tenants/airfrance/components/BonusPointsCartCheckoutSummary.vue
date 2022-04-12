<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
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
                    :width="this.$vuetify.breakpoint.mdAndUp ? 81 : 75"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 81 : 75" />
            </v-flex>
            <v-flex align-self-center xs6 sm8 md6>
                <v-card-text class="gst-bp__headline py-0 pr-0 pl-4">
                    <span class="mr-1">{{ $t("title") }}</span>
                    <span v-if="!this.$vuetify.breakpoint.mdAndUp"><br /> </span>
                    <h4 class="font-weight-bold d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}).toLowerCase() }}
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
                    :width="this.$vuetify.breakpoint.mdAndUp ? 72 : 101"
                    :height="this.$vuetify.breakpoint.mdAndUp ? 48 : 68"
                    variant="secondary" />
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';

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
            }
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn'
            } ),
            imageSrc() {
                const device = this.$vuetify.breakpoint.xsOnly ? 'MOBILE' : 'DESKTOP';
                return   imageConstants.BONUS_POINTS[device].CHECKOUT_SUMMARY;
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
        height: 48px;
        padding: 10px 0;
        background: theme-color( 'home-banner-gradient-start' );
        overflow: hidden;

        .gst-bp__badge-primary {
            max-height: 48px;

            ::v-deep .gst-bonus-points-badge {
                position: relative;
                top: -15px;
            }
        }

        .gst-bp__headline {
            position: relative;
            z-index: 2;

            > * {
                color: white !important;
                vertical-align: middle;
            }

            span {
                line-height: line-height( 'l' );
                font-size: font-size( 's' );
                letter-spacing: -0.25px;
            }

            h4 {
                line-height: 27px;
                font-weight: font-weight( 'bold' ) !important;
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

            .gst-bp__badge-primary {
                max-height: 68px;

                ::v-deep .gst-bonus-points-badge {
                    position: relative;
                    top: -4px;
                }
            }

            .gst-bp__badge-secondary {
                position: absolute;
                right: 9px;
            }

            .gst-bp__headline {
                h4 {
                    line-height: line-height( 'xxxxl' );
                    letter-spacing: -0.35px;
                }
            }
        }
    }
</style>
