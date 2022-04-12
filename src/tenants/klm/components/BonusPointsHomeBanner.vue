<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout wrap class="align-center flex-grow">
            <v-flex v-if="$vuetify.breakpoint.mdAndUp"
                d-flex
                align-center
                justify-center>
                <TenantBonusPointsBadge class="gst-bp__badge mx-auto" width="108" />
            </v-flex>
            <v-flex xs12 sm10>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-2 pb-md-0 pt-md-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        :to="{ name: 'help' }">
                        {{ $t('url') }}
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
                <TenantBonusPointsBadge v-if="$vuetify.breakpoint.mdAndUp" class="gst-bp__badge-tertiary d-flex align-center" width="160" height="92" variant="tertiary" />
            </v-flex>
            <TenantBonusPointsBadge v-if="!$vuetify.breakpoint.mdAndUp" class="gst-bp__badge" width="76" height="61" />
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
    background: #E0F6FF !important;
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
        color: #003145;
        font-weight: font-weight( 'regular' ) !important;
        font-family: 'Noa LT Std', sans-serif;
        letter-spacing: -0.42px;
        max-width: 85%;
    }

    a {
        line-height: line-height( 'xxxxl' );
        color: #003145 !important;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: #003145 !important;
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
            line-height: line-height( 'xxxxxl' );
            padding-bottom: 35px !important;
            font-size: font-size( 'xxxxl' );
            letter-spacing: -0.428571px;
            max-width: 100%;
        }

        .gst-bp__badge {
            position: absolute;
            right: 16px;
            bottom: 16px;
        }

        .gst-bp__cta {
            padding-bottom: 28px;

            a {
                line-height: line-height( 'l' );
            }
        }
    }
}
</style>
