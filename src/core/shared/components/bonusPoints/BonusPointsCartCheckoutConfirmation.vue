<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-cart-checkout-confirmation mx-auto gst-bp u-box-shadow pa-0">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            :max-height="85">
            <v-card-text class="gst-bp__headline text-center pa-0">
                <p class="tertiary--text font-weight-medium mb-0">
                    {{ $t("title") }}
                </p>
                <div class="d-flex justify-center align-center">
                    <h4 class="ml-4 font-weight-black quaternary--text d-inline-block">
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
        height: 84px;
        padding: 10px 0;
        overflow: hidden;

        h4 {
            font-weight: 700;
        }

        &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
            border-radius: border-radius( 'm' ) !important;
        }

        .gst-bp__headline > * {
            vertical-align: middle;
        }

        .gst-bp__circle-l,
        .gst-bp__circle-r {
            position: absolute;
        }

        .gst-bp__circle-l--one {
            top: -60px;
            left: -60px;
        }

        .gst-bp__circle-l--two {
            top: 45px;
            left: 65px;
        }

        .gst-bp__circle-l--three {
            left: 20px;
            bottom: -30px;
        }

        .gst-bp__circle-r--one {
            top: -23px;
            right: -23px;
        }

        .gst-bp__circle-r--two {
            top: 23px;
            right: 49px;
        }

        .gst-bp__circle-r--three {
            right: -30px;
            bottom: -80px;
        }
    }
</style>
<style lang="scss">
    @import "@scssVariables";

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
