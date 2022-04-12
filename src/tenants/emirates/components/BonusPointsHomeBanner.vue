<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow">
        <v-layout>
            <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink class="gst-bp__badge-container pt-4 pb-4 pl-4 pr-4">
                <TenantBonusPointsBadge />
            </v-flex>
            <v-flex class="gst-bp__content-container" xs12 sm10>
                <v-card-text class="gst-bp__headline headline font-weight-bold">
                    <h3 class="py-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        :to="{ name: 'help' }"
                        class="font-weight-normal">
                        {{ $t('url') }}
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
            </v-flex>
            <TenantBonusPointsBadge v-if="$vuetify.breakpoint.smAndDown" class="gst-bp__badge" variant="secondary" />
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            IconDropDownArrow
        },
        props: {
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            }
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsHomeBanner'
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn',
                'earnRate': 'earnRate'
            } ),
            isMobile() {
                return this.$vuetify.breakpoint.xsOnly;
            },
            title() {
                if ( !this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$t( 'title' );
                } else {
                    const earnRatePercent = this.earnRate ? `${this.earnRate}%` : '';
                    return this.$t( 'titleMoney', { earnRatePercent: earnRatePercent } );
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    overflow: hidden;

    .gst-bp__cta {
        padding-left: 16px;
    }

    h3 {
        color: theme-color( 'white' );
        font-weight: font-weight( 'bold' ) !important;
        letter-spacing: -0.43px;
        max-width: 85%;
    }

    a {
        line-height: line-height( 'xxxxl' );
        color: theme-color( 'white' ) !important;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'white' ) !important;
            }
        }
    }

    .gst-bp__badge-container {
        border: 1px solid rgba( 51, 51, 51, 0.1 );
        background: theme-color( 'white' );
        border-radius: border-radius( 'xs', 'none', 'none', 'xs' );
    }

    .gst-bp__content-container {
        background: theme-color( 'primary' ) !important;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'xs' );
    box-shadow: none !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        background: theme-color( 'primary' ) !important;

        .layout {
            padding: 30px 0;
            min-height: 194px;
        }

        .gst-bp__cta {
            padding-right: 130px;
        }

        h3 {
            font-size: font-size( 'xxxxl' );
        }

        .gst-bp__headline {
            padding-top: 0;
        }

        .gst-bp__badge {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }

    .gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' );
    }
}
</style>
