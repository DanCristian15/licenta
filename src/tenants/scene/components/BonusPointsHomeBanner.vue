<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="gst-bonus-points-home-banner__container align-start align-md-center flex-grow flex-column flex-md-row">
            <TenantBonusPointsBadge class="gst-bp__badge ml-4 mt-4 ma-md-0" />
            <TenantBonusPointsBadge variant="secondary" class="gst-bp__badge-secondary-right" />
            <TenantBonusPointsBadge v-if="$vuetify.breakpoint.mdAndUp" variant="secondary" class="gst-bp__badge-secondary-left" />
            <v-flex xs12>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-0 pb-md-0 pt-md-2">
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
    background-color: theme-color( 'secondary' );
    color: theme-color( 'white' );
    overflow: hidden;
    min-height: 120px;

    .gst-bonus-points-home-banner__container {
        padding-left: 77px;

        .gst-bp__cta {
            padding-top: 15px;
            padding-left: 16px;

            a {
                line-height: line-height( 'xxl' );
                color: theme-color( 'white' ) !important;
                font-size: font-size( 's' );
                font-weight: font-weight( 'medium' );
                outline: none;
                vertical-align: middle;

                .gst-icon-svg {
                    margin-top: 1px;

                    .gst-svg-icon {
                        fill: theme-color( 'white' ) !important;
                        transition: 0.5s ease;
                    }
                }
            }

            a:hover {
                color: theme-color( 'primary' ) !important;

                .gst-icon-svg {
                    .gst-svg-icon {
                        fill: theme-color( 'primary' ) !important;
                    }
                }
            }
        }

        h3 {
            line-height: line-height( 'xxxxxl' );
            color: theme-color( 'white' );
            font-weight: font-weight( 'black' ) !important;
            letter-spacing: -0.42px;
            max-width: 85%;
        }

        .gst-bp__badge {
            position: absolute;
            top: 50%;
            right: 40px;
            height: auto;
            width: 82px;
            transform: translateY( -50% );
        }

        .gst-bp__badge-secondary-right {
            position: absolute;
            right: 177px;
            bottom: -19px;
            height: auto;
            width: 62px;
        }

        .gst-bp__badge-secondary-left {
            position: absolute;
            top: 8px;
            left: 8px;
            height: auto;
            width: 54px;
        }
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

.gst-bonus-points-home-banner.v-card.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0 1px 4px 1px theme-color( 'shadow' );
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        .gst-bonus-points-home-banner__container {
            padding-left: 0;

            h3 {
                line-height: line-height( 'xxxxxxxl' );
                padding-bottom: 0 !important;
                max-width: 100%;
            }

            .gst-bp__cta {
                padding-top: 0;
                padding-bottom: 15px;
            }

            .gst-bp__badge {
                position: relative;
                top: auto;
                right: auto;
                height: auto;
                width: 31px;
                transform: none;
            }

            .gst-bp__badge-secondary-right {
                right: 8px;
                bottom: 8px;
                height: auto;
                width: 49px;
            }
        }
    }
}
</style>
