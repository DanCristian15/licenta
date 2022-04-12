<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-layout wrap class="u-height-100">
            <v-flex
                d-flex
                align-center
                justify-center
                xs4
                sm5
                md5>
                <TenantBonusPointsBadge
                    class="gst-bp-image__badge-secondary"
                    variant="secondary" />
            </v-flex>
            <v-flex align-self-center xs8 sm5 md7>
                <v-card-text class="gst-bp__headline d-inline-block align-center text-left text-md-center pa-0">
                    <p class="white--text font-weight-medium mb-0">
                        {{ $t("title") }}
                    </p>
                    <h4 class="white--text font-weight-medium d-inline-block">
                        {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ).toLowerCase() }}
                    </h4>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

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

        .gst-bp-image__badge-secondary {
            margin-top: 5px;
            max-width: 110px;
        }

        .gst-bp__headline {
            width: auto;

            > * {
                vertical-align: middle;
            }
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bp {
            height: 68px;
            width: 100%;

            .gst-bp-image__badge-secondary {
                max-width: 72px;
            }
        }
    }
</style>
