<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner u-box-shadow">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row pl-md-8 pr-md-12">
            <div v-if="$vuetify.breakpoint.mdAndUp">
                <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-small" />
                <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-medium" />
                <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-large" />
            </div>
            <div v-else class="gst-bp__badge-container">
                <TenantBonusPointsBadge class="gst-bp__badge" variant="tertiary" />
                <TenantBonusPointsBadge class="gst-bp__badge" variant="quaternary" />
            </div>
            <v-flex xs12>
                <v-card-text class="gst-bp__headline">
                    <h3>{{ title }}</h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link :to="{ name: 'help' }">
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
    display: flex;
    padding: 0;
    margin-right: auto;
    background-color: theme-color( 'quinary' );
    margin-left: auto;
    overflow: hidden;
    min-height: 120px;

    .gst-bp__headline {
        padding-top: 0;
        padding-bottom: 0;

        h3 {
            line-height: line-height( 'xxxxxl' );
            padding: 8px 0 0;
            color: theme-color( 'quaternary' );
            font-weight: font-weight( 'black' ) !important;
            letter-spacing: -0.42px;
            max-width: 85%;
        }
    }

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            display: flex;
            line-height: line-height( 'xxl' );
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            align-items: center;
            outline: none;
            vertical-align: middle;

            .gst-icon-svg {
                margin-top: 1px;

                .gst-svg-icon {
                    fill: theme-color( 'primary' ) !important;
                }
            }
        }
    }

    .gst-bp__badge {
        position: absolute;
    }

    .gst-bp__badge-small {
        top: 52px;
        right: 245px;
        height: auto;
        width: 110px;
        z-index: 3;
    }

    .gst-bp__badge-medium {
        top: 19px;
        right: 139px;
        height: auto;
        width: 135px;
        z-index: 2;
    }

    .gst-bp__badge-large {
        top: -7px;
        right: 16px;
        height: auto;
        width: 170px;
        z-index: 1;
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
        min-height: 194px;

        .gst-bp__headline {
            padding-top: 25px;
            padding-bottom: 5px;
            font-weight: font-weight( 'bold' );

            h3 {
                line-height: line-height( 'xxxxxxxl' );
                padding: 0 !important;
                max-width: 90%;
            }
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 15px;
        }

        .gst-bp__badge-container {
            display: flex;
            position: relative;
            left: -10px;
            width: 100%;
            padding: 10px;
            background: theme-color( 'primary' );
            border-radius: border-radius( 's' ) !important;
            align-items: center;
            justify-content: space-between;
            max-width: calc( 100% - 20px );

            .gst-bp__badge {
                position: relative;
                margin: 0 8px;
            }
        }

        .gst-bp__badge-container::after {
            position: absolute;
            top: -12px;
            left: -4px;
            height: calc( 100% + 17px );
            width: 100%;
            border: 3px solid theme-color( 'anchor' );
            border-radius: border-radius( 's' ) !important;
            content: "";
        }
    }
}
</style>
