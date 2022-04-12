<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp u-box-shadow d-flex">
        <v-layout wrap class="align-center flex-grow-1">
            <TenantBonusPointsBadge class="gst-bp__image" />
            <v-flex xs12 md9>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0 pb-0">
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
    padding-left: 77px;
    background-color: theme-color( 'white' );
    color: theme-color( 'black' );
    overflow: hidden;
    min-height: 120px;

    h3 {
        line-height: line-height( 'xxxxxl' );
        margin-top: 30px;
        color: theme-color( 'quaternary' );
        font-size: font-size( 'xxxxl' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
        max-width: 95%;
    }

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;
        margin-bottom: 25px;

        a {
            line-height: line-height( 'xxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'bold' );
            outline: none;
        }

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' ) !important;
            }
        }
    }

    .gst-bp__image {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 203px;
        z-index: 1;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        padding-top: 24px;
        padding-right: 10px;
        padding-bottom: 24px;
        padding-left: 24px;

        .gst-bp__headline {
            padding-top: 0;
            padding-right: 0;
            padding-left: 0;
        }

        h3 {
            padding-top: 20px !important;
            padding-bottom: 15px !important;
            margin-top: 0;
            font-size: font-size( 'xxxxl' );
            max-width: 100%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 0;
            margin-bottom: 0;
        }

        .gst-bp__image {
            position: relative;
            height: 31px;
            width: 130px;
            transform: rotate( 180deg );
        }

        .gst-bp__image::before {
            width: 12px;
        }

        .gst-bp__image::after {
            left: -3px;
            width: 12px;
        }
    }
}
</style>
