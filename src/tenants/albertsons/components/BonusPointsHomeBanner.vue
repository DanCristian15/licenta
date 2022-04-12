<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-stretch flex-column flex-md-row u-width-100">
            <div v-if="$vuetify.breakpoint.mdAndUp"
                class="gsp-bp__badge-container d-flex align-start justify-center">
                <TenantBonusPointsBadge class="gst-bp__badge" />
            </div>
            <v-flex grow class="gst-bonus-points-home-banner__content">
                <div v-if="!$vuetify.breakpoint.mdAndUp"
                    class="gsp-bp__badge-container d-flex align-center">
                    <TenantBonusPointsBadge class="gst-bp__badge" />
                </div>
                <v-card-text class="gst-bp__headline headline font-weight-bold">
                    <h3 class="">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        class="d-flex align-center"
                        :to="{ name: 'help' }">
                        <span>{{ $t('url') }}</span>
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
            </v-flex>
        </v-layout>
        <div v-if="$vuetify.breakpoint.mdAndUp"
            class="gst-tenant__badge-container d-flex align-center justify-center">
            <TenantBadge class="gst-tenant__badge" />
        </div>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import TenantBadge from '../assets/tenant_badge.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            TenantBadge,
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
    background-color: #F7F7F7;
    color: theme-color( 'quaternary' );
    border-radius: border-radius( 'm' );
    overflow: hidden;
    min-height: 120px;
    box-shadow: 0 1px 4px 1px rgba( 109, 125, 144, 0.35596 ) !important;

    .gst-bonus-points-home-banner__content {
        margin-top: 30px;

        .gst-bp__headline {
            padding: 0;

            h3 {
                line-height: line-height( 'xxxxxxl' );
                padding-top: 0;
                color: theme-color( 'quaternary' );
                font-weight: font-weight( 'black' ) !important;
                letter-spacing: -0.42px;
            }
        }

        .gst-bp__cta {
            line-height: line-height( 'xxl' );
            padding-top: 15px;
            padding-left: 0;
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            outline: none;
            vertical-align: middle;

            .gst-icon-svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' ) !important;
                }
            }
        }
    }

    .gsp-bp__badge-container {
        width: 77px;
        margin-top: 28px;
        border-radius: border-radius( 'none' ) !important;

        .gst-bp__badge {
            max-width: 40px;
        }
    }

    .gst-tenant__badge-container {
        margin-right: 24px;

        .gst-tenant__badge {
            height: 83px;
            width: 142px;
        }
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        .gst-bonus-points-home-banner__content {
            margin-top: 33px;
            margin-left: 24px;

            .gst-bp__headline {
                padding: 0;

                h3 {
                    line-height: line-height( 'xxxxxxl' );
                    padding-top: 0;
                    color: theme-color( 'quaternary' );
                    font-weight: font-weight( 'black' ) !important;
                    letter-spacing: -0.42px;
                }
            }

            .gst-bp__cta {
                line-height: line-height( 'xxl' );
                padding-top: 8px;
                padding-bottom: 24px;
                padding-left: 0;
                color: theme-color( 'primary' ) !important;
                font-size: font-size( 's' );
                font-weight: font-weight( 'large' );
                outline: none;
                vertical-align: middle;
            }
        }

        .gsp-bp__badge-container {
            width: 77px;
            margin-top: 0;
            margin-bottom: 20px;

            .gst-bp__badge {
                height: 31px;
                width: 31px;
            }
        }
    }
}
</style>
