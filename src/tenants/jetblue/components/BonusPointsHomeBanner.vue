<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-center flex-grow flex-row pl-4 pr-4 pl-md-0 pr-md-0">
            <v-flex xs12>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-2 pb-6 pb-md-0 pt-md-2">
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
            <TenantBonusPointsBadge class="gst-bp__badge" />
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
    background-color: theme-color( 'primary' );
    color: theme-color( 'white' );
    overflow: hidden;
    min-height: 120px;

    .gst-bp__headline,
    .gst-bp__cta {
        padding-left: 220px !important;
    }

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            outline: none;
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'white' );
        font-weight: font-weight( 'bold' ) !important;
        letter-spacing: -0.42px;
    }

    a {
        line-height: line-height( 'xxxxl' );
        color: theme-color( 'white' ) !important;
        font-weight: font-weight( 'regular' ) !important;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'white' ) !important;
            }
        }
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        left: 14px;
        height: 72px;
        width: 160px;
        background: theme-color( 'white' );
        border-radius: border-radius( 'm' );
        transform: translateY( -50% );
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        .gst-bp__headline,
        .gst-bp__cta {
            padding-left: 0 !important;
        }

        .gst-bp__badge {
            top: auto;
            left: auto;
            right: 8px;
            bottom: 13px;
            height: 64px;
            width: 106px;
            transform: none;
        }

        .gst-bp__cta {
            padding-bottom: 28px;
        }
    }
}
</style>
