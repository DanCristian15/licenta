<template>
    <v-card
        v-if="isLoyaltyTypeAllowEarn"
        class="gst-bonus-points-cart-checkout-summary gst-bp u-box-shadow pa-0">
        <div class="gst-bp__headline u-height-100 d-flex align-center justify-center">
            <TenantBonusPointsBadge
                class="gst-bp__badge-primary d-flex"
                :width="this.$vuetify.breakpoint.mdAndUp ? 52 : 58"
                :height="this.$vuetify.breakpoint.mdAndUp ? 49 : 58" />
            <div>
                <span class="mr-1">{{ $t("title") }}</span>
                <h4 class="font-weight-bold d-inline-block">
                    {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}).toLowerCase() }}
                </h4>
            </div>
        </div>
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
        height: 40px;
        padding: 10px 0;
        background: #EFEFF9;
        overflow: hidden;

        .gst-bp__badge-primary {
            position: absolute;
            top: -5px;
            left: 24px;
        }

        .gst-bp__headline {
            padding-right: 76px !important;
            padding-left: 76px !important;
            text-align: center;

            > * {
                color: theme-color( 'primary' ) !important;
                vertical-align: middle;
            }

            span {
                line-height: line-height( 'xxxl' );
                font-size: font-size( 'xxs' );
                letter-spacing: -0.25px;
            }

            h4 {
                line-height: 27px;
                color: theme-color( 'primary' ) !important;
                font-size: font-size( 'l' ) !important;
                font-weight: font-weight( 'bold' ) !important;
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
            height: 48px;

            .gst-bp__headline {
                padding-right: 60px !important;
                padding-left: 60px !important;
            }

            .gst-bp__badge-primary {
                position: absolute;
                left: 8px;
            }
        }
    }
</style>
