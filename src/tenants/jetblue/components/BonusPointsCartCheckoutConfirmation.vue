<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-card-text class="gst-bp__headline full-height pa-2 pa-md-2 d-flex flex-column align-start align-sm-center justify-center">
            <h4 class="gst-bonus-points-cart-checkout-confirmation__title quaternary--text pl-0 mb-1">
                {{ $t('title') }}
            </h4>
            <div class="d-flex align-center flex-grow-0">
                <h4 class="gst-bonus-points-cart-checkout-confirmation__bonus-points quaternary--text pl-0">
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
        </v-card-text>
        <TenantBonusPointsBadge class="gst-bp__badge" />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
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
            },
            currency: {
                type: String,
                required: true,
                default: ''
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
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

    .gst-bonus-points-cart-checkout-confirmation {
        position: relative;
        height: 84px;
        padding: 10px 0;
        background-color: theme-color( 'primary' );

        .gst-bp__headline {
            position: absolute;
            top: 0;
            bottom: 0;
            padding-left: 110px !important;
            z-index: 2;
        }

        .gst-bonus-points-cart-checkout-confirmation__title {
            line-height: line-height( 'xxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            vertical-align: middle;
        }

        .gst-bonus-points-cart-checkout-confirmation__bonus-points {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'bold' );
            letter-spacing: -0.35px;
            vertical-align: middle;
        }

        .gst-bp__badge {
            position: absolute;
            top: -1px;
            left: -1px;
            height: calc( 100% + 1px );
            width: 160px;
            background: theme-color( 'white' );
            border-radius: border-radius( 'm' );
        }
    }

    .gst-bonus-points-cart-checkout-confirmation.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-confirmation {
            height: 68px;

            .gst-bp__badge {
                width: 90px;
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