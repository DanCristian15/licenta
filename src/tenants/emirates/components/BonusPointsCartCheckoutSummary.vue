<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
        <v-layout wrap class="u-height-100">
            <v-flex
                class="gst-bp__badge-container"
                xs3
                sm2
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge class="gst-bp__badge d-flex" contain />
            </v-flex>
            <v-flex align-self-center xs8 sm9>
                <v-card-text class="gst-bp__headline py-0 pr-0 pl-7">
                    <span class="mr-1">{{ $t("title") }}</span>
                    <span v-if="!this.$vuetify.breakpoint.mdAndUp"><br /> </span>
                    <h4 class="font-weight-bold d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}).toLowerCase() }}
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

        .gst-bp__badge-container {
            background: theme-color( 'white' );

            .gst-bp__badge {
                max-height: 48px;
            }
        }

        .gst-bp__headline {
            > * {
                color: white !important;
                vertical-align: middle;
            }

            h4 {
                font-weight: font-weight( 'bold' ) !important;
                text-transform: capitalize;
            }
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'xxs' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            height: 68px;

            .gst-bp__badge-container {
                .gst-bp__badge {
                    max-height: 68px;
                }
            }

            .gst-bp__headline {
                span {
                    line-height: line-height( 'xl' );
                    font-size: font-size( 's' );
                    letter-spacing: -0.25px;
                }

                h4 {
                    line-height: line-height( 'xxxxl' );
                    letter-spacing: -0.35px;
                }
            }
        }
    }
</style>
