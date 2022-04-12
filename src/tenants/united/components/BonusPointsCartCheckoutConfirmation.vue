<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-card-text class="gst-bp__headline pa-0 ">
            <v-flex d-flex flex-row>
                <v-flex shrink>
                    <DeltaLogoTransparent height="83" />
                </v-flex>
                <v-flex
                    d-flex
                    flex-column
                    justify-center
                    align-lg-center
                    class="align-start">
                    <p class="white--text mb-0 gst-bonus-points-cart-checkout-confirmation__text">
                        {{ $t("title") }}
                    </p>
                    <div class="d-flex align-center shrink">
                        <h4 class="gst-bonus-points-cart-checkout-confirmation__bonus-points font-weight-black white--text">
                            {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ) }}
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
                </v-flex>
            </v-flex>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';
    import IconHelp from '@core/shared/assets/icons/help.svg';
    import DeltaLogoTransparent from '../assets/delta_logo_transparent.svg';

    export default {
        name: 'BonusPointsCardCheckoutConfirmation',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsCartCheckoutConfirmation'
        },
        components: {
            DeltaLogoTransparent,
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
        padding: 1px 0;
        background-color: #0033A0;
        overflow: hidden;
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
