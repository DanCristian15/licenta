<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="60">
            <v-layout wrap class="py-3">
                <v-flex align-self-center grow class="u-pull-front">
                    <v-card-text class="gst-bp__headline left-left pa-0 pl-6 pl-md-0">
                        <span class="mr-1">{{ $t("title") }}</span>
                        <span v-if="this.$vuetify.breakpoint.xsOnly"><br /> </span>
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
        padding: 10px;
        overflow: hidden;

        .gst-bp__headline > * {
            color: white !important;
            vertical-align: middle;
        }

        h4 {
            font-weight: font-weight( 'bold' ) !important;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @media (min-width: 600px) {
        .gst-bp {
            .gst-bp__headline {
                margin-left: 90px;
            }
        }
    }

    @media (min-width: 960px) {
        .gst-bp {
            h4 {
                font-weight: font-weight( 'medium' ) !important;
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    @media (min-width: 600px) {
        .gst-bp.gst-event-ticket-detail-content__bonus-points-banner {
            .gst-bp__headline {
                text-align: center;
                margin-left: 0 !important;
            }
        }
    }
</style>
