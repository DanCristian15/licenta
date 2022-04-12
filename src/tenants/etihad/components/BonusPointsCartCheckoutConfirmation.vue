<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="this.$vuetify.breakpoint.mdAndUp ? 85 : 68"
            position="center bottom">
            <v-card-text class="gst-bp__headline pa-0">
                <v-col xs="12" offset-sm="4" sm="8">
                    <p class="mb-0 text-center">
                        {{ $t("title") }}
                    </p>
                    <div class="d-flex justify-center align-center">
                        <h4 class="gst-bonus-points-cart-checkout-confirmation__bonus-points ml-7 font-weight-black">
                            {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ).toLowerCase() }}
                        </h4>
                        <BaseTooltip
                            top
                            :open-on-click="!$vuetify.breakpoint.mdAndUp"
                            :open-on-hover="$vuetify.breakpoint.mdAndUp"
                            class-content="gst-bp__tooltip gst-base-tooltip"
                            class-activator="d-flex align-center"
                            :text="$t('tooltip')">
                            <IconHelp class="gst-bp__tooltip-icon" />
                        </BaseTooltip>
                    </div>
                </v-col>
            </v-card-text>
        </v-img>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';
    import IconHelp from '@core/shared/assets/icons/help.svg';

    export default {
        name: 'BonusPointsCardCheckoutConfirmation',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutConfirmation'
        },
        components: {
            BaseTooltip,
            IconHelp
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
        padding: 10px 0;
        overflow: hidden;

        h4 {
            font-weight: font-weight( 'bold' );
        }

        .gst-bp__image {
            background-color: theme-color( 'tertiary' );
        }

        .gst-bp__headline > * {
            color: white;
            vertical-align: middle;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }
</style>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-bp__tooltip-icon {
        outline: none;

        .gst-svg-icon {
            fill: theme-color( 'senary' );
            transition: all 0.5s ease;
        }
    }

    .gst-bp__tooltip-icon:hover {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-bp__tooltip.v-tooltip__content {
        line-height: line-height( 'xxs' );
        padding: 8px !important;
        background: theme-color( 'tertiary' ) !important;
        font-size: font-size( "xxs" );
    }
</style>
