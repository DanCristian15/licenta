<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-start align-md-center flex-column flex-md-row u-width-100">
            <v-flex grow class="gst-bonus-points-home-banner__content u-width-100">
                <div v-if="!$vuetify.breakpoint.mdAndUp"
                    class="gsp-badge__badge-container d-flex align-center">
                    <TenantBonusPointsBadge class="gst-bp__badge" />
                </div>
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
        <div v-if="$vuetify.breakpoint.mdAndUp"
            class="gsp-badge__badge-container d-flex align-center justify-center">
            <TenantBonusPointsBadge class="gst-bp__badge" />
        </div>
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
    color: theme-color( 'quaternary' );
    border-radius: border-radius( 'm' );
    overflow: hidden;
    min-height: 120px;

    h3 {
        line-height: line-height( 'xxxxxl' );
        padding-left: 44px;
        color: theme-color( 'quaternary' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
    }

    .gst-bp__cta {
        line-height: line-height( 'xxl' );
        padding-top: 15px;
        padding-left: 60px;
        color: theme-color( 'primary' ) !important;
        font-size: font-size( 's' );
        font-weight: font-weight( 'medium' );
        outline: none;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' ) !important;
            }
        }
    }

    .gsp-badge__badge-container {
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'none' ) !important;
        min-width: 125px;
    }

    .gst-bp__badge {
        height: 70px;
        width: 75px;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 0 !important;
            padding-left: 8px;
            max-width: 100%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 20px;
            padding-left: 24px;
        }

        .gsp-badge__badge-container {
            height: 60px;
            padding-left: 24px;
            background-color: theme-color( 'white' );
        }

        .gst-bp__badge {
            height: 32px;
            width: 35px;
        }
    }
}
</style>
