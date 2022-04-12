<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout wrap class="align-center flex-grow pl-md-8 pr-md-12">
            <v-flex 12 md9>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-2 pb-md-0 pt-md-2">
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
            <v-flex
                v-if="$vuetify.breakpoint.mdAndUp"
                sm3
                d-flex
                align-center
                justify-end>
                <HomeBannerBadge class="gst-bp__badge" />
            </v-flex>
            <HomeBannerBadge v-if="!$vuetify.breakpoint.mdAndUp" class="gst-bp__badge" />
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import HomeBannerBadge from '../assets/home_banner_badge.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            HomeBannerBadge: HomeBannerBadge,
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
    background-color: theme-color( 'secondary' );
    color: theme-color( 'secondary' );
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            outline: none;
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'white' );
        font-weight: font-weight( 'bold' ) !important;
        letter-spacing: -0.42px;
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
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 35px !important;
            font-size: font-size( 'xxxxl' );
            font-weight: font-weight( 'bold' ) !important;
            max-width: 100%;
        }

        .gst-bp__badge {
            position: absolute;
            right: 16px;
            bottom: 16px;
            height: 33px;
            width: 131px;
        }

        .gst-bp__cta {
            padding-bottom: 28px;
        }
    }
}

@media (max-width: 599px) {
    .gst-bonus-points-home-banner {
        .gst-bp__cta {
            padding-right: 24px;
            max-width: calc( 100% - 86px );
        }
    }
}
</style>
