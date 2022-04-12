<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp u-box-shadow d-flex">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row">
            <TenantBonusPointsBadge class="gst-bp__badge" />
            <v-flex xs12>
                <v-card-text class="gst-bp__headline headline font-weight-bold pa-0">
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
    background-color: #EEEEEE;
    color: theme-color( 'quaternary' );
    overflow: hidden;
    min-height: 120px;

    h3 {
        line-height: line-height( 'xxxxxl' );
        margin-top: 30px;
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxxl' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
        margin-left: 77px;
        max-width: 80%;
    }

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 0;
        margin-bottom: 25px;
        margin-left: 77px;

        a {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            outline: none;
            vertical-align: middle;
        }

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' ) !important;
            }
        }
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        right: 60px;
        height: 99px;
        width: 159px;
        transform: translateY( -50% );
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 0 !important;
            max-width: 100%;
            margin-left: 24px;
        }

        .gst-bp__cta {
            padding-top: 18px;
            padding-bottom: 20px;
            margin-left: 24px;
        }

        .gst-bp__badge {
            position: relative;
            top: 16px;
            left: 24px;
            right: auto;
            height: 57px;
            width: 94px;
            transform: none;
        }
    }
}
</style>
