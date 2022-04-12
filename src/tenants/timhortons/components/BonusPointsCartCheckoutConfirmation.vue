<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation u-box-shadow">
        <div class="gst-bp__badge-container">
            <TenantBonusPointsBadge class="gst-bp__badge" variant="secondary" />
        </div>
        <v-card-text class="gst-bp__headline">
            <h4 class="gst-bonus-points-cart-checkout-confirmation__title">
                {{ $t('title') }}
            </h4>
            <div class="d-flex justify-center align-center">
                <h4 class="gst-bonus-points-cart-checkout-confirmation__bonus-points quaternary--text">
                    {{ $t("pointWithCount", {count: points, formattedCount: pointsFormated} ) }}
                </h4>
                <BaseTooltip
                    top
                    :open-on-click="!$vuetify.breakpoint.mdAndUp"
                    :open-on-hover="$vuetify.breakpoint.mdAndUp"
                    class-content="gst-bp__tooltip gst-base-tooltip"
                    class-activator="d-flex align-center mt-1"
                    :text="$t('tooltip')">
                    <IconHelp class="gst-bp__tooltip-icon" />
                </BaseTooltip>
            </div>
        </v-card-text>
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
        display: flex;
        position: relative;
        height: 84px;
        padding: 0;
        margin-right: auto;
        background-color: theme-color( 'quinary' );
        margin-left: auto;
        overflow: hidden;

        .gst-bp__headline {
            display: flex;
            position: absolute;
            top: 0;
            bottom: 0;
            padding: 8px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 2;

            .gst-bonus-points-cart-checkout-confirmation__title {
                line-height: line-height( 'xxxl' );
                color: theme-color( 'tertiary' ) !important;
                font-size: font-size( 's' );
                font-weight: font-weight( 'regular' );
                vertical-align: middle;
            }

            .gst-bonus-points-cart-checkout-confirmation__bonus-points {
                display: flex;
                line-height: line-height( 'xxxxl' );
                color: theme-color( 'quaternary' ) !important;
                font-weight: font-weight( 'black' );
                vertical-align: middle;
            }
        }

        .gst-bp__badge-container {
            display: flex;
            padding: 8px 10px;
            background: theme-color( 'primary' );
            align-items: center;
            justify-content: center;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-right: 3px solid theme-color( 'black' );

            .gst-bp__badge {
                height: auto;
                width: 69px;
            }
        }
    }

    .gst-bonus-points-cart-checkout-confirmation.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-bonus-points-cart-checkout-confirmation.v-sheet.v-card:not(.v-sheet--outlined) {
        box-shadow: 0 1px 4px 1px theme-color( 'shadow' );
    }

    @include mobile-only {
        .gst-bonus-points-cart-checkout-confirmation {
            .gst-bp__badge-container {
                .gst-bp__badge {
                    height: auto;
                    width: 52px;
                }
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
