<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner gst-bp d-flex u-box-shadow">
        <v-layout class="align-start align-md-center flex-grow flex-column flex-md-row pl-md-16">
            <v-img class="gst-bp__image order-md-2"
                :src="imageSrc"
                flat
                position="top center" />
            <v-flex xs12 class="pl-6 pr-3 pl-md-3 pr-md-0">
                <v-card-text class="gst-bp__headline headline font-weight-bold pt-0 pb-3 px-0 py-md-0">
                    <h3 class="py-0 pb-md-0 pt-md-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta px-0">
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
                return this.$vuetify.breakpoint.mdAndUp ? require( '../assets/banner_top_right.png' ) : require( '../assets/banner_top_right_mobile.png' );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 0;
    margin: 0 auto;
    background-color: theme-color( 'white' );
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
            font-weight: font-weight( 'medium' );
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
    }

    .gst-bp__image {
        height: auto;
        width: 372px;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 0 !important;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 25px;
        }

        .gst-bp__image {
            height: 80px;
            width: 100%;
        }
    }
}
</style>
