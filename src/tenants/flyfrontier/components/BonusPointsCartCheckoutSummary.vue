<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-summary mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="60">
            <v-layout wrap>
                <v-flex align-self-center grow class="u-pull-front">
                    <v-card-text
                        class="gst-bp__headline text-left"
                        :class="{
                            'text-center pa-0': $vuetify.breakpoint.mdAndUp,
                            'text-left pa-0': !$vuetify.breakpoint.mdAndUp,
                        }">
                        <div :style="{ 'padding-left': '100px'}">
                            <span class="mr-1">{{ $t("title") }}</span>
                            <br v-if="!$vuetify.breakpoint.mdAndUp" />
                            <h4 class="font-weight-bold d-inline-block">
                                {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated}) }}
                            </h4>
                            <TenantBonusPointsBadge height="20" />
                        </div>
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

        .gst-bp__headline > * {
            color: white;
            vertical-align: middle;
        }

        .gst-bp__coin {
            @include radial-gradient(theme-color('gradient-radial-2'), theme-color('gradient-radial-1'));

            font-size: font-size( 'm' );
            font-weight: font-weight( 'black' );
        }

        .gst-bp__cta {
            padding-left: 16px;
        }

        h2 {
            color: theme-color( 'quaternary' );
            max-width: 85%;
        }

        a {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'primary' );
            vertical-align: middle;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }
</style>
