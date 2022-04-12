<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 elevation-0 d-flex">
        <v-layout wrap class="align-center flex-grow">
            <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge class="gst-bp__badge mx-auto d-flex align-center" width="120" height="120" />
            </v-flex>
            <v-flex xs12 sm10>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-2 pb-md-0 pt-md-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        class="d-flex"
                        :to="{ name: 'help' }">
                        <span>{{ $t('url') }}</span>
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
            </v-flex>
            <TenantBonusPointsBadge v-if="!$vuetify.breakpoint.mdAndUp" class="gst-bp__badge" width="89" height="89" />
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
    background-color: #EFEFF9 !important;
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            outline: none;
        }
    }

    h3 {
        line-height: line-height( 'xxxxxxl' );
        color: theme-color( 'primary' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
        max-width: 85%;
    }

    a {
        line-height: line-height( 'xxxxl' );
        color: theme-color( 'primary' ) !important;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' ) !important;
            }
        }
    }

    .gst-bp__badge-tertiary {
        position: absolute;
        top: 16px;
        right: 16px;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            line-height: line-height( 'xxxxxxl' );
            padding-bottom: 35px !important;
            font-size: font-size( 'xxxxl' );
            letter-spacing: -0.42px;
            max-width: 100%;
        }

        .gst-bp__badge {
            position: absolute;
            right: 16px;
            bottom: 16px;
        }

        .gst-bp__cta {
            padding-bottom: 28px;
        }
    }
}
</style>
