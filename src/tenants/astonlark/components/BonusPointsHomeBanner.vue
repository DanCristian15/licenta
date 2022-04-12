<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp u-box-shadow d-flex">
        <v-layout wrap class="align-center flex-grow">
            <v-flex 12 md11 class="py-md-1">
                <v-card-text class="gst-bp__headline headline font-weight-bold pa-0">
                    <BonusPointsBadge v-if="!$vuetify.breakpoint.mdAndUp" class="gst-bp__badge mb-6" />
                    <h3 class="py-2 pb-md-0 pt-md-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta pa-0">
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
                sm1
                d-flex
                align-center
                justify-end>
                <BonusPointsBadge class="gst-bp__badge" />
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import BonusPointsBadge from './BonusPointsBadge';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            BonusPointsBadge: BonusPointsBadge,
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
    padding: 26px 25px 26px 77px;
    background-color: theme-color( 'home-banner-gradient-start' );
    color: theme-color( 'secondary' );
    overflow: hidden;
    min-height: 120px;

    &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-bp__cta {
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            padding-top: 15px;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            outline: none;
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        background: linear-gradient( 270deg, #A146BB 0%, #FD4F57 100% );
        color: theme-color( 'white' );
        font-weight: font-weight( 'bold' ) !important;
        letter-spacing: -0.42px;
        max-width: 85%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;

        @include mobile-only {
            font-size: font-size( 'xxxxl' );
        }
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

    @include mobile-only {
        padding: 16px 11px 24px 24px;

        .gst-bp__badge {
            height: 34px;
            width: 46px;
        }

        h3 {
            padding-bottom: 16px !important;
            font-weight: font-weight( 'bold' ) !important;
            max-width: 100%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 27px;
        }
    }

    @media (max-width: 599px) {
        .gst-bp__cta {
            max-width: calc( 100% - 86px );
        }
    }
}
</style>
