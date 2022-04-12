<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row pl-md-15">
            <v-img
                :src="banner2Src"
                class="gst-bp__image__banner2 align-center order-3 order-md-3 mr-4"
                contain />
            <v-flex xs12 class="order-2 order-md-1">
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
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            IconDropDownArrow,
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
            },
            banner2Src() {
                return require( '../assets/banner-2.png' );
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
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            color: theme-color( 'white' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            outline: none;
            vertical-align: middle;

            .gst-icon-svg {
                visibility: hidden;
            }
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'white' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        padding-top: 28px !important;
        padding-left: 8px;

        .gst-bp__image__banner2 {
            position: absolute;
            right: -16px;
            bottom: 0;
            transform: scale( 0.8 );
        }

        h3 {
            padding-right: 40px;
            padding-bottom: 0 !important;
            max-width: 90%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 24px;
        }
    }
}
</style>
