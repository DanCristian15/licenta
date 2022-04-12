<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
        <v-container d-flex class="u-height-100">
            <v-flex
                xs2
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge class="gst-bp__badge" :height="this.$vuetify.breakpoint.mdAndUp ? 30 : 50" />
            </v-flex>
            <v-flex d-flex
                align-center
                justify-center
                xs9>
                <v-card-text class="gst-bp__headline pa-0">
                    <span class="mr-1">{{ $t("title") }}</span>
                    <span v-if="!this.$vuetify.breakpoint.mdAndUp"><br /> </span>
                    <h4 class="font-weight-bold d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
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
                return   imageConstants.BONUS_POINTS[device].CHECKOUT_SUMMARY;
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

        padding: 10px 0;
        overflow: hidden;
        min-height: 48px;

        .gst-bp__headline > * {
            color: white !important;
            vertical-align: middle;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'xxs' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            min-height: 68px;
        }
    }
</style>
