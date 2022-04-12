<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="100">
            <v-card-text class="gst-bp__headline pa-0">
                <v-col xs="12" lg="8" class="pl-6 pl-lg-0">
                    <p class="mb-0 text-lg-center">
                        {{ $t("title") }}
                    </p>
                    <div class="d-flex justify-start justify-lg-center align-center">
                        <h4 class="gst-bonus-points-cart-checkout-confirmation__bonus-points">
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
        height: 100px;
        padding: 10px 0;
        overflow: hidden;

        h4 {
            font-weight: font-weight( 'bold' ) !important;
        }

        .gst-bp__headline > * {
            color: white;
            vertical-align: middle;
        }
    }

    .gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
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

    .gst-bp__tooltip-icon {
        outline: none;

        .gst-svg-icon {
            fill: theme-color( 'senary' );
            transition: all 0.5s ease;
        }
    }

    .gst-bp__tooltip-icon:hover {
        .gst-svg-icon {
            fill: theme-color( 'white' );
        }
    }

    .gst-bp__tooltip.v-tooltip__content {
        line-height: line-height( 'xxs' );
        padding: 8px !important;
        background: theme-color( 'tertiary' ) !important;
        font-size: font-size( "xxs" );
    }
</style>
