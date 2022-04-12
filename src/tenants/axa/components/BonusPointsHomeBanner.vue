<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-img
            :src="imageSrc"
            class="gst-bp__image align-center"
            height="100%">
            <v-layout class="align-stretch flex-column flex-grow-1 pl-md-16">
                <v-flex grow class="gst-bonus-points-home-banner__content pl-md-3">
                    <v-card-text class="gst-bp__headline headline font-weight-bold">
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
        </v-img>
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
                return require( '../assets/banner_bg_texture.png' );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background-color: theme-color( 'white' );
    color: theme-color( 'quaternary' );
    border-radius: border-radius( 'm' );
    overflow: hidden;
    min-height: 120px;
    box-shadow: 0 1px 4px 1px rgba( 109, 125, 144, 0.35596 ) !important;

    .gst-bonus-points-home-banner__content {
        margin-top: 30px;

        .gst-bp__headline {
            padding: 0;

            h3 {
                line-height: line-height( 'xxxxxxl' );
                padding-top: 0;
                font-weight: font-weight( 'black' ) !important;
                letter-spacing: -0.42px;
            }
        }

        .gst-bp__cta {
            line-height: line-height( 'xxl' );
            padding-top: 15px;
            padding-bottom: 22px;
            padding-left: 0;
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            outline: none;
            vertical-align: middle;

            a {
                color: theme-color( 'primary' ) !important;
            }

            .gst-icon-svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' ) !important;
                }
            }
        }
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        .gst-bonus-points-home-banner__content {
            margin-top: 74px;
            margin-left: 24px;

            .gst-bp__headline {
                padding: 0;

                h3 {
                    line-height: line-height( 'xxxxxxl' );
                    padding-top: 0;
                    letter-spacing: -0.42px;
                }
            }

            .gst-bp__cta {
                line-height: line-height( 'xxl' );
                padding-top: 8px;
                padding-bottom: 24px;
                padding-left: 0;
                font-size: font-size( 's' );
            }
        }
    }
}
</style>
