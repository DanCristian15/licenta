<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner gst-bp u-box-shadow">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row pl-md-16 pr-md-12">
            <TenantBonusPointsBadge class="gst-bp__badge" />
            <div class="d-flex flex-grow-1 flex-column justify-center">
                <v-card-text class="gst-bp__headline headline">
                    <h3>
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link :to="{ name: 'help' }">
                        <span>{{ $t('url') }}</span>
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
            </div>
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
    background-color: #030E2F;
    border-radius: border-radius( 'm' ) !important;
    margin-left: auto;
    overflow: hidden;
    min-height: 120px;

    .gst-bp__headline {
        padding: 0;

        h3 {
            line-height: line-height( 'xxxxxxl' );
            padding-top: 12px;
            padding-bottom: 0;
            color: theme-color( 'white' );
            font-weight: font-weight( 'bold' ) !important;
            letter-spacing: -0.42px;
        }
    }

    .gst-bp__cta {
        line-height: line-height( 'xxl' );
        padding-top: 15px;
        padding-left: 0;
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );

        a {
            display: flex;
            color: theme-color( 'white' ) !important;
            outline: none;
            align-items: center;
        }

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'white' ) !important;
            }
        }
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        right: 32px;
        height: auto;
        width: 80px;
        transform: translateY( -50% );
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
        .gst-bp__headline {
            padding: 12px 11px 0 24px;

            h3 {
                line-height: line-height( 'xxxxxxl' );
                padding-top: 0;
                letter-spacing: -0.42px;
            }
        }

        .gst-bp__cta {
            line-height: line-height( 'xxl' );
            padding: 8px 11px 24px 24px;
        }

        .gst-bp__badge {
            position: relative;
            top: 0;
            right: 0;
            height: auto;
            width: 40px;
            margin-top: 18px;
            margin-left: 24px;
            transform: none;
        }
    }
}
</style>
