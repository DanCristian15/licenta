<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            cover
            class="gst-bp__image align-center"
            :max-height="85">
            <v-card-text class="gst-bp__headline align-center text-left text-md-center py-0 pl-0 pr-10">
                <p class="white--text mb-0">
                    {{ $t("title") }}
                </p>
                <v-flex d-flex justify-start justify-md-center align-center class="d-inline-block">
                    <h4 class="white--text d-inline-block">
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
        background-color: theme-color( 'secondary' );
        overflow: hidden;

        .gst-bp__image .v-image__image {
            background-position: left center !important;
        }

        .gst-bp__headline > * {
            vertical-align: middle;
        }

        h4 {
            font-weight: font-weight( 'medium' );
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;

        .v-card__text {
            max-width: 62%;
        }
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

        .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            .v-card__text {
                max-width: 80%;
            }
        }
    }
</style>
