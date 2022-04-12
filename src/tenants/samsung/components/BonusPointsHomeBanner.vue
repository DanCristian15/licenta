<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row pl-md-15 pr-md-10">
            <TenantBonusPointsBadge
                class="gst-bp__badge ml-4 mt-6 ml-md-0 mt-md-0 mr-md-2 order-1 order-md-2"
                :width="this.$vuetify.breakpoint.mdAndUp ? 118 : 78"
                :height="this.$vuetify.breakpoint.mdAndUp ? 47 : 30" />
            <v-img
                :src="imageSrc"
                class="gst-bp__image align-center order-3 order-md-3"
                contain
                :max-width="this.$vuetify.breakpoint.mdAndUp ? 114 : 71"
                :max-height="this.$vuetify.breakpoint.mdAndUp ? 110: 68" />
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
            },
            imageSrc() {
                return require( '../assets/banner_top_left.png' );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background-color: theme-color( 'quinary' );
    color: theme-color( 'quaternary' );
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
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

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'quaternary' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
        max-width: 85%;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 0 !important;
            max-width: 90%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 24px;
        }

        .gst-bp__image {
            position: absolute;
            right: 8px;
            bottom: 8px;
        }
    }
}
</style>
