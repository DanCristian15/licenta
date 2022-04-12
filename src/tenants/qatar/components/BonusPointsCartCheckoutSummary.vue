<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="60">
            <v-layout wrap>
                <v-flex align-self-center grow class="u-pull-front">
                    <v-card-text class="gst-bp__headline text-center pa-0">
                        <span class="mr-1">{{ $t("title") }}</span>
                        <h4 class="d-inline-block">
                            {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
                        </h4>
                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-img>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';

    export default {
        name: 'BonusPointsCardSmall',
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
        padding: 10px 0;
        overflow: hidden;

        .gst-bp__image {
            color: theme-color( 'white' );
        }

        span {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'white' );
            font-weight: font-weight( 'regular' );
        }

        h4 {
            color: theme-color( 'bonus-points-chip-bg-color' );
        }

        .gst-bp__headline > * {
            vertical-align: middle;
        }

        h2 {
            max-width: 85%;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            .gst-bp__headline {
                padding-left: 80px !important;
                text-align: left !important;

                span {
                    display: inherit;
                }
            }

            .gst-bp__headline > * {
                span {
                    display: inherit;
                }
            }
        }
    }
</style>
