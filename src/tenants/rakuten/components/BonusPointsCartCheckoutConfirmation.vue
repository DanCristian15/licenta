<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-container d-flex class="u-height-100">
            <v-flex
                xs2
                sm3
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge class="gst-bp__badge py-2" />
            </v-flex>
            <v-flex
                xs10
                sm9
                d-flex
                align-center
                justify-center>
                <v-card-text class="gst-bp__headline pa-0">
                    <p class="mb-0">
                        {{ $t("title") }}
                    </p>
                    <h4 class="font-weight-bold d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ) }}
                    </h4>
                </v-card-text>
            </v-flex>
        </v-container>
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
            },
            currency: {
                type: String,
                required: true,
                default: ''
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                required: true
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
                if ( this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$options.filters.currencyFull( this.points, this.currency );
                }

                return this.$options.filters.bonusPoints( this.points );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-bp {
        @include linear-gradient(90.35deg, #AA389C 0.26%, #D96676 99.67%);

        height: 84px;
        padding: 10px 0;

        .layout {
            min-height: inherit;
        }

        h4 {
            font-weight: font-weight( 'bold' );
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
        border-radius: border-radius( 'xxs' ) !important;
    }

    @include mobile-xs-only {
        .gst-bp {
            .gst-bp__headline {
                margin-left: -8%;
            }
        }
    }
</style>
