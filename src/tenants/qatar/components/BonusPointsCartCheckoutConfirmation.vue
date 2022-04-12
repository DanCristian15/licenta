<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="85">
            <v-card-text class="gst-bp__headline align-center text-center pa-0">
                <p class="white--text mb-0">
                    {{ $t("title") }}
                </p>
                <v-flex d-flex justify-center align-center class="d-inline-block">
                    <h4 class="d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ) }}
                    </h4>
                </v-flex>
            </v-card-text>
        </v-img>
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
        background-color: theme-color( 'primary' );
        overflow: hidden;

        .gst-bp__image .v-image__image {
            background-position: left center !important;
        }

        h4 {
            color: theme-color( 'bonus-points-chip-bg-color' );
            font-weight: font-weight( 'medium' );
        }

        .gst-bp__headline > * {
            vertical-align: middle;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            width: 100%;

            .gst-bp__image {
                padding: 20px 0;
            }

            .gst-bp__headline {
                padding-left: 40px !important;
            }
        }
    }
</style>
